import type { Ctx } from "../../server/env";
import { db, newId } from "../../server/db";
import { clean, isEmail, json } from "../../server/http";
import { notifyOwner } from "../../server/mail";

// Nimmt alle Formulare der Website entgegen (E-Book, Newsletter, Bewerbung …)
const FORMS: Record<string, { title: string; required: string[] }> = {
  ebook: { title: "E-Book-Anfrage", required: ["first_name", "email"] },
  newsletter: { title: "Newsletter-Anmeldung", required: ["email"] },
  bewerbung: { title: "Bewerbung", required: ["first_name", "email"] },
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: { form?: string; page?: string; fields?: Record<string, unknown>; website?: string };
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

  await notifyOwner(
    env,
    `Neue ${form.title} über die Website`,
    Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nSeite: ${page}`,
    fields.email,
  );
  return json({ ok: true });
};
