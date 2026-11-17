import type { Env } from "./env";
import { db } from "./db";

// Admin-Passwort. Solange im Admin-Bereich kein eigenes Passwort gesetzt wurde, gilt ADMIN_PASSWORD
// aus Cloudflare. Nach „Passwort ändern“ liegt in der D1-Tabelle `settings` (Schlüssel `admin_auth`)
// nur ein PBKDF2-Hash – das neue Passwort selbst wird nirgends gespeichert – und ein neuer
// Zufallsschlüssel für die Kalender-Abo-Adresse und die Abmelde-Links (adminSecret).

type Auth = { salt: string; hash: string; iter: number; secret: string };

const enc = new TextEncoder();
const hex = (buf: ArrayBuffer | Uint8Array) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (h: string) => new Uint8Array((h.match(/../g) || []).map((x) => parseInt(x, 16)));
const random = (bytes: number) => hex(crypto.getRandomValues(new Uint8Array(bytes)));

// Vergleich in konstanter Zeit
const safeEqual = (a: string, b: string) => {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const pbkdf2 = async (password: string, salt: string, iterations: number) => {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: fromHex(salt), iterations }, key, 256));
};

const loadAuth = async (env: Env): Promise<Auth | null> => {
  const row = await (await db(env)).prepare("SELECT value FROM settings WHERE key = 'admin_auth'").first<{ value: string }>();
  if (!row) return null;
  try {
    return JSON.parse(row.value) as Auth;
  } catch {
    return null;
  }
};

// Bereits geprüfte Passwörter kurz merken (nur als Hash), damit nicht jede Anfrage PBKDF2 rechnet
const verified = new Map<string, number>();

export const isAdmin = async (req: Request, env: Env) => {
  const given = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!given) return false;
  const auth = await loadAuth(env);
  if (!auth) return safeEqual(given, env.ADMIN_PASSWORD || "");

  const tag = hex(await crypto.subtle.digest("SHA-256", enc.encode(`${auth.hash}:${given}`)));
  if ((verified.get(tag) || 0) > Date.now()) return true;
  const ok = safeEqual(await pbkdf2(given, auth.salt, auth.iter), auth.hash);
  if (ok) {
    if (verified.size > 50) verified.clear();
    verified.set(tag, Date.now() + 10 * 60_000);
  }
  return ok;
};

/** Geheimer Schlüssel für abgeleitete Links (Kalender-Abo, Abmelde-Links) */
export const adminSecret = async (env: Env) => (await loadAuth(env))?.secret || env.ADMIN_PASSWORD || "";

/** Neues Admin-Passwort setzen (Aufrufer hat das aktuelle Passwort schon geprüft) */
export const changeAdminPassword = async (env: Env, next: string) => {
  const salt = random(16);
  const iter = 100_000; // Höchstwert, den Cloudflare Workers für PBKDF2 erlauben
  const auth: Auth = { salt, iter, hash: await pbkdf2(next, salt, iter), secret: random(32) };
  const now = new Date().toISOString();
  await (await db(env))
    .prepare("INSERT INTO settings (key, value, updated_at) VALUES ('admin_auth', ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(JSON.stringify(auth), now)
    .run();
  verified.clear();
};
