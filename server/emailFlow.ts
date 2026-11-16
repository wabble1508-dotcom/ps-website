import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";
import { db } from "./db";
import { mailConfigured, MAILBOX, sendMail } from "./mail";
import { pushToCrm } from "./crm";
import { COMPANY } from "./config";
import { SYSTEM_PROMPT } from "./prompt";

// Automatische E-Mail-Strecken – NUR an Menschen, die sich selbst gemeldet oder zugestimmt haben
// (Kontaktformular/E-Book oder „Ja, will Infos“ in der Akquise). Kalte E-Mails an Betriebe ohne
// Zustimmung gibt es nicht (§ 7 Abs. 2 UWG). Jede E-Mail hat einen Abmelde-Link.
// Versand: GitHub Actions ruft /api/prospects?action=daily-cron&step=emails mehrmals täglich auf.

export type FlowKind = "anfrage" | "akquise";

// Tage nach dem Start, an denen die jeweilige E-Mail rausgeht
const PLAN: Record<FlowKind, { day: number; goal: string }[]> = {
  anfrage: [
    { day: 2, goal: "Nachfassen zur Anfrage: kurz an die Anfrage erinnern, 2–3 passende Beispiele/Nutzen für die Branche nennen, zum kostenlosen Erstgespräch einladen (Link zur Terminbuchung)." },
    { day: 6, goal: "Freundliches zweites Nachfassen: eine konkrete Frage stellen (z. B. was ihm am wichtigsten ist), Erstgespräch anbieten." },
    { day: 14, goal: "Letzte kurze E-Mail: Angebot bleibt bestehen, keine weiteren E-Mails mehr, Tür offen lassen." },
  ],
  akquise: [
    { day: 0, goal: "Erste E-Mail nach dem Telefonat, in dem der Betrieb Infos erbeten hat: Bezug auf das Gespräch, 2–3 Beispiele/Nutzen für seine Branche, Preise ab 49 €/Monat mit 0 € Einrichtung, Link zur Terminbuchung." },
    { day: 3, goal: "Nachfassen: Ob die Infos angekommen sind, eine einfache Frage, kostenloses Erstgespräch anbieten." },
    { day: 8, goal: "Letzte kurze E-Mail: Angebot bleibt bestehen, keine weiteren E-Mails mehr, Tür offen lassen." },
  ],
};

const BOOKING_URL = "https://ps-professional-solutions.de/analyse-bestaetigungen";

type Flow = {
  id: string;
  kind: FlowKind;
  email: string;
  name: string;
  company: string;
  context: string;
  crm_ref: string;
  step: number;
  next_at: string;
  status: string;
  created_at: string;
};

const table = async (env: Env) => {
  const database = await db(env);
  await database
    .prepare(
      "CREATE TABLE IF NOT EXISTS email_flows (id TEXT PRIMARY KEY, kind TEXT, email TEXT, name TEXT, company TEXT, context TEXT, crm_ref TEXT, step INTEGER, next_at TEXT, status TEXT, created_at TEXT, updated_at TEXT)",
    )
    .run();
  return database;
};

const addDays = (from: string, days: number) => new Date(Date.parse(from) + days * 86400_000).toISOString();

/** Strecke starten (bzw. neu starten, wenn sie beendet war). Doppelte Strecken pro Adresse und Art gibt es nicht. */
export const startFlow = async (env: Env, f: { kind: FlowKind; email: string; name?: string; company?: string; context?: string; crmRef?: string }) => {
  const email = f.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
  const now = new Date().toISOString();
  await (await table(env))
    .prepare(
      `INSERT INTO email_flows (id, kind, email, name, company, context, crm_ref, step, next_at, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, 'aktiv', ?, ?)
       ON CONFLICT(id) DO UPDATE SET context = excluded.context, updated_at = excluded.updated_at`,
    )
    .bind(`${f.kind}:${email}`, f.kind, email, f.name || "", f.company || "", (f.context || "").slice(0, 3000), f.crmRef || "", addDays(now, PLAN[f.kind][0].day), now, now)
    .run();
};

/** Alle Strecken an diese Adresse beenden (Termin gebucht, Antwort, Abmeldung …) */
export const stopFlows = async (env: Env, email: string, reason: string) => {
  await (await table(env))
    .prepare("UPDATE email_flows SET status = ?, updated_at = ? WHERE email = ? AND status = 'aktiv'")
    .bind(`gestoppt: ${reason}`.slice(0, 80), new Date().toISOString(), email.trim().toLowerCase())
    .run();
};

export const flowFor = async (env: Env, email: string) =>
  email ? (await table(env)).prepare("SELECT * FROM email_flows WHERE email = ? ORDER BY updated_at DESC LIMIT 1").bind(email.trim().toLowerCase()).first<Flow>() : null;

