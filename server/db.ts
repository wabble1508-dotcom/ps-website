import type { Env } from "./env";
import { RETENTION } from "./config";

// Alle Daten liegen in einer Cloudflare-D1-Datenbank (Binding "DB").
// Die Tabellen werden beim ersten Aufruf automatisch angelegt.
let ready = false;
let lastCleanup = 0;

const monthsAgo = (months: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
};

// Alte Daten löschen – läuft höchstens einmal pro Stunde, ausgelöst durch normale Seitenaufrufe
const cleanup = async (env: Env) => {
  if (Date.now() - lastCleanup < 3600_000) return;
  lastCleanup = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM chats WHERE updated_at < ?").bind(monthsAgo(RETENTION.chats)),
    env.DB.prepare("DELETE FROM leads WHERE created_at < ?").bind(monthsAgo(RETENTION.leads)),
    env.DB.prepare("DELETE FROM leads WHERE form = 'bewerbung' AND created_at < ?").bind(monthsAgo(RETENTION.applications)),
    env.DB.prepare("DELETE FROM bookings WHERE slot < ?").bind(monthsAgo(RETENTION.bookings)),
  ]);
};

export const db = async (env: Env) => {
  if (!ready) {
    await env.DB.batch([
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, form TEXT, fields TEXT, page TEXT, created_at TEXT)",
      ),
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, slot TEXT UNIQUE, first_name TEXT, last_name TEXT, email TEXT, phone TEXT, note TEXT, created_at TEXT)",
      ),
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS chats (id TEXT PRIMARY KEY, page TEXT, messages TEXT, created_at TEXT, updated_at TEXT)",
      ),
    ]);
    ready = true;
  }
  try {
    await cleanup(env);
  } catch (err) {
    console.error("Aufräumen fehlgeschlagen", err);
  }
  return env.DB;
};

export const newId = () => `${new Date().toISOString()}_${crypto.randomUUID().slice(0, 8)}`;

export type ChatMessage = { role: "user" | "assistant"; content: string };
