import type { Ctx } from "../../server/env";
import { db } from "../../server/db";
import { isAdmin, json } from "../../server/http";

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
