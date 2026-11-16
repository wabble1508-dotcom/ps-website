import Anthropic from "@anthropic-ai/sdk";
import type { Env } from "./env";
import { db } from "./db";
import { pushToCrm, type CrmLead } from "./crm";
import { sendDueMails, startFlow, stopFlows } from "./emailFlow";

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

export const STATUSES = ["neu", "angeschrieben", "infos", "antwort", "termin", "kunde", "kein-interesse"] as const;
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
  attempts: number;
  next_call_at: string;
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
  // Spalten für den Anruf-Modus (ältere Tabellen nachrüsten)
  for (const col of ["attempts INTEGER DEFAULT 0", "next_call_at TEXT DEFAULT ''"]) {
    try {
      await database.prepare(`ALTER TABLE prospects ADD COLUMN ${col}`).run();
    } catch {
      // Spalte existiert schon
    }
  }
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
  for (const server of ["https://overpass-api.de/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"]) {
    try {
      const res = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "ps-professional-solutions.de Akquise" },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(35_000),
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
  let found = 0;
  const statements = [];
  for (const el of data.elements || []) {
    const t = el.tags || {};
    const website = first(t, ["website", "contact:website", "url"]);
    if (onlyWithoutWebsite && website) continue;
    found++;
    const address = [first(t, ["addr:street"]) + (t["addr:housenumber"] ? ` ${t["addr:housenumber"]}` : ""), [t["addr:postcode"], t["addr:city"] || place].filter(Boolean).join(" ")]
      .filter((x) => x.trim())
      .join(", ");
    const instagram = first(t, ["contact:instagram", "instagram"]).replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/[/@]/g, "");
    statements.push(
      database
        .prepare(
          "INSERT OR IGNORE INTO prospects (id, name, category, city, address, phone, email, website, instagram, status, note, messages, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'neu', '', '', ?, ?)",
        )
        .bind(`osm-${el.type}-${el.id}`, t.name, category, place, address, first(t, ["contact:mobile", "phone", "contact:phone"]), first(t, ["email", "contact:email"]), website, instagram, now, now),
    );
  }
  // In einem Rutsch speichern (schnell, bleibt unter Cloudflares Zeitgrenze)
  let added = 0;
  for (let i = 0; i < statements.length; i += 50) {
    const res = await database.batch(statements.slice(i, i + 50));
    added += res.reduce((n, r) => n + (r.meta.changes ?? 0), 0);
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
  required: ["call_script", "whatsapp", "instagram", "email_subject", "email_body"],
  properties: {
    call_script: { type: "string", description: "Telefon-Leitfaden mit Zeilenumbrüchen" },
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
- Anruf-Leitfaden (call_script) für Pankaj, kurz und natürlich gesprochen, als Zeilen:
  „Begrüßung:“ (Name, PS Professional Solutions aus Dortmund, Grund in einem Satz mit Bezug zum Betrieb) /
  „Frage:“ eine offene Frage (z. B. wie Kunden heute Termine buchen) /
  „Ziel:“ Erlaubnis, Infos per E-Mail oder WhatsApp zu schicken, oder 15-Minuten-Termin /
  „Wenn ‚keine Zeit‘:“ / „Wenn ‚haben Instagram/Facebook‘:“ / „Wenn ‚zu teuer‘:“ / „Wenn ‚kein Interesse‘:“ – jeweils ein kurzer, respektvoller Satz.
  Bei „kein Interesse“ freundlich verabschieden, nicht drängen.
- Erfinde keine Referenzen, Zahlen oder Zusagen. Kein Markdown.`;

export const writeMessages = async (env: Env, p: Prospect, systemPrompt: string) => {
  const client = new Anthropic({ apiKey: (env.ANTHROPIC_API_KEY || "").trim(), baseURL: env.ANTHROPIC_BASE_URL || undefined });
  const response = await client.beta.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 2500,
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

// Akquise-Status → Phase in WebsiteNova
const STAGE: Record<Status, CrmLead["stage"]> = {
  neu: "Neu",
  angeschrieben: "Neu",
  infos: "Im Gespräch",
  antwort: "Im Gespräch",
  termin: "Im Gespräch",
  kunde: "Gewonnen",
  "kein-interesse": "Verloren",
};
const STATUS_TEXT: Record<Status, string> = {
  neu: "Neu",
  angeschrieben: "Angeschrieben",
  infos: "Will Infos – automatische E-Mails laufen",
  antwort: "Hat geantwortet",
  termin: "Termin vereinbart",
  kunde: "Ist Kunde geworden 🎉",
  "kein-interesse": "Kein Interesse",
};

/** Betrieb ins CRM übertragen (erst sobald er kontaktiert wurde – unberührte Suchtreffer bleiben draußen) */
export const syncProspect = async (env: Env, id: string, entry?: string) => {
  const p = await getProspect(env, id);
  if (!p || p.status === "neu") return null;
  return pushToCrm(env, {
    external_ref: `ps-akquise:${p.id}`,
    company_name: p.name,
    email: p.email || undefined,
    phone: p.phone || undefined,
    website: p.website || undefined,
    industry: CATEGORIES[p.category]?.label || p.category,
    source: "Akquise (OpenStreetMap)",
    notes: [p.address, p.instagram && `Instagram: @${p.instagram}`, p.note].filter(Boolean).join("\n") || undefined,
    stage: STAGE[p.status],
    entry: entry || `Status: ${STATUS_TEXT[p.status]}`,
  });
};

/** Nachricht wurde über WhatsApp/Instagram/E-Mail geöffnet → als „angeschrieben“ markieren und Text im CRM-Verlauf ablegen */
export const markContacted = async (env: Env, id: string, channel: string, text: string) => {
  const p = await getProspect(env, id);
  if (!p) return null;
  if (p.status === "neu") await updateProspect(env, id, { status: "angeschrieben" });
  const label = { whatsapp: "WhatsApp", instagram: "Instagram-DM", email: "E-Mail" }[channel] || channel;
  return syncProspect(env, id, `${label} geöffnet/gesendet:\n${text.slice(0, 4000)}`);
};

// ---------------------------------------------------------------------------------------------
// Tagesliste (läuft jeden Morgen über GitHub Actions, .github/workflows/akquise-tagesliste.yml):
// sucht die nächste Branche/Stadt, schreibt für bis zu 10 neue Betriebe (mit Telefonnummer zuerst)
// die Nachrichten vor und schickt dem Inhaber eine E-Mail. Verschickt selbst NICHTS an Betriebe.
// ---------------------------------------------------------------------------------------------
const CITIES = ["Dortmund", "Bochum", "Lünen", "Castrop-Rauxel", "Unna", "Schwerte", "Herne", "Witten", "Kamen", "Waltrop"];
const DAILY_CATEGORIES = ["friseur", "kosmetik", "handwerk", "kfz", "physio", "restaurant", "cafe", "imbiss", "fitness", "schneiderei", "praxis", "laden"];
const DAILY_LIMIT = 10;

const getSetting = async (env: Env, key: string) =>
  (await db(env)).prepare("SELECT value, updated_at FROM settings WHERE key = ?").bind(key).first<{ value: string; updated_at: string }>();
const setSetting = async (env: Env, key: string, value: string) =>
  (await db(env))
    .prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(key, value, new Date().toISOString())
    .run();

const waitingList = async (env: Env, onlyWithoutMessages: boolean) =>
  (
    await (await ensureTable(env))
      .prepare(
        `SELECT * FROM prospects WHERE status = 'neu' ${onlyWithoutMessages ? "AND (messages IS NULL OR messages = '')" : "AND messages <> ''"} ORDER BY (phone = ''), created_at LIMIT ?`,
      )
      .bind(DAILY_LIMIT)
      .all<Prospect>()
  ).results;

// Jeder Schritt bleibt unter Cloudflares 100-Sekunden-Grenze und ist beliebig oft aufrufbar
// (er tut nur etwas, wenn es etwas zu tun gibt) – darum ohne Passwort sicher.
export const dailyStep = async (env: Env, step: string, systemPrompt: string, notify: (subject: string, text: string) => Promise<unknown>) => {
  if (step === "search") {
    if ((await waitingList(env, true)).length + (await waitingList(env, false)).length >= DAILY_LIMIT) return { searched: 0, enough: true };
    const pos = Number((await getSetting(env, "akquise_daily_pos"))?.value || 0);
    const category = DAILY_CATEGORIES[pos % DAILY_CATEGORIES.length];
    const city = CITIES[Math.floor(pos / DAILY_CATEGORIES.length) % CITIES.length];
    await setSetting(env, "akquise_daily_pos", String(pos + 1));
    const r = await searchProspects(env, category, city, true);
    return { searched: 1, label: `${CATEGORIES[category].label} in ${city}`, found: r.found, added: r.added };
  }
  if (step === "write") {
    const list = await waitingList(env, true);
    const results = await Promise.allSettled(list.map((p) => writeMessages(env, p, systemPrompt)));
    results.forEach((r, i) => r.status === "rejected" && console.error("Tagesliste", list[i].name, r.reason));
    return { written: results.filter((r) => r.status === "fulfilled").length };
  }
  if (step === "mail") {
    const last = await getSetting(env, "akquise_daily_last");
    if (last && Date.now() - Date.parse(last.updated_at) < 20 * 3600_000) return { mailed: false, reason: "heute schon verschickt" };
    const ready = await waitingList(env, false);
    if (!ready.length) return { mailed: false, reason: "nichts vorbereitet" };
    await setSetting(env, "akquise_daily_last", new Date().toISOString());
    const lines = ready.map(
      (p, i) =>
        `${i + 1}. ${p.name} – ${CATEGORIES[p.category]?.label || p.category}, ${p.address || p.city}${p.phone ? `\n   📞 ${p.phone}` : "\n   (keine Nummer – kurz bei Google Maps nachsehen)"}`,
    );
    await notify(
      `Deine Akquise-Tagesliste: ${ready.length} Betriebe, Nachrichten fertig`,
      `Guten Morgen! Für heute ist alles vorbereitet:\n\n${lines.join("\n\n")}\n\nSo geht's (ca. 20 Minuten):\n1. ps-professional-solutions.de/admin → Akquise → „📞 Anruf-Modus starten“\n2. Anrufen, Gesprächsleitfaden steht da\n3. Ergebnis antippen – E-Mails, WhatsApp-Text, Wiedervorlage und WebsiteNova laufen automatisch.`,
    );
    return { mailed: true, count: ready.length };
  }
  if (step === "emails") return sendDueMails(env);
  throw new Error("unbekannter Schritt");
};

