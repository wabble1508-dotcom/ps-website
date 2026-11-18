import type { Env } from "./env";
import { db } from "./db";

// Neueste Instagram-Beiträge über die offizielle Instagram-API (Instagram-Login).
// Der Zugangsschlüssel kommt einmalig aus dem Cloudflare-Secret INSTAGRAM_TOKEN und wird
// danach automatisch verlängert (gültig 60 Tage, wir erneuern ihn wöchentlich) und in D1 gespeichert.
// Besucher laden nichts von Instagram: Bilder werden über /api/social-image ausgeliefert.

const API = "https://graph.instagram.com";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
const REFRESH_AFTER_MS = 7 * 24 * 3600_000;
const CACHE_SECONDS = 30 * 60;

export type InstagramPost = {
  id: string;
  caption: string;
  type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
  timestamp: string;
};

type RawMedia = InstagramPost & { media_type: InstagramPost["type"]; media_url?: string; thumbnail_url?: string };

const getSetting = async (env: Env, key: string) =>
  (await db(env)).prepare("SELECT value, updated_at FROM settings WHERE key = ?").bind(key).first<{ value: string; updated_at: string }>();

const setSetting = async (env: Env, key: string, value: string) =>
  (await db(env))
    .prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(key, value, new Date().toISOString())
    .run();

// Zwei Arten von Schlüsseln werden unterstützt:
//  • Instagram-Schlüssel (IG…, „API-Einrichtung mit Instagram-Login“) → graph.instagram.com
//  • Facebook-Schlüssel (EAA…, Facebook-Login) → graph.facebook.com über die Facebook-Seite, mit der
//    das Instagram-Konto verknüpft ist. Seite, Seiten-Schlüssel und Instagram-ID werden automatisch ermittelt.
export type MetaApi = { kind: "ig" | "fb"; base: string; token: string; igId: string; pageId: string };

const FB = "https://graph.facebook.com/v23.0";

export const resolveMeta = async (env: Env): Promise<MetaApi | null> => {
  const raw = (env.INSTAGRAM_TOKEN || "").trim();
  if (!raw) return null;
  if (!/^EAA/.test(raw)) {
    const token = await getToken(env);
    return token ? { kind: "ig", base: "https://graph.instagram.com/v23.0", token, igId: "me", pageId: "me" } : null;
  }
  // Ergebnis 12 Stunden merken (gebunden an den eingetragenen Schlüssel)
  const cached = await getSetting(env, "fb_meta");
  if (cached) {
    const c = JSON.parse(cached.value) as MetaApi & { src: string };
    if (c.src === raw.slice(-12) && Date.now() - Date.parse(cached.updated_at) < 12 * 3600_000) return c;
  }
  const get = async (path: string, token: string) => {
    const res = await fetch(`${FB}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(token)}`);
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) throw new Error(`Facebook ${path.split("?")[0]}: ${res.status} ${JSON.stringify(data).slice(0, 300)}`);
    return data;
  };
  let found: { pageId: string; token: string; igId: string } | null = null;
  let pagesInfo = "";
  // Benutzer-Schlüssel: Seiten durchsuchen
  try {
    const pages = (await get("me/accounts?fields=id,name,access_token,instagram_business_account&limit=50", raw)) as {
      data?: { id: string; name: string; access_token: string; instagram_business_account?: { id: string } }[];
    };
    const page = pages.data?.find((p) => p.instagram_business_account?.id);
    if (page) found = { pageId: page.id, token: page.access_token, igId: page.instagram_business_account!.id };
    else pagesInfo = `Seiten im Schlüssel: ${pages.data?.length ? pages.data.map((p) => p.name).join(", ") : "keine"}`;
  } catch (err) {
    pagesInfo = err instanceof Error ? err.message : String(err);
  }
  // Seiten-Schlüssel: direkt die verknüpfte Instagram-ID lesen
  if (!found) {
    const me = (await get("me?fields=id,name", raw)) as { id: string; name: string };
    const page = await get(`${me.id}?fields=instagram_business_account`, raw).catch(() => null) as { instagram_business_account?: { id: string } } | null;
    if (!page?.instagram_business_account?.id)
      throw new Error(
        `Mit diesem Facebook-Schlüssel (${me.name}) ist keine Facebook-Seite mit verknüpftem Instagram-Konto erreichbar. ${pagesInfo}. Beim Erzeugen müssen die Seite „PS Professional Solutions“ und die Rechte pages_show_list, pages_manage_metadata, instagram_basic, instagram_manage_messages, instagram_manage_comments ausgewählt sein.`,
      );
    found = { pageId: me.id, token: raw, igId: page.instagram_business_account.id };
  }
  const result: MetaApi = { kind: "fb", base: FB, ...found };
  await setSetting(env, "fb_meta", JSON.stringify({ ...result, src: raw.slice(-12) }));
  return result;
};

