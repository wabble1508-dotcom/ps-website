import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function ImpressumPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  return (
    <div className="w-full bg-white py-20">
      <SEO
        title="Impressum | PS Professional Solutions"
        description="Impressum von PS Professional Solutions — Inhaber: Pankaj Mondjal."
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {isEn ? "Imprint" : "Impressum"}
        </h1>
        <div className="prose prose-lg text-muted-foreground">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn
              ? "Information according to § 5 TMG"
              : "Angaben gemäß § 5 TMG"}
          </h2>
          <p className="font-semibold text-foreground">
            PS Professional Solutions
            <br />
            Inhaber: Pankaj Mondjal
            <br />
            Lindenhorsterstr. 185
            <br />
            44339 Dortmund
            <br />
            Deutschland
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Contact" : "Kontakt"}
          </h2>
          <p>
            {isEn ? "Phone" : "Telefon"}: +49 152 0759 5260
            <br />
            {isEn ? "Email" : "E-Mail"}: info@ps-professional-solutions.de
            <br />
            {isEn ? "Website" : "Webseite"}:
            https://ps-professional-solutions.de
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn
              ? "Responsible for content according to § 55 Abs. 2 RStV"
              : "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"}
          </h2>
          <p className="font-semibold text-foreground">
            Pankaj Mondjal
            <br />
            Lindenhorsterstr. 185
            <br />
            44339 Dortmund
            <br />
            {isEn ? "Contact" : "Kontakt"}: info@ps-professional-solutions.de
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Professional Background" : "Beruflicher Hintergrund"}
          </h2>
          <p>
            {isEn
              ? "Pankaj Mondjal holds a Bachelor of Arts (B.A.) in Marketing Management and is the founder and managing director of PS Professional Solutions. He specializes in digital marketing, web design, and AI automation for local businesses."
              : "Pankaj Mondjal ist Inhaber und Geschäftsführer von PS Professional Solutions. Er verfügt über einen Bachelor of Arts (B.A.) im Fach Marketing Management und ist Experte für digitales Marketing, Webdesign sowie KI-Automatisierung für lokale Unternehmen."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "EU Dispute Resolution" : "EU-Streitschlichtung"}
          </h2>
          <p>
            {isEn
              ? "The European Commission provides a platform for online dispute resolution (OS): "
              : "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            {isEn
              ? "You can find our email address in the imprint above."
              : "Unsere E-Mail-Adresse finden Sie oben im Impressum."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Liability for Content" : "Haftung für Inhalte"}
          </h2>
          <p>
            {isEn
              ? "As a service provider we are responsible for our own content on these pages according to § 7 para.1 TMG under general laws. According to §§ 8 to 10 TMG we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."
              : "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Copyright" : "Urheberrecht"}
          </h2>
          <p>
            {isEn
              ? "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its author or creator."
              : "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."}
          </p>
        </div>
      </div>
    </div>
  );
}
