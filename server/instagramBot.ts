import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";
import { db, type ChatMessage } from "./db";
import { notifyOwner } from "./mail";
import { SYSTEM_PROMPT } from "./prompt";
import { getToken } from "./social";
import { COMMENT_KEYWORDS, COMMENT_RULES, ICE_BREAKERS, INSTAGRAM_RULES, SOCIAL_BOT } from "./socialConfig";

// Instagram-Autopilot: beantwortet DMs mit KI, schickt bei Kommentar-Stichwörtern automatisch
// eine DM und antwortet auf Begrüßungsfragen (Ice Breakers). Läuft über die offizielle
// Instagram-API (Instagram-Login) mit demselben Schlüssel wie der Instagram-Feed der Website.

const API = "https://graph.instagram.com/v23.0";
const MAX_HISTORY = 20;

type Messaging = {
  sender: { id: string };
  recipient: { id: string };
  message?: { mid: string; text?: string; is_echo?: boolean; is_deleted?: boolean };
  postback?: { mid?: string; payload?: string; title?: string };
};
type Change = {
  field: string;
  value: { id?: string; text?: string; parent_id?: string; from?: { id: string; username?: string }; media?: { id: string } };
};
export type WebhookBody = { object?: string; entry?: { id: string; messaging?: Messaging[]; changes?: Change[] }[] };

// --- Hilfsfunktionen -------------------------------------------------------------------------

const graph = async (env: Env, path: string, body?: unknown) => {
  const token = await getToken(env);
  if (!token) throw new Error("INSTAGRAM_TOKEN fehlt");
  const res = await fetch(`${API}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(token)}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Instagram ${path}: ${res.status} ${JSON.stringify(data)}`);
  return data;
};

/** true, wenn das Ereignis neu ist (Instagram schickt manche Ereignisse mehrfach) */
const firstTime = async (env: Env, id: string) => {
  const r = await (await db(env))
    .prepare("INSERT OR IGNORE INTO social_events (id, created_at) VALUES (?, ?)")
    .bind(id, new Date().toISOString())
    .run();
  return (r.meta.changes ?? 0) > 0;
};

const seen = async (env: Env, id: string) =>
  Boolean(await (await db(env)).prepare("SELECT 1 FROM social_events WHERE id = ?").bind(id).first());

const sendDm = async (env: Env, recipient: { id: string } | { comment_id: string }, text: string) => {
  const res = await graph(env, "me/messages", { recipient, message: { text: text.slice(0, 1000) } });
  // Eigene Nachrichten merken, damit wir sie von deinen Handantworten unterscheiden können
  if (typeof res.message_id === "string") await firstTime(env, `sent:${res.message_id}`);
};

const askClaude = async (env: Env, rules: string, messages: ChatMessage[], maxTokens = 400) => {
  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: maxTokens,
    output_config: { effort: "low" },
    system: `${SYSTEM_PROMPT}\n${rules}`,
    messages,
  });
  if (response.stop_reason === "refusal") return "";
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
};

const loadChat = async (env: Env, chatId: string) => {
  const row = await (await db(env)).prepare("SELECT messages FROM chats WHERE id = ?").bind(chatId).first<{ messages: string }>();
  return row ? (JSON.parse(row.messages) as ChatMessage[]) : null;
};

const saveChat = async (env: Env, chatId: string, messages: ChatMessage[]) => {
  const now = new Date().toISOString();
  await (await db(env))
    .prepare(
      "INSERT INTO chats (id, page, messages, created_at, updated_at) VALUES (?, 'Instagram-DM', ?, ?, ?) ON CONFLICT(id) DO UPDATE SET messages = excluded.messages, updated_at = excluded.updated_at",
    )
    .bind(chatId, JSON.stringify(messages.slice(-60)), now, now)
    .run();
};

const username = async (env: Env, userId: string) => {
  try {
    const data = await graph(env, `${userId}?fields=username,name`);
    return String(data.username || data.name || userId);
  } catch {
    return userId;
  }
};

const hasContact = (text: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) || /(\+?\d[\d\s/-]{7,}\d)/.test(text);

const matchKeyword = (text: string) => {
  const t = text.toLowerCase();
  return COMMENT_KEYWORDS.find((k) => k.words.some((w) => new RegExp(`(^|[^\\p{L}])${w}([^\\p{L}]|$)`, "u").test(t)));
};

// --- Ereignisse ------------------------------------------------------------------------------

const pauseKey = (userId: string) => `ig_pause_${userId}`;

const isPaused = async (env: Env, userId: string) => {
  const row = await (await db(env)).prepare("SELECT value FROM settings WHERE key = ?").bind(pauseKey(userId)).first<{ value: string }>();
  return Boolean(row && Date.now() < Number(row.value));
};

const pause = async (env: Env, userId: string) => {
  const until = Date.now() + SOCIAL_BOT.pauseHoursAfterHuman * 3600_000;
  await (await db(env))
    .prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(pauseKey(userId), String(until), new Date().toISOString())
    .run();
};

