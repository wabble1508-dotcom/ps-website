import type { Env } from "./env";

export const json = (data: unknown, status = 200) => Response.json(data, { status });

export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Admin-Zugang: Passwort aus ADMIN_PASSWORD, Vergleich in konstanter Zeit
export const isAdmin = (req: Request, env: Env) => {
  const expected = env.ADMIN_PASSWORD || "";
  const given = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!expected || !given || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
};
