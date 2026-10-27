// Erzeugt für jede Seite ein eigenes Vorschaubild (1200×630) für geteilte Links
// (WhatsApp, Facebook, LinkedIn, …) nach public/og/<seite>.jpg.
// Aufruf: node tools/og-images.mjs "$(npm root -g)/playwright"
// Danach tools/seo-snapshot.mjs ausführen, damit die Bilder in server/seo-meta.json landen.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || "playwright");

// Seite → Symbol (tools/og/icons), Oberzeile, Überschrift, Stichpunkte
const PAGES = {
  "/": ["laptop", "Webdesign · Apps · Software", "Professionelle Websites, die Kunden bringen.", ["ab 49 €/Monat", "0 € Einrichtung", "KI-Live-Chat", "Apps & Software"]],
  "/guenstige-website": ["euro_banknote", "Günstige Website", "Ihre Website ab 49 € im Monat.", ["0 € Einrichtung", "Monatlich kündbar", "Hosting & SSL inklusive"]],
  "/kostenlose-website": ["gem_stone", "Kostenlose Website?", "Die bessere Alternative: 0 € Einrichtung.", ["Keine Werbung", "Eigene Domain", "Wir bauen alles"]],
  "/webdesign-dortmund": ["round_pushpin", "Webdesign Dortmund", "Ihr Webdesigner aus Dortmund.", ["Persönlich vor Ort", "ab 49 €/Monat", "Websites, Apps & Software"]],
  "/software-entwicklung": ["gear", "Software-Entwicklung", "Software nach Maß für Ihre Abläufe.", ["Web-Apps & Portale", "Schnittstellen", "KI-Automatisierung"]],
  "/app-entwicklung": ["mobile_phone", "App-Entwicklung", "Ihre eigene App – vom Prototyp bis zum Store.", ["iOS & Android", "Web-Apps", "Projekte ab 4.900 €"]],
  "/webseiten": ["laptop", "Website erstellen lassen", "Programmierte Websites, die Kunden bringen.", ["Schnell", "Für Google optimiert", "Mobil perfekt"]],
  "/preise": ["euro_banknote", "Preise & Pakete", "Website ab 49 €/Monat – 0 € Einrichtung.", ["Monatlich kündbar", "Business ab 129 €", "Apps ab 4.900 €"]],
  "/handwerker": ["hammer_and_wrench", "Für Handwerker", "Keine Anrufe und Aufträge mehr verpassen.", ["Website", "KI-Telefonassistent", "Online-Termine"]],
  "/beautysalon": ["barber_pole", "Friseure & Beautysalons", "Mehr Buchungen, weniger Ausfälle.", ["Website", "Online-Termine", "Erinnerungen"]],
  "/gesundheitswesen": ["stethoscope", "Praxen & Therapeuten", "Entlastung für Ihr Praxis-Team.", ["Praxis-Website", "Online-Termine", "KI-Telefon"]],
  "/ki-telefon-assistent": ["telephone", "KI-Telefonassistent", "Ihr KI-Mitarbeiter am Telefon – rund um die Uhr.", ["Anrufe annehmen", "Fragen beantworten", "Termine buchen"]],
  "/intelligente-termin-automation": ["spiral_calendar", "Online-Terminbuchung", "Termine buchen, während Sie schlafen.", ["24/7 online", "Automatische Erinnerung", "Weniger Ausfälle"]],
  "/google-business-optimierung": ["round_pushpin", "Google-Unternehmensprofil", "Gefunden werden in Google Maps.", ["Lokales SEO", "Bewertungen", "Mehr Anfragen"]],
  "/ki-live-chat": ["speech_balloon", "KI-Live-Chat", "Ihre Website beantwortet Kundenfragen 24/7.", ["Sofortige Antworten", "Anfragen sammeln", "Termine buchen"]],
  "/magazin": ["newspaper", "Magazin", "Website, SEO & KI einfach erklärt.", ["Tipps", "Praxiswissen", "Für kleine Betriebe"]],
  "/ueber-uns": ["handshake", "Über uns", "Webdesigner & Entwickler aus Dortmund.", ["Persönlich", "Aus einer Hand", "Für kleine Betriebe"]],
  "/erfolgsgeschichten": ["trophy", "Erfolgsgeschichten", "Echte Projekte, echte Ergebnisse.", ["Websites", "Apps", "Automatisierung"]],
  "/ki-lexikon": ["books", "KI- & Marketing-Lexikon", "Die wichtigsten Begriffe einfach erklärt.", ["KI", "SEO", "Online-Marketing"]],
  "/integrationen": ["link", "Integrationen", "Website, CRM, Kalender & WhatsApp verbunden.", ["Google Kalender", "WhatsApp", "CRM"]],
  "/all-in-one-dashboard": ["clipboard", "CRM für kleine Unternehmen", "Kunden, Anfragen & Termine an einem Ort.", ["Follow-ups", "Erinnerungen", "Mit Une Solutions"]],
  "/ablauf": ["check_mark_button", "So arbeiten wir", "In 4 Schritten zu Ihrem Projekt.", ["Erstgespräch", "Umsetzung", "Livegang"]],
  "/karriere": ["rocket", "Karriere", "Werde Teil unseres Teams in Dortmund.", ["Webentwicklung", "Design", "KI"]],
  "/nfc-karten": ["star", "NFC-Bewertungskarten", "Mehr Google-Bewertungen per Fingertipp.", ["Google", "Instagram", "WhatsApp"]],
  "/design-druck": ["printer", "Design & Druck", "Visitenkarten, Flyer, Banner & mehr.", ["Design", "Druck", "NFC-Karten"]],
  "/kfz-zulassung": ["automobile", "Kfz-Zulassungsdienste", "Websites mit Wunschkennzeichen-Shop.", ["Konfigurator", "Schilder-Shop", "Online-Bestellung"]],
  "/festivals": ["ticket", "Festivals & Events", "Volle Bühnen, ausverkaufte Tickets.", ["Event-Website", "Tickets", "Fan-Kommunikation"]],
  "/vereine": ["handshake", "Vereine & Verbände", "Ehrenamt entlasten, Mitglieder begeistern.", ["Vereins-Website", "Mitgliedsanträge", "Spenden"]],
  "/textil": ["t-shirt", "Textil & Mode", "Online-Shops für Mode und Merch.", ["Shop", "B2B-Katalog", "Anfragen"]],
  "/gastronomie": ["fork_and_knife_with_plate", "Restaurants & Cafés", "Volle Tische, treue Gäste.", ["QR-Speisekarte", "Reservierung", "Bewertungen"]],
  "/bildung": ["graduation_cap", "Nachhilfe & Bildung", "Volle Kurse, planbare Anmeldungen.", ["Online-Anmeldung", "Probestunden", "Eltern-Support"]],
  "/schneiderei": ["sewing_needle", "Schneidereien & Ateliers", "Volle Auftragsbücher, treue Stammkunden.", ["Website", "Foto-Preisanfrage", "Abholbenachrichtigung"]],
  "/info": ["page_facing_up", "Impressum", "PS Professional Solutions, Dortmund", ["Lindenhorster Str. 185", "44339 Dortmund"]],
  "/datenschutz": ["locked", "Datenschutz", "Ihre Daten in sicheren Händen.", ["DSGVO", "Transparent"]],
  "/agb": ["page_facing_up", "AGB", "Allgemeine Geschäftsbedingungen", ["Webdesign", "Hosting", "Wartung"]],
};

