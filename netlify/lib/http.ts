import { timingSafeEqual } from "node:crypto";

export const json = (data: unknown, status = 200) => Response.json(data, { status });

export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Admin-Zugang: Passwort aus der Umgebungsvariable ADMIN_PASSWORD
export const isAdmin = (req: Request) => {
  const expected = process.env.ADMIN_PASSWORD;
  const given = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};
