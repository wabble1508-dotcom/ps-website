import type { Ctx } from "../../server/env";
import { db, newId } from "../../server/db";
import { clean, isEmail, json } from "../../server/http";
import { notifyOwner, sendMail } from "../../server/mail";
import { autoReply, TOPICS } from "../../server/autoReply";
import { COMPANY } from "../../server/config";

// Nimmt alle Formulare der Website entgegen (Kontakt, E-Book, Newsletter, Bewerbung …)
const FORMS: Record<string, { title: string; required: string[] }> = {
  kontakt: { title: "Kontaktanfrage", required: ["first_name", "email", "topic"] },
  ebook: { title: "E-Book-Anfrage", required: ["first_name", "email"] },
  newsletter: { title: "Newsletter-Anmeldung", required: ["email"] },
  bewerbung: { title: "Bewerbung", required: ["first_name", "email"] },
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: { form?: string; page?: string; language?: string; fields?: Record<string, unknown>; website?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (body.website) return json({ ok: true }); // Spam-Falle (unsichtbares Feld)

  const formName = clean(body.form, 50);
  const form = FORMS[formName];
  if (!form) return json({ error: "unknown_form" }, 400);

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields || {}).slice(0, 20)) fields[clean(k, 50)] = clean(v);
  if (form.required.some((k) => !fields[k]) || (fields.email && !isEmail(fields.email))) {
    return json({ error: "invalid" }, 400);
  }

  const page = clean(body.page, 200);
  await (await db(env))
    .prepare("INSERT INTO leads (id, form, fields, page, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(newId(), formName, JSON.stringify(fields), page, new Date().toISOString())
    .run();

  const topicLabel = formName === "kontakt" ? (TOPICS[fields.topic] || TOPICS.sonstiges).label.de : "";
  await notifyOwner(
    env,
    `Neue ${form.title}${topicLabel ? ` (${topicLabel})` : ""} über die Website`,
    Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nSeite: ${page}`,
    fields.email,
  );

  // Kunde bekommt sofort eine passende Bestätigung zu seinem Anliegen. Gegen Missbrauch
  // (fremde Adressen zumüllen): höchstens 3 automatische Mails pro Adresse und Tag, Name gekürzt
  // und ohne Links, die freie Nachricht wird nicht mitgeschickt.
  if (formName === "kontakt") {
    const since = new Date(Date.now() - 86400_000).toISOString();
    const recent = await (await db(env))
      .prepare("SELECT COUNT(*) AS n FROM leads WHERE form = 'kontakt' AND created_at > ? AND fields LIKE ?")
      .bind(since, `%"email":${JSON.stringify(fields.email).replace(/[%_]/g, "")}%`)
      .first<{ n: number }>();
    if ((recent?.n || 0) <= 3) {
      const name = fields.first_name.replace(/https?:\/\/\S+|www\.\S+/gi, "").slice(0, 40).trim();
      const mail = autoReply(fields.topic, clean(body.language, 5), name);
      await sendMail(env, fields.email, mail.subject, mail.text, COMPANY.email, mail.html);
    }
  }
  return json({ ok: true });
};
