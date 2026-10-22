import type { Ctx } from "../server/env";
import SEO_META from "../server/seo-meta.json";

// Gibt jeder Unterseite schon im ersten HTML ihren Titel, ihre Beschreibung und ihr
// Vorschaubild mit. Google, WhatsApp, Facebook & Co. sehen so die richtigen Angaben,
// auch ohne JavaScript auszuführen. Die Daten erzeugt tools/seo-snapshot.mjs.
type Meta = { title: string; description: string; robots: string; image: string; schemas: string[] };
const META = SEO_META as Record<string, Meta>;
const DOMAIN = "https://ps-professional-solutions.de";
const DEFAULT_IMAGE = `${DOMAIN}/og-image.jpg`;

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// data-rh: so übernimmt react-helmet diese Angaben im Browser, statt sie doppelt anzulegen
const tag = (name: string, attrs: Record<string, string>) =>
  `<${name} data-rh="true" ${Object.entries(attrs)
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(" ")}>`;

const headFor = (path: string, m: Meta) => {
  const url = `${DOMAIN}${path}`;
  const image = m.image || DEFAULT_IMAGE;
  return [
    tag("meta", { name: "description", content: m.description }),
    tag("meta", { name: "robots", content: m.robots }),
    tag("link", { rel: "canonical", href: url }),
    tag("meta", { property: "og:title", content: m.title }),
    tag("meta", { property: "og:description", content: m.description }),
    tag("meta", { property: "og:type", content: "website" }),
    tag("meta", { property: "og:url", content: url }),
    tag("meta", { property: "og:image", content: image }),
    tag("meta", { property: "og:image:width", content: "1200" }),
    tag("meta", { property: "og:image:height", content: "630" }),
    tag("meta", { property: "og:site_name", content: "PS Professional Solutions" }),
    tag("meta", { property: "og:locale", content: "de_DE" }),
    tag("meta", { name: "twitter:card", content: "summary_large_image" }),
    tag("meta", { name: "twitter:title", content: m.title }),
    tag("meta", { name: "twitter:description", content: m.description }),
    tag("meta", { name: "twitter:image", content: image }),
    ...m.schemas.map((s) => `<script data-rh="true" type="application/ld+json">${s.replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
};

export const onRequest = async ({ request, next }: Ctx & { next: () => Promise<Response> }) => {
  const response = await next();
  const url = new URL(request.url);
  if (request.method !== "GET" || url.pathname.startsWith("/api/")) return response;
  if (!(response.headers.get("content-type") || "").includes("text/html")) return response;

  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
  if (path === "/admin") {
    const res = new Response(response.body, response);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const meta = META[path];
  // Unbekannte Adressen: Seite trotzdem zeigen (React zeigt „nicht gefunden“), aber mit Status 404
  const res = new Response(response.body, { status: meta ? response.status : 404, headers: response.headers });
  if (!meta) {
    res.headers.set("X-Robots-Tag", "noindex");
    return res;
  }

  return new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(meta.title);
      },
    })
    .on("head", {
      element(el) {
        el.append(headFor(path, meta), { html: true });
      },
    })
    .transform(res);
};
