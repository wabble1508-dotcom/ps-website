import Anthropic from "@anthropic-ai/sdk";
import type { Ctx, Env } from "../../server/env";
import { db, type ChatMessage } from "../../server/db";
import { json } from "../../server/http";
import { SYSTEM_PROMPT } from "../../server/prompt";

// KI-Livechat der Website. Der API-Schlüssel kommt aus der Cloudflare-Einstellung
// ANTHROPIC_API_KEY und ist im Browser nie sichtbar.
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

export const onRequestPost = async ({ request, env }: Ctx) => {
  let messages: ChatMessage[];
  let sessionId = "";
  let page = "";
  try {
    const body = await request.json<Record<string, unknown>>();
    if (typeof body.sessionId === "string" && /^[\w-]{8,64}$/.test(body.sessionId)) sessionId = body.sessionId;
    if (typeof body.page === "string") page = body.page.slice(0, 200);
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(
        (m: ChatMessage) =>
          (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim(),
      )
      .slice(-MAX_MESSAGES)
      .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  // Die API erwartet, dass das Gespräch mit einer Nachricht des Besuchers beginnt und endet.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return json({ error: "bad_request" }, 400);
  }

  // Leerzeichen oder Zeilenumbrüche, die beim Einfügen mitrutschen, entfernen
  const apiKey = (env.ANTHROPIC_API_KEY || "").trim();
  const client = new Anthropic({ apiKey, baseURL: env.ANTHROPIC_BASE_URL || undefined });
  try {
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: SYSTEM_PROMPT,
      messages,
    });

    if (response.stop_reason === "refusal") {
      return json({ reply: null, error: "refusal" });
    }
    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    if (sessionId) await saveChat(env, sessionId, page, [...messages, { role: "assistant", content: reply }]);
    return json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return json({ error: "busy" }, 429);
    if (err instanceof Anthropic.APIError) {
      console.error("Claude API error", err.status, err.message);
      // Statuscode mitschicken, damit Fehler wie ein falscher Schlüssel (401) erkennbar sind
      return json({ error: "server", status: err.status ?? err.name }, 500);
    }
    console.error(err);
    return json({ error: "server" }, 500);
  }
};

// Gespräch speichern, damit es im Admin-Bereich nachgelesen werden kann
const saveChat = async (env: Env, id: string, page: string, messages: ChatMessage[]) => {
  try {
    const now = new Date().toISOString();
    await (await db(env))
      .prepare(
        "INSERT INTO chats (id, page, messages, created_at, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET messages = excluded.messages, updated_at = excluded.updated_at",
      )
      .bind(id, page, JSON.stringify(messages), now, now)
      .run();
  } catch (err) {
    console.error("Chat konnte nicht gespeichert werden", err);
  }
};
