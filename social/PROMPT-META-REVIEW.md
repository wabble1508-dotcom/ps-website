Du übernimmst für mich (Pankaj, kein Entwickler – bitte auf Deutsch, einfach und Schritt für Schritt) die Einrichtung meiner Meta-App für den Instagram-Autopiloten meiner Website und stellst den Antrag auf App-Review. Nutze dafür den Browser (eingebauter Browser der Claude-App bzw. Claude in Chrome). Ich logge mich selbst bei Facebook/Meta ein – frag mich NIE nach Passwörtern oder Codes im Chat, sondern sag mir, wann ich mich einloggen oder einen Code eingeben soll.

## Hintergrund
- Firma: PS Professional Solutions, Webdesign/App-/Software-Entwicklung, Inhaber Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund. Website: https://ps-professional-solutions.de
- Instagram-Konto: @ps_professional_solutions (professionelles Konto)
- Meta-App: „PS Professional Solutions“, App-ID 1741196560283421 (developers.facebook.com → Meine Apps)
- Die App nutzt „Instagram API mit Instagram-Login“. Instagram-Token, App-Geheimcode und Webhooks sind bereits eingerichtet und im Admin meiner Website eingetragen – daran NICHTS ändern, keine Tokens neu erzeugen, den App-Geheimcode NICHT zurücksetzen (sonst bricht der Autopilot).
- Webhook-Adresse (nur prüfen, nicht ändern): https://ps-professional-solutions.de/api/instagram-webhook
- Was die App tut: Die KI beantwortet DMs an mein Konto, Kommentar-Stichwörter (z. B. WEBSITE, PREISE) lösen eine öffentliche Antwort + private DM aus, Begrüßungsfragen (Ice Breakers), und die neuesten Beiträge werden auf meiner Website angezeigt. Pausiert 12 h, wenn ich selbst antworte.
- Ziel: App-Review für die Berechtigungen instagram_business_basic, instagram_business_manage_messages, instagram_business_manage_comments, damit die App „Live“ gehen kann und der Autopilot echten Kunden antwortet (im Entwicklungsmodus nur Konten mit App-Rolle).

## Aufgaben – der Reihe nach, nach jedem Schritt kurz Bescheid geben

### 1. Weiterleitungs-URL korrigieren
developers.facebook.com → App „PS Professional Solutions“ → Anwendungsfälle → Instagram API → Anpassen → „API-Einrichtung mit Instagram-Login“ → „Instagram Business-Login einrichten“ → Business-Login-Einstellungen → bei „OAuth-Weiterleitungs-URIs“ die Test-Adresse mit „lhr.life/callback/instagram“ entfernen und `https://ps-professional-solutions.de/` eintragen → Speichern.

### 2. App-Einstellungen → Allgemeines prüfen/ausfüllen
- App-Domains: ps-professional-solutions.de
- Datenschutzrichtlinien-URL: https://ps-professional-solutions.de/datenschutz
- Nutzungsbedingungen-URL: https://ps-professional-solutions.de/agb
- URL zur Datenlöschung (bzw. Anleitung zur Datenlöschung): https://ps-professional-solutions.de/datenschutz
- Kategorie: Business and Pages (bzw. „Unternehmen und Seiten“)
- Kontakt-E-Mail: info@ps-professional-solutions.de
- App-Symbol (1024×1024): falls keins da ist, sag mir Bescheid – ich lade es hoch.
Speichern.

### 3. Unternehmensverifizierung prüfen
business.facebook.com → Einstellungen → Sicherheitscenter. Wenn das Unternehmen nicht verifiziert ist: Verifizierung starten und alle Felder mit den Firmendaten oben ausfüllen. Für Dokument-Upload (Gewerbeanmeldung) und Bestätigungscode an mich übergeben und warten. Falls die App noch mit keinem Business-Portfolio verknüpft ist, mich fragen, bevor du eins anlegst oder verknüpfst.

### 4. Tester für das Video einrichten
App-Rollen → Rollen → Personen hinzufügen → „Instagram-Tester“ → frag mich nach dem Benutzernamen meines zweiten Instagram-Kontos und lade es ein. Sag mir dann, wie ich die Einladung in diesem Konto annehme (Instagram → Einstellungen → Website-Berechtigungen → Apps und Websites → Einladungen).

### 5. App-Review vorbereiten
Anwendungsfälle → Instagram API → Schritt „App-Review“ bzw. App-Review → Berechtigungen und Funktionen: die drei Berechtigungen instagram_business_basic, instagram_business_manage_messages, instagram_business_manage_comments zum Antrag hinzufügen. Für jede Berechtigung die API-Test-Aufrufe prüfen, die Meta verlangt (meist „mindestens 1 erfolgreicher API-Aufruf“) – falls einer fehlt, sag mir, was ich tun soll (z. B. eine DM an mein Konto schicken oder einen Kommentar schreiben), damit der Zähler steigt.

