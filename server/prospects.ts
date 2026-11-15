import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";
import { db } from "./db";

// Akquise: Betriebe aus OpenStreetMap finden (kostenlos, ohne Schlüssel), KI-Nachrichten schreiben,
// Status verfolgen. Verschickt wird NICHTS automatisch – der Inhaber tippt selbst auf „Senden“.

export const CATEGORIES: Record<string, { label: string; filter: string[] }> = {
  friseur: { label: "Friseure & Barber", filter: ['["shop"="hairdresser"]'] },
  kosmetik: { label: "Kosmetik & Nagelstudios", filter: ['["shop"="beauty"]', '["shop"="cosmetics"]'] },
  handwerk: { label: "Handwerker", filter: ['["craft"]'] },
  kfz: { label: "Kfz-Werkstätten", filter: ['["shop"="car_repair"]'] },
  restaurant: { label: "Restaurants", filter: ['["amenity"="restaurant"]'] },
  cafe: { label: "Cafés & Bäckereien", filter: ['["amenity"="cafe"]', '["shop"="bakery"]'] },
  imbiss: { label: "Imbisse", filter: ['["amenity"="fast_food"]'] },
  physio: { label: "Physiotherapie", filter: ['["healthcare"="physiotherapist"]'] },
  praxis: { label: "Arzt- & Zahnarztpraxen", filter: ['["amenity"="doctors"]', '["amenity"="dentist"]'] },
  fitness: { label: "Fitnessstudios", filter: ['["leisure"="fitness_centre"]'] },
  schneiderei: { label: "Schneidereien & Textil", filter: ['["shop"="tailor"]', '["craft"="tailor"]', '["shop"="clothes"]'] },
  laden: { label: "Einzelhandel (Läden)", filter: ['["shop"="florist"]', '["shop"="gift"]', '["shop"="kiosk"]', '["shop"="optician"]'] },
};

export const STATUSES = ["neu", "angeschrieben", "antwort", "termin", "kunde", "kein-interesse"] as const;
export type Status = (typeof STATUSES)[number];

export type Prospect = {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  status: Status;
  note: string;
  messages: string;
  created_at: string;
  updated_at: string;
};

const ensureTable = async (env: Env) => {
  const database = await db(env);
  await database
    .prepare(
      "CREATE TABLE IF NOT EXISTS prospects (id TEXT PRIMARY KEY, name TEXT, category TEXT, city TEXT, address TEXT, phone TEXT, email TEXT, website TEXT, instagram TEXT, status TEXT, note TEXT, messages TEXT, created_at TEXT, updated_at TEXT)",
    )
    .run();
  // Nicht mehr bearbeitete Kontakte nach 12 Monaten löschen (DSGVO: nicht länger als nötig)
  const cutoff = new Date(Date.now() - 365 * 86400_000).toISOString();
  await database.prepare("DELETE FROM prospects WHERE updated_at < ? AND status IN ('neu','kein-interesse')").bind(cutoff).run();
  return database;
};

type OsmElement = { type: string; id: number; tags?: Record<string, string> };

const first = (tags: Record<string, string>, keys: string[]) => keys.map((k) => tags[k]).find(Boolean) || "";

// Betriebe in einem Ort suchen und neue in die Liste übernehmen
export const searchProspects = async (env: Env, category: string, city: string, onlyWithoutWebsite: boolean) => {
  const cat = CATEGORIES[category];
  if (!cat) throw new Error("Unbekannte Branche");
  const place = city.replace(/["\\]/g, "").trim().slice(0, 60) || "Dortmund";
  const query = `[out:json][timeout:25];
area["name"="${place}"]["boundary"="administrative"]->.a;
(${cat.filter.map((f) => `nwr${f}["name"](area.a);`).join("")});
out tags 300;`;
  // Zwei öffentliche OpenStreetMap-Server – wenn einer überlastet ist, wird der andere gefragt
  let data: { elements?: OsmElement[] } | null = null;
  for (const server of ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]) {
    try {
      const res = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "ps-professional-solutions.de Akquise" },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (res.ok) {
        data = (await res.json()) as { elements?: OsmElement[] };
        break;
      }
      console.error("Overpass", server, res.status);
    } catch (err) {
      console.error("Overpass", server, err);
    }
  }
  if (!data) throw new Error("OpenStreetMap ist gerade überlastet – bitte in einer Minute nochmal auf „Suchen“ tippen");
  const database = await ensureTable(env);
  const now = new Date().toISOString();
  let added = 0;
  let found = 0;
  for (const el of data.elements || []) {
    const t = el.tags || {};
    const website = first(t, ["website", "contact:website", "url"]);
    if (onlyWithoutWebsite && website) continue;
    found++;
    const address = [first(t, ["addr:street"]) + (t["addr:housenumber"] ? ` ${t["addr:housenumber"]}` : ""), [t["addr:postcode"], t["addr:city"] || place].filter(Boolean).join(" ")]
      .filter((x) => x.trim())
      .join(", ");
    const instagram = first(t, ["contact:instagram", "instagram"]).replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/[/@]/g, "");
    const r = await database
      .prepare(
        "INSERT OR IGNORE INTO prospects (id, name, category, city, address, phone, email, website, instagram, status, note, messages, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'neu', '', '', ?, ?)",
      )
      .bind(
        `osm-${el.type}-${el.id}`,
        t.name,
        category,
        place,
        address,
        first(t, ["contact:mobile", "phone", "contact:phone"]),
        first(t, ["email", "contact:email"]),
        website,
        instagram,
        now,
        now,
      )
      .run();
    if ((r.meta.changes ?? 0) > 0) added++;
  }
  return { found, added };
};

