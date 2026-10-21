# PS Professional Solutions – Website

## Was ist drin
- **Frontend:** die komplette Website (React/Vite), alle Seiten und Sprachen (`src/`).
- **Backend** (Cloudflare Pages Functions, Ordner `functions/api/` + gemeinsamer Code in `server/`):
  - `/api/forms` – E-Book, Newsletter, Bewerbung
  - `/api/slots` + `/api/book` – eigenes Buchungssystem (Arbeitszeiten in `server/config.ts`)
  - `/api/chat` – KI-Livechat mit Claude (Anweisungen in `server/prompt.ts`)
  - `/api/admin` – Daten für den Admin-Bereich
- **Admin-Bereich:** `https://ps-professional-solutions.de/admin` – Termine, Anfragen und Chat-Verläufe.
- **Datenbank:** Cloudflare D1 (Binding `DB`), Tabellen werden automatisch angelegt.

## Cloudflare Pages – Build-Einstellungen
- Framework preset: **Vite** (oder „None“)
- Build command: `npm run build`
- Build output directory: `dist`

## Einstellungen in Cloudflare (Pages-Projekt → Settings)
**Bindings → Add → D1 database:** Variable name `DB`, Datenbank `ps-website-db`.

**Variables and Secrets** (Typ „Secret“):
| Name | Pflicht | Wofür |
|---|---|---|
| `ADMIN_PASSWORD` | ja | Passwort für /admin |
| `ANTHROPIC_API_KEY` | ja | KI-Chat (console.anthropic.com) |
| `RESEND_API_KEY` | optional | E-Mails bei neuen Anfragen/Terminen + Bestätigung an Kunden (resend.com) |
| `NOTIFY_EMAIL` | optional | wohin die Benachrichtigungen gehen (Standard: info@ps-professional-solutions.de) |
| `MAIL_FROM` | optional | Absender, z. B. `PS Professional Solutions <termine@ps-professional-solutions.de>` (Domain vorher in Resend bestätigen) |

Nach Änderungen an Bindings oder Variablen: **Deployments → … → Retry deployment**.

## Arbeitszeiten für Termine ändern
Datei `server/config.ts` → `hours`. Standard: Mo–Do 9–18 Uhr, Fr 9–16 Uhr, 30-Minuten-Termine, mindestens 12 Stunden im Voraus.

