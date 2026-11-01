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

**0. Instagram auf „professionelles Konto“ umstellen (kostenlos, 2 Minuten) – ohne das geht nichts**
Mit einem normalen privaten Instagram-Konto erlaubt Meta keine Automatisierung (kein Posten über Make, keine Auto-Antworten).
1. Instagram-App → Profil → ☰ → **Einstellungen und Aktivität** → **Kontotyp und Tools** → **Zu professionellem Konto wechseln**.
2. Kategorie z. B. „Webdesigner“ oder „Softwareunternehmen“ → **Unternehmen** wählen.
3. Am Ende **mit Facebook-Seite verbinden**: Hast du noch keine Facebook-Seite, dort direkt „Neue Facebook-Seite erstellen“ (Name: PS Professional Solutions).
   Prüfen: facebook.com → deine Seite → Einstellungen → **Verknüpfte Konten → Instagram** zeigt dein Konto.

Deine Beiträge, Follower und Nachrichten bleiben dabei alle erhalten.

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
| `MAKE_SECRET` | genau der Wert, den Claude dir im Chat gegeben hat (steht auch im Make-Szenario „Social 1“ im Header `x-make-secret`) |

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

## Teil B – Make.com (ist eingerichtet)

Dein Make-Konto ist im **kostenlosen Tarif**: höchstens 2 aktive Szenarien und 1.000 Operationen im Monat.
Deshalb gibt es genau zwei Szenarien, die zusammen nur ca. 100–200 Operationen im Monat brauchen.

### Szenario „Social 1 – Content-Woche planen (jeden Sonntag)“ ✅ angelegt
Jeden Sonntag um 17 Uhr ruft Make deine Website auf. Die KI plant 7 Videos für die Woche, schreibt alle Texte
(Instagram, Facebook, TikTok, LinkedIn, YouTube, Skript, Bildtext) und schickt dir alles per **E-Mail**.
Eine Kopie steht im Admin-Bereich unter **Anfragen** (Formular „content-plan“).
Kosten: 1 Operation pro Woche.

**Wird eingeschaltet, sobald `MAKE_SECRET` in Cloudflare eingetragen ist** (Teil A, Schritt 3).
Für die E-Mail muss `RESEND_API_KEY` eingetragen sein (siehe ANLEITUNG.md) – sonst steht der Plan nur im Admin-Bereich.

### Szenario „Social 2 – Video auf alle Kanäle“ (wird gebaut, sobald die Konten verbunden sind)
So funktioniert es für dich:
1. Video nach Skript aufnehmen (Hochformat 9:16, 15–60 Sekunden).
2. In der **Dropbox-App** in den Ordner **`Social-Autopost`** hochladen – Dateiname beginnt mit der Nummer aus der E-Mail, z. B. `3.mp4`.
   (Ohne Nummer geht auch: `Preise für Friseure.mp4` – dann schreibt die KI die Texte aus dem Dateinamen.)
3. Make holt das Video alle paar Stunden ab und postet automatisch:
   **Instagram-Reel** (+ erster Kommentar), **Facebook-Reel**, **YouTube Short**, **LinkedIn-Video** auf deiner Unternehmensseite.
4. Das Video wird danach in den Unterordner `Social-Autopost/gepostet` verschoben.

Warum Dropbox und nicht Google Drive? Instagram kann Videos nicht direkt aus Google Drive laden – aus Dropbox schon.

**TikTok** kann der kostenlose Make-Tarif nicht posten (TikTok gibt die Schnittstelle nur an große Partner).
Tipp: In der TikTok-App unter „Hochladen“ das gleiche Video nehmen und den TikTok-Text aus der Sonntags-E-Mail einfügen (30 Sekunden).

**Konten verbinden (einmalig):** Den Link aus dem Chat öffnen und nacheinander Facebook/Instagram, YouTube, LinkedIn und Dropbox anmelden.
Bei Facebook unbedingt **deine Seite und dein Instagram-Konto anhaken** und alle Rechte erlauben.

### Begrüßungsfragen im Instagram-Chat
Werden automatisch eingeschaltet, sobald Teil A fertig ist (einmaliger Aufruf von `{"action":"setup-icebreakers"}` – erledigt Claude).

### Für später (wenn du auf einen bezahlten Make-Tarif wechselst)
- Website-Neuigkeit → LinkedIn + Facebook: GitHub „Watch Commits“, Filter `#social`, dann `{"action":"captions","topic":"{{commit-nachricht}}"}` und posten.
- Wochenreport: Instagram „Get post insights“ → E-Mail an dich mit den besten Beiträgen.

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
- [ ] Teil A, Schritt 0: Instagram auf professionelles Konto + mit Facebook-Seite verbinden
- [ ] Teil A, Schritte 1–6 (Meta-App, Webhook, Secrets in Cloudflare)
- [ ] Dropbox-App installieren (kostenlos) und Konten über den Make-Link verbinden
- [ ] Claude Bescheid geben → Szenario 2 wird gebaut, alles wird eingeschaltet
- [ ] Teil C in der Meta Business Suite eintragen
- [x] Datenschutzerklärung ergänzt (Abschnitt 8 und 9) – bitte einmal durchlesen
