import type { Ctx } from "../server/env";
import SEO_META from "../server/seo-meta.json";

// Gibt jeder Unterseite schon im ersten HTML ihren Titel, ihre Beschreibung und ihr
// Vorschaubild mit. Google, WhatsApp, Facebook & Co. sehen so die richtigen Angaben,
// auch ohne JavaScript auszuführen. Die Daten erzeugt tools/seo-snapshot.mjs.
type Meta = { title: string; description: string; robots: string; image: string; schemas: string[]; content?: string };
const META = SEO_META as Record<string, Meta>;
const DOMAIN = "https://ps-professional-solutions.de";
const DEFAULT_IMAGE = `${DOMAIN}/og-image.jpg`;

// Kontaktwege und Anfrageformular für Besucher und Programme ohne JavaScript
// (das Formular schickt an /api/forms und leitet danach zur Terminbuchung weiter)
const CONTACT_HTML = `<h2>Kontakt</h2>
<p><a href="#kontakt">Angebot anfragen</a> · <a href="/analyse-bestaetigungen">Termin buchen</a></p>
<p>Telefon: <a href="tel:+4915207595260">+49 152 0759 5260</a> · E-Mail: <a href="mailto:info@ps-professional-solutions.de">info@ps-professional-solutions.de</a> · <a href="https://wa.me/4915207595260">WhatsApp</a></p>
<form id="kontakt" method="post" action="/api/forms">
<input type="hidden" name="form" value="kontakt">
<label>Name <input name="first_name" required autocomplete="name"></label>
<label>E-Mail <input name="email" type="email" required autocomplete="email"></label>
<label>Telefon <input name="phone" type="tel" autocomplete="tel"></label>
<label>Anliegen <select name="topic"><option value="website">Website</option><option value="app">App-Entwicklung</option><option value="software">Software-Entwicklung</option><option value="chat">KI-Live-Chat</option><option value="telefon">KI-Telefonassistent</option><option value="sonstiges">Sonstiges</option></select></label>
<button type="submit">Angebot anfragen</button>
</form>`;

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
    // Seitentext für Crawler ohne JavaScript (z. B. KI-Suchmaschinen); Browser mit JavaScript zeigen ihn nicht
    .on("body", {
      element(el) {
        if (meta.content) el.prepend(`<noscript>${meta.content}${CONTACT_HTML}</noscript>`, { html: true });
      },
    })
    .transform(res);
};
