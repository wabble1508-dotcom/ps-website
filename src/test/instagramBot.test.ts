import { beforeEach, describe, expect, it, vi } from "vitest";

// Instagram-Autopilot: Kommentar „WEBSITE“ → private DM (comment_id) + öffentliche Antwort.
// Nachgestellt ist der Fall vom 17.11.2026: Tester kommentiert „WEBSITE“, es kam keine DM.

const state = vi.hoisted(() => ({ token: "IGAAtest", events: new Set<string>(), log: [] as string[], mails: [] as string[] }));

vi.mock("../../server/social", () => ({ getToken: async () => state.token }));
vi.mock("../../server/mail", () => ({ notifyOwner: async (_env: unknown, subject: string) => void state.mails.push(subject) }));
vi.mock("../../server/crm", () => ({ pushToCrm: async () => undefined }));
vi.mock("../../server/db", () => ({
  db: async () => ({
    prepare: (sql: string) => ({
      bind: (...args: unknown[]) => ({
        run: async () => {
          if (sql.includes("social_events")) {
            const id = String(args[0]);
            const isNew = !state.events.has(id);
            state.events.add(id);
            return { meta: { changes: isNew ? 1 : 0 } };
          }
          if (sql.includes("social_log")) state.log.push(String(args[2]));
          return { meta: { changes: 1 } };
        },
        first: async () => (sql.includes("social_events") && state.events.has(String(args[0])) ? { 1: 1 } : null),
      }),
    }),
  }),
}));

import { handleWebhook } from "../../server/instagramBot";

const ACCOUNT = "17841400000000000";
const commentWebhook = (text: string, id = "17986241117900810") => ({
  object: "instagram",
  entry: [
    {
      id: ACCOUNT,
      time: 1794938889,
      changes: [
        {
          field: "comments",
          value: { from: { id: "999", username: "websitenova.app" }, media: { id: "1800", media_product_type: "FEED" }, id, text },
        },
      ],
    },
  ],
});

type Call = { url: string; body: Record<string, unknown> };
let calls: Call[];

beforeEach(() => {
  state.token = "IGAAtest";
  state.events.clear();
  state.log = [];
  state.mails = [];
  calls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : {} });
      if (url.includes("/me/messages")) return new Response(JSON.stringify({ recipient_id: "999", message_id: "m1" }));
      return new Response(JSON.stringify({ id: "reply1" }));
    }),
  );
});

const env = { ANTHROPIC_API_KEY: "x" } as never;

describe("Instagram Kommentar-Stichwort", () => {
  it("„WEBSITE“ → private DM per comment_id und öffentliche Antwort", async () => {
    await handleWebhook(env, commentWebhook("WEBSITE"));

    const dm = calls.find((c) => c.url.includes("/me/messages"));
    expect(dm?.body.recipient).toEqual({ comment_id: "17986241117900810" });
    expect(String((dm?.body.message as { text: string }).text)).toContain("neuen Website");

    const reply = calls.find((c) => c.url.includes("/17986241117900810/replies"));
    expect(reply?.body).toEqual({ message: "Ist raus – schau in deine DMs 📩" });
    expect(state.log).toEqual([]);
  });

  it("erkennt das Stichwort auch klein, mit Emoji oder Satzzeichen", async () => {
    for (const [i, text] of ["website", "Website!", "WEBSITE 🙌", "Bitte Infos zur Webseite"].entries()) {
      calls = [];
      await handleWebhook(env, commentWebhook(text, `c${i}`));
      expect(calls.some((c) => c.url.includes("/me/messages")), text).toBe(true);
    }
  });

  it("Unified-Login-Schlüssel (EAA…, wie live am 17.11.): DM und Antwort über graph.facebook.com mit Konto-ID statt „me“", async () => {
    state.token = "EAAYunifiedlogintoken";
    await handleWebhook(env, commentWebhook("WEBSITE"));

    const dm = calls.find((c) => c.url.includes("/messages"));
    expect(dm?.url.startsWith(`https://graph.facebook.com/v23.0/${ACCOUNT}/messages?`)).toBe(true);
    expect(dm?.body.recipient).toEqual({ comment_id: "17986241117900810" });

    const reply = calls.find((c) => c.url.includes("/replies"));
    expect(reply?.url.startsWith("https://graph.facebook.com/v23.0/17986241117900810/replies?")).toBe(true);
    expect(reply?.body).toEqual({ message: "Ist raus – schau in deine DMs 📩" });
    expect(calls.some((c) => c.url.includes("graph.instagram.com"))).toBe(false);
    expect(state.log).toEqual([]);
  });

  it("DM wird von Instagram abgelehnt → Fehler im Log, keine öffentliche Antwort", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : {} });
        return new Response(JSON.stringify({ error: { message: "Invalid OAuth access token" } }), { status: 400 });
      }),
    );
    await handleWebhook(env, commentWebhook("WEBSITE"));

    expect(calls.filter((c) => c.url.includes("/replies"))).toEqual([]);
    expect(state.log[0]).toMatch(/Invalid OAuth access token/);
  });

  it("derselbe Kommentar doppelt geliefert → nur eine DM", async () => {
    await handleWebhook(env, commentWebhook("WEBSITE"));
    await handleWebhook(env, commentWebhook("WEBSITE"));
    expect(calls.filter((c) => c.url.includes("/me/messages"))).toHaveLength(1);
  });
});
