import Anthropic from "@anthropic-ai/sdk";
import type { Config } from "@netlify/functions";
import { chats, type ChatLog } from "../lib/store";

// KI-Livechat der Website. Der API-Schlüssel kommt aus der Netlify-Umgebungsvariable
// ANTHROPIC_API_KEY und ist im Browser nie sichtbar.
const client = new Anthropic();

const SYSTEM_PROMPT = `Du bist der freundliche KI-Assistent auf der Website von PS Professional Solutions.

Über das Unternehmen:
- Inhaber: Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund
- Telefon: +49 152 0759 5260, E-Mail: info@ps-professional-solutions.de, WhatsApp: https://wa.me/4915207595260
- Leistungen: Webseiten & SEO, KI-Telefonassistent, Termin-Automation, KI-Live-Chat für Websites, Google-Business-Optimierung, All-in-One CRM, Design & Druck, NFC-Visitenkarten
- Pakete: Essential 1.990 € einmalig + 99 €/Monat; Elite 2.490 € einmalig + 149 €/Monat; Premium Care 150 €/Monat. Alle Monatsverträge sind monatlich kündbar.
- Das Erstgespräch ist kostenlos.

So antwortest du:
- Antworte immer in der Sprache, in der der Besucher schreibt.
- Kurz, freundlich und verständlich, ohne Fachchinesisch, höchstens ein paar Sätze.
- Erfinde keine Preise, Referenzen oder Zusagen, die oben nicht stehen. Wenn du etwas nicht weißt, verweise auf ein kostenloses Erstgespräch per WhatsApp oder Telefon.
- Wenn jemand Interesse zeigt, lade ihn zum kostenlosen Erstgespräch ein und nenne WhatsApp oder Telefon.
- Bleib beim Thema des Unternehmens.`;

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  let messages: ChatMessage[];
  let sessionId = "";
  let page = "";
  try {
    const body = await req.json();
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
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // Die API erwartet, dass das Gespräch mit einer Nachricht des Besuchers beginnt und endet.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: SYSTEM_PROMPT,
      messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ reply: null, error: "refusal" });
    }
    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    if (sessionId) await saveChat(sessionId, page, [...messages, { role: "assistant", content: reply }]);
    return Response.json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "busy" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Claude API error", err.status, err.message);
    } else {
      console.error(err);
    }
    return Response.json({ error: "server" }, { status: 500 });
  }
};

// Gespräch speichern, damit es im Admin-Bereich nachgelesen werden kann
const saveChat = async (id: string, page: string, messages: ChatMessage[]) => {
  try {
    const store = chats();
    const old = (await store.get(id, { type: "json" })) as ChatLog | null;
    const now = new Date().toISOString();
    await store.setJSON(id, { id, page: old?.page || page, messages, createdAt: old?.createdAt || now, updatedAt: now });
  } catch (err) {
    console.error("Chat konnte nicht gespeichert werden", err);
  }
};

export const config: Config = { path: "/api/chat" };
