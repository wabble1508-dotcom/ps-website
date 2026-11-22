import type { Env } from "./env";
import { db } from "./db";
import { pushToCrm, type CrmLead } from "./crm";
import { sendDueMails, startFlow, stopFlows } from "./emailFlow";
import { writeNextArticle } from "./articles";
import { sendReminders } from "./reminders";

// Akquise: Betriebe aus OpenStreetMap finden (kostenlos, ohne Schlüssel), Nachrichten aus Vorlagen (ohne KI-Kosten),
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

// Nachrichten aus festen Vorlagen (kostenlos, ohne KI). Name, Branche und Ort werden eingesetzt.
// Texte unten direkt anpassen (HOOK pro Branche, Angebot, Fragen).
const SIGNATURE = "Viele Grüße\nPankaj Mondjal\nPS Professional Solutions\n+49 1520 7595260 · ps-professional-solutions.de";

// Pro Branche ein kurzer Satz, wie Kunden heute suchen bzw. buchen
const HOOK: Record<string, string> = {
  friseur: "viele Kundinnen und Kunden suchen ihren Friseur heute bei Google und buchen den Termin direkt online",
  kosmetik: "viele Kundinnen suchen Kosmetik- und Nagelstudios bei Google und buchen am liebsten direkt online",
  handwerk: "viele Kunden suchen Handwerker heute zuerst bei Google und fragen direkt über die Website an",
  kfz: "viele Autofahrer suchen ihre Werkstatt bei Google und vereinbaren den Termin am liebsten online",
  restaurant: "viele Gäste schauen vor dem Besuch online nach Speisekarte, Öffnungszeiten und Reservierung",
  cafe: "viele Gäste schauen vorher online nach Öffnungszeiten, Angebot und Fotos",
  imbiss: "viele Gäste suchen abends bei Google nach Speisekarte und Bestellmöglichkeit",
  physio: "viele Patienten suchen ihre Praxis bei Google und möchten Termine online anfragen",
  praxis: "viele Patienten suchen Praxen bei Google und möchten Termine online anfragen",
  fitness: "viele Interessenten vergleichen Studios online und buchen ein Probetraining direkt über die Website",
  schneiderei: "viele Kunden suchen Änderungsschneidereien bei Google und wollen vorher Preise und Öffnungszeiten sehen",
  laden: "viele Kunden schauen vor dem Besuch online nach Öffnungszeiten und Angebot",
};

export const templateMessages = (p: Pick<Prospect, "name" | "category" | "city" | "address" | "website">) => {
  const branche = CATEGORIES[p.category]?.label || p.category;
  const ort = p.city || p.address;
  const hook = HOOK[p.category] || "viele Kunden suchen lokale Betriebe heute zuerst bei Google";
  const offer = p.website
    ? `Ich biete Ihnen gern einen kostenlosen Website-Check an: Ich schaue mir Ihre Seite an und sage Ihnen die 3 wichtigsten Punkte, die Ihnen gerade Kunden kosten.`
    : `Mir ist aufgefallen, dass ich für ${p.name} keine eigene Website gefunden habe. Bei uns gibt es eine moderne Website ab 49 € im Monat, 0 € Einrichtung, monatlich kündbar.`;
  const question = p.website ? "Darf ich Ihnen den kurzen Check schicken?" : "Darf ich Ihnen zwei Beispiele aus Ihrer Branche schicken?";
  return {
    call_script: [
      `Begrüßung: Guten Tag, hier ist Pankaj Mondjal von PS Professional Solutions aus Dortmund. Ich rufe an, weil ${hook} – und ich helfe Betrieben wie ${p.name} genau dabei.`,
      `Frage: Wie finden neue Kunden Sie heute, und wie laufen bei Ihnen Anfragen oder Termine?`,
      `Ziel: Darf ich Ihnen kurz Infos per E-Mail oder WhatsApp schicken – oder passt ein 15-Minuten-Termin diese Woche?`,
      `Wenn ‚keine Zeit‘: Kein Problem – darf ich Ihnen die Infos einfach kurz schicken, dann schauen Sie in Ruhe rein?`,
      `Wenn ‚haben Instagram/Facebook‘: Super, das ist eine gute Basis – eine Website sorgt zusätzlich dafür, dass man Sie bei Google findet.`,
      `Wenn ‚zu teuer‘: Verstehe ich – darum gibt es bei uns 0 € Einrichtung und monatlich kündbar ab 49 €.`,
      `Wenn ‚kein Interesse‘: Alles klar, danke für Ihre Zeit und weiterhin viel Erfolg!`,
    ].join("\n"),
    whatsapp: `Guten Tag, hier ist Pankaj von PS Professional Solutions aus Dortmund. ${hook.charAt(0).toUpperCase()}${hook.slice(1)}. ${offer} ${question}`,
    instagram: `Hi 👋 Pankaj hier von PS Professional Solutions aus Dortmund. ${p.website ? "Ich mache gerade kostenlose Website-Checks für Betriebe in " + ort + "." : "Ich habe für euch keine Website gefunden – ich baue moderne Websites ab 49 €/Monat."} ${question}`,
    email_subject: p.website ? `Kostenloser Website-Check für ${p.name}` : `Website für ${p.name}`,
    email_body: `Guten Tag,\n\nich bin Pankaj Mondjal von PS Professional Solutions aus Dortmund. ${hook.charAt(0).toUpperCase()}${hook.slice(1)} – das gilt auch für ${branche} in ${ort}.\n\n${offer}\n\n${question}\n\n${SIGNATURE}\n\nKein Interesse? Kurze Antwort genügt, dann melde ich mich nicht wieder.`,
  };
};

export const writeMessages = async (env: Env, p: Prospect) => {
  const messages = templateMessages(p);
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
    const results = await Promise.allSettled(list.map((p) => writeMessages(env, p)));
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
  if (step === "emails") return { ...(await sendDueMails(env)), ...(await sendReminders(env)) };
  if (step === "article") {
    // höchstens ein neuer Entwurf pro 6 Tage
    const last = await getSetting(env, "article_last");
    if (last && Date.now() - Date.parse(last.updated_at) < 6 * 86400_000) return { skipped: true };
    await setSetting(env, "article_last", new Date().toISOString());
    const a = await writeNextArticle(env);
    if (a) await notify(`Neuer Magazin-Artikel zur Freigabe: ${a.title}`, `Claude hat einen Ratgeber-Artikel zum Suchbegriff „${a.keyword}“ geschrieben.\n\nLesen und mit einem Tipp freigeben: ps-professional-solutions.de/admin → Heute`);
    return { article: a?.title || null };
  }
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