// Abmelde-Link: HMAC über die Strecken-ID mit dem Admin-Passwort als Schlüssel
const sign = async (env: Env, id: string) => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(`stop:${env.ADMIN_PASSWORD}`), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(id)));
  return [...sig.slice(0, 16)].map((b) => b.toString(16).padStart(2, "0")).join("");
};
export const stopLink = async (env: Env, id: string) =>
  `https://ps-professional-solutions.de/api/email-stop?id=${encodeURIComponent(id)}&sig=${await sign(env, id)}`;
export const verifyStop = async (env: Env, id: string, sig: string) => sig === (await sign(env, id));

const MAIL_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["subject", "body"],
  properties: { subject: { type: "string" }, body: { type: "string" } },
};

const writeMail = async (env: Env, flow: Flow, goal: string) => {
  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.beta.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 3000,
    output_config: { effort: "low", format: { type: "json_schema", schema: MAIL_SCHEMA } },
    system: `${SYSTEM_PROMPT}

Du schreibst jetzt als Pankaj Mondjal eine persönliche E-Mail an jemanden, der sich bei PS Professional Solutions gemeldet bzw. Infos erbeten hat.
- Sie-Form, kurz (max. 110 Wörter), warm, kein Verkaufsdruck, kein Markdown, keine erfundenen Referenzen oder Zahlen.
- Link zur Terminbuchung: ${BOOKING_URL}
- Schluss: „Viele Grüße\\nPankaj Mondjal\\nPS Professional Solutions\\n+49 1520 7595260 · ps-professional-solutions.de“
- Kein Abmelde-Hinweis (wird automatisch angehängt).`,
    messages: [
      {
        role: "user",
        content: `Ziel dieser E-Mail: ${goal}\nE-Mail ${flow.step + 1} von ${PLAN[flow.kind].length}.\nName: ${flow.name || "–"}\nBetrieb: ${flow.company || "–"}\nBisher bekannt: ${flow.context || "–"}`,
      },
    ],
  });
  if (response.stop_reason === "refusal") throw new Error("refusal");
  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  return JSON.parse(text) as { subject: string; body: string };
};

/** Fällige E-Mails verschicken (max. 15 pro Aufruf, damit es unter Cloudflares Zeitgrenze bleibt) */
export const sendDueMails = async (env: Env) => {
  if (!mailConfigured(env)) return { sent: 0, error: "Kein E-Mail-Versand eingerichtet (Postfach-Passwort im Admin eintragen)" };
  const database = await table(env);
  const now = new Date().toISOString();
  const { results } = await database
    .prepare("SELECT * FROM email_flows WHERE status = 'aktiv' AND next_at <= ? ORDER BY next_at LIMIT 15")
    .bind(now)
    .all<Flow>();

  const outcome = await Promise.allSettled(
    results.map(async (flow) => {
      // Hat die Person inzwischen einen Termin gebucht? Dann nicht mehr nachfassen.
      const booked = await database.prepare("SELECT 1 FROM bookings WHERE lower(email) = ? AND created_at > ?").bind(flow.email, flow.created_at).first();
      if (booked) {
        await stopFlows(env, flow.email, "Termin gebucht");
        return false;
      }
      const plan = PLAN[flow.kind];
      const mail = await writeMail(env, flow, plan[flow.step].goal);
      const link = await stopLink(env, flow.id);
      await sendMail(
        env,
        flow.email,
        mail.subject,
        `${mail.body}\n\n—\nSie möchten keine weiteren E-Mails? Ein Klick genügt: ${link}\n${COMPANY.name} · Lindenhorster Str. 185 · 44339 Dortmund`,
        // Antworten landen direkt in Pankajs Postfach
        MAILBOX,
      );
      const next = flow.step + 1;
      await database
        .prepare("UPDATE email_flows SET step = ?, next_at = ?, status = ?, updated_at = ? WHERE id = ?")
        .bind(next, next < plan.length ? addDays(flow.created_at, plan[next].day) : now, next < plan.length ? "aktiv" : "fertig", now, flow.id)
        .run();
      if (flow.crm_ref) {
        await pushToCrm(env, {
          external_ref: flow.crm_ref,
          company_name: flow.company || flow.name || flow.email,
          email: flow.email,
          entry: `Automatische E-Mail ${flow.step + 1}/${plan.length} gesendet – „${mail.subject}“\n\n${mail.body}`,
        });
      }
      return true;
    }),
  );
  outcome.forEach((r, i) => r.status === "rejected" && console.error("E-Mail-Strecke", results[i].id, r.reason));
  return { sent: outcome.filter((r) => r.status === "fulfilled" && r.value).length, due: results.length };
};
