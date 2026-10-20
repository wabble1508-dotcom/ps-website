import type { Config } from "@netlify/functions";
import { bookings, chats, leads, readAll } from "../lib/store";
import { isAdmin, json } from "../lib/http";

// Admin-Bereich: /api/admin?type=leads|bookings|chats  (GET = anzeigen, DELETE = löschen)
const STORES = { leads, bookings, chats };

export default async (req: Request) => {
  if (!isAdmin(req)) return json({ error: "unauthorized" }, 401);
  const url = new URL(req.url);
  const type = url.searchParams.get("type") as keyof typeof STORES;
  const store = STORES[type]?.();
  if (!store) return json({ error: "bad_request" }, 400);

  if (req.method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) return json({ error: "bad_request" }, 400);
    await store.delete(id);
    return json({ ok: true });
  }
  const items = await readAll<{ id: string; createdAt: string }>(store);
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return json({ items });
};

export const config: Config = { path: "/api/admin" };
