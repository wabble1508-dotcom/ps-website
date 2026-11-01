import type { D1Database } from "@cloudflare/workers-types";

// Einstellungen aus Cloudflare (Pages → Settings → Variables and Secrets / Bindings)
export type Env = {
  DB: D1Database;
  ANTHROPIC_API_KEY: string;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  MAIL_FROM?: string;
  ANTHROPIC_BASE_URL?: string;
  /** Instagram-Zugangsschlüssel (Instagram API mit Instagram-Login), wird automatisch verlängert */
  INSTAGRAM_TOKEN?: string;
  /** „Instagram-App-Geheimschlüssel“ aus dem Meta-Entwicklerportal – prüft, dass Webhooks echt von Instagram kommen */
  INSTAGRAM_APP_SECRET?: string;
  /** Selbst ausgedachtes Wort, das du im Meta-Portal beim Webhook als „Verify Token“ einträgst */
  INSTAGRAM_VERIFY_TOKEN?: string;
  /** Geheimer Schlüssel für Make.com-Aufrufe an /api/social-ai */
  MAKE_SECRET?: string;
};

export type Ctx = { request: Request; env: Env };
