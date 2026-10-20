import { COMPANY } from "./config";

// Optionaler E-Mail-Versand über Resend (resend.com). Ohne RESEND_API_KEY wird nichts
// verschickt – die Daten sind trotzdem im Admin-Bereich gespeichert.
export const sendMail = async (to: string, subject: string, text: string, replyTo?: string) => {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return;
  const from = process.env.MAIL_FROM || `${COMPANY.name} <onboarding@resend.dev>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) console.error("Resend", res.status, await res.text());
  } catch (err) {
    console.error("Resend", err);
  }
};

export const notifyOwner = (subject: string, text: string, replyTo?: string) =>
  sendMail(process.env.NOTIFY_EMAIL || COMPANY.email, subject, text, replyTo);
