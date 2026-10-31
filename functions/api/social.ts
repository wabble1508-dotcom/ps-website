import type { Ctx } from "../../server/env";
import { json } from "../../server/http";
import { instagramPosts } from "../../server/social";

// Neueste Instagram-Beiträge für die Social-Media-Bereiche der Website
export const onRequestGet = async ({ env }: Ctx) => {
  try {
    const res = json({ configured: Boolean(env.INSTAGRAM_TOKEN), instagram: await instagramPosts(env) });
    res.headers.set("Cache-Control", "public, max-age=300");
    return res;
  } catch (err) {
    console.error(err);
    return json({ configured: Boolean(env.INSTAGRAM_TOKEN), instagram: [] });
  }
};
