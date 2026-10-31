import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { openConsentSettings } from "@/lib/consent";

// Datenschutzerklärung. Deutsch ist maßgeblich; Englisch steht daneben, die übrigen
// Sprachen kommen aus den Übersetzungs-Wörterbüchern (src/lib/i18n/dict).
// Bei neuen Diensten oder geänderten Speicherfristen bitte hier ergänzen.
type Text = [de: string, en: string];
type Section = { title: Text; blocks: (Text | { list: Text[] } | { sub: Text })[] };

const STAND: Text = ["Stand: Oktober 2026", "Last updated: October 2026"];

const SECTIONS: Section[] = [
  {
    title: ["1. Verantwortlicher", "1. Controller"],
    blocks: [
      [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist: PS Professional Solutions, Inhaber Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund, Deutschland. Telefon: +49 152 0759 5260, E-Mail: info@ps-professional-solutions.de",
        "The controller responsible for data processing on this website is: PS Professional Solutions, owner Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund, Germany. Phone: +49 152 0759 5260, email: info@ps-professional-solutions.de",
      ],
      [
        "Ein Datenschutzbeauftragter ist nicht bestellt, da wir hierzu gesetzlich nicht verpflichtet sind. Bei Fragen zum Datenschutz wenden Sie sich bitte an die oben genannte E-Mail-Adresse.",
        "We have not appointed a data protection officer as we are not legally required to do so. Please send any data protection questions to the email address above.",
      ],
    ],
  },
  {
    title: ["2. Überblick", "2. Overview"],
    blocks: [
      [
        "Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Beantwortung Ihrer Anfragen und die Erbringung unserer Leistungen erforderlich ist oder Sie eingewilligt haben. Wir setzen keine Analyse- oder Werbe-Tracker ein und verkaufen keine Daten.",
        "We only process personal data where this is necessary to operate this website, answer your enquiries and provide our services, or where you have given consent. We do not use analytics or advertising trackers and do not sell any data.",
      ],
      [
        "Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), lit. b (Vertrag und vorvertragliche Maßnahmen), lit. c (rechtliche Pflichten) und lit. f (berechtigte Interessen, z. B. ein sicherer und funktionierender Webauftritt). Für das Speichern von Informationen auf Ihrem Endgerät gilt § 25 TDDDG.",
        "The legal bases are in particular Art. 6(1)(a) GDPR (consent), (b) (contract and pre-contractual measures), (c) (legal obligations) and (f) (legitimate interests, e.g. a secure and functioning website). Storing information on your device is governed by Section 25 TDDDG.",
      ],
    ],
  },
  {
    title: ["3. Hosting und Bereitstellung der Website", "3. Hosting and delivery of the website"],
    blocks: [
      [
        "Diese Website wird über Cloudflare Pages bereitgestellt (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA). Beim Aufruf verarbeitet Cloudflare technisch notwendige Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem, um die Seite auszuliefern und vor Angriffen zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
        "This website is delivered via Cloudflare Pages (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA). When you visit, Cloudflare processes technically necessary connection data such as IP address, date and time, page requested, browser and operating system in order to deliver the site and protect it against attacks. The legal basis is Art. 6(1)(f) GDPR.",
      ],
      [
        "Mit Cloudflare besteht ein Auftragsverarbeitungsvertrag. Cloudflare ist unter dem EU-US Data Privacy Framework zertifiziert; ergänzend gelten EU-Standardvertragsklauseln. Die Datenbank mit Ihren Formular-, Termin- und Chat-Daten (Cloudflare D1) wird in der Europäischen Union gespeichert.",
        "A data processing agreement is in place with Cloudflare. Cloudflare is certified under the EU-US Data Privacy Framework; EU Standard Contractual Clauses apply in addition. The database containing your form, booking and chat data (Cloudflare D1) is stored in the European Union.",
      ],
      [
        "Zur Anzeige „Jetzt auch für Unternehmen in …“ ermittelt Cloudflare aus der Verbindung Ihre ungefähre Stadt. Diese Angabe wird nur angezeigt und nicht gespeichert; es werden dafür keine Daten an weitere Dienste übermittelt.",
        "For the notice “Now also for businesses in …”, Cloudflare derives your approximate city from the connection. This is only displayed and not stored; no data is passed to any other service for this.",
      ],
    ],
  },
  {
    title: ["4. Speicherungen in Ihrem Browser und Einwilligung", "4. Browser storage and consent"],
    blocks: [
      [
        "Wir setzen keine Werbe- oder Tracking-Cookies. Im lokalen Speicher Ihres Browsers (localStorage) legen wir nur ab, was für die gewünschte Funktion nötig ist: Ihre Sprachauswahl, Ihre Datenschutz-Einstellung und – nur im Admin-Bereich – die Anmeldung. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG.",
        "We do not use advertising or tracking cookies. In your browser's local storage (localStorage) we only keep what is required for the function you request: your language selection, your privacy settings and – only in the admin area – the login. The legal basis is Section 25(2) No. 2 TDDDG.",
      ],
      [
        "Externe Medien (YouTube, Instagram, TikTok) laden wir erst, wenn Sie im Einwilligungs-Banner zustimmen oder ein einzelnes Video aktiv laden (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Seitenfuß widerrufen.",
        "We only load external media (YouTube, Instagram, TikTok) once you agree in the consent banner or actively load an individual video (Art. 6(1)(a) GDPR, Section 25(1) TDDDG). You can withdraw your consent at any time with effect for the future via “Cookie settings” in the footer.",
      ],
    ],
  },
  {
    title: ["5. Kontaktaufnahme", "5. Contacting us"],
    blocks: [
      [
        "Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die WhatsApp-Knöpfe sind einfache Links; erst wenn Sie darauf klicken, öffnet sich WhatsApp (WhatsApp Ireland Ltd.) und es gelten dessen Datenschutzbestimmungen.",
        "If you contact us by email, phone or WhatsApp, we process your details to handle your request (Art. 6(1)(b) or (f) GDPR). The WhatsApp buttons are simple links; WhatsApp (WhatsApp Ireland Ltd.) only opens when you click them, and its privacy policy then applies.",
      ],
    ],
  },
  {
    title: ["6. Formulare: Kontakt, E-Book, Newsletter und Bewerbung", "6. Forms: contact, e-book, newsletter and applications"],
    blocks: [
      [
        "Die Angaben aus unseren Formularen (z. B. Name, E-Mail, Telefon, Nachricht, bei Bewerbungen auch die gewünschte Stelle) speichern wir in unserer Datenbank, um Ihre Anfrage zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO; bei Bewerbungen zusätzlich § 26 BDSG). Bei der Newsletter-Anmeldung verarbeiten wir Ihre E-Mail-Adresse auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); Sie können sich jederzeit formlos abmelden.",
        "We store the information from our forms (e.g. name, email, phone, message and, for applications, the desired position) in our database in order to handle your request (Art. 6(1)(b) GDPR; for applications also Section 26 BDSG). For the newsletter we process your email address on the basis of your consent (Art. 6(1)(a) GDPR); you can unsubscribe at any time without giving reasons.",
      ],
      [
        "Nach dem Absenden des Kontaktformulars erhalten Sie automatisch eine Bestätigung mit Informationen zu Ihrem Anliegen an die angegebene E-Mail-Adresse. Den Versand übernimmt – sofern eingerichtet – der Dienst Resend (Resend, Inc., USA) als Auftragsverarbeiter auf Grundlage von EU-Standardvertragsklauseln. Um Missbrauch zu verhindern, versenden wir höchstens drei solcher Bestätigungen pro E-Mail-Adresse und Tag.",
        "After you submit the contact form, you automatically receive a confirmation with information about your request at the email address you provided. Where configured, emails are sent via the service Resend (Resend, Inc., USA) as a processor on the basis of EU Standard Contractual Clauses. To prevent misuse, we send at most three such confirmations per email address per day.",
      ],
      [
        "Speicherdauer: Anfragen werden nach 12 Monaten, Bewerbungen nach 6 Monaten automatisch gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen oder ein Vertrag zustande kommt.",
        "Retention: enquiries are deleted automatically after 12 months and applications after 6 months, unless statutory retention obligations apply or a contract is concluded.",
      ],
    ],
  },
  {
    title: ["7. Online-Terminbuchung", "7. Online appointment booking"],
    blocks: [
      [
        "Für die Buchung eines Termins verarbeiten wir Name, E-Mail-Adresse, optional Telefonnummer und Nachricht sowie den gewählten Termin (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden 12 Monate nach dem Termin automatisch gelöscht. Sofern eingerichtet, versenden wir Bestätigungs- und Benachrichtigungs-E-Mails über den Dienst Resend (Resend, Inc., USA) als Auftragsverarbeiter auf Grundlage von EU-Standardvertragsklauseln.",
        "To book an appointment we process your name, email address, optionally your phone number and message, and the selected time (Art. 6(1)(b) GDPR). The data is deleted automatically 12 months after the appointment. Where configured, we send confirmation and notification emails via the service Resend (Resend, Inc., USA) as a processor on the basis of EU Standard Contractual Clauses.",
      ],
    ],
  },
  {
    title: ["8. KI-Live-Chat", "8. AI live chat"],
    blocks: [
      [
        "Unser Chat-Assistent beantwortet Fragen mithilfe künstlicher Intelligenz. Die Antworten werden automatisch erstellt und können Fehler enthalten. Ihre Nachrichten und der Gesprächsverlauf werden zur Erzeugung der Antworten an Anthropic PBC (548 Market St, San Francisco, CA 94104, USA) übermittelt. Grundlage für die Übermittlung in die USA sind EU-Standardvertragsklauseln. Nach Angaben von Anthropic werden über die Schnittstelle übermittelte Daten nicht zum Training von KI-Modellen verwendet.",
        "Our chat assistant answers questions using artificial intelligence. Answers are generated automatically and may contain errors. Your messages and the conversation history are sent to Anthropic PBC (548 Market St, San Francisco, CA 94104, USA) to generate the answers. The transfer to the USA is based on EU Standard Contractual Clauses. According to Anthropic, data sent via its API is not used to train AI models.",
      ],
      [
        "Wir speichern die Gesprächsverläufe in unserer Datenbank, um Anfragen nachvollziehen und den Service verbessern zu können (Art. 6 Abs. 1 lit. f DSGVO), und löschen sie automatisch nach 6 Monaten. Bitte geben Sie im Chat keine sensiblen Daten (z. B. Gesundheitsdaten oder Zahlungsinformationen) ein. Die Nutzung des Chats ist freiwillig.",
        "We store the conversations in our database so that we can follow up on enquiries and improve our service (Art. 6(1)(f) GDPR) and delete them automatically after 6 months. Please do not enter sensitive data (e.g. health or payment information) in the chat. Using the chat is voluntary.",
      ],
    ],
  },
  {
    title: ["9. Externe Medien: YouTube, Instagram und TikTok", "9. External media: YouTube, Instagram and TikTok"],
    blocks: [
      [
        "Auf einigen Seiten binden wir Videos von YouTube (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland) im erweiterten Datenschutzmodus (youtube-nocookie.com) sowie einen Instagram-Beitrag (Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland) ein. Diese Inhalte werden erst nach Ihrer Einwilligung geladen. Dann werden unter anderem Ihre IP-Adresse und Informationen zu Ihrem Gerät an den jeweiligen Anbieter übermittelt, auch in die USA. Google und Meta sind unter dem EU-US Data Privacy Framework zertifiziert.",
        "On some pages we embed videos from YouTube (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Ireland) in privacy-enhanced mode (youtube-nocookie.com) and an Instagram post (Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Ireland). These are only loaded after you consent. Your IP address and information about your device are then transmitted to the respective provider, including to the USA. Google and Meta are certified under the EU-US Data Privacy Framework.",
      ],
      [
        "Unser TikTok-Profil mit unseren neuesten Videos binden wir über TikTok ein (TikTok Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland). Es wird erst nach Ihrer Einwilligung geladen. Dann werden unter anderem Ihre IP-Adresse und Informationen zu Ihrem Gerät an TikTok übermittelt. TikTok kann Daten auch in Länder außerhalb der EU übertragen, etwa auf Grundlage von EU-Standardvertragsklauseln.",
        "We embed our TikTok profile with our latest videos via TikTok (TikTok Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Ireland). It is only loaded after you consent. Your IP address and information about your device are then transmitted to TikTok. TikTok may also transfer data to countries outside the EU, for example on the basis of EU standard contractual clauses.",
      ],
      [
        "Unsere neuesten Instagram-Beiträge zeigen wir über die offizielle Instagram-Schnittstelle an. Dabei ruft unser Server die Beiträge ab und liefert die Bilder selbst aus – beim Ansehen werden keine Daten von Ihnen an Meta übermittelt. Erst wenn Sie einen Beitrag anklicken, öffnet sich Instagram.",
        "We display our latest Instagram posts via the official Instagram interface. Our server retrieves the posts and delivers the images itself – no data about you is transmitted to Meta while viewing. Instagram only opens when you click on a post.",
      ],
      [
        "Links zu unseren Profilen bei Instagram, TikTok und YouTube sind einfache Verlinkungen. Daten werden erst übertragen, wenn Sie auf den Link klicken und die Seite des Anbieters öffnen.",
        "Links to our profiles on Instagram, TikTok and YouTube are plain links. Data is only transmitted once you click the link and open the provider's page.",
      ],
    ],
  },
  {
    title: ["10. Ihre Rechte", "10. Your rights"],
    blocks: [
      ["Sie haben jederzeit das Recht auf:", "You have the right at any time to:"],
      {
        list: [
          ["Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)", "access to your data stored by us (Art. 15 GDPR)"],
          ["Berichtigung unrichtiger Daten (Art. 16 DSGVO)", "rectification of inaccurate data (Art. 16 GDPR)"],
          ["Löschung Ihrer Daten (Art. 17 DSGVO)", "erasure of your data (Art. 17 GDPR)"],
          ["Einschränkung der Verarbeitung (Art. 18 DSGVO)", "restriction of processing (Art. 18 GDPR)"],
          ["Datenübertragbarkeit (Art. 20 DSGVO)", "data portability (Art. 20 GDPR)"],
          [
            "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)",
            "object to processing based on legitimate interests (Art. 21 GDPR)",
          ],
          [
            "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
            "withdraw consent you have given with effect for the future (Art. 7(3) GDPR)",
          ],
        ],
      },
      [
        "Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der für uns zuständigen Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestr. 2–4, 40213 Düsseldorf.",
        "You can also lodge a complaint with a data protection supervisory authority, for example the authority responsible for us: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestr. 2–4, 40213 Düsseldorf, Germany.",
      ],
    ],
  },
  {
    title: ["11. Datensicherheit", "11. Data security"],
    blocks: [
      [
        "Diese Website nutzt eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ und dem Schloss-Symbol in der Adresszeile. Der Admin-Bereich ist durch ein Passwort geschützt.",
        "This website uses SSL/TLS encryption. You can recognise an encrypted connection by “https://” and the padlock symbol in the address bar. The admin area is password-protected.",
      ],
    ],
  },
];

