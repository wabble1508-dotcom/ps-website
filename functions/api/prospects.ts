import type { Ctx } from "../../server/env";
import { isAdmin, json } from "../../server/http";
import { SYSTEM_PROMPT } from "../../server/prompt";
import { CATEGORIES, deleteProspect, getProspect, listProspects, searchProspects, updateProspect, writeMessages } from "../../server/prospects";

// Akquise im Admin-Bereich (Reiter „Akquise“) – nur mit Admin-Passwort.
// GET                         → Liste + Branchen
// POST {action:"search", category, city, onlyWithoutWebsite}
// POST {action:"update", id, status?, note?, phone?, email?, instagram?}
// POST {action:"write", id}   → KI schreibt WhatsApp-/Instagram-/E-Mail-Text
// DELETE ?id=…
export const onRequest = async ({ request, env }: Ctx) => {
  if (!isAdmin(request, env)) return json({ error: "unauthorized" }, 401);
  try {
    if (request.method === "GET") {
      return json({ items: await listProspects(env), categories: Object.fromEntries(Object.entries(CATEGORIES).map(([k, v]) => [k, v.label])) });
    }
    if (request.method === "DELETE") {
      const id = new URL(request.url).searchParams.get("id");
      if (id) await deleteProspect(env, id);
      return json({ ok: true });
    }
    if (request.method !== "POST") return json({ error: "method" }, 405);
    const body = await request.json<Record<string, unknown>>();
    const s = (v: unknown) => (typeof v === "string" ? v : undefined);
    switch (body.action) {
      case "search":
        return json(await searchProspects(env, String(body.category || ""), String(body.city || "Dortmund"), Boolean(body.onlyWithoutWebsite)));
      case "update":
        await updateProspect(env, String(body.id || ""), { status: s(body.status) as never, note: s(body.note), phone: s(body.phone), email: s(body.email), instagram: s(body.instagram) });
        return json({ ok: true });
      case "write": {
        const p = await getProspect(env, String(body.id || ""));
        if (!p) return json({ error: "nicht gefunden" }, 404);
        return json({ messages: await writeMessages(env, p, SYSTEM_PROMPT) });
      }
      default:
        return json({ error: "unbekannte action" }, 400);
    }
  } catch (err) {
    console.error("prospects", err);
    return json({ error: err instanceof Error ? err.message : "server" }, 500);
  }
};
