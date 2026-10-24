import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

// Allgemeine Geschäftsbedingungen für Geschäftskunden. Deutsch ist maßgeblich.
// Vor Änderungen am Geschäftsmodell (z. B. Laufzeiten, Preise) bitte anpassen und rechtlich prüfen lassen.
type Text = [de: string, en: string];
type Section = { title: Text; items: Text[] };

const STAND: Text = ["Stand: Oktober 2026", "Last updated: October 2026"];

const SECTIONS: Section[] = [
  {
    title: ["§ 1 Geltungsbereich", "§ 1 Scope"],
    items: [
      [
        "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen PS Professional Solutions, Inhaber Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund (nachfolgend „Anbieter“) und seinen Kunden über Webdesign, Hosting und Wartung, KI-Automatisierungen (z. B. KI-Telefonassistent, KI-Live-Chat, Termin-Automation), Google-Unternehmensprofil-Optimierung, Design- und Druckleistungen sowie NFC-Produkte.",
        "These General Terms and Conditions (GTC) apply to all contracts between PS Professional Solutions, owner Pankaj Mondjal, Lindenhorster Str. 185, 44339 Dortmund, Germany (the “Provider”) and its customers for web design, hosting and maintenance, AI automation (e.g. AI phone assistant, AI live chat, appointment automation), Google Business Profile optimisation, design and print services and NFC products.",
      ],
      [
        "Unsere Angebote richten sich ausschließlich an Unternehmer im Sinne von § 14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Abweichende Bedingungen des Kunden gelten nur, wenn der Anbieter ihnen ausdrücklich schriftlich zustimmt.",
        "Our offers are directed exclusively at businesses within the meaning of Section 14 of the German Civil Code (BGB), legal entities under public law and special funds under public law. Deviating terms of the customer only apply if the Provider expressly agrees to them in writing.",
      ],
    ],
  },
  {
    title: ["§ 2 Vertragsschluss", "§ 2 Conclusion of contract"],
    items: [
      [
        "Darstellungen auf der Website sind unverbindlich. Ein Vertrag kommt zustande, wenn der Kunde ein Angebot des Anbieters in Textform (z. B. per E-Mail oder WhatsApp) annimmt oder der Anbieter einen Auftrag in Textform bestätigt bzw. mit der Leistung beginnt.",
        "Information on the website is non-binding. A contract is concluded when the customer accepts an offer from the Provider in text form (e.g. by email or WhatsApp) or when the Provider confirms an order in text form or begins performance.",
      ],
      [
        "Umfang und Inhalt der Leistungen ergeben sich aus dem jeweiligen Angebot bzw. der Paketbeschreibung zum Zeitpunkt des Vertragsschlusses.",
        "The scope and content of the services are set out in the respective offer or package description at the time the contract is concluded.",
      ],
    ],
  },
  {
    title: ["§ 3 Leistungen und Mitwirkung des Kunden", "§ 3 Services and customer cooperation"],
    items: [
      [
        "Der Kunde stellt alle für die Leistung benötigten Inhalte (z. B. Texte, Bilder, Logos, Öffnungszeiten, Preise, Zugangsdaten) rechtzeitig und vollständig zur Verfügung. Er versichert, dass er die erforderlichen Rechte daran besitzt, und stellt den Anbieter von Ansprüchen Dritter frei, die auf einer Verletzung dieser Zusicherung beruhen.",
        "The customer provides all content required for the service (e.g. texts, images, logos, opening hours, prices, access data) in good time and in full. The customer warrants that it holds the necessary rights and indemnifies the Provider against third-party claims based on a breach of this warranty.",
      ],
      [
        "Verzögert sich die Leistung, weil Mitwirkungen des Kunden fehlen, verschieben sich vereinbarte Termine entsprechend. Für die rechtlichen Inhalte seiner Website (z. B. Impressum, Datenschutzerklärung, Preisangaben) ist der Kunde selbst verantwortlich, sofern nicht ausdrücklich etwas anderes vereinbart ist.",
        "If performance is delayed because the customer's cooperation is missing, agreed deadlines are postponed accordingly. The customer is responsible for the legal content of its website (e.g. imprint, privacy policy, price information) unless expressly agreed otherwise.",
      ],
      [
        "Der Anbieter darf zur Leistungserbringung sorgfältig ausgewählte Dienstleister einsetzen (z. B. Hosting-, Telefonie- und KI-Anbieter).",
        "The Provider may use carefully selected service providers to perform the services (e.g. hosting, telephony and AI providers).",
      ],
    ],
  },
  {
    title: ["§ 4 Abnahme und Änderungswünsche", "§ 4 Acceptance and change requests"],
    items: [
      [
        "Nach Fertigstellung stellt der Anbieter das Ergebnis (z. B. die Website) zur Prüfung bereit. Der Kunde prüft es innerhalb von 14 Tagen und teilt wesentliche Mängel in Textform mit. Erfolgt innerhalb dieser Frist keine Rückmeldung oder geht die Website auf Wunsch des Kunden online, gilt die Leistung als abgenommen.",
        "Upon completion, the Provider makes the result (e.g. the website) available for review. The customer reviews it within 14 days and reports material defects in text form. If no feedback is received within this period, or if the website goes live at the customer's request, the service is deemed accepted.",
      ],
      [
        "Im Paketpreis sind zwei Korrekturschleifen enthalten. Darüber hinausgehende oder nachträgliche Änderungswünsche werden nach Aufwand oder gemäß dem im Paket enthaltenen Änderungskontingent berechnet.",
        "Two rounds of revisions are included in the package price. Additional or subsequent change requests are charged according to effort or against the change allowance included in the package.",
      ],
    ],
  },
  {
    title: ["§ 5 Preise und Zahlung", "§ 5 Prices and payment"],
    items: [
      [
        "Es gelten die im Angebot genannten Preise. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern diese anfällt.",
        "The prices stated in the offer apply. All prices are subject to statutory VAT where applicable.",
      ],
      [
        "Einmalige Einrichtungsgebühren sind zu 50 % bei Auftragserteilung und zu 50 % bei Abnahme fällig, soweit nichts anderes vereinbart ist. Monatliche Entgelte werden ab dem Monat der Veröffentlichung bzw. Inbetriebnahme jeweils im Voraus berechnet. Rechnungen sind innerhalb von 14 Tagen ohne Abzug zahlbar.",
        "One-off setup fees are due 50% on placing the order and 50% on acceptance unless agreed otherwise. Monthly fees are invoiced in advance from the month of publication or go-live. Invoices are payable within 14 days without deduction.",
      ],
      [
        "Nutzungsabhängige Kosten, die über ein vereinbartes Kontingent hinausgehen (z. B. Telefonminuten des KI-Telefonassistenten), werden gemäß Angebot zusätzlich berechnet. Gerät der Kunde mit einer Zahlung mehr als 30 Tage in Verzug, darf der Anbieter laufende Dienste nach vorheriger Ankündigung in Textform vorübergehend aussetzen.",
        "Usage-based costs exceeding an agreed allowance (e.g. call minutes of the AI phone assistant) are charged additionally as set out in the offer. If the customer is more than 30 days in arrears, the Provider may temporarily suspend ongoing services after prior notice in text form.",
      ],
    ],
  },
  {
    title: ["§ 6 Laufzeit und Kündigung", "§ 6 Term and termination"],
    items: [
      [
        "Laufende Leistungen (z. B. Hosting, Wartung, KI-Dienste) werden auf unbestimmte Zeit geschlossen und können, soweit im Angebot keine Mindestlaufzeit vereinbart ist, von beiden Seiten mit einer Frist von einem Monat zum Monatsende gekündigt werden. Ist eine Mindestlaufzeit vereinbart, ist eine ordentliche Kündigung frühestens zu deren Ende möglich.",
        "Ongoing services (e.g. hosting, maintenance, AI services) are concluded for an indefinite period and, unless a minimum term is agreed in the offer, may be terminated by either party with one month's notice to the end of a month. If a minimum term is agreed, ordinary termination is possible at the earliest at the end of that term.",
      ],
      [
        "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen der Textform.",
        "The right to terminate for good cause remains unaffected. Notices of termination must be given in text form.",
      ],
      [
        "Nach Vertragsende stellt der Anbieter dem Kunden auf Wunsch die vom Kunden gelieferten Inhalte zur Verfügung. Die Übergabe der Website-Dateien bzw. des Quellcodes erfolgt gegen vollständige Bezahlung der Einrichtung; Lizenzen von Drittanbietern (z. B. KI- oder Telefoniedienste) enden mit dem Vertrag.",
        "After the contract ends, the Provider will make the content supplied by the customer available on request. Website files or source code are handed over upon full payment of the setup fee; third-party licences (e.g. AI or telephony services) end with the contract.",
      ],
    ],
  },
  {
    title: ["§ 7 Nutzungsrechte", "§ 7 Rights of use"],
    items: [
      [
        "Mit vollständiger Bezahlung erhält der Kunde das einfache, zeitlich und räumlich unbeschränkte Recht, die für ihn erstellten Arbeitsergebnisse für sein Unternehmen zu nutzen. Der Anbieter darf die Arbeiten unter Nennung des Kunden als Referenz (z. B. Logo auf der Website) zeigen, sofern der Kunde dem nicht widerspricht.",
        "Upon full payment, the customer receives the simple, unlimited right to use the work results created for it for its business. The Provider may show the work as a reference, naming the customer (e.g. logo on the website), unless the customer objects.",
      ],
    ],
  },
  {
    title: ["§ 8 Verfügbarkeit und KI-Dienste", "§ 8 Availability and AI services"],
    items: [
      [
        "Der Anbieter bemüht sich um eine möglichst unterbrechungsfreie Verfügbarkeit der gehosteten Dienste. Eine ständige Verfügbarkeit kann jedoch nicht zugesichert werden, insbesondere bei Wartungsarbeiten oder Störungen bei Drittanbietern.",
        "The Provider endeavours to keep hosted services available with as few interruptions as possible. Constant availability cannot be guaranteed, in particular during maintenance or disruptions at third-party providers.",
      ],
      [
        "KI-gestützte Dienste (z. B. Telefonassistent und Chat) erstellen Antworten automatisch. Diese können fehlerhaft oder unvollständig sein. Der Kunde prüft die Konfiguration (z. B. hinterlegte Preise, Öffnungszeiten) und bleibt für verbindliche Aussagen gegenüber seinen eigenen Kunden verantwortlich.",
        "AI-powered services (e.g. phone assistant and chat) generate responses automatically. These may be inaccurate or incomplete. The customer reviews the configuration (e.g. stored prices, opening hours) and remains responsible for binding statements to its own customers.",
      ],
    ],
  },
  {
    title: ["§ 9 Haftung", "§ 9 Liability"],
    items: [
      [
        "Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz.",
        "The Provider is liable without limitation for intent and gross negligence, for injury to life, body or health and under the Product Liability Act.",
      ],
      [
        "Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht und begrenzt auf den vertragstypischen, vorhersehbaren Schaden, höchstens jedoch auf die Summe der vom Kunden in den letzten 12 Monaten gezahlten Entgelte. Die Haftung für entgangenen Gewinn und Datenverluste ist in diesem Fall ausgeschlossen, soweit der Kunde diese durch übliche Datensicherung hätte vermeiden können.",
        "In cases of slight negligence, the Provider is only liable for breach of a material contractual obligation and limited to the typical, foreseeable damage, but no more than the total fees paid by the customer in the last 12 months. In this case, liability for lost profits and data loss is excluded to the extent the customer could have avoided them through customary data backups.",
      ],
    ],
  },
  {
    title: ["§ 10 Datenschutz", "§ 10 Data protection"],
    items: [
      [
        "Soweit der Anbieter im Auftrag des Kunden personenbezogene Daten verarbeitet (z. B. Anfragen und Termine der Kunden des Kunden), schließen die Parteien einen Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.",
        "Where the Provider processes personal data on behalf of the customer (e.g. enquiries and appointments of the customer's clients), the parties conclude a data processing agreement pursuant to Art. 28 GDPR.",
      ],
    ],
  },
  {
    title: ["§ 11 Schlussbestimmungen", "§ 11 Final provisions"],
    items: [
      [
        "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten ist Dortmund, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.",
        "The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods. The place of jurisdiction for all disputes is Dortmund, provided the customer is a merchant, a legal entity under public law or a special fund under public law.",
      ],
      [
        "Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        "Should any provision of these GTC be invalid, the validity of the remaining provisions shall not be affected.",
      ],
    ],
  },
];

export default function AgbPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const tx = (t: Text) => (isEn ? t[1] : t[0]);

  return (
    <div className="w-full bg-white py-20">
      <SEO
        title="AGB | PS Professional Solutions"
        description="Allgemeine Geschäftsbedingungen von PS Professional Solutions für Webdesign, Hosting, Wartung und KI-Automatisierung für Geschäftskunden."
        canonical="/agb"
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {isEn ? "General Terms and Conditions" : "Allgemeine Geschäftsbedingungen (AGB)"}
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
              <ol className="list-decimal pl-6 space-y-3">
                {section.items.map((item) => (
                  <li key={item[0]}>{tx(item)}</li>
                ))}
              </ol>
            </section>
          ))}
          <p className="pt-6 text-sm">{tx(STAND)}</p>
        </div>
      </div>
    </div>
  );
}
