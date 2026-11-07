import { COMPANY } from "./config";
import type { Env } from "./env";

// Optionaler E-Mail-Versand über Resend (resend.com). Ohne RESEND_API_KEY wird nichts
// verschickt – die Daten sind trotzdem im Admin-Bereich gespeichert.
export type Attachment = { filename: string; content: string };

export const sendMail = async (
  env: Env,
  to: string,
  subject: string,
  text: string,
  replyTo?: string,
  html?: string,
  attachments?: Attachment[],
) => {
  if (!env.RESEND_API_KEY || !to) return;
  const from = env.MAIL_FROM || `${COMPANY.name} <onboarding@resend.dev>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        ...(html ? { html } : {}),
        ...(replyTo ? { reply_to: replyTo } : {}),
        // Anhänge (z. B. Kalendereintrag) als Base64
        ...(attachments?.length ? { attachments } : {}),
      }),
    });
    if (!res.ok) console.error("Resend", res.status, await res.text());
  } catch (err) {
    console.error("Resend", err);
  }
};

export const notifyOwner = (env: Env, subject: string, text: string, replyTo?: string, attachments?: Attachment[]) =>
  sendMail(env, env.NOTIFY_EMAIL || COMPANY.email, subject, text, replyTo, undefined, attachments);
