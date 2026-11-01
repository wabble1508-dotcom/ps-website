import type { Env } from "../../server/env";
import { handleWebhook, validSignature, type WebhookBody } from "../../server/instagramBot";

// Webhook für Instagram (DMs, Kommentare, Begrüßungsfragen).
// Im Meta-Entwicklerportal als Callback-URL eintragen: https://ps-professional-solutions.de/api/instagram-webhook
type PagesCtx = { request: Request; env: Env; waitUntil: (p: Promise<unknown>) => void };

// Instagram prüft die Adresse einmalig mit einer GET-Anfrage
export const onRequestGet = ({ request, env }: PagesCtx) => {
  const url = new URL(request.url);
  const ok =
    url.searchParams.get("hub.mode") === "subscribe" &&
    Boolean(env.INSTAGRAM_VERIFY_TOKEN) &&
    url.searchParams.get("hub.verify_token") === env.INSTAGRAM_VERIFY_TOKEN;
  return ok ? new Response(url.searchParams.get("hub.challenge") || "") : new Response("forbidden", { status: 403 });
};

export const onRequestPost = async ({ request, env, waitUntil }: PagesCtx) => {
  const raw = await request.text();
  if (!env.INSTAGRAM_APP_SECRET || !(await validSignature(env.INSTAGRAM_APP_SECRET, raw, request.headers.get("x-hub-signature-256")))) {
    return new Response("invalid signature", { status: 401 });
  }
  let body: WebhookBody;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("bad request", { status: 400 });
  }
  // Sofort „OK“ an Instagram, die Antwort läuft im Hintergrund weiter
  waitUntil(handleWebhook(env, body));
  return new Response("ok");
};
