import type { Ctx } from "../../server/env";
import { db } from "../../server/db";
import { bookingsCalendar, calendarKey, type Booking } from "../../server/calendar";

// Kalender-Abo mit allen gebuchten Terminen (z. B. für Apple Kalender):
// /api/calendar?key=…  – der Schlüssel steht im Admin-Bereich unter „Termine“.
export const onRequestGet = async ({ request, env }: Ctx) => {
  const key = new URL(request.url).searchParams.get("key") || "";
  const expected = await calendarKey(env);
  if (!expected || key !== expected) return new Response("Not found", { status: 404 });
  const since = new Date(Date.now() - 60 * 86400_000).toISOString();
  const { results } = await (await db(env))
    .prepare("SELECT id, slot, first_name, last_name, email, phone, note FROM bookings WHERE slot >= ? ORDER BY slot")
    .bind(since)
    .all<Booking>();
  return new Response(bookingsCalendar(results), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="ps-termine.ics"',
      "Cache-Control": "private, no-store",
    },
  });
};
