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
  - `/api/chat` – KI-Livechat (Claude), Anweisungen in `server/prompt.ts`
  - `/api/forms`, `/api/slots`, `/api/book`, `/api/admin`
- Datenbank: Cloudflare D1, Binding `DB` (Datenbank `ps-website-db`, EU).
- Secrets in Cloudflare: `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, optional `RESEND_API_KEY`, `NOTIFY_EMAIL`, `MAIL_FROM`.
- Live: https://ps-professional-solutions.de (Pages-Projekt `ps-website`, ps-website-dv6.pages.dev). Domain bei Strato registriert, DNS bei Cloudflare.
- Details für den Inhaber: `ANLEITUNG.md`.

## Prüfen vor dem Push
- `npm run build` und `npx tsc -p functions/tsconfig.json`