const dataUrl = (file, type) => `data:${type};base64,${readFileSync(file).toString("base64")}`;
const LOGO = dataUrl("public/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png", "image/png");
// geschütztes Leerzeichen, damit „49 €“ nicht umbricht
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/(\d) €/g, "$1&nbsp;€").replace(/ab (\d)/g, "ab&nbsp;$1");

const html = ([icon, kicker, title, chips]) => `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: Inter, sans-serif; position: relative; overflow: hidden; background: #f4f8f9; }
  .left { position: absolute; inset: 0 auto 0 0; width: 560px; display: flex; align-items: center; justify-content: center; }
  .glow { position: absolute; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(30,159,174,.35), rgba(30,159,174,0) 70%); }
  .icon { position: relative; width: 300px; height: 300px; object-fit: contain; filter: drop-shadow(0 24px 30px rgba(10,40,50,.25)); }
  .logo { position: absolute; top: 18px; left: 26px; height: 150px; }
  .right { position: absolute; inset: 0 0 0 auto; width: 700px; padding: 0 60px 0 150px; color: #fff; display: flex; flex-direction: column; justify-content: center;
    background: radial-gradient(circle at 70% 15%, #1e6f7c 0, rgba(30,111,124,0) 45%), linear-gradient(135deg, #143642, #0f2533);
    clip-path: polygon(90px 0, 100% 0, 100% 100%, 0 100%); }
  .kicker { color: #7ee3ee; font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 18px; }
  h1 { font-size: ${title.length > 38 ? 50 : 58}px; line-height: 1.08; font-weight: 800; margin-bottom: 30px; }
  .chips { display: flex; flex-wrap: wrap; gap: 12px; }
  .chip { border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.1); border-radius: 999px; padding: 10px 18px; font-size: 21px; font-weight: 600; }
  .domain { position: absolute; bottom: 30px; right: 60px; color: #a8eef5; font-size: 22px; font-weight: 600; }
</style></head><body>
  <div class="left"><div class="glow"></div><img class="icon" src="${dataUrl(`tools/og/icons/${icon}_3d.png`, "image/png")}"></div>
  <img class="logo" src="${LOGO}">
  <div class="right">
    <div class="kicker">${esc(kicker)}</div>
    <h1>${esc(title)}</h1>
    <div class="chips">${chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>
    <div class="domain">ps-professional-solutions.de</div>
  </div>
</body></html>`;

mkdirSync("public/og", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [path, data] of Object.entries(PAGES)) {
  await page.setContent(html(data), { waitUntil: "load" });
  const name = path === "/" ? "startseite" : path.slice(1);
  await page.screenshot({ path: `public/og/${name}.jpg`, type: "jpeg", quality: 86 });
  console.log(path, "→", `public/og/${name}.jpg`);
}
await browser.close();
writeFileSync("src/lib/ogImages.json", JSON.stringify(Object.keys(PAGES)) + "\n");
