# PS Professional Solutions – Hinweise für Claude

Der Inhaber (Pankaj) ist kein Entwickler: auf Deutsch, einfach und Schritt für Schritt erklären.

## Plattform-Standard
- **Alle Websites (eigene und Kunden) laufen auf Cloudflare Pages.** Nicht Netlify oder andere Anbieter vorschlagen.
- Code liegt auf GitHub (`wabble1508-dotcom/...`), Cloudflare baut bei jedem Push auf `main` automatisch.
- Domains: Nameserver beim Registrar auf Cloudflare umstellen, danach im Pages-Projekt unter „Custom domains“ verbinden.
  Vorher die DNS-Einträge prüfen, besonders E-Mail (MX, SPF, DKIM wie `strato-dkim-0002._domainkey`, DMARC) – automatische Scans übersehen DKIM-Einträge oft.

## Diese Website
- Frontend: Vite + React + TypeScript + Tailwind (`src/`), 18 Sprachen.
- Backend: Cloudflare Pages Functions (`functions/api/`), gemeinsamer Code in `server/`.
  - `/api/chat` – KI-Livechat (Claude Haiku 5.5), Anweisungen in `server/prompt.ts`
  - `/api/forms`, `/api/slots`, `/api/book`, `/api/admin`
  - `/api/social` + `/api/social-image` – neueste Instagram-Beiträge (offizielle API, Schlüssel wird in D1-Tabelle `settings` automatisch verlängert, Bilder über eigene Domain). Anzeige: `SocialFeedSection` im Layout vor dem Footer, Zuordnung zu Seiten per Stichwort in `src/lib/socialTopics.ts`; TikTok-Profil-Einbettung erst nach Einwilligung.
- Datenbank: Cloudflare D1, Binding `DB` (Datenbank `ps-website-db`, EU).
- Secrets in Cloudflare: `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, optional `RESEND_API_KEY`, `NOTIFY_EMAIL`, `MAIL_FROM`, `INSTAGRAM_TOKEN`.
- Live: https://ps-professional-solutions.de (Pages-Projekt `ps-website`, ps-website-dv6.pages.dev). Domain bei Strato registriert, DNS bei Cloudflare.
- Details für den Inhaber: `ANLEITUNG.md`.

## SEO
- `functions/_middleware.ts` setzt Titel, Beschreibung, Canonical, Open-Graph-Tags und JSON-LD pro Seite ins HTML (für Google und Link-Vorschauen), Daten aus `server/seo-meta.json`.
- Nach Änderungen an Seitentiteln/-beschreibungen oder neuen Routen: `npm run build && node tools/seo-snapshot.mjs "$(npm root -g)/playwright"` – aktualisiert `server/seo-meta.json` und `public/sitemap.xml`.
- Unbekannte Adressen liefern Status 404, `/admin` ist noindex.
- Vorschaubilder für geteilte Links: je Seite `public/og/<seite>.jpg` (1200×630), erzeugt mit `node tools/og-images.mjs "$(npm root -g)/playwright"` (Texte/Symbole dort pflegen, danach Snapshot neu erzeugen). Fallback `public/og-image.jpg`.
- Deutsche Google-Titel/-Beschreibungen aller Seiten zentral in `src/lib/seoOverrides.ts` (keine Ranking-Garantien, „kostenlos“ nur ehrlich als 0 € Einrichtung).
- SEO-Landingpages (günstige/kostenlose Website, Webdesign Dortmund, Software-Entwicklung): Inhalte in `src/lib/landingPages.ts`, Vorlage `src/components/SeoLandingPage.tsx`.
- Für KI-Suchmaschinen: Seitentext steht als `<noscript>` im HTML (vom Snapshot erzeugt) und `public/llms.txt` fasst Firma, Preise und Seiten zusammen – bei Preisänderungen mitpflegen.

## Übersetzungen
- Viele Seiten haben Texte nur auf Deutsch/Englisch/Türkisch im Code. Fehlende Übersetzungen ergänzt `src/lib/i18n/overlay.ts` zur Laufzeit aus `src/lib/i18n/dict/<sprache>.json` (Schlüssel = exakt angezeigter deutscher bzw. englischer Text).
- Nach Textänderungen oder neuen Seiten: `npm run build && node tools/i18n-extract.mjs "$(npm root -g)/playwright"` → `tools/i18n-todo/<sprache>.json` listet neue, unübersetzte Texte; diese übersetzen und in die jeweilige `dict/<sprache>.json` eintragen.
- Bereiche mit `data-no-translate` (Chat-Verlauf, Admin) werden nicht angefasst. Impressum/Datenschutz zeigen in Fremdsprachen den Hinweis, dass die deutsche Fassung verbindlich ist.

## Prüfen vor dem Push
- `npm run build` und `npx tsc -p functions/tsconfig.json`
