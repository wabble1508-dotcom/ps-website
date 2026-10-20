import type { Config } from "@netlify/functions";
import { leads, newId, type Lead } from "../lib/store";
import { clean, isEmail, json } from "../lib/http";
import { notifyOwner } from "../lib/mail";

// Nimmt alle Formulare der Website entgegen (E-Book, Newsletter, Bewerbung …)
const FORMS: Record<string, { title: string; required: string[] }> = {
  ebook: { title: "E-Book-Anfrage", required: ["first_name", "email"] },
  newsletter: { title: "Newsletter-Anmeldung", required: ["email"] },
  bewerbung: { title: "Bewerbung", required: ["first_name", "email"] },
};

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let body: { form?: string; page?: string; fields?: Record<string, unknown>; website?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (body.website) return json({ ok: true }); // Spam-Falle (unsichtbares Feld)

  const form = FORMS[clean(body.form, 50)];
  if (!form) return json({ error: "unknown_form" }, 400);

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields || {}).slice(0, 20)) fields[clean(k, 50)] = clean(v);
  if (form.required.some((k) => !fields[k]) || (fields.email && !isEmail(fields.email))) {
    return json({ error: "invalid" }, 400);
  }

  const lead: Lead = { id: newId(), form: clean(body.form, 50), fields, page: clean(body.page, 200), createdAt: new Date().toISOString() };
  await leads().setJSON(lead.id, lead);

  await notifyOwner(
    `Neue ${form.title} über die Website`,
    Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nSeite: ${lead.page}`,
    fields.email,
  );
  return json({ ok: true });
};

export const config: Config = { path: "/api/forms" };
