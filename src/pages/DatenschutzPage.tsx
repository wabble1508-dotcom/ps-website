import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function DatenschutzPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  return (
    <div className="w-full bg-white py-20">
      <SEO
        title="Datenschutzerklärung | PS Professional Solutions"
        description="Datenschutzerklärung von PS Professional Solutions – DSGVO-konforme Datenschutzhinweise."
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {isEn ? "Privacy Policy" : "Datenschutzerklärung"}
        </h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          {/* 1. Datenschutz auf einen Blick */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn
                ? "1. Privacy at a glance"
                : "1. Datenschutz auf einen Blick"}
            </h2>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "General notes" : "Allgemeine Hinweise"}
            </h3>
            <p>
              {isEn
                ? "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified."
                : "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung."}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn
                ? "Data collection on this website"
                : "Datenerfassung auf dieser Website"}
            </h3>
            <p>
              {isEn
                ? "Data collection on this website is carried out by the website operator. You can find their contact details in the 'Responsible body' section."
                : 'Die Datenerfassung auf dieser Website erfolgt durch den Betreiber der Website. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.'}
            </p>
            <p>
              {isEn
                ? "Your data is collected partly by you providing it to us (e.g. in a contact form)."
                : "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben."}
            </p>
          </div>

          {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn
                ? "2. General notes and mandatory information"
                : "2. Allgemeine Hinweise und Pflichtinformationen"}
            </h2>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "Data protection" : "Datenschutz"}
            </h3>
            <p>
              {isEn
                ? "The operators of this site take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy."
                : "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn
                ? "Responsible body"
                : "Hinweis zur verantwortlichen Stelle"}
            </h3>
            <p>
              {isEn
                ? "The responsible body for data processing on this website is:"
                : "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"}
            </p>
            <p className="mt-2 font-medium">
              PS Professional Solutions
              <br />
              Pankaj Mondjal
              <br />
              Lindenhorster Str. 185
              <br />
              44339 Dortmund
              <br />
              {isEn ? "Phone: +49 152 0759 5260" : "Telefon: +49 152 0759 5260"}
              <br />
              E-Mail: info@ps-professional-solutions.de
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "Storage period" : "Speicherdauer"}
            </h3>
            <p>
              {isEn
                ? "Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies."
                : "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löscherersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben."}
            </p>
          </div>

          {/* 3. Datenerfassung auf dieser Website */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn
                ? "3. Data collection on this website"
                : "3. Datenerfassung auf dieser Website"}
            </h2>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "Cookies" : "Cookies"}
            </h3>
            <p>
              {isEn
                ? "Our website uses so-called 'cookies'. Cookies are small text files and do no harm to your device. They are either temporarily stored for the duration of a session (session cookies) or permanently (permanent cookies) on your device. Session cookies are automatically deleted after your visit. Permanent cookies remain stored on your device until you delete them or automatic deletion occurs via your web browser."
                : 'Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.'}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "Server log files" : "Server-Log-Dateien"}
            </h3>
            <p>
              {isEn
                ? "The provider of this website collects and stores automatically information in so-called server log files, which your browser automatically transmits to us. These are: browser type and version, operating system used, referrer URL, hostname of the accessing computer, time of server request, IP address. This data is not merged with other data sources. The collection of this data is based on Art. 6 para. 1 lit. f GDPR."
                : "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO."}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn ? "Contact form" : "Kontaktformular"}
            </h3>
            <p>
              {isEn
                ? "If you send us inquiries via the contact form, your details from the inquiry form including the contact data you provide there will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent. The processing of this data is based on Art. 6 para. 1 lit. b GDPR."
                : "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist."}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2 text-secondary">
              {isEn
                ? "Inquiry by email, phone or fax"
                : "Anfrage per E-Mail, Telefon oder Telefax"}
            </h3>
            <p>
              {isEn
                ? "If you contact us by email, phone or fax, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request. We do not pass on this data without your consent."
                : "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."}
            </p>
          </div>

          {/* 4. Soziale Medien */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn ? "4. Social media" : "4. Soziale Medien"}
            </h2>
            <p>
              {isEn
                ? "Links to social networks (Instagram, TikTok, YouTube) are integrated on our pages. These are merely implemented as links to the services. After clicking on the embedded text/image link, you will be redirected to the respective provider's page. Only after the redirection will user information be transmitted to the respective provider."
                : "Auf unseren Seiten sind Verlinkungen zu sozialen Netzwerken (Instagram, TikTok, YouTube) integriert. Diese sind lediglich als Link zu den Diensten ausgeführt. Nach dem Anklicken des eingebundenen Text-/Bildlinks werden Sie auf die Seite des jeweiligen Anbieters weitergeleitet. Erst nach der Weiterleitung werden Nutzerinformationen an den jeweiligen Anbieter übertragen."}
            </p>
          </div>

          {/* 5. Analyse-Tools und Werbung */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn
                ? "5. Analysis tools and advertising"
                : "5. Analyse-Tools und Werbung"}
            </h2>
            <p>
              {isEn
                ? "This website does not use third-party analysis tools or advertising services."
                : "Diese Website nutzt keine Analyse-Tools oder Werbedienste von Drittanbietern."}
            </p>
          </div>

          {/* 6. Ihre Rechte */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn ? "6. Your rights" : "6. Ihre Rechte"}
            </h2>
            <p>
              {isEn
                ? "You have the right at any time to:"
                : "Sie haben jederzeit das Recht:"}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                {isEn
                  ? "Request information about your personal data processed by us (Art. 15 GDPR)"
                  : "gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen"}
              </li>
              <li>
                {isEn
                  ? "Request the immediate correction of incorrect or completion of your personal data stored by us (Art. 16 GDPR)"
                  : "gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen"}
              </li>
              <li>
                {isEn
                  ? "Request the deletion of your personal data stored by us (Art. 17 GDPR)"
                  : "gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen"}
              </li>
              <li>
                {isEn
                  ? "Request the restriction of processing of your personal data (Art. 18 GDPR)"
                  : "gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen"}
              </li>
              <li>
                {isEn
                  ? "Receive your personal data in a structured, common and machine-readable format (Art. 20 GDPR)"
                  : "gemäß Art. 20 DSGVO Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten"}
              </li>
              <li>
                {isEn
                  ? "Revoke your consent at any time (Art. 7 para. 3 GDPR)"
                  : "gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen"}
              </li>
            </ul>
          </div>

          {/* 7. Widerspruch gegen Werbe-E-Mails */}
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
              {isEn
                ? "7. Objection to advertising emails"
                : "7. Widerspruch gegen Werbe-E-Mails"}
            </h2>
            <p>
              {isEn
                ? "The use of contact data published within the scope of the imprint obligation to send advertising and information materials not expressly requested is hereby objected to. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam emails."
                : "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
