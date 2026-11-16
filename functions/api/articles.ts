import type { Ctx } from "../../server/env";
import { isAdmin, json } from "../../server/http";
import { deleteArticle, getArticle, listArticles, publishArticle, writeNextArticle } from "../../server/articles";

// Magazin-Artikel. GET ohne Passwort: nur veröffentlichte Artikel (Liste bzw. ?slug=…).
// Mit Admin-Passwort: auch Entwürfe; POST {action:"publish"|"write"|"delete", slug?, keyword?}
export const onRequest = async ({ request, env }: Ctx) => {
  const url = new URL(request.url);
  const admin = isAdmin(request, env);
  try {
    if (request.method === "GET") {
      const slug = url.searchParams.get("slug");
      if (slug) {
        const a = await getArticle(env, slug);
        if (!a || (a.status !== "live" && !admin)) return json({ error: "not_found" }, 404);
        return json({ article: a });
      }
      const items = await listArticles(env, !admin);
      return json({ items: items.map(({ sections: _s, faq: _f, ...rest }) => rest) });
    }
    if (!admin) return json({ error: "unauthorized" }, 401);
    const body = await request.json<Record<string, unknown>>();
    const slug = String(body.slug || "");
    if (body.action === "publish") await publishArticle(env, slug);
    else if (body.action === "delete") await deleteArticle(env, slug);
    else if (body.action === "write") return json({ ok: true, article: await writeNextArticle(env, typeof body.keyword === "string" ? body.keyword : undefined) });
    else return json({ error: "unbekannte action" }, 400);
    return json({ ok: true });
  } catch (err) {
    console.error("articles", err);
    return json({ error: err instanceof Error ? err.message : "server" }, 500);
  }
};
