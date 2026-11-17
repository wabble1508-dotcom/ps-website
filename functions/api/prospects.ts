import type { Ctx } from "../../server/env";
import { isAdmin, json } from "../../server/http";
import { SYSTEM_PROMPT } from "../../server/prompt";
import { notifyOwner } from "../../server/mail";
import { CATEGORIES, callResult, dailyStep, deleteProspect, handleFlowForStatus, getProspect, listProspects, markContacted, searchProspects, syncProspect, updateProspect, writeMessages } from "../../server/prospects";
import { crmEnabled } from "../../server/crm";

// Akquise im Admin-Bereich (Reiter „Akquise“) – nur mit Admin-Passwort.
// GET                         → Liste + Branchen
// POST {action:"search", category, city, onlyWithoutWebsite}
// POST {action:"update", id, status?, note?, phone?, email?, instagram?}
// POST {action:"write", id}   → KI schreibt WhatsApp-/Instagram-/E-Mail-Text
// POST {action:"contacted", id, channel, text} → als angeschrieben markieren + Text in den CRM-Verlauf
// DELETE ?id=…
export const onRequest = async ({ request, env }: Ctx) => {
  // Tagesliste per Zeitplan (GitHub Actions): ?action=daily-cron&step=search|write|mail – ohne Passwort,
  // jeder Schritt tut nur etwas, wenn es nötig ist, und gibt nur Zahlen zurück
  const url = new URL(request.url);
  if (request.method === "GET" && url.searchParams.get("action") === "daily-cron") {
    try {
      return json({ ok: true, ...(await dailyStep(env, url.searchParams.get("step") || "", SYSTEM_PROMPT, (subject, text) => notifyOwner(env, subject, text))) });
    } catch (err) {
      console.error("daily-cron", err);
      return json({ error: err instanceof Error ? err.message : "server" }, 500);
    }
  }
  if (!(await isAdmin(request, env))) return json({ error: "unauthorized" }, 401);
  try {
    if (request.method === "GET") {
      return json({
        items: await listProspects(env),
        categories: Object.fromEntries(Object.entries(CATEGORIES).map(([k, v]) => [k, v.label])),
        crm: crmEnabled(env),
      });
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
      case "update": {
        const id = String(body.id || "");
        await updateProspect(env, id, { status: s(body.status) as never, note: s(body.note), phone: s(body.phone), email: s(body.email), instagram: s(body.instagram) });
        // Statuswechsel sofort ins CRM (WebsiteNova); Kontaktdaten/Notizen werden beim nächsten Statuswechsel mitgenommen
        const crm = s(body.status) ? await syncProspect(env, id) : null;
        const warning = s(body.status) || s(body.email) ? await handleFlowForStatus(env, id) : null;
        return json({ ok: true, crm: Boolean(crm), warning });
      }
      case "call-result":
        return json(await callResult(env, String(body.id || ""), String(body.result || ""), s(body.email), s(body.note)));
      case "contacted": {
        const crm = await markContacted(env, String(body.id || ""), String(body.channel || ""), String(body.text || ""));
        return json({ ok: true, crm: Boolean(crm) });
      }
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
