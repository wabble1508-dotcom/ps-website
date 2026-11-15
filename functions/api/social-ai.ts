import Anthropic from "@anthropic-ai/sdk";
import type { Ctx, Env } from "../../server/env";
import { json } from "../../server/http";
import { SYSTEM_PROMPT } from "../../server/prompt";
import { COMMENT_KEYWORDS } from "../../server/socialConfig";
import { setupIceBreakers } from "../../server/instagramBot";
import { db, newId } from "../../server/db";
import { notifyOwner } from "../../server/mail";

// KI-Texter für Make.com: schreibt aus einem Thema fertige Texte für alle Kanäle
// und plant ganze Content-Wochen. Aufruf nur mit dem Header  x-make-secret: <MAKE_SECRET>.
//
// POST /api/social-ai  { "action": "captions", "topic": "...", "details": "...", "format": "reel", "link": "..." }
// POST /api/social-ai  { "action": "plan", "days": 7, "focus": "..." }
// POST /api/social-ai  { "action": "week" }   → plant 7 Beiträge inkl. aller Texte, speichert sie und schickt dir eine E-Mail
// POST /api/social-ai  { "action": "captions", "file": "3 Preise.mp4" } → Texte zu Beitrag Nr. 3 der aktuellen Woche
// POST /api/social-ai  { "action": "setup-icebreakers" }

const KEYWORDS = COMMENT_KEYWORDS.map((k) => k.words[0].toUpperCase()).join(", ");

const MARKETING_RULES = `
Du bist jetzt der Social-Media-Texter von PS Professional Solutions (Kanäle: Instagram ps_professional_solutions,
TikTok @psprofessional.solutions, YouTube @psprofessionalsolutions, Facebook, LinkedIn).
Zielgruppe: kleine und mittlere Unternehmen in Dortmund, im Ruhrgebiet und deutschlandweit (Friseure, Handwerker, Praxen, Gastro, Vereine …).
Regeln:
- Starker Hook in der ersten Zeile (Frage, Zahl, Problem). Danach Nutzen statt Technik, kurze Absätze, passende Emojis (nicht übertreiben).
- Jeder Text endet mit einem klaren Call-to-Action.
- JEDES Video ist ein Kommentar-Trigger-Video (Ziel: Kommentare + Leads per DM): Wähle ein Stichwort aus ${KEYWORDS} und gib einen konkreten Grund zu kommentieren
  (CHECK = kostenloser Website-Check, PREIS = Preisübersicht, BEISPIEL = echte Projekte, WEBSITE/APP/KI = Infos, TERMIN = kostenloses Erstgespräch).
  Das Video-Skript endet IMMER gesprochen mit: „Kommentiere <STICHWORT> und ich schick dir … per DM“, und der Bildtext nennt das Stichwort.
- Instagram und Facebook: Text endet mit „Kommentiere <STICHWORT> und ich schick dir … per DM 📩“ (dasselbe Stichwort wie im Video). Erster Kommentar wiederholt das Stichwort.
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
    video_script: { type: "string", description: "Kurzes Skript für ein 20–40-Sekunden-Video: Hook in der 1. Sekunde, 3 Punkte, am Ende gesprochen „Kommentiere <STICHWORT> …“" },
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

const captionsFor = (env: Env, topic: string, details = "", format = "", link = "") =>
  generate(
    env,
    [`Schreibe die Texte für einen neuen Beitrag.`, `Thema: ${topic}`, details && `Details: ${details}`, format && `Format: ${format}`, link && `Link: ${link}`]
      .filter(Boolean)
      .join("\n"),
    CAPTIONS_SCHEMA,
  );

type PlanPost = { nr: number; day: number; date: string; time: string; format: string; topic: string; details: string; hook: string; captions: Record<string, unknown> };

const PLAN_KEY = "content_plan";

const loadPlan = async (env: Env) => {
  const row = await (await db(env)).prepare("SELECT value FROM settings WHERE key = ?").bind(PLAN_KEY).first<{ value: string }>();
  return row ? (JSON.parse(row.value) as { created: string; posts: PlanPost[] }) : null;
};

const berlinDate = (daysAhead: number) =>
  new Date(Date.now() + daysAhead * 86400_000).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", weekday: "long", day: "2-digit", month: "2-digit" });

// Ganze Content-Woche: Plan + alle Texte (parallel), speichern, E-Mail an dich, Kopie im Admin-Bereich
const planWeek = async (env: Env, days: number, focus: string) => {
  const plan = (await generate(
    env,
    `Plane Social-Media-Beiträge für die nächsten ${days} Tage, einen pro Tag. Mische Formate (vor allem Reels), Branchen und Themen:
