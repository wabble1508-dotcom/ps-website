import { COMPANY } from "./config";
import type { Env } from "./env";

// Optionaler E-Mail-Versand über Resend (resend.com). Ohne RESEND_API_KEY wird nichts
// verschickt – die Daten sind trotzdem im Admin-Bereich gespeichert.
export const sendMail = async (env: Env, to: string, subject: string, text: string, replyTo?: string) => {
  if (!env.RESEND_API_KEY || !to) return;
  const from = env.MAIL_FROM || `${COMPANY.name} <onboarding@resend.dev>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) console.error("Resend", res.status, await res.text());
  } catch (err) {
    console.error("Resend", err);
  }
};

export const notifyOwner = (env: Env, subject: string, text: string, replyTo?: string) =>
  sendMail(env, env.NOTIFY_EMAIL || COMPANY.email, subject, text, replyTo);
