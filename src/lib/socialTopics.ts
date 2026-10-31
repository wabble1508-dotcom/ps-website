// Welche Instagram-Beiträge auf welcher Seite erscheinen: Ein Beitrag passt zu einer Seite,
// wenn seine Beschreibung (inkl. Hashtags) eines der Stichwörter enthält. Passen weniger als
// drei Beiträge, wird mit den neuesten Beiträgen aufgefüllt.
// Tipp für Pankaj: passende Hashtags wie #friseur, #handwerker oder #app in den Beitrag schreiben.
const WEBSITE = ["website", "webseite", "webdesign", "homepage", "seo", "landingpage"];

export const SOCIAL_TOPICS: Record<string, string[]> = {
  "/beautysalon": ["friseur", "barber", "salon", "beauty", "kosmetik", "nagel", "nails", "haar", "hair", "lash", "skin"],
  "/handwerker": ["handwerk", "handwerker", "bau", "elektri", "sanitär", "maler", "dachdecker", "fliesen"],
  "/gesundheitswesen": ["praxis", "arzt", "ärzt", "physio", "therap", "zahn", "pflege"],
  "/gastronomie": ["restaurant", "café", "cafe", "gastro", "imbiss", "pizza", "burger", "döner", "speisekarte", "food"],
  "/app-entwicklung": ["app", "skyjoin", "websitenova", "ios", "android", "programmier", "software"],
  "/software-entwicklung": ["software", "app", "websitenova", "skyjoin", "programmier", "automatisier", "saas"],
  "/ki-telefon-assistent": ["telefon", "anruf", "voice", "ki-assistent", "ki assistent"],
  "/ki-live-chat": ["chat", "chatbot", "live-chat", "livechat"],
  "/intelligente-termin-automation": ["termin", "buchung", "kalender"],
  "/google-business-optimierung": ["google", "seo", "bewertung", "maps", "ranking"],
  "/nfc-karten": ["nfc", "bewertung", "review", "aufsteller"],
  "/design-druck": ["druck", "flyer", "visitenkarte", "logo", "design", "banner"],
  "/kfz-zulassung": ["kfz", "zulassung", "kennzeichen", "auto", "schilder"],
  "/textil": ["textil", "mode", "fashion", "merch", "stick", "shirt"],
  "/schneiderei": ["schneider", "änderung", "atelier", "nähen"],
  "/bildung": ["nachhilfe", "schule", "bildung", "kurs", "lernen"],
  "/vereine": ["verein", "verband", "ehrenamt"],
  "/festivals": ["festival", "event", "konzert", "ticket"],
  "/all-in-one-dashboard": ["crm", "une solutions", "kunden", "automatisier"],
  "/webseiten": WEBSITE,
  "/guenstige-website": [...WEBSITE, "günstig", "49"],
  "/kostenlose-website": [...WEBSITE, "kostenlos", "0 €"],
  "/webdesign-dortmund": [...WEBSITE, "dortmund", "ruhrgebiet"],
  "/preise": [...WEBSITE, "preis", "angebot"],
};

// Auf diesen Seiten keinen Social-Media-Bereich zeigen
export const SOCIAL_HIDDEN = ["/info", "/datenschutz", "/agb", "/analyse-bestaetigungen"];

export const pickPosts = <T extends { caption: string }>(posts: T[], path: string, count = 6): T[] => {
  const words = SOCIAL_TOPICS[path];
  if (!words) return posts.slice(0, count);
  const matches = posts.filter((p) => {
    const text = p.caption.toLowerCase();
    return words.some((w) => text.includes(w));
  });
  if (matches.length >= 3) return matches.slice(0, count);
  return [...matches, ...posts.filter((p) => !matches.includes(p))].slice(0, count);
};