export const listProspects = async (env: Env) => {
  const { results } = await (await ensureTable(env)).prepare("SELECT * FROM prospects ORDER BY updated_at DESC LIMIT 1000").all<Prospect>();
  return results;
};

export const updateProspect = async (env: Env, id: string, fields: Partial<Pick<Prospect, "status" | "note" | "phone" | "email" | "instagram" | "messages">>) => {
  const allowed = ["status", "note", "phone", "email", "instagram", "messages"] as const;
  const sets = allowed.filter((k) => typeof fields[k] === "string");
  if (!sets.length) return;
  if (fields.status && !STATUSES.includes(fields.status)) throw new Error("Unbekannter Status");
  await (await ensureTable(env))
    .prepare(`UPDATE prospects SET ${sets.map((k) => `${k} = ?`).join(", ")}, updated_at = ? WHERE id = ?`)
    .bind(...sets.map((k) => String(fields[k]).slice(0, 4000)), new Date().toISOString(), id)
    .run();
};

export const deleteProspect = async (env: Env, id: string) => {
  await (await ensureTable(env)).prepare("DELETE FROM prospects WHERE id = ?").bind(id).run();
};

const MESSAGE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["whatsapp", "instagram", "email_subject", "email_body"],
  properties: {
    whatsapp: { type: "string" },
    instagram: { type: "string" },
    email_subject: { type: "string" },
    email_body: { type: "string" },
  },
};

const RULES = `Du schreibst als Pankaj Mondjal (PS Professional Solutions, Dortmund) eine erste, persönliche Nachricht an einen lokalen Betrieb.
Ziel: ein kurzes, kostenloses Erstgespräch oder einen kostenlosen Website-Check anbieten – nicht verkaufen.
Regeln:
- Sie-Form, freundlich, wie von einem Menschen aus der Region. Keine Floskeln wie „Ich hoffe, diese Nachricht erreicht Sie gut“.
- Konkreter Bezug zum Betrieb: Name, Branche, Ort. Wenn keine Website bekannt ist: darauf eingehen (Kunden suchen bei Google, buchen online). Wenn eine Website existiert: kostenlosen Website-Check anbieten, nichts über die Website behaupten, was du nicht weißt.
- Höchstens einen Preis nennen und nur aus den Angaben oben (z. B. „ab 49 € im Monat, 0 € Einrichtung“).
- Ende mit einer einfachen Ja/Nein-Frage („Darf ich Ihnen zwei Beispiele aus Ihrer Branche schicken?“).
- WhatsApp: max. 4 kurze Sätze, 0–1 Emoji. Instagram-DM: max. 3 Sätze, locker, 1 Emoji.
- E-Mail: Betreff max. 7 Wörter, Text max. 120 Wörter, Gruß „Viele Grüße\\nPankaj Mondjal\\nPS Professional Solutions\\n+49 1520 7595260 · ps-professional-solutions.de“,
  letzte Zeile: „Kein Interesse? Kurze Antwort genügt, dann melde ich mich nicht wieder.“
- Erfinde keine Referenzen, Zahlen oder Zusagen. Kein Markdown.`;

export const writeMessages = async (env: Env, p: Prospect, systemPrompt: string) => {
  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: MESSAGE_SCHEMA } },
    system: `${systemPrompt}\n\n${RULES}`,
    messages: [
      {
        role: "user",
        content: `Betrieb: ${p.name}\nBranche: ${CATEGORIES[p.category]?.label || p.category}\nOrt: ${p.address || p.city}\nWebsite: ${p.website || "keine bekannt"}\nNotiz von Pankaj: ${p.note || "–"}`,
      },
    ],
  });
  if (response.stop_reason === "refusal") throw new Error("Die KI hat die Nachricht abgelehnt");
  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  const messages = JSON.parse(text) as Record<string, string>;
  await updateProspect(env, p.id, { messages: JSON.stringify(messages) });
  return messages;
};

export const getProspect = async (env: Env, id: string) =>
  (await ensureTable(env)).prepare("SELECT * FROM prospects WHERE id = ?").bind(id).first<Prospect>();
