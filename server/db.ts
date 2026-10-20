import type { Env } from "./env";

// Alle Daten liegen in einer Cloudflare-D1-Datenbank (Binding "DB").
// Die Tabellen werden beim ersten Aufruf automatisch angelegt.
let ready = false;

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
  return env.DB;
};

export const newId = () => `${new Date().toISOString()}_${crypto.randomUUID().slice(0, 8)}`;

export type ChatMessage = { role: "user" | "assistant"; content: string };
