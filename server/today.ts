import type { Env } from "./env";
import { db } from "./db";

// Morgen-Briefing für den Admin-Reiter „Heute“ (wie „marketing status --today“):
// was die Automatik gemacht hat und was auf Pankaj wartet.
export const todayStatus = async (env: Env) => {
  const database = await db(env);
  const day = new Date(Date.now() - 24 * 3600_000).toISOString();
  const week = new Date(Date.now() - 7 * 86400_000).toISOString();
  const now = new Date().toISOString();
  const n = async (sql: string, ...params: unknown[]) => {
    try {
      return (await database.prepare(sql).bind(...params).first<{ n: number }>())?.n ?? 0;
    } catch {
      return 0; // Tabelle gibt es noch nicht
    }
  };

  const stats = {
    reels_7d: await n("SELECT COUNT(*) n FROM social_log WHERE platform = 'instagram' AND created_at > ?", week),
    posts_7d: await n("SELECT COUNT(*) n FROM social_log WHERE platform IN ('facebook','youtube','linkedin') AND info NOT LIKE 'FEHLER%' AND created_at > ?", week),
    post_errors_7d: await n("SELECT COUNT(*) n FROM social_log WHERE info LIKE 'FEHLER%' AND created_at > ?", week),
    found_24h: await n("SELECT COUNT(*) n FROM prospects WHERE created_at > ?", day),
    ready_to_call: await n("SELECT COUNT(*) n FROM prospects WHERE status = 'neu' AND phone <> '' AND (next_call_at IS NULL OR next_call_at = '' OR next_call_at <= ?)", now),
    contacted_7d: await n("SELECT COUNT(*) n FROM prospects WHERE status <> 'neu' AND updated_at > ?", week),
    yes_7d: await n("SELECT COUNT(*) n FROM prospects WHERE status IN ('infos','termin','kunde') AND updated_at > ?", week),
    customers: await n("SELECT COUNT(*) n FROM prospects WHERE status = 'kunde'"),
    emails_running: await n("SELECT COUNT(*) n FROM email_flows WHERE status = 'aktiv'"),
    emails_sent_7d: await n("SELECT COUNT(*) n FROM email_flows WHERE step > 0 AND updated_at > ?", week),
    inquiries_7d: await n("SELECT COUNT(*) n FROM leads WHERE form IN ('kontakt','ebook') AND created_at > ?", week),
    bookings_upcoming: await n("SELECT COUNT(*) n FROM bookings WHERE slot > ?", now),
    chats_7d: await n("SELECT COUNT(*) n FROM chats WHERE updated_at > ?", week),
    articles_live: await n("SELECT COUNT(*) n FROM articles WHERE status = 'live'"),
  };

  // Was auf Pankaj wartet
  const waiting: { text: string; tab: string }[] = [];
  const drafts = await n("SELECT COUNT(*) n FROM articles WHERE status = 'entwurf'");
  if (drafts) waiting.push({ text: `${drafts} Magazin-Artikel warten auf deine Freigabe`, tab: "heute" });
  const answers = await n("SELECT COUNT(*) n FROM prospects WHERE status = 'antwort'");
  if (answers) waiting.push({ text: `${answers} Betriebe haben geantwortet – bitte zurückmelden`, tab: "akquise" });
  if (stats.ready_to_call) waiting.push({ text: `${stats.ready_to_call} Betriebe bereit zum Anrufen (Anruf-Modus, ca. ${Math.ceil(Math.min(stats.ready_to_call, 10) * 2)} Min.)`, tab: "akquise" });
  const applications = await n("SELECT COUNT(*) n FROM leads WHERE form = 'bewerbung' AND created_at > ?", new Date(Date.now() - 30 * 86400_000).toISOString());
  if (applications) waiting.push({ text: `${applications} Bewerbung(en) aus den letzten 30 Tagen ansehen`, tab: "leads" });
  if (stats.post_errors_7d) waiting.push({ text: `${stats.post_errors_7d} Posting-Fehler diese Woche – Claude fragen: „prüf mal Social“`, tab: "heute" });

  // Einrichtung, die noch fehlt
  const setup: string[] = [];
  if (!env.RESEND_API_KEY) setup.push("E-Mail-Versand (Resend) fehlt – ohne ihn gehen KEINE E-Mails raus");
  if (!env.INSTAGRAM_TOKEN || !env.INSTAGRAM_APP_SECRET) setup.push("Instagram-Schlüssel fehlen – DM-Agent, Kommentar→DM und Begrüßungsfragen sind aus");
  if (!env.WEBSITENOVA_API_KEY) setup.push("WebsiteNova (CRM) ist nicht verbunden");

  return { stats, waiting, setup };
};
