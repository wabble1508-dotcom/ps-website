import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";
import { db } from "./db";
import { SYSTEM_PROMPT } from "./prompt";

// SEO-Writer: Claude schreibt jede Woche einen Magazin-Artikel zu einer Suchanfrage, die
// Kunden wirklich eingeben („Website für Friseur Dortmund“). Erst als Entwurf – online geht er,
// sobald Pankaj ihn im Admin (Reiter „Heute“) freigibt. Artikel liegen in D1 (Tabelle `articles`),
// Seiten unter /magazin/<slug>, Sitemap unter /sitemap-magazin.xml.

export type Section = { heading: string; paragraphs: string[]; bullets: string[] };
export type Article = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  sections: string; // JSON Section[]
  faq: string; // JSON {q,a}[]
  status: "entwurf" | "live";
  created_at: string;
  published_at: string;
};

const BRANCHES = ["Friseur", "Kosmetikstudio", "Handwerker", "Elektriker", "Malerbetrieb", "Kfz-Werkstatt", "Physiotherapie", "Arztpraxis", "Restaurant", "Café", "Imbiss", "Fitnessstudio", "Nagelstudio", "Barbershop", "Fahrschule", "Nachhilfe", "Verein", "Schneiderei"];
const PATTERNS = [
  (b: string) => `Website für ${b} Dortmund`,
  (b: string) => `Online-Terminbuchung für ${b}`,
  (b: string) => `Was kostet eine Website für ${b}`,
  (b: string) => `Mehr Kunden für ${b} über Google`,
];
// Reihenfolge: erst alle Branchen mit Muster 1, dann Muster 2 …
export const KEYWORDS = PATTERNS.flatMap((p) => BRANCHES.map(p));

const table = async (env: Env) => {
  const database = await db(env);
  await database
    .prepare(
      "CREATE TABLE IF NOT EXISTS articles (slug TEXT PRIMARY KEY, keyword TEXT, title TEXT, description TEXT, intro TEXT, sections TEXT, faq TEXT, status TEXT, created_at TEXT, published_at TEXT)",
    )
    .run();
  return database;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "intro", "sections", "faq"],
  properties: {
    title: { type: "string", description: "SEO-Titel, max. 60 Zeichen, Keyword vorne" },
    description: { type: "string", description: "Meta-Beschreibung, 140–155 Zeichen" },
    intro: { type: "string" },
    sections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["heading", "paragraphs", "bullets"],
        properties: { heading: { type: "string" }, paragraphs: { type: "array", items: { type: "string" } }, bullets: { type: "array", items: { type: "string" } } },
      },
    },
    faq: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["q", "a"], properties: { q: { type: "string" }, a: { type: "string" } } },
    },
  },
};

/** Nächsten Artikel als Entwurf schreiben (Keyword reihum, schon behandelte werden übersprungen) */
export const writeNextArticle = async (env: Env, keyword?: string) => {
  const database = await table(env);
  const used = new Set((await database.prepare("SELECT keyword FROM articles").all<{ keyword: string }>()).results.map((r) => r.keyword));
  const kw = keyword || KEYWORDS.find((k) => !used.has(k));
  if (!kw) return null;

  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.beta.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 12000,
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: `${SYSTEM_PROMPT}

Du schreibst jetzt einen Ratgeber-Artikel für das Magazin von PS Professional Solutions (Dortmund).
- Ziel: Inhaber kleiner Betriebe, die genau diese Suchanfrage bei Google eingeben, wirklich weiterhelfen – und am Ende zum kostenlosen Erstgespräch einladen.
- 900–1300 Wörter, Sie-Form, einfache Sprache, konkrete Tipps und Beispiele aus dem Alltag der Branche.
- Keyword natürlich im Titel, in der Einleitung und in 1–2 Zwischenüberschriften. Kein Keyword-Stuffing.
- 5–7 Abschnitte (Zwischenüberschrift + 1–3 Absätze, optional Stichpunkte), danach 4–5 FAQ.
- Preise nur aus den Angaben oben, immer als „ab“. Keine Ranking-Garantien, keine erfundenen Zahlen, Studien oder Kunden.
- Letzter Abschnitt: kurzer, freundlicher Hinweis auf das kostenlose Erstgespräch (Termin unter ps-professional-solutions.de/analyse-bestaetigungen).
- Reiner Text ohne Markdown-Zeichen.`,
    messages: [{ role: "user", content: `Suchanfrage: „${kw}“` }],
  });
  if (response.stop_reason === "refusal") throw new Error("refusal");
  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  const a = JSON.parse(text) as { title: string; description: string; intro: string; sections: Section[]; faq: { q: string; a: string }[] };
  let slug = slugify(kw);
  if (await database.prepare("SELECT 1 FROM articles WHERE slug = ?").bind(slug).first()) slug = `${slug}-${Date.now().toString(36)}`;
  await database
    .prepare("INSERT INTO articles (slug, keyword, title, description, intro, sections, faq, status, created_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'entwurf', ?, '')")
    .bind(slug, kw, a.title, a.description, a.intro, JSON.stringify(a.sections), JSON.stringify(a.faq), new Date().toISOString())
    .run();
  return { slug, keyword: kw, title: a.title };
};

export const listArticles = async (env: Env, onlyLive: boolean) =>
  (
    await (await table(env))
      .prepare(`SELECT * FROM articles ${onlyLive ? "WHERE status = 'live'" : ""} ORDER BY CASE status WHEN 'entwurf' THEN 0 ELSE 1 END, COALESCE(NULLIF(published_at,''), created_at) DESC`)
      .all<Article>()
  ).results;

export const getArticle = async (env: Env, slug: string) =>
  (await table(env)).prepare("SELECT * FROM articles WHERE slug = ?").bind(slug).first<Article>();

export const publishArticle = async (env: Env, slug: string) =>
  (await table(env)).prepare("UPDATE articles SET status = 'live', published_at = ? WHERE slug = ?").bind(new Date().toISOString(), slug).run();

export const deleteArticle = async (env: Env, slug: string) => (await table(env)).prepare("DELETE FROM articles WHERE slug = ?").bind(slug).run();

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Artikel als einfaches HTML (für Crawler ohne JavaScript) */
export const articleHtml = (a: Article) => {
  const sections = JSON.parse(a.sections || "[]") as Section[];
  const faq = JSON.parse(a.faq || "[]") as { q: string; a: string }[];
  return `<article><h1>${esc(a.title)}</h1><p>${esc(a.intro)}</p>${sections
    .map(
      (s) =>
        `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}${s.bullets.length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}`,
    )
    .join("")}${faq.length ? `<h2>Häufige Fragen</h2>${faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}</article>`;
};

export const articleSchema = (a: Article) => {
  const faq = JSON.parse(a.faq || "[]") as { q: string; a: string }[];
  const url = `https://ps-professional-solutions.de/magazin/${a.slug}`;
  return [
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      datePublished: a.published_at || a.created_at,
      author: { "@type": "Person", name: "Pankaj Mondjal" },
      publisher: { "@type": "Organization", name: "PS Professional Solutions", url: "https://ps-professional-solutions.de" },
      mainEntityOfPage: url,
    }),
    ...(faq.length
      ? [
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        ]
      : []),
  ];
};
