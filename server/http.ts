import type { Env } from "./env";

export const json = (data: unknown, status = 200) => Response.json(data, { status });

export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Admin-Zugang (Passwort aus Cloudflare oder im Admin-Bereich geändert): server/adminAuth.ts
export { isAdmin } from "./adminAuth";
