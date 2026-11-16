import type { Env } from "./env";

// Anbindung an WebsiteNova (CRM): Interessenten aus Akquise, Formularen, Terminen und Instagram
// landen automatisch dort – inkl. Pipeline-Phase und Eintrag im Kontaktverlauf.
// Schlüssel: WebsiteNova → Einstellungen → API-Schlüssel, eintragen im Admin-Reiter „Einstellungen“.
// Fehler werden nur protokolliert und blockieren nie die Website.

export type CrmLead = {
  /** Eindeutige Kennung, damit wiederholte Übertragungen denselben Lead aktualisieren */
  external_ref: string;
  company_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  industry?: string;
  source?: string;
  notes?: string;
  /** Name der Pipeline-Phase in WebsiteNova: Neu · Audit gesendet · Im Gespräch · Angebot gesendet · Gewonnen · Verloren */
  stage?: "Neu" | "Audit gesendet" | "Im Gespräch" | "Angebot gesendet" | "Gewonnen" | "Verloren";
  /** Text für den Kontaktverlauf (z. B. gesendete Nachricht) */
  entry?: string;
};

export const crmEnabled = (env: Env) => Boolean(env.WEBSITENOVA_API_KEY);

export const pushToCrm = async (env: Env, lead: CrmLead) => {
  if (!env.WEBSITENOVA_API_KEY) return null;
  const base = (env.WEBSITENOVA_URL || "https://websitenova.de").replace(/\/+$/, "");
  try {
    const res = await fetch(`${base}/api/public/v1/leads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.WEBSITENOVA_API_KEY.trim()}`, "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("WebsiteNova", res.status, await res.text());
      return null;
    }
    return (await res.json()) as { id: string; created: boolean };
  } catch (err) {
    console.error("WebsiteNova", err);
    return null;
  }
};
