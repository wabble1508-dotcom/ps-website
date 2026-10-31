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
| `INSTAGRAM_TOKEN` | optional | zeigt automatisch die neuesten Instagram-Beiträge auf der Website (siehe unten) |
| `MAIL_FROM` | optional | Absender, z. B. `PS Professional Solutions <termine@ps-professional-solutions.de>` (Domain vorher in Resend bestätigen) |

Nach Änderungen an Bindings oder Variablen: **Deployments → … → Retry deployment**.

## Instagram & TikTok auf der Website
Vor dem Seitenfuß jeder Seite steht der Bereich „Neu auf Instagram & TikTok“.

**TikTok** läuft ohne Einrichtung: Das offizielle TikTok-Profil mit den neuesten Videos erscheint, sobald ein Besucher zustimmt.

**Instagram** braucht einmalig einen Zugangsschlüssel:
1. Instagram-App → Einstellungen → „Kontotyp und Tools“ → auf **professionelles Konto** (Business oder Creator) umstellen, falls noch nicht geschehen.
2. developers.facebook.com → „Meine Apps“ → **App erstellen** → Anwendungsfall „Nachrichten und Inhalte auf Instagram verwalten“ wählen.
3. In der App: **Instagram → API-Einrichtung mit Instagram-Login** → bei „Zugriffsschlüssel generieren“ dein Instagram-Konto hinzufügen, anmelden, **Token generieren** und kopieren. (Die App muss nicht veröffentlicht werden.)
4. Cloudflare → Workers & Pages → `ps-website` → Einstellungen → Variablen und Secrets → **Hinzufügen**: Typ „Secret“, Name `INSTAGRAM_TOKEN`, Wert = der kopierte Schlüssel → Speichern.
5. Deployments → … → **Retry deployment**.

Der Schlüssel wird danach jede Woche automatisch verlängert. Nur wenn du das Instagram-Passwort änderst oder die App löschst, Schritte 3–5 wiederholen.

**Welche Beiträge auf welcher Seite?** Ein Beitrag erscheint auf der passenden Seite, wenn seine Beschreibung ein Stichwort enthält – z. B. `#friseur` oder `#barber` → Beauty-Seite, `#handwerker` → Handwerker-Seite, `#app` → App-Entwicklung, `#webdesign` → Webseiten-Seiten. Gibt es weniger als drei passende Beiträge, werden die neuesten gezeigt. Die Stichwörter stehen in `src/lib/socialTopics.ts`. Neue Beiträge erscheinen nach spätestens etwa 30 Minuten.

## Arbeitszeiten für Termine ändern
Datei `server/config.ts` → `hours`. Standard: Mo–Do 9–18 Uhr, Fr 9–16 Uhr, 30-Minuten-Termine, mindestens 12 Stunden im Voraus.

