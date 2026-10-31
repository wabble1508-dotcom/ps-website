import type { Ctx } from "../../server/env";
import { instagramImage } from "../../server/social";

// Instagram-Bilder über die eigene Domain ausliefern – Besucher laden so nichts direkt von Meta
export const onRequestGet = async ({ request, env }: Ctx) => {
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!/^\d+$/.test(id)) return new Response("Not found", { status: 404 });
  return (await instagramImage(env, id)) || new Response("Not found", { status: 404 });
};
