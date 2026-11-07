import type { Ctx } from "../../server/env";
import { db } from "../../server/db";
import { isAdmin, json } from "../../server/http";
import { CONFIG_KEYS, loadConfig, saveConfig, type ConfigKey } from "../../server/runtimeConfig";
import { calendarKey } from "../../server/calendar";

// Admin-Bereich: /api/admin?type=leads|bookings|chats  (GET = anzeigen, DELETE = löschen)
const QUERIES = {
  leads: "SELECT id, form, fields, page, created_at AS createdAt FROM leads ORDER BY created_at DESC",
  bookings:
    "SELECT id, slot, first_name AS firstName, last_name AS lastName, email, phone, note, created_at AS createdAt FROM bookings ORDER BY slot",
  chats: "SELECT id, page, messages, created_at AS createdAt, updated_at AS updatedAt FROM chats ORDER BY created_at DESC",
};
type Table = keyof typeof QUERIES;

export const onRequest = async ({ request, env }: Ctx) => {
  if (!isAdmin(request, env)) return json({ error: "unauthorized" }, 401);
  const url = new URL(request.url);
  const type = url.searchParams.get("type") as Table;

  // Reiter „Social-Media“: Zugangsschlüssel eintragen (Werte werden nie zurückgegeben, nur ob sie gesetzt sind)
  if ((type as string) === "config") {
    if (request.method === "POST") {
      const body = await request.json<{ name?: string; value?: string }>().catch(() => ({}) as { name?: string; value?: string });
      if (!CONFIG_KEYS.includes(body.name as ConfigKey)) return json({ error: "bad_request" }, 400);
      await saveConfig(env, body.name as ConfigKey, String(body.value || "").trim().slice(0, 4000));
    }
    const fromDb = await (await db(env)).prepare("SELECT key FROM settings WHERE key LIKE 'cfg:%'").all<{ key: string }>();
    const saved = new Set(fromDb.results.map((r) => r.key.slice(4)));
    await loadConfig(env, true);
    return json({ items: CONFIG_KEYS.map((name) => ({ id: name, name, set: Boolean(env[name]), inAdmin: saved.has(name) })) });
  }
  // Abo-Adresse für Apple Kalender & Co.
  if ((type as string) === "calendar") {
    const link = `${url.host}/api/calendar?key=${await calendarKey(env)}`;
    return json({ items: [], https: `https://${link}`, webcal: `webcal://${link}` });
  }
  if (!(type in QUERIES)) return json({ error: "bad_request" }, 400);
  const database = await db(env);

  if (request.method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) return json({ error: "bad_request" }, 400);
    await database.prepare(`DELETE FROM ${type} WHERE id = ?`).bind(id).run();
    return json({ ok: true });
  }
  if (request.method !== "GET") return json({ error: "method" }, 405);

  const { results } = await database.prepare(QUERIES[type]).all<Record<string, string>>();
  const items = results.map((r) => ({
    ...r,
    ...(r.fields ? { fields: JSON.parse(r.fields) } : {}),
    ...(r.messages ? { messages: JSON.parse(r.messages) } : {}),
  }));
  return json({ items });
};
