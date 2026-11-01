# Social-Media-Autopilot – Anleitung

Ziel: Du nimmst nur noch Videos auf. Alles andere – Ideen, Texte, Posten auf allen Kanälen,
Antworten auf DMs und Kommentare – läuft automatisch.

| Was | Wo läuft es | Kosten |
|---|---|---|
| KI beantwortet Instagram-DMs | deine Website (Cloudflare) | nur KI-Kosten, Cent-Beträge |
| Kommentar „WEBSITE“ → automatische DM | deine Website | wie oben |
| Begrüßungsfragen beim Öffnen des Chats | Instagram (einmal eingerichtet) | 0 € |
| Ideen + Texte für alle Kanäle | deine Website (`/api/social-ai`), aufgerufen von Make | KI-Kosten |
| Posten auf Instagram, Facebook, LinkedIn, YouTube, TikTok | Make.com | Make-Tarif |
| Begrüßung im Facebook-Messenger | Meta Business Suite (Teil C) | 0 € |

Alle Texte (Stichwörter, Begrüßungsfragen, Antworten) änderst du in **`server/socialConfig.ts`**.

---

## Teil A – Instagram-Autopilot einschalten (einmalig, ca. 20 Minuten)

Voraussetzung: Der Instagram-Feed auf der Website läuft schon (`INSTAGRAM_TOKEN` ist eingetragen).

**1. Nachrichten in Instagram erlauben**
Instagram-App → Einstellungen → *Nachrichten und Story-Antworten* → *Nachrichtensteuerung* →
*Verbundene Tools* → **„Zugriff auf Nachrichten erlauben“** einschalten.

**2. Berechtigungen in deiner Meta-App ergänzen**
developers.facebook.com → Meine Apps → deine App → **Instagram → API-Einrichtung mit Instagram-Login**.
Prüfe, dass diese Berechtigungen dabei sind (sonst unter *Berechtigungen* hinzufügen):
- `instagram_business_basic`
- `instagram_business_manage_messages`
- `instagram_business_manage_comments`

Danach beim Konto **„Token generieren“** neu klicken (der neue Schlüssel enthält die neuen Rechte) und in
Cloudflare den Wert von `INSTAGRAM_TOKEN` damit ersetzen.

**3. Drei neue Secrets in Cloudflare**
Cloudflare → Workers & Pages → `ps-website` → Einstellungen → Variablen und Secrets → Hinzufügen (Typ „Secret“):

| Name | Wert |
|---|---|
| `INSTAGRAM_APP_SECRET` | Meta-App → Instagram → API-Einrichtung → **„Instagram-App-Geheimschlüssel“** (anzeigen, kopieren) |
| `INSTAGRAM_VERIFY_TOKEN` | ein beliebiges Wort, das du dir ausdenkst, z. B. `ps-webhook-2026-xyz` |
| `MAKE_SECRET` | ein langes zufälliges Passwort (z. B. aus einem Passwort-Generator, 30+ Zeichen) |

Dann **Deployments → … → Retry deployment**.

**4. Webhook eintragen**
Meta-App → Instagram → API-Einrichtung → **„Webhooks konfigurieren“**:
- Callback-URL: `https://ps-professional-solutions.de/api/instagram-webhook`
- Verify Token: dasselbe Wort wie `INSTAGRAM_VERIFY_TOKEN`
- **Bestätigen und speichern**, danach bei den Feldern **`messages`**, **`messaging_postbacks`** und **`comments`** auf „Abonnieren“ klicken.
- Darunter bei deinem Konto **Webhook-Abonnement** einschalten.

**5. App auf „Live“ stellen**
Oben in der Meta-App den Schalter von *Entwicklung* auf **Live** stellen. Als Datenschutz-URL
`https://ps-professional-solutions.de/datenschutz` eintragen. (Ohne „Live“ kommen fremde DMs nicht an.)

**6. Testen**
Mit einem *anderen* Instagram-Konto deinem Profil schreiben → nach wenigen Sekunden antwortet die KI.
Unter einen Beitrag „WEBSITE“ kommentieren → DM kommt automatisch, unter dem Kommentar steht „Ist raus – schau in deine DMs 📩“.
Alle Gespräche siehst du unter **ps-professional-solutions.de/admin → Chats** (Seite „Instagram-DM“).
Bei jeder neuen Anfrage und wenn jemand Telefonnummer/E-Mail schickt, bekommst du eine E-Mail.

**Du willst selbst antworten?** Schreib einfach in der Instagram-App. Die KI merkt das und schweigt
in diesem Chat für 12 Stunden (einstellbar in `socialConfig.ts`).

---

## Teil B – Make.com-Szenarien

