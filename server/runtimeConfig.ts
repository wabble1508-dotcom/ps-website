import type { Env } from "./env";
import { db } from "./db";

// Zugangsschlüssel, die statt in Cloudflare auch im Admin-Bereich (Reiter „Social-Media“) eingetragen
// werden können. Gespeichert in der D1-Tabelle `settings` unter `cfg:<NAME>`.
// Ein in Cloudflare eingetragenes Secret hat immer Vorrang.
export const CONFIG_KEYS = [
  "INSTAGRAM_TOKEN",
  "INSTAGRAM_APP_SECRET",
  "INSTAGRAM_VERIFY_TOKEN",
  "MAKE_SECRET",
  "BUSY_CALENDAR_URL",
] as const;
export type ConfigKey = (typeof CONFIG_KEYS)[number];

let cache: { at: number; values: Partial<Record<ConfigKey, string>> } | null = null;

export const loadConfig = async (env: Env, fresh = false) => {
  if (fresh || !cache || Date.now() - cache.at > 60_000) {
    const { results } = await (await db(env))
      .prepare("SELECT key, value FROM settings WHERE key LIKE 'cfg:%'")
      .all<{ key: string; value: string }>();
    const values: Partial<Record<ConfigKey, string>> = {};
    for (const r of results) {
      const name = r.key.slice(4) as ConfigKey;
      if (CONFIG_KEYS.includes(name) && r.value) values[name] = r.value;
    }
    cache = { at: Date.now(), values };
  }
  // env kann zwischen Anfragen wiederverwendet werden: selbst gesetzte Werte aktuell halten
  const injected = ((env as unknown as { __cfg?: Set<string> }).__cfg ??= new Set());
  for (const name of CONFIG_KEYS) {
    const stored = cache.values[name];
    if (injected.has(name)) {
      if (stored) env[name] = stored;
      else {
        delete env[name];
        injected.delete(name);
      }
    } else if (!env[name] && stored) {
      env[name] = stored;
      injected.add(name);
    }
  }
};

export const saveConfig = async (env: Env, name: ConfigKey, value: string) => {
  const database = await db(env);
  if (value) {
    await database
      .prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
      .bind(`cfg:${name}`, value, new Date().toISOString())
      .run();
  } else {
    await database.prepare("DELETE FROM settings WHERE key = ?").bind(`cfg:${name}`).run();
  }
  cache = null;
};