// Aktuellen Schlüssel holen; ein neu eingetragenes Secret hat Vorrang vor dem gespeicherten
export const getToken = async (env: Env) => {
  if (!env.INSTAGRAM_TOKEN) return null;
  const stored = await getSetting(env, "instagram_token");
  const source = await getSetting(env, "instagram_token_source");
  let token = stored?.value || env.INSTAGRAM_TOKEN;
  let since = stored?.updated_at || "1970-01-01";
  if (source?.value !== env.INSTAGRAM_TOKEN.slice(-12)) {
    token = env.INSTAGRAM_TOKEN;
    since = "1970-01-01";
    await setSetting(env, "instagram_token", token);
    await setSetting(env, "instagram_token_source", env.INSTAGRAM_TOKEN.slice(-12));
  }
  if (Date.now() - Date.parse(since) > REFRESH_AFTER_MS) {
    const res = await fetch(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`);
    if (res.ok) {
      const data = (await res.json()) as { access_token?: string };
      if (data.access_token) {
        token = data.access_token;
        await setSetting(env, "instagram_token", token);
      }
    } else {
      console.error("Instagram-Schlüssel konnte nicht verlängert werden", res.status, await res.text());
    }
  }
  return token;
};

// Rohdaten inkl. Bild-Adressen; 30 Minuten im Cloudflare-Cache, letzter Stand zusätzlich in D1
const loadMedia = async (env: Env): Promise<RawMedia[]> => {
  const cacheKey = new Request("https://cache.ps-professional-solutions.de/instagram-media");
  const cache = (caches as unknown as { default: Cache }).default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit.json();

  let media: RawMedia[] = [];
  try {
    const meta = await resolveMeta(env);
    if (!meta) return [];
    const res = await fetch(`${meta.base}/${meta.igId}/media?fields=${FIELDS}&limit=30&access_token=${encodeURIComponent(meta.token)}`);
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const data = (await res.json()) as { data?: (Omit<RawMedia, "type"> & { media_type: RawMedia["type"] })[] };
    media = (data.data || []).map((m) => ({ ...m, type: m.media_type, caption: m.caption || "" }));
    await setSetting(env, "instagram_media", JSON.stringify(media));
  } catch (err) {
    console.error("Instagram-Beiträge konnten nicht geladen werden", err);
    const last = await getSetting(env, "instagram_media");
    media = last ? JSON.parse(last.value) : [];
  }
  await cache.put(
    cacheKey,
    new Response(JSON.stringify(media), { headers: { "Cache-Control": `max-age=${CACHE_SECONDS}`, "Content-Type": "application/json" } }),
  );
  return media;
};

export const instagramPosts = async (env: Env): Promise<InstagramPost[]> =>
  (await loadMedia(env)).map(({ id, caption, type, permalink, timestamp }) => ({ id, caption, type, permalink, timestamp }));

// Bild eines Beitrags (bei Videos das Vorschaubild); nur für IDs aus unserer eigenen Liste
export const instagramImage = async (env: Env, id: string) => {
  const item = (await loadMedia(env)).find((m) => m.id === id);
  const url = item && (item.type === "VIDEO" ? item.thumbnail_url : item.media_url);
  if (!url) return null;
  const res = await fetch(url, { cf: { cacheTtl: 86400, cacheEverything: true } } as RequestInit);
  if (!res.ok) return null;
  return new Response(res.body, {
    headers: { "Content-Type": res.headers.get("Content-Type") || "image/jpeg", "Cache-Control": "public, max-age=86400" },
  });
};