(Die Modulnamen in Make können je nach Version leicht anders heißen – einfach den App-Namen suchen, z. B. „Instagram for Business“.)

In jedem Szenario rufst du die KI deiner Website so auf (Modul **HTTP → Make a request**):

- URL: `https://ps-professional-solutions.de/api/social-ai`
- Method: `POST`
- Headers: `x-make-secret` = dein `MAKE_SECRET`
- Body type: `Raw`, Content type: `JSON (application/json)`
- **Parse response: Ja**

### B0 · Begrüßungsfragen aktivieren (einmal ausführen)
Neues Szenario, nur ein HTTP-Modul mit Body:
```json
{ "action": "setup-icebreakers" }
```
„Run once“ klicken. Ab jetzt sieht jeder, der deinen Instagram-Chat zum ersten Mal öffnet, 4 fertige Fragen
zum Antippen („Was kostet eine Website bei euch? 💻“ …) und bekommt sofort die passende Antwort.
Nach Änderungen an `ICE_BREAKERS` in `socialConfig.ts` einfach nochmal ausführen.

### B1 · Content-Woche automatisch (jeden Sonntag)
Du bekommst jeden Sonntag eine fertige Liste mit 7 Beiträgen inkl. Video-Skript und allen Texten.

1. **Schedule**: jeden Sonntag 18:00
2. **HTTP** → Body: `{ "action": "plan", "days": 7 }`
3. **Iterator** über `data.posts`
4. **HTTP** → Body:
   ```json
   { "action": "captions", "topic": "{{3.topic}}", "details": "{{3.details}}", "format": "{{3.format}}" }
   ```
5. **Google Sheets → Add a Row** in die Tabelle **„Redaktionsplan“** mit den Spalten:
   `Datum | Uhrzeit | Format | Thema | Video-Skript | Bildtext | Instagram | Facebook | TikTok | LinkedIn | YouTube-Titel | YouTube-Beschreibung | Erster Kommentar | Video-Link | Status`
   Status = `Video fehlt`. Datum = `{{addDays(now; 3.day)}}`.
6. Optional **E-Mail**: „Deine Content-Woche ist fertig“ mit Link zur Tabelle.

Du nimmst die Videos nach dem Skript auf, lädst sie in Google Drive hoch, trägst den Link in **Video-Link**
ein und setzt Status auf **`bereit`**.

### B2 · Ein Video → alle Kanäle (läuft alle 15 Minuten)
1. **Google Sheets → Search Rows**: Status = `bereit` UND Datum/Uhrzeit ≤ jetzt
2. **Google Drive → Get a Share Link** (bzw. Datei öffentlich freigeben) für das Video – Instagram, TikTok und YouTube brauchen eine öffentliche Adresse.
3. **Router** mit 5 Wegen:
   - **Instagram for Business → Create a Reel Post** – Video-URL, Caption = Spalte *Instagram*.
     Danach **Instagram for Business → Create a Comment** mit *Erster Kommentar*.
   - **Facebook Pages → Upload a Video** – Beschreibung = *Facebook*.
   - **LinkedIn → Create a Company Video/Image Post** (deine Unternehmensseite) – Text = *LinkedIn*.
   - **YouTube → Upload a Video** – Titel = *YouTube-Titel*, Beschreibung = *YouTube-Beschreibung*, Kategorie „People & Blogs“, Sichtbarkeit „Öffentlich“. Hochformat-Video unter 60 Sekunden wird automatisch ein Short.
   - **TikTok**: Die direkte TikTok-Schnittstelle ist für kleine Konten kaum zu bekommen. Am einfachsten über einen Planungsdienst, den Make unterstützt (z. B. **Metricool** oder **Buffer**) – dort einmal TikTok verbinden, in Make das Modul „Create post“ nutzen, Text = *TikTok*. Alternative ohne Zusatzdienst: Make schickt dir Video + TikTok-Text per E-Mail/Telegram, du postest in 20 Sekunden selbst.
4. **Google Sheets → Update a Row**: Status = `gepostet`.

Tipp: Bei jedem Weg im Router einen **Filter** setzen, falls ein Beitrag nicht überall hin soll (z. B. Spalte „Kanäle“ enthält `linkedin`).

### B3 · Website-Neuigkeit → LinkedIn + Facebook (über GitHub)
Make ist schon mit GitHub verbunden – das nutzen wir:
1. **GitHub → Watch Commits** im Repository `wabble1508-dotcom/ps-website`, Branch `main`
2. **Filter**: Commit-Nachricht enthält `#social`
3. **HTTP** → Body: `{ "action": "captions", "topic": "{{1.message}}", "link": "https://ps-professional-solutions.de" }`
4. **LinkedIn → Create a Company Text Post** (Text = `linkedin`) und **Facebook Pages → Create a Post** (Text = `facebook`)

