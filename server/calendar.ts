import type { Env } from "./env";
import { BOOKING, COMPANY } from "./config";

// Kalender-Anbindung (z. B. Apple Kalender):
// 1. Gebuchte Termine als Kalender-Abo (ICS) – /api/calendar?key=… (Schlüssel aus ADMIN_PASSWORD abgeleitet)
// 2. Belegte Zeiten aus einem freigegebenen Kalender (BUSY_CALENDAR_URL, z. B. iCloud „Öffentlicher Kalender“)
//    blockieren freie Termine im Buchungskalender.
// 3. Einzeltermin als .ics-Anhang für die Bestätigungs-Mails.

export type Interval = { start: number; end: number };
export type Booking = { id: string; slot: string; first_name: string; last_name: string; email: string; phone: string; note: string };

const SLOT_MS = BOOKING.slotMinutes * 60_000;

// ---------- ICS erzeugen ----------
const icsDate = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
// Zeilen nach RFC 5545 auf 75 Zeichen umbrechen
const fold = (line: string) => line.match(/.{1,74}/g)?.join("\r\n ") ?? line;

const vevent = (uid: string, start: number, summary: string, description: string, extra: string[] = []) =>
  [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(start + SLOT_MS)}`,
    `SUMMARY:${icsText(summary)}`,
    `DESCRIPTION:${icsText(description)}`,
    ...extra,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT15M",
    `DESCRIPTION:${icsText(summary)}`,
    "END:VALARM",
    "END:VEVENT",
  ];

const calendar = (name: string, events: string[][], method?: string) =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${COMPANY.name}//Terminbuchung//DE`,
    "CALSCALE:GREGORIAN",
    ...(method ? [`METHOD:${method}`] : []),
    `X-WR-CALNAME:${icsText(name)}`,
    "X-WR-TIMEZONE:Europe/Berlin",
    "REFRESH-INTERVAL;VALUE=DURATION:PT15M",
    "X-PUBLISHED-TTL:PT15M",
    ...events.flat(),
    "END:VCALENDAR",
  ]
    .map(fold)
    .join("\r\n") + "\r\n";

/** Alle Buchungen als abonnierbarer Kalender (für den Inhaber) */
export const bookingsCalendar = (bookings: Booking[]) =>
  calendar(
    `${COMPANY.name} – Termine`,
    bookings.map((b) => {
      const name = `${b.first_name} ${b.last_name}`.trim();
      const description = [`E-Mail: ${b.email}`, b.phone && `Telefon: ${b.phone}`, b.note && `Nachricht: ${b.note}`]
        .filter(Boolean)
        .join("\n");
      return vevent(`${b.id}@ps-professional-solutions.de`, Date.parse(b.slot), `Erstgespräch: ${name}`, description, [
        ...(b.phone ? [`URL:tel:${b.phone.replace(/[^\d+]/g, "")}`] : []),
      ]);
    }),
  );

/** Einzelner Termin als Anhang (Kunde bzw. Inhaber tippt darauf → im Kalender gespeichert) */
export const singleEventIcs = (uid: string, slotIso: string, summary: string, description: string) =>
  calendar(summary, [vevent(`${uid}@ps-professional-solutions.de`, Date.parse(slotIso), summary, description)], "PUBLISH");

/** Geheimer Schlüssel für die Abo-Adresse, abgeleitet aus dem Admin-Passwort */
export const calendarKey = async (env: Env) => {
  if (!env.ADMIN_PASSWORD) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.ADMIN_PASSWORD), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("kalender-abo"));
  return [...new Uint8Array(sig)].slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
};

// ---------- Belegte Zeiten aus einem freigegebenen Kalender lesen ----------
const unfold = (ics: string) => ics.replace(/\r?\n[ \t]/g, "");

// "20261109T090000Z", "20261109T090000" (mit TZID) oder "20261109" (ganztägig) → ms
const parseIcsDate = (value: string, params: string) => {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return NaN;
  const [, y, mo, d, h = "0", mi = "0", s = "0", z] = m;
  const asUtc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s);
  if (z) return asUtc;
  const tz = params.match(/TZID=([^;:]+)/)?.[1] || BOOKING.timeZone;
  // Ortszeit der angegebenen Zeitzone in UTC umrechnen
  const offset = (ms: number) => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
        .formatToParts(new Date(ms))
        .map((x) => [x.type, x.value]),
    );
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ms;
  };
  try {
    let utc = asUtc - offset(asUtc);
    utc = asUtc - offset(utc);
    return utc;
  } catch {
    return asUtc;
  }
};

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

