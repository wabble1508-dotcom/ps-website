import type { Config } from "@netlify/functions";
import { bookings, readAll, type Booking } from "../lib/store";
import { json } from "../lib/http";
import { freeSlots } from "../lib/slots";

// Freie Termine für den Buchungskalender: /api/slots?from=2026-10-01&to=2026-10-31
export default async (req: Request) => {
  const url = new URL(req.url);
  const re = /^\d{4}-\d{2}-\d{2}$/;
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  if (!re.test(from) || !re.test(to)) return json({ error: "bad_request" }, 400);
  const booked = new Set((await readAll<Booking>(bookings())).map((b) => b.slot));
  return json(freeSlots(from, to, booked));
};

export const config: Config = { path: "/api/slots" };
