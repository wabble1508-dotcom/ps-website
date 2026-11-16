import type { Ctx } from "../../server/env";
import { db, newId } from "../../server/db";
import { clean, isEmail, json } from "../../server/http";
import { notifyOwner, sendMail } from "../../server/mail";
import { autoReply, TOPICS } from "../../server/autoReply";
import { COMPANY } from "../../server/config";
import { pushToCrm } from "../../server/crm";
import { startFlow } from "../../server/emailFlow";

// Nimmt alle Formulare der Website entgegen (Kontakt, E-Book, Newsletter, Bewerbung …)
const FORMS: Record<string, { title: string; required: string[] }> = {
  kontakt: { title: "Kontaktanfrage", required: ["first_name", "email", "topic"] },
  ebook: { title: "E-Book-Anfrage", required: ["first_name", "email"] },
  newsletter: { title: "Newsletter-Anmeldung", required: ["email"] },
  bewerbung: { title: "Bewerbung", required: ["first_name", "email"] },
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: { form?: string; page?: string; language?: string; fields?: Record<string, unknown>; website?: string };
  // Einfaches HTML-Formular (ohne JavaScript): danach zur Terminbuchung weiterleiten
  const isHtmlForm = (request.headers.get("content-type") || "").includes("application/x-www-form-urlencoded");
  try {
    if (isHtmlForm) {
      const data = Object.fromEntries((await request.formData()).entries()) as Record<string, string>;
      const { form, website, ...fields } = data;
      body = { form, website, fields, page: new URL(request.headers.get("referer") || "/", request.url).pathname, language: "de" };
    } else {
      body = await request.json();
    }
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
  // Interessenten automatisch ins CRM (WebsiteNova) – Bewerbungen und Newsletter nicht
  if (formName === "kontakt" || formName === "ebook") {
    const person = fields.name || [fields.first_name, fields.last_name].filter(Boolean).join(" ");
    await pushToCrm(env, {
      external_ref: `ps-email:${fields.email.toLowerCase()}`,
      company_name: fields.company || person || fields.email,
      contact_name: person || undefined,
      email: fields.email,
      phone: fields.phone,
      website: fields.website_url || fields.url,
      source: formName === "kontakt" ? "Website-Kontaktformular" : "Website (E-Book)",
      stage: "Neu",
      entry: `${form.title}${topicLabel ? ` – ${topicLabel}` : ""} auf ${page || "der Website"}:\n${Object.entries(fields)
        .filter(([k]) => !["first_name", "last_name", "email"].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")}`,
    });
    // Automatisches Nachfassen per E-Mail (die Person hat sich selbst gemeldet)
    await startFlow(env, {
      kind: "anfrage",
      email: fields.email,
      name: person,
      company: fields.company,
      context: `${form.title}${topicLabel ? ` zum Thema ${topicLabel}` : ""}. ${fields.message || fields.nachricht || ""}`,
      crmRef: `ps-email:${fields.email.toLowerCase()}`,
    });
  }
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
  if (isHtmlForm) return Response.redirect(new URL("/analyse-bestaetigungen", request.url).toString(), 303);
  return json({ ok: true });
};
