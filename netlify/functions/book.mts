import type { Config } from "@netlify/functions";
import { bookings, readAll, type Booking } from "../lib/store";
import { clean, isEmail, json } from "../lib/http";
import { formatBerlin, isFreeSlot } from "../lib/slots";
import { notifyOwner, sendMail } from "../lib/mail";
import { COMPANY } from "../lib/config";

// Bucht einen Termin. Jeder Termin ist nur einmal buchbar.
export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const booking: Booking = {
    id: "",
    slot: clean(b.slot, 40),
    firstName: clean(b.firstName, 100),
    lastName: clean(b.lastName, 100),
    email: clean(b.email, 200),
    phone: clean(b.phone, 50),
    note: clean(b.note, 1000),
    createdAt: new Date().toISOString(),
  };
  if (!booking.firstName || !isEmail(booking.email)) return json({ error: "invalid" }, 400);

  const store = bookings();
  const booked = new Set((await readAll<Booking>(store)).map((x) => x.slot));
  if (!isFreeSlot(booking.slot, booked)) return json({ error: "taken" }, 409);
  booking.slot = new Date(booking.slot).toISOString();
  booking.id = booking.slot.replace(/[:.]/g, "-");

  const { modified } = await store.setJSON(booking.id, booking, { onlyIfNew: true });
  if (!modified) return json({ error: "taken" }, 409);

  const when = formatBerlin(booking.slot);
  const name = `${booking.firstName} ${booking.lastName}`.trim();
  await Promise.all([
    notifyOwner(
      `Neuer Termin: ${name} – ${when}`,
      `Termin: ${when}\nName: ${name}\nE-Mail: ${booking.email}\nTelefon: ${booking.phone}\nNachricht: ${booking.note}`,
      booking.email,
    ),
    sendMail(
      booking.email,
      `Ihr Termin bei ${COMPANY.name}: ${when}`,
      `Hallo ${booking.firstName},\n\nvielen Dank für Ihre Buchung. Ihr kostenloses Erstgespräch ist eingetragen für:\n\n${when}\n\nWir melden uns zum vereinbarten Zeitpunkt bei Ihnen. Falls Sie den Termin verschieben möchten, antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp: https://wa.me/4915207595260\n\nViele Grüße\n${COMPANY.name}`,
      COMPANY.email,
    ),
  ]);
  return json({ ok: true, slot: booking.slot });
};

export const config: Config = { path: "/api/book" };
