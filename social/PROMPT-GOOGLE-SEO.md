Du übernimmst für mich (Pankaj, kein Entwickler – bitte auf Deutsch, einfach und Schritt für Schritt) die Einrichtung von Google Search Console und die Optimierung meines Google-Unternehmensprofils. Nutze dafür den Browser (eingebauter Browser der Claude-App bzw. Claude in Chrome). Ich logge mich selbst bei Google und Cloudflare ein – frag mich NIE nach Passwörtern oder Codes im Chat, sondern sag mir, wann ich mich einloggen oder etwas bestätigen soll.

## Hintergrund
- Firma: PS Professional Solutions – Webdesign, App- und Software-Entwicklung. Inhaber Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund. Telefon +49 1520 7595260, E-Mail info@ps-professional-solutions.de. Erreichbar Mo–Fr 9–18 Uhr.
- Website: https://ps-professional-solutions.de (läuft auf Cloudflare Pages, Domain-DNS liegt bei Cloudflare, Domain registriert bei Strato).
- Wichtigste Seiten:
  - https://ps-professional-solutions.de/ (Startseite)
  - https://ps-professional-solutions.de/app-entwicklung (App entwickeln lassen, ab 4.900 €)
  - https://ps-professional-solutions.de/webdesign-dortmund
  - https://ps-professional-solutions.de/webdesign-ruhrgebiet
  - https://ps-professional-solutions.de/webseiten (Website erstellen lassen)
  - https://ps-professional-solutions.de/software-entwicklung
  - https://ps-professional-solutions.de/guenstige-website (ab 49 €/Monat)
  - https://ps-professional-solutions.de/preise
  - https://ps-professional-solutions.de/termin (kostenloses Erstgespräch buchen)
- Sitemaps: https://ps-professional-solutions.de/sitemap.xml und https://ps-professional-solutions.de/sitemap-magazin.xml
- Preise (nur diese nennen, immer als „ab“): Website Start ab 49 €/Monat, 0 € Einrichtung; Business ab 129 €/Monat + Einrichtung ab 990 € (SEO, GEO, Terminbuchung); Business + KI-Telefon ab 249 €/Monat; Apps und Software ab 4.900 €; Wartung ab 39 €/Monat.
- Kleinunternehmer nach § 19 UStG (keine USt). Eigene Projekte: App SkyJoin, SaaS-Plattform WebsiteNova, Website Matou Kfz Schilder Express.

## Teil A – Google Search Console
1. https://search.google.com/search-console öffnen (Login mache ich).
2. Prüfen, ob es schon eine Property für ps-professional-solutions.de gibt. Wenn nicht: „Property hinzufügen“ → Typ **Domain** → `ps-professional-solutions.de`.
3. Bestätigung: Wenn Google „Mit Cloudflare bestätigen“ (automatische DNS-Bestätigung) anbietet, das nutzen – ich logge mich bei Cloudflare ein und bestätige. Sonst den TXT-Eintrag kopieren, im Cloudflare-Dashboard → Domain ps-professional-solutions.de → DNS → Records → „Add record“ → Typ TXT, Name `@`, Inhalt = der Google-Wert → Speichern; danach in der Search Console „Bestätigen“ (kann einige Minuten dauern, dann nochmal versuchen). WICHTIG: In Cloudflare-DNS NICHTS anderes ändern oder löschen (besonders keine MX-, SPF-, DKIM- oder DMARC-Einträge, sonst geht die E-Mail kaputt).
4. Links „Sitemaps“: beide Sitemaps oben einreichen.
5. Oben in die URL-Prüfung nacheinander eingeben und jeweils „Indexierung beantragen“: /app-entwicklung, /webdesign-ruhrgebiet, /webdesign-dortmund, /webseiten, / (Startseite). Google erlaubt pro Tag nur eine begrenzte Zahl – wenn die Grenze erreicht ist, sag mir, welche fehlen.
6. Unter „Seiten“ (Indexierung) und „Core Web Vitals“ nachsehen und mir in einfachen Worten sagen, ob Fehler gemeldet werden (noch keine Daten ist normal bei neuer Property).
7. Optional: https://www.bing.com/webmasters öffnen → „Aus Google Search Console importieren“ (deckt auch Bing/ChatGPT-Suche ab). Login mache ich.