/** Termine (inkl. einfacher Wiederholungen: täglich/wöchentlich/monatlich) im Zeitraum als Intervalle */
export const parseBusy = (ics: string, from: number, to: number): Interval[] => {
  const out: Interval[] = [];
  for (const block of unfold(ics).split("BEGIN:VEVENT").slice(1)) {
    const body = block.split("END:VEVENT")[0];
    const prop = (name: string) => {
      const m = body.match(new RegExp(`^${name}((?:;[^:\\r\\n]*)?):(.*)$`, "m"));
      return m ? { params: m[1], value: m[2].trim() } : null;
    };
    if (prop("STATUS")?.value === "CANCELLED" || prop("TRANSP")?.value === "TRANSPARENT") continue;
    const ds = prop("DTSTART");
    if (!ds) continue;
    const allDay = /VALUE=DATE(?!-)/.test(ds.params) || /^\d{8}$/.test(ds.value);
    const start = parseIcsDate(ds.value, ds.params);
    const de = prop("DTEND");
    let end = de ? parseIcsDate(de.value, de.params) : start + (allDay ? 86400_000 : 3600_000);
    if (Number.isNaN(start)) continue;
    if (Number.isNaN(end) || end <= start) end = start + (allDay ? 86400_000 : 3600_000);
    const length = end - start;

    const exdates = new Set(
      [...body.matchAll(/^EXDATE((?:;[^:\r\n]*)?):(.*)$/gm)].flatMap((m) => m[2].split(",").map((v) => parseIcsDate(v.trim(), m[1]))),
    );
    const add = (s: number) => {
      if (!exdates.has(s) && s < to && s + length > from) out.push({ start: s, end: s + length });
    };

    const rrule = prop("RRULE")?.value;
    if (!rrule) {
      add(start);
      continue;
    }
    const rule = Object.fromEntries(rrule.split(";").map((p) => p.split("=")));
    const interval = Math.max(1, Number(rule.INTERVAL) || 1);
    const until = rule.UNTIL ? parseIcsDate(rule.UNTIL, "") : Infinity;
    const count = rule.COUNT ? Number(rule.COUNT) : Infinity;
    const byDay = rule.BYDAY ? rule.BYDAY.split(",").map((d: string) => DAYS.indexOf(d.slice(-2))) : null;
    // Wiederholung in Ortszeit berechnen (bleibt über die Zeitumstellung hinweg zur selben Uhrzeit)
    const [, y0, m0, d0, rest = ""] = ds.value.match(/^(\d{4})(\d{2})(\d{2})(.*)$/) || [];
    const shifted = (days: number, months = 0) => {
      if (/Z$/.test(ds.value) || allDay || !y0) {
        const d = new Date(start);
        d.setUTCMonth(d.getUTCMonth() + months, d.getUTCDate() + days);
        return d.getTime();
      }
      const d = new Date(Date.UTC(+y0, +m0 - 1 + months, +d0 + days));
      const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
      return parseIcsDate(ymd + rest, ds.params);
    };
    let n = 0;
    if (rule.FREQ === "DAILY" || rule.FREQ === "WEEKLY") {
      // Tag für Tag prüfen (begrenzt auf den angefragten Zeitraum)
      const startWeekday = new Date(Date.UTC(+y0 || 1970, (+m0 || 1) - 1, +d0 || 1)).getUTCDay();
      for (let i = 0; i < 800; i++) {
        const s = shifted(i);
        if (s > until || n >= count || s > to) break;
        const day = new Date(Date.UTC(+y0 || 1970, (+m0 || 1) - 1, (+d0 || 1) + i)).getUTCDay();
        const weeks = Math.floor(i / 7);
        let hit = false;
        if (rule.FREQ === "DAILY") hit = i % interval === 0;
        else hit = weeks % interval === 0 && (byDay ? byDay.includes(day) : day === startWeekday);
        if (hit) {
          n++;
          add(s);
        }
      }
    } else if (rule.FREQ === "MONTHLY" || rule.FREQ === "YEARLY") {
      const step = rule.FREQ === "MONTHLY" ? interval : 12 * interval;
      for (let i = 0; i < 400; i++) {
        const s = shifted(0, i * step);
        if (s > until || n >= count || s > to) break;
        n++;
        add(s);
      }
    } else add(start);
  }
  return out;
};

let busyCache: { url: string; at: number; ics: string } | null = null;

/** Belegte Zeiten aus dem freigegebenen Kalender (5 Minuten zwischengespeichert). Fehler → keine Sperren. */
export const busyIntervals = async (env: Env, from: number, to: number): Promise<Interval[]> => {
  const url = env.BUSY_CALENDAR_URL?.trim().replace(/^webcal:\/\//i, "https://");
  if (!url) return [];
  try {
    if (!busyCache || busyCache.url !== url || Date.now() - busyCache.at > 5 * 60_000) {
      const res = await fetch(url, { headers: { Accept: "text/calendar" } });
      if (!res.ok) throw new Error(`Kalender ${res.status}`);
      busyCache = { url, at: Date.now(), ics: await res.text() };
    }
    return parseBusy(busyCache.ics, from, to);
  } catch (err) {
    console.error("Apple-Kalender konnte nicht gelesen werden", err);
    return [];
  }
};

/** Überschneidet sich ein Termin-Zeitfenster mit einer belegten Zeit? */
export const overlapsBusy = (slotStart: number, busy: Interval[]) =>
  busy.some((b) => slotStart < b.end && slotStart + SLOT_MS > b.start);
