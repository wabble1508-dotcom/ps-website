import { BOOKING } from "./config";

const pad = (n: number) => String(n).padStart(2, "0");

// Versatz der Zeitzone (in ms) zu einem bestimmten Zeitpunkt, z. B. +1h/+2h für Berlin
const tzOffset = (utcMs: number, timeZone: string) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(new Date(utcMs)).map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
};

// Ortszeit (Berlin) → UTC-Zeitpunkt
const zonedToUtc = (y: number, m: number, d: number, hh: number, mm: number, timeZone: string) => {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let utc = guess - tzOffset(guess, timeZone);
  utc = guess - tzOffset(utc, timeZone);
  return utc;
};

// Datum (Berlin) eines Zeitpunkts als "yyyy-MM-dd"
export const localDate = (utcMs: number, timeZone = BOOKING.timeZone) =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(utcMs),
  );

// Alle freien Termine zwischen zwei Daten (inklusive), gruppiert nach Tag
export const freeSlots = (from: string, to: string, booked: Set<string>, now = Date.now()) => {
  const result: Record<string, { slots: string[] }> = {};
  const earliest = now + BOOKING.minNoticeHours * 3600_000;
  const latest = now + BOOKING.maxDaysAhead * 86400_000;
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);
  const start = Date.UTC(fy, fm - 1, fd);
  const end = Math.min(Date.UTC(ty, tm - 1, td), start + 62 * 86400_000);
  for (let day = start; day <= end; day += 86400_000) {
    const date = new Date(day);
    const [y, m, d] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
    const windows = BOOKING.hours[date.getUTCDay()] || [];
    const slots: string[] = [];
    for (const [a, b] of windows) {
      const [ah, am] = a.split(":").map(Number);
      const [bh, bm] = b.split(":").map(Number);
      for (let min = ah * 60 + am; min + BOOKING.slotMinutes <= bh * 60 + bm; min += BOOKING.slotMinutes) {
        const t = zonedToUtc(y, m, d, Math.floor(min / 60), min % 60, BOOKING.timeZone);
        const iso = new Date(t).toISOString();
        if (t >= earliest && t <= latest && !booked.has(iso)) slots.push(iso);
      }
    }
    if (slots.length) result[`${y}-${pad(m)}-${pad(d)}`] = { slots };
  }
  return result;
};

export const isFreeSlot = (iso: string, booked: Set<string>, now = Date.now()) => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  const day = localDate(t);
  return (freeSlots(day, day, booked, now)[day]?.slots || []).includes(new Date(t).toISOString());
};

export const formatBerlin = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", {
    timeZone: BOOKING.timeZone, weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso)) + " Uhr";
