import { COMPANY } from "./config";
import type { Env } from "./env";
import { sendSmtp } from "./smtp";

// E-Mail-Versand – bevorzugt direkt über das eigene Postfach (Strato-SMTP, Passwort im Admin unter
// „Einstellungen“), sonst über Resend. Ohne beides wird nichts verschickt – die Daten sind trotzdem
// im Admin-Bereich gespeichert.
export type Attachment = { filename: string; content: string };

export const MAILBOX = "mondjal@ps-professional-solutions.de";
export const mailConfigured = (env: Env) => Boolean(env.SMTP_PASSWORD || env.RESEND_API_KEY);

/** Wirft bei Fehlern (für den Test-Knopf im Admin); sendMail fängt Fehler ab */
export const sendMailOrThrow = async (env: Env, to: string, subject: string, text: string, replyTo?: string, html?: string, attachments?: Attachment[]) => {
  if (env.SMTP_PASSWORD) {
    const user = env.SMTP_USER || MAILBOX;
    await sendSmtp(
      { host: env.SMTP_HOST || "smtp.strato.de", port: Number(env.SMTP_PORT || 465), user, pass: env.SMTP_PASSWORD.trim() },
      { from: `Pankaj Mondjal | ${COMPANY.name} <${user}>`, to, subject, text, html, replyTo, attachments },
    );
    return;
  }
  if (!env.RESEND_API_KEY) throw new Error("Kein E-Mail-Versand eingerichtet");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || `${COMPANY.name} <onboarding@resend.dev>`,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments?.length ? { attachments } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
};

export const sendMail = async (
  env: Env,
  to: string,
  subject: string,
  text: string,
  replyTo?: string,
  html?: string,
  attachments?: Attachment[],
) => {
  if (!mailConfigured(env) || !to) return;
  try {
    await sendMailOrThrow(env, to, subject, text, replyTo, html, attachments);
  } catch (err) {
    console.error("E-Mail", err);
  }
};

export const notifyOwner = (env: Env, subject: string, text: string, replyTo?: string, attachments?: Attachment[]) =>
  sendMail(env, env.NOTIFY_EMAIL || COMPANY.email, subject, text, replyTo, undefined, attachments);