Wenn z. B. eine neue Branchen-Seite online geht, schreibst du in die Commit-Nachricht
„Neue Seite für Physiotherapeuten #social“ – der Rest passiert automatisch.

### B4 · Wochenreport (jeden Montag)
1. **Schedule** Montag 8:00
2. **Instagram for Business → List Media** (letzte 7 Tage) → **Get Media Insights** (Reichweite, Likes, Kommentare, Speicherungen)
3. **Google Sheets → Add a Row** in Tabelle „Statistik“
4. **E-Mail** an dich mit den 3 besten Beiträgen – davon dann mehr machen.

---

## Teil C – Begrüßungsnachrichten in den Apps (ohne Technik, 10 Minuten)

### WhatsApp
Ohne WhatsApp Business gibt es keine automatische Begrüßung. Das ist aber kein Problem: Über die
**Links mit vorgeschriebener Nachricht** (unten) weißt du sofort, worum es geht – der Kunde muss nur noch „Senden“ drücken.
Wenn du später doch automatisch begrüßen willst: Die kostenlose App „WhatsApp Business“ kann das mit derselben Nummer.

### Facebook-Seite (Meta Business Suite → Posteingang → Automatisierungen)
- **Sofortantwort** einschalten:
  > Hallo 👋 schön, dass du dich meldest! Hier ist PS Professional Solutions – Websites, Apps & KI für Unternehmen. Worum geht es? 1️⃣ Website 2️⃣ App/Software 3️⃣ KI-Chat/Telefon 4️⃣ Etwas anderes. Preise: ps-professional-solutions.de/preise
- **Häufig gestellte Fragen**: dieselben 4 Fragen wie bei Instagram (`ICE_BREAKERS` in `socialConfig.ts`) mit den Antworten von dort.
- **Abwesenheitsnachricht** (außerhalb Mo–Fr 9–18 Uhr):
  > Danke für deine Nachricht! 🌙 Ich melde mich am nächsten Werktag. Schreib mir gern schon dein Anliegen. Sofort-Antworten gibt's im KI-Chat auf ps-professional-solutions.de

### Links mit fertig vorgeschriebener Nachricht (für Bio, Story-Links, Flyer, QR-Codes)
Wer darauf tippt, hat die Nachricht schon im Eingabefeld – nur noch „Senden“ drücken:

- WhatsApp Website: `https://wa.me/4915207595260?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20neue%20Website%20%F0%9F%99%82`
- WhatsApp App: `https://wa.me/4915207595260?text=Hallo%2C%20ich%20habe%20eine%20Idee%20f%C3%BCr%20eine%20App%20%F0%9F%9A%80`
- WhatsApp Erstgespräch: `https://wa.me/4915207595260?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20kostenloses%20Erstgespr%C3%A4ch%20vereinbaren`
- Instagram-Chat direkt öffnen (zeigt die Begrüßungsfragen): `https://ig.me/m/ps_professional_solutions`

Auf der Website sind die WhatsApp-Knöpfe schon überall mit vorgeschriebener Nachricht verknüpft, und der KI-Chat begrüßt Besucher automatisch.

### Profil-Texte (Bio)
- **Instagram/TikTok**: `💻 Websites ab 49 €/Monat · 0 € Einrichtung` / `🤖 KI-Chat & KI-Telefon für Betriebe` / `📍 Dortmund & online` / `👇 Schreib „WEBSITE“ in die DMs`
- **LinkedIn (Info)**: „PS Professional Solutions entwickelt programmierte Websites, Apps und KI-Lösungen für kleine und mittlere Unternehmen – von Dortmund aus, bundesweit. Websites ab 49 €/Monat ohne Einrichtungskosten, individuelle Software ab 4.900 €. Kostenloses Erstgespräch: ps-professional-solutions.de“
- **YouTube (Kanalbeschreibung)**: wie LinkedIn plus „Jede Woche neue Tipps zu Websites, Google und KI für Selbstständige.“

---

## Was du jetzt noch machen musst – Checkliste
- [ ] Teil A, Schritte 1–6 (Instagram-Autopilot)
- [ ] B0 einmal ausführen (Begrüßungsfragen)
- [ ] Google-Tabelle „Redaktionsplan“ anlegen, B1 + B2 in Make bauen
- [ ] In Make verbinden: Instagram for Business, Facebook Pages, LinkedIn, YouTube, Google Sheets, Google Drive (+ Metricool/Buffer für TikTok)
- [ ] Teil C in der Meta Business Suite eintragen
- [x] Datenschutzerklärung ergänzt (Abschnitt 8 und 9) – bitte einmal durchlesen