## Teil B – Google-Unternehmensprofil (Google Maps)
1. https://business.google.com öffnen (Login mache ich) und das Profil „PS Professional Solutions“ öffnen. Falls keins existiert oder es nicht bestätigt ist: Stopp, sag mir Bescheid – dann klären wir das zusammen (Google verlangt meist eine Bestätigung per Video oder Postkarte).
2. Prüfen und ggf. korrigieren – nur mit den Daten oben, nichts erfinden:
   - Name exakt: PS Professional Solutions (keine Keywords in den Namen schreiben – das verstößt gegen Googles Richtlinien)
   - Hauptkategorie: „Webdesigner“; weitere Kategorien: „Softwareentwickler“, „Internetmarketing-Service“ (falls verfügbar auch „App-Entwickler“ bzw. „Anbieter von Software“)
   - Adresse, Telefon, Website (https://ps-professional-solutions.de), Öffnungszeiten Mo–Fr 9–18 Uhr
   - Terminlink: https://ps-professional-solutions.de/termin
   - Einzugsgebiet: Dortmund, Bochum, Essen, Unna, Lünen, Hagen, Herne, Castrop-Rauxel, Gelsenkirchen, Hamm
3. Leistungen eintragen (mit kurzer Beschreibung, Preise nur „ab“ wie oben):
   - Website erstellen lassen (ab 49 €/Monat, 0 € Einrichtung)
   - Webdesign
   - App-Entwicklung (iOS, Android, Web-Apps; ab 4.900 €)
   - Software-Entwicklung
   - Suchmaschinenoptimierung (SEO) und GEO (Auffindbarkeit in KI-Suchen)
   - Google-Unternehmensprofil einrichten
   - Website-Wartung (ab 39 €/Monat)
4. Unternehmensbeschreibung (max. 750 Zeichen) – diesen Text einfügen:
   „PS Professional Solutions ist Ihr Webdesigner und App-Entwickler aus Dortmund. Wir programmieren schnelle, für Google optimierte Websites ab 49 € im Monat ohne Einrichtungsgebühr, entwickeln Apps für iOS, Android und das Web sowie individuelle Software für kleine und mittlere Unternehmen. Mit SEO und GEO sorgen wir dafür, dass Ihr Betrieb bei Google und in KI-Suchen wie ChatGPT gefunden wird. Sie haben einen festen Ansprechpartner, erhalten vor dem Start ein verbindliches Angebot. Wir betreuen Kunden in Dortmund, im ganzen Ruhrgebiet und online deutschlandweit – das Erstgespräch ist kostenlos.“
5. Einen Beitrag („Neuigkeit“) erstellen: kurzer Text zur App-Entwicklung mit Button „Mehr erfahren“ → https://ps-professional-solutions.de/app-entwicklung. Text vorher mir zeigen.
6. Fotos: sag mir, welche Fotos sinnvoll wären (Logo, Foto von mir, Arbeitsplatz, Screenshots der Projekte) – hochladen mache ich bzw. du, wenn ich sie dir gebe.
7. Bewertungslink: Unter „Bewertungen anfordern“ den Kurzlink kopieren und mir geben, damit ich ihn an Kunden schicken kann.

## Regeln
- Nichts löschen, keine DNS-Einträge außer dem einen TXT-Eintrag anlegen, keine Werbung (Google Ads) schalten, nichts bezahlen.
- Keine erfundenen Bewertungen, Zahlen, Referenzen oder Ranking-Versprechen.
- Bei allem, was nicht in dieser Anleitung steht oder was Google unerwartet verlangt: erst fragen.
- Vor jedem Speichern im Unternehmensprofil kurz zeigen, was geändert wird.
- Am Ende eine kurze Liste: erledigt / wartet auf Google / wartet auf mich.
