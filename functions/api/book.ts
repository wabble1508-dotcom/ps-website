import type { Ctx } from "../../server/env";
import { db, newId } from "../../server/db";
import { clean, isEmail, json } from "../../server/http";
import { formatBerlin, isFreeSlot } from "../../server/slots";
import { notifyOwner, sendMail } from "../../server/mail";
import { COMPANY } from "../../server/config";

// Bucht einen Termin. Jeder Termin ist nur einmal buchbar (UNIQUE in der Datenbank).
export const onRequestPost = async ({ request, env }: Ctx) => {
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const firstName = clean(b.firstName, 100);
  const lastName = clean(b.lastName, 100);
  const email = clean(b.email, 200);
  const phone = clean(b.phone, 50);
  const note = clean(b.note, 1000);
  if (!firstName || !isEmail(email)) return json({ error: "invalid" }, 400);

  const database = await db(env);
  const { results } = await database.prepare("SELECT slot FROM bookings").all<{ slot: string }>();
  const requested = clean(b.slot, 40);
  if (!isFreeSlot(requested, new Set(results.map((r) => r.slot)))) return json({ error: "taken" }, 409);
  const slot = new Date(requested).toISOString();

  const { meta } = await database
    .prepare(
      "INSERT OR IGNORE INTO bookings (id, slot, first_name, last_name, email, phone, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(newId(), slot, firstName, lastName, email, phone, note, new Date().toISOString())
    .run();
  if (!meta.changes) return json({ error: "taken" }, 409);

  const when = formatBerlin(slot);
  const name = `${firstName} ${lastName}`.trim();
  await Promise.all([
    notifyOwner(
      env,
      `Neuer Termin: ${name} – ${when}`,
      `Termin: ${when}\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nNachricht: ${note}`,
      email,
    ),
    sendMail(
      env,
      email,
      `Ihr Termin bei ${COMPANY.name}: ${when}`,
      `Hallo ${firstName},\n\nvielen Dank für Ihre Buchung. Ihr kostenloses Erstgespräch ist eingetragen für:\n\n${when}\n\nWir melden uns zum vereinbarten Zeitpunkt bei Ihnen. Falls Sie den Termin verschieben möchten, antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp: https://wa.me/4915207595260\n\nViele Grüße\n${COMPANY.name}`,
      COMPANY.email,
    ),
  ]);
  return json({ ok: true, slot });
};
