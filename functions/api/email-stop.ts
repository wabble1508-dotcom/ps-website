import type { Ctx } from "../../server/env";
import { db } from "../../server/db";
import { stopFlows, verifyStop } from "../../server/emailFlow";

// Abmelde-Link aus den automatischen E-Mails: beendet alle weiteren E-Mails an diese Adresse
export const onRequestGet = async ({ request, env }: Ctx) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  const sig = url.searchParams.get("sig") || "";
  const page = (text: string, status = 200) =>
    new Response(
      `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>E-Mails abbestellt</title><body style="font-family:system-ui,sans-serif;max-width:520px;margin:15vh auto;padding:0 16px;line-height:1.5"><h1 style="font-size:1.4rem">${text}</h1><p>PS Professional Solutions · <a href="https://ps-professional-solutions.de">ps-professional-solutions.de</a></p></body>`,
      { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  if (!id || !(await verifyStop(env, id, sig))) return page("Dieser Link ist ungültig.", 400);
  const flow = await (await db(env)).prepare("SELECT email FROM email_flows WHERE id = ?").bind(id).first<{ email: string }>();
  if (flow) await stopFlows(env, flow.email, "abgemeldet");
  return page("Erledigt – Sie erhalten von uns keine weiteren E-Mails dieser Art.");
};
