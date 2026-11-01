import Anthropic from "@anthropic-ai/sdk";
import type { Ctx, Env } from "../../server/env";
import { json } from "../../server/http";
import { SYSTEM_PROMPT } from "../../server/prompt";
import { COMMENT_KEYWORDS } from "../../server/socialConfig";
import { setupIceBreakers } from "../../server/instagramBot";

// KI-Texter für Make.com: schreibt aus einem Thema fertige Texte für alle Kanäle
// und plant ganze Content-Wochen. Aufruf nur mit dem Header  x-make-secret: <MAKE_SECRET>.
//
// POST /api/social-ai  { "action": "captions", "topic": "...", "details": "...", "format": "reel", "link": "..." }
// POST /api/social-ai  { "action": "plan", "days": 7, "focus": "..." }
// POST /api/social-ai  { "action": "setup-icebreakers" }

const KEYWORDS = COMMENT_KEYWORDS.map((k) => k.words[0].toUpperCase()).join(", ");

const MARKETING_RULES = `
Du bist jetzt der Social-Media-Texter von PS Professional Solutions (Kanäle: Instagram ps_professional_solutions,
TikTok @psprofessional.solutions, YouTube @psprofessionalsolutions, Facebook, LinkedIn).
Zielgruppe: kleine und mittlere Unternehmen in Dortmund, im Ruhrgebiet und deutschlandweit (Friseure, Handwerker, Praxen, Gastro, Vereine …).
Regeln:
- Starker Hook in der ersten Zeile (Frage, Zahl, Problem). Danach Nutzen statt Technik, kurze Absätze, passende Emojis (nicht übertreiben).
- Jeder Text endet mit einem klaren Call-to-Action.
- Instagram und Facebook: „Kommentiere <STICHWORT> und ich schick dir die Infos per DM 📩“. Erlaubte Stichwörter: ${KEYWORDS}. Wähle das passendste.
- TikTok: sehr kurz, locker, 3–5 Hashtags.
- LinkedIn: seriös, Mehrwert, Sie-Form, Link zur Website am Ende, 3 Hashtags, kein Kommentar-Stichwort.
- YouTube Shorts: Titel max. 90 Zeichen inkl. #shorts, Beschreibung mit Link.
- Nur Preise und Leistungen nennen, die oben stehen. Keine Garantien („Platz 1 bei Google“) und keine erfundenen Kundenzahlen.
- Sprache: Deutsch.`;

const CAPTIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["keyword", "instagram", "facebook", "tiktok", "linkedin", "youtube_title", "youtube_description", "hashtags", "first_comment", "video_script", "image_text"],
  properties: {
    keyword: { type: "string", description: "Kommentar-Stichwort, z. B. WEBSITE" },
    instagram: { type: "string", description: "Instagram-Beschreibung inkl. Hashtags am Ende" },
    facebook: { type: "string" },
    tiktok: { type: "string" },
    linkedin: { type: "string" },
    youtube_title: { type: "string" },
    youtube_description: { type: "string" },
    hashtags: { type: "array", items: { type: "string" } },
    first_comment: { type: "string", description: "Erster eigener Kommentar unter dem Beitrag" },
    video_script: { type: "string", description: "Kurzes Skript für ein 20–40-Sekunden-Video: Hook, 3 Punkte, CTA" },
    image_text: { type: "string", description: "Max. 8 Wörter Text fürs Bild/Thumbnail" },
  },
};

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["posts"],
  properties: {
    posts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["day", "time", "format", "topic", "details", "hook"],
        properties: {
          day: { type: "integer", description: "1 = morgen, 2 = übermorgen …" },
          time: { type: "string", description: "Uhrzeit HH:MM (Europe/Berlin), gute Posting-Zeit" },
          format: { type: "string", enum: ["reel", "karussell", "bild", "story"] },
          topic: { type: "string" },
          details: { type: "string", description: "Was im Beitrag gezeigt/erklärt wird" },
          hook: { type: "string" },
        },
      },
    },
  },
};

const isMake = (req: Request, env: Env) => {
  const expected = env.MAKE_SECRET || "";
  const given = req.headers.get("x-make-secret") || "";
  if (!expected || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
};

const generate = async (env: Env, prompt: string, schema: Record<string, unknown>) => {
  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: { type: "json_schema", schema } },
    system: `${SYSTEM_PROMPT}\n${MARKETING_RULES}`,
    messages: [{ role: "user", content: prompt }],
  });
  if (response.stop_reason === "refusal") throw new Error("refusal");
  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  return JSON.parse(text) as Record<string, unknown>;
};

const str = (v: unknown, max = 3000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!isMake(request, env)) return json({ error: "unauthorized" }, 401);
  let body: Record<string, unknown>;
  try {
    body = await request.json<Record<string, unknown>>();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  try {
    switch (body.action) {
      case "captions": {
        const topic = str(body.topic, 500);
        if (!topic) return json({ error: "topic fehlt" }, 400);
        const prompt = [
          `Schreibe die Texte für einen neuen Beitrag.`,
          `Thema: ${topic}`,
          str(body.details) && `Details: ${str(body.details)}`,
          str(body.format, 40) && `Format: ${str(body.format, 40)}`,
          str(body.link, 300) && `Link: ${str(body.link, 300)}`,
        ]
          .filter(Boolean)
          .join("\n");
        return json(await generate(env, prompt, CAPTIONS_SCHEMA));
      }
      case "plan": {
        const days = Math.min(Math.max(Number(body.days) || 7, 1), 31);
        const prompt = `Plane Social-Media-Beiträge für die nächsten ${days} Tage, einen pro Tag. Mische Formate (vor allem Reels), Branchen und Themen:
Tipps für Selbstständige, Vorher/Nachher von Websites, KI im Alltag von Betrieben, Einblicke hinter die Kulissen, Preise/Angebote, Kundenfragen.
${str(body.focus, 500) ? `Schwerpunkt: ${str(body.focus, 500)}` : ""}`;
        return json(await generate(env, prompt, PLAN_SCHEMA));
      }
      case "setup-icebreakers":
        return json({ ok: true, result: await setupIceBreakers(env) });
      default:
        return json({ error: "unbekannte action" }, 400);
    }
  } catch (err) {
    console.error("social-ai", err);
    if (err instanceof Anthropic.APIError) return json({ error: "ki", status: err.status }, 502);
    return json({ error: err instanceof Error ? err.message : "server" }, 500);
  }
};