Tipps für Selbstständige, Vorher/Nachher von Websites, KI im Alltag von Betrieben, Einblicke hinter die Kulissen, Preise/Angebote, Kundenfragen.
${focus ? `Schwerpunkt: ${focus}` : ""}`,
    PLAN_SCHEMA,
  )) as { posts: Omit<PlanPost, "nr" | "date" | "captions">[] };
  const posts: PlanPost[] = await Promise.all(
    plan.posts.slice(0, days).map(async (p, i) => ({
      ...p,
      nr: i + 1,
      date: berlinDate(p.day),
      captions: await captionsFor(env, p.topic, `${p.details}\nHook: ${p.hook}`, p.format),
    })),
  );
  const now = new Date().toISOString();
  await (await db(env))
    .prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(PLAN_KEY, JSON.stringify({ created: now, posts }), now)
    .run();

  const text = [
    "Deine Content-Woche ist fertig! 🎬",
    "",
    "So geht's: Video nach dem Skript aufnehmen und mit der NUMMER am Anfang des Dateinamens",
    "in den Dropbox-Ordner „Social-Autopost“ legen (z. B. „3.mp4“ oder „3 Preise.mp4“).",
    "Make postet es dann automatisch mit den passenden Texten auf allen Kanälen.",
    "",
    ...posts.flatMap((p) => [
      `━━━━━━━━━━ VIDEO ${p.nr} · ${p.date}, ${p.time} · ${p.format.toUpperCase()} ━━━━━━━━━━`,
      `Thema: ${p.topic}`,
      `Hook (erste Sekunde): ${p.hook}`,
      `Text im Bild: ${String(p.captions.image_text || "")}`,
      "",
      "Skript:",
      String(p.captions.video_script || ""),
      "",
      "Instagram-Text:",
      String(p.captions.instagram || ""),
      "",
    ]),
  ].join("\n");
  await notifyOwner(env, `Content-Woche: ${posts.length} Videos geplant`, text);
  await (await db(env))
    .prepare("INSERT INTO leads (id, form, fields, page, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(newId(), "content-plan", JSON.stringify({ plan: text }), "Make.com", now)
    .run();
  return posts;
};

// Wöchentlicher Zeitplan (GitHub Actions, .github/workflows/content-woche.yml) – ohne Schlüssel,
// plant aber nur, wenn der letzte Plan älter als 6 Tage ist. Mehrfaches Aufrufen schadet also nicht.
// Tägliche Kontrolle (GitHub Actions, .github/workflows/social-kontrolle.yml): Ist jedes Reel der letzten
// 48 Stunden auf Facebook, YouTube und LinkedIn angekommen? Wenn nicht: E-Mail an den Inhaber + Status 500,
// damit der GitHub-Lauf rot wird. Gibt nur Zahlen/Plattformnamen zurück, keine Inhalte.
const healthCheck = async (env: Env) => {
  const since = new Date(Date.now() - 48 * 3600_000).toISOString();
  const { results } = await (await db(env))
    .prepare("SELECT platform, info, created_at FROM social_log WHERE created_at > ? ORDER BY created_at")
    .bind(since)
    .all<{ platform: string; info: string; created_at: string }>();
  const reelOf = (info: string) => info.match(/instagram\.com\/reel\/[\w-]+/)?.[0] || "";
  const reels = [...new Set(results.filter((r) => r.platform === "instagram").map((r) => reelOf(r.info)).filter(Boolean))];
  const problems: string[] = [];
  for (const reel of reels) {
    // Reels, die gerade erst erkannt wurden, haben noch etwas Zeit
    const seen = results.find((r) => r.platform === "instagram" && reelOf(r.info) === reel)!;
    if (Date.now() - Date.parse(seen.created_at) < 30 * 60_000) continue;
    for (const platform of ["facebook", "youtube", "linkedin"]) {
      const ok = results.some((r) => r.platform === platform && reelOf(r.info) === reel && !r.info.startsWith("FEHLER"));
      if (!ok) problems.push(`${platform}: ${reel}`);
    }
  }
  return { reels: reels.length, problems };
};

export const onRequestGet = async ({ request, env }: Ctx) => {
  if (new URL(request.url).searchParams.get("action") === "health-cron") {
    const { reels, problems } = await healthCheck(env);
    if (problems.length) {
      await notifyOwner(env, `Social-Autopilot: ${problems.length} Post(s) fehlen`, `Diese Reels sind nicht überall angekommen:\n\n${problems.join("\n")}\n\nClaude kann das beheben – einfach im Chat „prüf mal Social“ schreiben.`);
    }
    return json({ ok: problems.length === 0, reels, missing: problems.map((p) => p.split(":")[0]) }, problems.length ? 500 : 200);
  }
  if (new URL(request.url).searchParams.get("action") !== "week-cron") return json({ error: "bad_request" }, 400);
  const last = await loadPlan(env);
  if (last && Date.now() - Date.parse(last.created) < 6 * 86400_000) return json({ ok: true, skipped: "Plan ist noch aktuell", created: last.created });
  try {
    const posts = await planWeek(env, 7, "");
    return json({ ok: true, count: posts.length });
  } catch (err) {
    console.error("week-cron", err);
    return json({ error: "server" }, 500);
  }
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!isMake(request, env)) return json({ error: "unauthorized" }, 401);
  let body: Record<string, unknown>;
  try {
    // JSON oder Formular (Make „application/x-www-form-urlencoded“ – dann muss nichts escaped werden)
    body = (request.headers.get("content-type") || "").includes("form")
      ? Object.fromEntries(await request.formData())
      : await request.json<Record<string, unknown>>();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  try {
    switch (body.action) {
      case "captions": {
        // Dateiname mit Nummer („3 Preise.mp4“) → gespeicherte Texte aus der Content-Woche
        const file = str(body.file, 300);
        const nr = Number(file.match(/^\s*(\d{1,2})(?!\d)/)?.[1]);
        if (nr) {
          const post = (await loadPlan(env))?.posts.find((p) => p.nr === nr);
          if (post) return json({ ...post.captions, topic: post.topic, nr: post.nr });
        }
        // Instagram-Text eines schon geposteten Reels → passende Texte aus der Content-Woche, sonst neu schreiben
        const caption = str(body.caption, 2200);
        if (caption) {
          const norm = (t: string) => t.replace(/\s+/g, " ").trim().slice(0, 80).toLowerCase();
          const post = (await loadPlan(env))?.posts.find((p) => norm(String(p.captions.instagram || "")) === norm(caption));
          if (post) return json({ ...post.captions, topic: post.topic, nr: post.nr });
          return json(await captionsFor(env, caption.slice(0, 500), "Das Video ist schon auf Instagram mit diesem Text gepostet. Schreibe passende Texte für die anderen Kanäle."));
        }
        const topic = str(body.topic, 500) || file.replace(/\.[a-z0-9]+$/i, "").replace(/^\s*\d+\s*[-_.]?\s*/, "").replace(/[_-]+/g, " ").trim();
        if (!topic) return json({ error: "topic fehlt" }, 400);
        return json(await captionsFor(env, topic, str(body.details), str(body.format, 40), str(body.link, 300)));
      }
      case "log": {
        // Make meldet: Reel erkannt (instagram) bzw. erfolgreich gepostet (facebook/youtube/linkedin)
        const platform = str(body.platform, 20).toLowerCase();
        if (!["instagram", "facebook", "youtube", "linkedin"].includes(platform)) return json({ error: "platform" }, 400);
        await (await db(env))
          .prepare("INSERT INTO social_log (id, platform, info, created_at) VALUES (?, ?, ?, ?)")
          .bind(newId(), platform, str(body.info, 500), new Date().toISOString())
          .run();
        // Sofort-Alarm per E-Mail, wenn eine Plattform nicht posten konnte
        if (str(body.info, 20).startsWith("FEHLER")) {
          await notifyOwner(env, `Social-Autopilot: ${platform} hat nicht gepostet`, `Make meldet einen Fehler beim Posten auf ${platform}:\n\n${str(body.info, 500)}\n\nDie anderen Kanäle laufen trotzdem weiter. Claude kann das beheben – einfach im Chat „prüf mal Social“ schreiben.`);
        }
        return json({ ok: true });
      }
      case "week": {
        const days = Math.min(Math.max(Number(body.days) || 7, 1), 14);
        const posts = await planWeek(env, days, str(body.focus, 500));
        return json({ ok: true, count: posts.length, posts: posts.map(({ nr, date, time, topic }) => ({ nr, date, time, topic })) });
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