/** Status „Will Infos“ startet die automatischen E-Mails, jeder spätere Status beendet sie */
export const handleFlowForStatus = async (env: Env, id: string) => {
  const p = await getProspect(env, id);
  if (!p?.email) return p?.status === "infos" ? "Für automatische E-Mails bitte erst die E-Mail-Adresse eintragen." : null;
  if (p.status === "infos") {
    await startFlow(env, {
      kind: "akquise",
      email: p.email,
      company: p.name,
      context: `${CATEGORIES[p.category]?.label || p.category} in ${p.address || p.city}. ${p.website ? `Hat eine Website: ${p.website}.` : "Keine Website gefunden."} ${p.note}`,
      crmRef: `ps-akquise:${p.id}`,
    });
  } else if (["antwort", "termin", "kunde", "kein-interesse"].includes(p.status)) {
    await stopFlows(env, p.email, STATUS_TEXT[p.status]);
  }
  return null;
};

/** Ergebnis eines Anrufs aus dem Anruf-Modus verarbeiten */
export const callResult = async (env: Env, id: string, result: string, email?: string, note?: string) => {
  const p = await getProspect(env, id);
  if (!p) throw new Error("nicht gefunden");
  const database = await ensureTable(env);
  const now = Date.now();
  // nächster Anrufversuch: ein Werktag (bzw. 3 Tage) später um 10 Uhr
  const later = (days: number) => {
    const d = new Date(now + days * 86400_000);
    while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
    d.setUTCHours(8, 0, 0, 0);
    return d.toISOString();
  };
  const stamp = new Date(now).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" });
  const addNote = (text: string) => [p.note, `${stamp}: ${text}${note ? ` – ${note}` : ""}`].filter(Boolean).join("\n").slice(-3000);

  if (result === "nicht-erreicht" || result === "spaeter") {
    const attempts = (p.attempts || 0) + (result === "nicht-erreicht" ? 1 : 0);
    await database
      .prepare("UPDATE prospects SET attempts = ?, next_call_at = ?, note = ?, updated_at = ? WHERE id = ?")
      .bind(attempts, later(result === "spaeter" ? 3 : 1), addNote(result === "spaeter" ? "Später nochmal anrufen" : `Nicht erreicht (Versuch ${attempts})`), new Date(now).toISOString(), id)
      .run();
    return { ok: true };
  }
  const map: Record<string, { status: Status; text: string }> = {
    "infos-email": { status: "infos", text: "Telefonat: möchte Infos per E-Mail" },
    "infos-whatsapp": { status: "angeschrieben", text: "Telefonat: möchte Infos per WhatsApp" },
    termin: { status: "termin", text: "Telefonat: Termin vereinbart" },
    "kein-interesse": { status: "kein-interesse", text: "Telefonat: kein Interesse" },
  };
  const m = map[result];
  if (!m) throw new Error("unbekanntes Ergebnis");
  if (result === "infos-email" && !(email || p.email)) throw new Error("Bitte die E-Mail-Adresse eintragen.");
  await updateProspect(env, id, { status: m.status, note: addNote(m.text), ...(email ? { email: email.trim() } : {}) });
  await syncProspect(env, id, `${m.text}${note ? `\nNotiz: ${note}` : ""}`);
  const warning = await handleFlowForStatus(env, id);
  return { ok: true, warning };
};