Texte (auf Englisch, so einfügen):

App description / allgemeine Beschreibung:
"PS Professional Solutions is a web design and software agency in Dortmund, Germany. This app connects only our own Instagram professional account (@ps_professional_solutions) to our website ps-professional-solutions.de. It answers incoming direct messages from people who contact us, sends a private reply when someone comments a keyword (e.g. "WEBSITE" or "PREISE") under our own posts, and shows our latest posts on our website. The app is not offered to other businesses and does not access any other Instagram accounts. Whenever the account owner replies manually, the automation pauses for 12 hours so a human can take over."

instagram_business_basic:
"We use instagram_business_basic to read the profile and the latest media of our own Instagram professional account (@ps_professional_solutions). The media (image, caption, permalink, timestamp) is displayed in a "Follow us" section on our website ps-professional-solutions.de, so visitors see our current projects. It is also required as the base permission for receiving message and comment webhooks for our account. We do not access any other accounts."

instagram_business_manage_messages:
"People contact our business via Instagram Direct to ask about prices, websites, apps or appointments. With instagram_business_manage_messages our server receives these messages via webhook and replies on behalf of our own account – with answers about our services and prices, a link to our website and the option to book a free consultation. Replies are only sent within the 24-hour messaging window after the user wrote to us. When our team replies manually in the Instagram app, the automatic replies pause for 12 hours. We also use it to set Ice Breakers (suggested first questions) for our account. Message history is stored only to continue the conversation and is deleted automatically according to our privacy policy."

instagram_business_manage_comments:
"Under our own posts we invite people to comment a keyword (for example "WEBSITE" or "PREISE") to receive more information. With instagram_business_manage_comments we receive these comments via webhook, post a short public reply ("Sent you a DM") and send one private reply to the commenter with the requested information. We only act on comments on our own media and never comment on other accounts' content."

Test instructions (für alle drei):
"1. Open Instagram and send a direct message such as "What does a website cost?" to @ps_professional_solutions.
2. Within a few seconds the account replies automatically with our prices and a link to ps-professional-solutions.de/preise.
3. Comment the word "WEBSITE" under any post of @ps_professional_solutions.
4. You receive a public reply under the comment and a private message with information about our website packages.
5. Our latest posts are shown on https://ps-professional-solutions.de in the "Follow us" section near the bottom of the page.
No login to our website is required to test this."

### 6. Video
Gib mir dieses Drehbuch und warte, bis ich das Video (Bildschirmaufnahme vom Handy, mit dem zweiten Instagram-Konto) aufgenommen und dir gegeben habe; dann bei allen drei Berechtigungen hochladen:
1. Profil @ps_professional_solutions zeigen
2. „Nachricht“ antippen → Begrüßungsfragen sichtbar → „Was kostet eine Website bei euch? 💻“ antippen → automatische Antwort zeigen
3. Eigene Frage tippen („Macht ihr auch Apps?“) → Antwort zeigen
4. Unter einem Beitrag „WEBSITE“ kommentieren → öffentliche Antwort zeigen („Ist raus – schau in deine DMs 📩“) → private Nachricht in den DMs zeigen
5. Im Browser ps-professional-solutions.de öffnen, nach unten scrollen → Bereich „Folgen Sie uns“ mit den Instagram-Beiträgen zeigen
Falls bei Schritt 2–4 keine automatische Antwort kommt: Stopp, sag mir Bescheid (dann prüfen wir Webhook-Abo „messages“ und „comments“ unter Webhooks und ob das Testkonto die Tester-Einladung angenommen hat).

### 7. Absenden
Zeig mir vor dem endgültigen Absenden eine kurze Zusammenfassung (was eingetragen ist, was noch fehlt) und sende den Antrag erst nach meinem „Ja“ ab.

### 8. Danach
Erkläre mir: wie ich den Status der Prüfung sehe, was bei Ablehnung zu tun ist, und dass ich nach der Freigabe oben den App-Modus von „Entwicklung“ auf „Live“ stelle (oder mach es selbst, wenn die Freigabe schon da ist).

## Regeln
- Nichts löschen und keine Tokens/Geheimcodes zurücksetzen oder neu erzeugen.
- Keine Werbung schalten, nichts bezahlen, keine anderen Apps oder Konten anfassen.
- Bei allem, was nicht in dieser Anleitung steht oder bei dem Meta etwas Unerwartetes verlangt: erst fragen.
- Am Ende eine kurze Liste: erledigt / wartet auf Meta / wartet auf mich.
