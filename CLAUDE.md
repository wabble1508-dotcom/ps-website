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
  - `/api/prospects` – Admin-Reiter „Akquise“ (`server/prospects.ts`, `src/components/admin/ProspectsTab.tsx`): Betriebe aus OpenStreetMap (Overpass) suchen, WhatsApp-/Instagram-/E-Mail-Text aus festen Vorlagen in `server/prospects.ts` (keine KI-Kosten), Inhaber sendet selbst; D1-Tabelle `prospects`. Nichts wird automatisch verschickt (UWG §7).
  - Kalender (`server/calendar.ts`): `/api/calendar?key=…` = Abo aller Buchungen (ICS, Schlüssel aus ADMIN_PASSWORD abgeleitet, Link im Admin-Reiter „Termine“); `BUSY_CALENDAR_URL` (Admin → Einstellungen, z. B. iCloud-Link) sperrt belegte Zeiten in `/api/slots` und `/api/book`; Bestätigungs-Mails mit .ics-Anhang.
  - `/api/social` + `/api/social-image` – neueste Instagram-Beiträge (offizielle API, Schlüssel wird in D1-Tabelle `settings` automatisch verlängert, Bilder über eigene Domain). Anzeige: `SocialFeedSection` im Layout vor dem Footer, Zuordnung zu Seiten per Stichwort in `src/lib/socialTopics.ts`; TikTok-Profil-Einbettung erst nach Einwilligung.
  - Instagram-Schlüssel: IG… (Instagram-Login, graph.instagram.com) oder EAA… (Facebook-Login → Seite + verknüpftes IG-Konto werden in `resolveMeta` (`server/social.ts`) ermittelt, graph.facebook.com, Cache `fb_meta`).
  - `/api/instagram-webhook` – Instagram-Autopilot (`server/instagramBot.ts`): KI beantwortet DMs, Kommentar-Stichwörter → automatische DM, Begrüßungsfragen (Ice Breakers); pausiert 12 h, wenn der Inhaber selbst antwortet. Texte in `server/socialConfig.ts`, Verläufe in `chats` (id `ig_<nutzer>`).
  - `/api/social-ai` – KI-Texter für Make.com (Header `x-make-secret`): `captions`, `plan`, `week`, `setup-icebreakers`; `GET ?action=week-cron` (ohne Schlüssel, max. 1× pro 6 Tage) wird sonntags von `.github/workflows/content-woche.yml` aufgerufen. Make-Szenarien und Einrichtung: `social/ANLEITUNG-SOCIAL.md`.
- WebsiteNova-CRM-Anbindung (`server/crm.ts`): Schlüssel `WEBSITENOVA_API_KEY` (Admin → Einstellungen), POST an `https://websitenova.de/api/public/v1/leads`; Akquise (ab „angeschrieben“), Kontakt-/E-Book-Formular, Terminbuchung, neue Instagram-DMs. Fehler blockieren nie.
- Admin-Passwort (`server/adminAuth.ts`): zuerst `ADMIN_PASSWORD` aus Cloudflare; nach „Passwort ändern“ (Admin → Einstellungen) gilt nur noch der PBKDF2-Hash in D1 `settings`/`admin_auth`, dazu ein neuer Zufallsschlüssel (`adminSecret`) für Kalender-Abo-Link und Abmelde-Links (alte Abmelde-Links bleiben gültig).
- Terminbuchung: `/termin` = neutrale Buchungsseite (für Links in Artikeln, Mails, Buttons), `/analyse-bestaetigungen` = „Vielen Dank“ nach Formular (noindex).
- Datenbank: Cloudflare D1, Binding `DB` (Datenbank `ps-website-db`, EU).
- Instagram-/Make-Schlüssel (`INSTAGRAM_TOKEN`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_VERIFY_TOKEN`, `MAKE_SECRET`) können statt in Cloudflare auch im Admin-Reiter „Social-Media“ eingetragen werden (D1 `settings`, Schlüssel `cfg:<NAME>`, geladen von `functions/api/_middleware.ts`); Cloudflare-Secrets haben Vorrang.
- E-Mail-Versand (`server/mail.ts`): bevorzugt SMTP über das Strato-Postfach mondjal@ps-professional-solutions.de (`server/smtp.ts`, `cloudflare:sockets`, smtp.strato.de:465; Passwort `SMTP_PASSWORD` im Admin → Einstellungen, Test-Knopf dort), sonst Resend.
- Secrets in Cloudflare: `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, optional `RESEND_API_KEY`, `NOTIFY_EMAIL`, `MAIL_FROM`, `INSTAGRAM_TOKEN`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_VERIFY_TOKEN`, `MAKE_SECRET`.
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

## KI-Kosten
- Alle KI-Aufrufe (Chat, Instagram, Akquise, E-Mail-Strecken, Social-KI) nutzen `claude-haiku-5-5` mit `effort: "low"` – nicht auf teurere Modelle umstellen, der Inhaber zahlt per Guthaben.

## Prüfen vor dem Push
- `npm run build` und `npx tsc -p functions/tsconfig.json`
