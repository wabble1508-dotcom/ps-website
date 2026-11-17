# Meta App-Review – alles zum Kopieren

App: **PS Professional Solutions** (ID 1741196560283421)
Ziel: Der Instagram-Autopilot soll DMs und Kommentare von **allen** Kunden bekommen – nicht nur von Personen mit einer Rolle in der App.

Dauer für dich: ca. 30 Minuten + Wartezeit bei Meta (meist einige Tage).

---

## Schritt 1 – Weiterleitungs-URL korrigieren (2 Minuten)

1. developers.facebook.com → **Meine Apps** → **PS Professional Solutions**
2. Links **Anwendungsfälle** → bei „Instagram API“ auf **Anpassen**
3. **API-Einrichtung mit Instagram-Login** → Abschnitt **„3. Instagram Business-Login einrichten“** → **Business-Login-Einstellungen**
4. Bei **OAuth-Weiterleitungs-URIs** die Adresse mit `lhr.life` löschen und eintragen:
   `https://ps-professional-solutions.de/`
5. **Speichern**

## Schritt 2 – App-Grundeinstellungen prüfen (5 Minuten)

**App-Einstellungen → Allgemeines:**

| Feld | Eintrag |
|---|---|
| App-Domains | `ps-professional-solutions.de` |
| Datenschutzrichtlinien-URL | `https://ps-professional-solutions.de/datenschutz` |
| Nutzungsbedingungen-URL | `https://ps-professional-solutions.de/agb` |
| URL zur Datenlöschung | `https://ps-professional-solutions.de/datenschutz` |
| Kategorie | Business and Pages |
| App-Symbol | Logo 1024×1024 (z. B. aus Canva exportieren) |

Unten **Speichern**.

## Schritt 3 – Unternehmen verifizieren

Meta verlangt für die Prüfung meist eine **Unternehmensverifizierung**:
business.facebook.com → **Einstellungen** → **Sicherheitscenter** → **Verifizierung starten**.
Dafür brauchst du die Gewerbeanmeldung (PDF/Foto) und eine Telefonnummer oder E-Mail-Adresse auf der Domain (z. B. info@ps-professional-solutions.de).

## Schritt 4 – App-Review beantragen

**Anwendungsfälle → Instagram API → Schritt 4 „App-Review“** → bei diesen drei Berechtigungen auf **„Für App-Review hinzufügen“**:

- `instagram_business_basic`
- `instagram_business_manage_messages`
- `instagram_business_manage_comments`

Dann **App-Review → Anfragen** → je Berechtigung die Texte unten einfügen (Meta will Englisch).

### App-Beschreibung (allgemein)

```
PS Professional Solutions is a web design and software agency in Dortmund, Germany. This app connects only our own Instagram professional account (@ps_professional_solutions) to our website ps-professional-solutions.de. It answers incoming direct messages from people who contact us, sends a private reply when someone comments a keyword (e.g. "WEBSITE" or "PREISE") under our own posts, and shows our latest posts on our website. The app is not offered to other businesses and does not access any other Instagram accounts. Whenever the account owner replies manually, the automation pauses for 12 hours so a human can take over.
```

### `instagram_business_basic`

```
We use instagram_business_basic to read the profile and the latest media of our own Instagram professional account (@ps_professional_solutions). The media (image, caption, permalink, timestamp) is displayed in a "Follow us" section on our website ps-professional-solutions.de, so visitors see our current projects. It is also required as the base permission for receiving message and comment webhooks for our account. We do not access any other accounts.
```

### `instagram_business_manage_messages`

```
People contact our business via Instagram Direct to ask about prices, websites, apps or appointments. With instagram_business_manage_messages our server receives these messages via webhook and replies on behalf of our own account – with answers about our services and prices, a link to our website and the option to book a free consultation. Replies are only sent within the 24-hour messaging window after the user wrote to us. When our team replies manually in the Instagram app, the automatic replies pause for 12 hours. We also use it to set Ice Breakers (suggested first questions) for our account. Message history is stored only to continue the conversation and is deleted automatically according to our privacy policy.
```

### `instagram_business_manage_comments`

```
Under our own posts we invite people to comment a keyword (for example "WEBSITE" or "PREISE") to receive more information. With instagram_business_manage_comments we receive these comments via webhook, post a short public reply ("Sent you a DM") and send one private reply to the commenter with the requested information. We only act on comments on our own media and never comment on other accounts' content.
```

### Testanleitung für Meta (Feld „Test instructions“)

```
1. Open Instagram and send a direct message such as "What does a website cost?" to @ps_professional_solutions.
2. Within a few seconds the account replies automatically with our prices and a link to ps-professional-solutions.de/preise.
3. Comment the word "WEBSITE" under any post of @ps_professional_solutions.
4. You receive a public reply under the comment and a private message with information about our website packages.
5. Our latest posts are shown on https://ps-professional-solutions.de in the "Follow us" section near the bottom of the page.
No login to our website is required to test this.
```

## Schritt 5 – Bildschirmvideo (1–2 Minuten, mit dem Handy aufnehmen)

Meta will sehen, dass die Funktion echt ist. Bildschirmaufnahme am iPhone: Kontrollzentrum → Aufnahme-Knopf.
Am besten mit einem **zweiten Instagram-Konto** (z. B. privat) aufnehmen:

1. **(0:00)** Instagram öffnen, Profil **@ps_professional_solutions** zeigen.
2. **(0:10)** „Nachricht“ antippen → die Begrüßungsfragen (Ice Breakers) sind zu sehen → eine antippen, z. B. „Was kostet eine Website bei euch? 💻“.
3. **(0:20)** Warten, bis die automatische Antwort kommt, kurz zeigen.
4. **(0:35)** Eine eigene Frage tippen, z. B. „Macht ihr auch Apps?“ → Antwort zeigen.
5. **(0:55)** Zu einem Beitrag von @ps_professional_solutions wechseln → als Kommentar **WEBSITE** schreiben.
6. **(1:05)** Öffentliche Antwort unter dem Kommentar zeigen („Ist raus – schau in deine DMs 📩“).
7. **(1:15)** In die DMs wechseln → die private Nachricht mit den Infos zeigen.
8. **(1:25)** Im Browser ps-professional-solutions.de öffnen, nach unten scrollen → Bereich „Folgen Sie uns“ mit den Instagram-Beiträgen zeigen.

Das gleiche Video kannst du bei allen drei Berechtigungen hochladen.

**Wichtig vorher:** Solange die App noch im Entwicklungsmodus ist, antwortet der Autopilot nur Konten mit einer Rolle in der App. Füge dein zweites Konto deshalb vorher als **Instagram-Tester** hinzu:
App-Rollen → Rollen → **Personen hinzufügen** → „Instagram-Tester“ → Benutzername eingeben → im zweiten Konto unter Einstellungen → Website-Berechtigungen → Apps und Websites → **Einladung annehmen**.

## Schritt 6 – Nach der Freigabe

Oben in der App den Schalter **App-Modus** von „Entwicklung“ auf **„Live“** stellen. Fertig – ab dann antwortet der Autopilot allen Kunden.

Prüfen: Im Admin → Reiter „Heute“ steigt die Zahl der Chats, und unter „Chats“ erscheinen Verläufe mit `ig_` am Anfang.
