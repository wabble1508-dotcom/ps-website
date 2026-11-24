// Google Analytics 4 – wird nur geladen, wenn der Besucher „Statistik“ zugestimmt hat.
// Seitenwechsel in der React-App erfasst GA4 selbst (erweiterte Messung: Browserverlauf).
export const GA_ID = "G-TTD23ZTRSQ";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

let loaded = false;

const load = () => {
  const w = window as unknown as GtagWindow;
  w[`ga-disable-${GA_ID}`] = false;
  if (loaded) return;
  loaded = true;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
};

// Widerruf: Messung sofort stoppen und die GA-Cookies entfernen
const stop = () => {
  (window as unknown as GtagWindow)[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
};

export const applyAnalyticsConsent = (stats: boolean) => {
  if (typeof window === "undefined") return;
  if (location.pathname.startsWith("/admin")) return; // eigene Besuche im Admin nicht messen
  if (stats) load();
  else if (loaded || document.cookie.includes("_ga")) stop();
};

/** Beim Seitenstart: gespeicherte Einwilligung anwenden. */
export const initAnalytics = () => {
  try {
    const raw = localStorage.getItem("ps_consent");
    if (raw && (JSON.parse(raw) as { stats?: boolean }).stats) applyAnalyticsConsent(true);
  } catch {
    // keine gespeicherte Einwilligung lesbar → nichts laden
  }
};