export default function DatenschutzPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const tx = (t: Text) => (isEn ? t[1] : t[0]);

  return (
    <div className="w-full bg-white py-20">
      <SEO
        title="Datenschutzerklärung | PS Professional Solutions"
        description="Datenschutzerklärung von PS Professional Solutions: welche Daten wir verarbeiten, wofür und wie lange – inklusive Hosting, KI-Chat, Terminbuchung und Ihrer Rechte."
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {isEn ? "Privacy Policy" : "Datenschutzerklärung"}
        </h1>
        {language !== "de" && (
          <p className="-mt-4 mb-8 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            {isEn
              ? "This translation is provided for convenience. Only the German version is legally binding."
              : "Diese Übersetzung dient nur zur Information. Rechtlich verbindlich ist ausschließlich die deutsche Fassung."}
          </p>
        )}
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          {SECTIONS.map((section) => (
            <section key={section.title[0]}>
              <h2 className="text-2xl font-bold mt-10 mb-4 text-secondary">{tx(section.title)}</h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) =>
                  Array.isArray(block) ? (
                    <p key={i}>{tx(block)}</p>
                  ) : "list" in block ? (
                    <ul key={i} className="list-disc pl-6 space-y-1">
                      {block.list.map((item) => (
                        <li key={item[0]}>{tx(item)}</li>
                      ))}
                    </ul>
                  ) : (
                    <h3 key={i} className="text-lg font-bold text-secondary">
                      {tx(block.sub)}
                    </h3>
                  ),
                )}
              </div>
            </section>
          ))}
          <button
            type="button"
            onClick={openConsentSettings}
            className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {isEn ? "Open cookie settings" : "Cookie-Einstellungen öffnen"}
          </button>
          <p className="pt-6 text-sm">{tx(STAND)}</p>
        </div>
      </div>
    </div>
  );
}
