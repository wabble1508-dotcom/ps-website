import type { Ctx } from "../server/env";
import { listArticles } from "../server/articles";

// Sitemap der veröffentlichten Magazin-Artikel (in robots.txt eingetragen)
const HEADERS = { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" };

export const onRequestGet = async ({ env }: Ctx) => {
  const items = await listArticles(env, true).catch(() => []);
  const urls = items
    .map((a) => `<url><loc>https://ps-professional-solutions.de/magazin/${a.slug}</loc><lastmod>${(a.published_at || a.created_at).slice(0, 10)}</lastmod><priority>0.6</priority></url>`)
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: HEADERS });
};

// HEAD-Anfragen (Prüf-Tools) bekamen sonst die HTML-Startseite statt XML
export const onRequestHead = () => new Response(null, { headers: HEADERS });
