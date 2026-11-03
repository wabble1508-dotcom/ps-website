import type { Env } from "../../server/env";
import { loadConfig } from "../../server/runtimeConfig";

// Ergänzt fehlende Zugangsschlüssel aus dem Admin-Bereich (siehe server/runtimeConfig.ts)
export const onRequest = async ({ env, next }: { env: Env; next: () => Promise<Response> }) => {
  try {
    await loadConfig(env);
  } catch (err) {
    console.error("Einstellungen konnten nicht geladen werden", err);
  }
  return next();
};
