import type { Ctx } from "../../server/env";
import { db, newId } from "../../server/db";
import { clean, isEmail, json } from "../../server/http";
import { formatBerlin, isFreeSlot } from "../../server/slots";
import { notifyOwner, sendMail } from "../../server/mail";
import { activeSocialLinks } from "../../server/socialLinks";
import { COMPANY } from "../../server/config";
import { busyIntervals, singleEventIcs } from "../../server/calendar";

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
  const t = Date.parse(requested);
  const busy = await busyIntervals(env, t - 86400_000, t + 86400_000);
  if (!isFreeSlot(requested, new Set(results.map((r) => r.slot)), Date.now(), busy)) return json({ error: "taken" }, 409);
  const slot = new Date(requested).toISOString();

  const bookingId = newId();
  const { meta } = await database
    .prepare(
      "INSERT OR IGNORE INTO bookings (id, slot, first_name, last_name, email, phone, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(bookingId, slot, firstName, lastName, email, phone, note, new Date().toISOString())
    .run();
  if (!meta.changes) return json({ error: "taken" }, 409);

  const when = formatBerlin(slot);
  const name = `${firstName} ${lastName}`.trim();
  // Kalendereintrag als Anhang: ein Tipp darauf speichert den Termin (Apple, Google, Outlook)
  const toBase64 = (text: string) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));
  const ownerIcs = singleEventIcs(
    bookingId,
    slot,
    `Erstgespräch: ${name}`,
    [`E-Mail: ${email}`, phone && `Telefon: ${phone}`, note && `Nachricht: ${note}`].filter(Boolean).join("\n"),
  );
  const stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const googleLink = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: `Erstgespräch mit ${COMPANY.name}`,
    dates: `${stamp(Date.parse(slot))}/${stamp(Date.parse(slot) + 30 * 60_000)}`,
    details: "Kostenloses Erstgespräch. Fragen vorab: WhatsApp https://wa.me/4915207595260",
  })}`;
  const customerIcs = singleEventIcs(
    `${bookingId}-kunde`,
    slot,
    `Erstgespräch mit ${COMPANY.name}`,
    `Kostenloses Erstgespräch. Fragen vorab: WhatsApp https://wa.me/4915207595260 oder ${COMPANY.email}`,
  );
  await Promise.all([
    notifyOwner(
      env,
      `Neuer Termin: ${name} – ${when}`,
      `Termin: ${when}\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nNachricht: ${note}`,
      email,
      [{ filename: "termin.ics", content: toBase64(ownerIcs) }],
    ),
    sendMail(
      env,
      email,
      `Ihr Termin bei ${COMPANY.name}: ${when}`,
      `Hallo ${firstName},\n\nvielen Dank für Ihre Buchung. Ihr kostenloses Erstgespräch ist eingetragen für:\n\n${when}\n\nDen Termin finden Sie als Kalenderdatei im Anhang (Apple/Outlook) – oder speichern Sie ihn im Google Kalender: ${googleLink}\n\nWir melden uns zum vereinbarten Zeitpunkt bei Ihnen. Falls Sie den Termin verschieben möchten, antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp: https://wa.me/4915207595260\n\nViele Grüße\n${COMPANY.name}\n\nFolgen Sie uns: ${activeSocialLinks().map((l) => `${l.name} ${l.url}`).join(" · ")}`,
      COMPANY.email,
      undefined,
      [{ filename: "termin.ics", content: toBase64(customerIcs) }],
    ),
  ]);
  return json({ ok: true, slot });
};