const handleMessaging = async (env: Env, accountId: string, m: Messaging) => {
  // Nachricht, die von deinem Konto kam: wenn nicht von uns verschickt, hast du selbst geantwortet → KI pausiert
  if (m.message?.is_echo || m.sender.id === accountId) {
    // kurz warten, bis unsere eigene gerade verschickte Nachricht gespeichert ist
    await new Promise((r) => setTimeout(r, 3000));
    if (m.message?.mid && !(await seen(env, `sent:${m.message.mid}`))) await pause(env, m.recipient.id);
    return;
  }
  const userId = m.sender.id;
  const eventId = m.message?.mid || m.postback?.mid || `${userId}:${m.postback?.payload}:${Date.now()}`;
  if (!(await firstTime(env, `in:${eventId}`))) return;

  const chatId = `ig_${userId}`;
  const history = (await loadChat(env, chatId)) || [];
  const isNew = history.length === 0;

  // Begrüßungsfrage angetippt → feste Antwort
  const breaker = m.postback?.payload ? ICE_BREAKERS.find((b) => b.payload === m.postback?.payload) : undefined;
  const text = breaker ? breaker.question : (m.message?.text || "").trim();
  if (!text || m.message?.is_deleted) return;

  const messages: ChatMessage[] = [...history, { role: "user", content: text.slice(0, 2000) }];
  let reply = breaker?.answer || "";
  if (!reply && SOCIAL_BOT.answerDms && !(await isPaused(env, userId))) {
    reply = await askClaude(env, INSTAGRAM_RULES, messages.slice(-MAX_HISTORY));
  }
  if (reply) {
    await sendDm(env, { id: userId }, reply);
    messages.push({ role: "assistant", content: reply });
  }
  await saveChat(env, chatId, messages);

  if (isNew || hasContact(text)) {
    const name = await username(env, userId);
    await notifyOwner(
      env,
      isNew ? `Neue Instagram-Anfrage von @${name}` : `Kontaktdaten per Instagram von @${name}`,
      `@${name} schreibt auf Instagram:\n\n${text}\n\n${reply ? `KI hat geantwortet:\n${reply}\n\n` : ""}Ganzer Verlauf: https://ps-professional-solutions.de/admin (Chats)`,
    );
  }
};

const handleComment = async (env: Env, accountId: string, c: Change["value"]) => {
  if (!c.id || !c.text || !c.from || c.from.id === accountId || c.parent_id) return;
  if (!(await firstTime(env, `comment:${c.id}`))) return;

  const keyword = matchKeyword(c.text);
  if (keyword) {
    await sendDm(env, { comment_id: c.id }, keyword.dm);
    await graph(env, `${c.id}/replies`, { message: keyword.publicReply });
    await notifyOwner(
      env,
      `Stichwort-Kommentar von @${c.from.username || c.from.id}`,
      `@${c.from.username || c.from.id} hat „${c.text}“ kommentiert und automatisch eine DM bekommen.\n\nDM:\n${keyword.dm}`,
    );
    return;
  }
  if (!SOCIAL_BOT.replyToAllComments) return;
  const reply = await askClaude(env, COMMENT_RULES, [{ role: "user", content: `Kommentar von @${c.from.username || "jemand"}: ${c.text.slice(0, 1000)}` }], 150);
  if (reply && reply !== "SKIP" && !reply.includes("SKIP")) await graph(env, `${c.id}/replies`, { message: reply.slice(0, 300) });
};

export const handleWebhook = async (env: Env, body: WebhookBody) => {
  if (body.object !== "instagram") return;
  for (const entry of body.entry || []) {
    for (const m of entry.messaging || []) {
      try {
        await handleMessaging(env, entry.id, m);
      } catch (err) {
        console.error("Instagram-DM", err);
      }
    }
    for (const change of entry.changes || []) {
      if (change.field !== "comments") continue;
      try {
        await handleComment(env, entry.id, change.value);
      } catch (err) {
        console.error("Instagram-Kommentar", err);
      }
    }
  }
};

/** Begrüßungsfragen bei Instagram eintragen (einmalig bzw. nach Änderungen in socialConfig.ts) */
export const setupIceBreakers = (env: Env) =>
  graph(env, "me/messenger_profile", {
    platform: "instagram",
    ice_breakers: [
      { locale: "default", call_to_actions: ICE_BREAKERS.slice(0, 4).map(({ question, payload }) => ({ question, payload })) },
    ],
  });

/** Webhook-Signatur prüfen (Header X-Hub-Signature-256, Schlüssel = Instagram-App-Geheimschlüssel) */
export const validSignature = async (secret: string, raw: string, header: string | null) => {
  if (!header?.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw)));
  const expected = [...sig].map((b) => b.toString(16).padStart(2, "0")).join("");
  const given = header.slice(7);
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
};
