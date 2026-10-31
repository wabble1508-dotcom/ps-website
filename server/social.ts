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

// Aktuellen Schlüssel holen; ein neu eingetragenes Secret hat Vorrang vor dem gespeicherten
const getToken = async (env: Env) => {
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

  const token = await getToken(env);
  if (!token) return [];
  let media: RawMedia[] = [];
  try {
    const res = await fetch(`${API}/me/media?fields=${FIELDS}&limit=30&access_token=${encodeURIComponent(token)}`);
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
