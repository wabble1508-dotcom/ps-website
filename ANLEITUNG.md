# PS Professional Solutions – Website

## Was ist drin
- **Frontend:** die komplette Website (React/Vite), alle Seiten und Sprachen.
- **Backend** (Netlify Functions, Ordner `netlify/`):
  - `/api/forms` – E-Book, Newsletter, Bewerbung
  - `/api/slots` + `/api/book` – eigenes Buchungssystem (Arbeitszeiten in `netlify/lib/config.ts`)
  - `/api/chat` – KI-Livechat mit Claude
  - `/api/admin` – Daten für den Admin-Bereich
- **Admin-Bereich:** `https://deine-domain.de/admin` – Termine, Anfragen und Chat-Verläufe ansehen/löschen.
- **Datenbank:** Netlify Blobs (automatisch dabei, nichts einzurichten).

## Einstellungen in Netlify (Site configuration → Environment variables)
| Name | Pflicht | Wofür |
|---|---|---|
| `ADMIN_PASSWORD` | ja | Passwort für /admin |
| `ANTHROPIC_API_KEY` | ja | KI-Chat (console.anthropic.com) |
| `RESEND_API_KEY` | optional | E-Mails bei neuen Anfragen/Terminen + Bestätigung an Kunden (resend.com) |
| `NOTIFY_EMAIL` | optional | wohin die Benachrichtigungen gehen (Standard: info@ps-professional-solutions.de) |
| `MAIL_FROM` | optional | Absender, z. B. `PS Professional Solutions <termine@ps-professional-solutions.de>` (Domain vorher in Resend bestätigen) |

## Arbeitszeiten für Termine ändern
Datei `netlify/lib/config.ts` → `hours`. Standard: Mo–Do 9–18 Uhr, Fr 9–16 Uhr, 30-Minuten-Termine, mindestens 12 Stunden im Voraus.
