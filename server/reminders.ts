import type { Env } from "./env";
import { db } from "./db";
import { mailConfigured, notifyOwner, sendMail, MAILBOX } from "./mail";
import { formatBerlin } from "./slots";
import { COMPANY } from "./config";

// Termin-Erinnerung (wie „Reminder“ im Video): ca. 24 Stunden vorher eine kurze E-Mail an den Kunden
// und eine Erinnerung an Pankaj. Läuft über .github/workflows/auto-emails.yml mehrmals täglich.
export const sendReminders = async (env: Env) => {
  if (!mailConfigured(env)) return { reminders: 0 }; // erst erinnern, wenn E-Mails wirklich rausgehen
  const database = await db(env);
  try {
    await database.prepare("ALTER TABLE bookings ADD COLUMN reminded TEXT DEFAULT ''").run();
  } catch {
    // Spalte gibt es schon
  }
  const now = Date.now();
  const { results } = await database
    .prepare("SELECT * FROM bookings WHERE slot > ? AND slot <= ? AND (reminded IS NULL OR reminded = '')")
    .bind(new Date(now).toISOString(), new Date(now + 30 * 3600_000).toISOString())
    .all<{ id: string; slot: string; first_name: string; last_name: string; email: string; phone: string; note: string }>();

  let sent = 0;
  for (const b of results) {
    const when = formatBerlin(b.slot);
    await sendMail(
      env,
      b.email,
      `Erinnerung: Ihr Termin bei ${COMPANY.name} – ${when}`,
      `Hallo ${b.first_name},\n\nkurze Erinnerung an unser kostenloses Erstgespräch:\n\n${when}\n\nWir melden uns zum vereinbarten Zeitpunkt. Falls etwas dazwischenkommt, antworten Sie einfach auf diese E-Mail oder schreiben Sie per WhatsApp: https://wa.me/4915207595260\n\nBis morgen!\nPankaj Mondjal\n${COMPANY.name}`,
      MAILBOX,
    );
    await notifyOwner(env, `Morgen: Erstgespräch mit ${b.first_name} ${b.last_name}`, `Termin: ${when}\nTelefon: ${b.phone || "–"}\nE-Mail: ${b.email}\nNachricht: ${b.note || "–"}`);
    await database.prepare("UPDATE bookings SET reminded = ? WHERE id = ?").bind(new Date().toISOString(), b.id).run();
    sent++;
  }
  return { reminders: sent };
};
