import type { Ctx } from "../../server/env";
import { db } from "../../server/db";
import { json } from "../../server/http";
import { freeSlots } from "../../server/slots";

// Freie Termine für den Buchungskalender: /api/slots?from=2026-10-01&to=2026-10-31
export const onRequestGet = async ({ request, env }: Ctx) => {
  const url = new URL(request.url);
  const re = /^\d{4}-\d{2}-\d{2}$/;
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  if (!re.test(from) || !re.test(to)) return json({ error: "bad_request" }, 400);
  const { results } = await (await db(env)).prepare("SELECT slot FROM bookings").all<{ slot: string }>();
  return json(freeSlots(from, to, new Set(results.map((r) => r.slot))));
};
