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
        {language !== "de" && (
          <p className="-mt-4 mb-8 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            {isEn
              ? "This translation is provided for convenience. Only the German version is legally binding."
              : "Diese Übersetzung dient nur zur Information. Rechtlich verbindlich ist ausschließlich die deutsche Fassung."}
          </p>
        )}
        <div className="prose prose-lg text-muted-foreground">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn
              ? "Information according to § 5 DDG"
              : "Angaben gemäß § 5 DDG"}
          </h2>
          <p className="font-semibold text-foreground">
            PS Professional Solutions
            <br />
            Inhaber: Pankaj Mondjal
            <br />
            Lindenhorster Str. 185
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
              ? "Responsible for content according to § 18 (2) MStV"
              : "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"}
          </h2>
          <p className="font-semibold text-foreground">
            Pankaj Mondjal
            <br />
            Lindenhorster Str. 185
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
              ? "Pankaj Mondjal holds a Bachelor of Arts (B.A.) in Marketing Management and is the founder and owner of PS Professional Solutions. He specializes in digital marketing, web design, and AI automation for local businesses."
              : "Pankaj Mondjal ist Gründer und Inhaber von PS Professional Solutions. Er verfügt über einen Bachelor of Arts (B.A.) im Fach Marketing Management und ist Experte für digitales Marketing, Webdesign sowie KI-Automatisierung für lokale Unternehmen."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Consumer dispute resolution" : "Verbraucherstreitbeilegung"}
          </h2>
          <p>
            {isEn
              ? "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."
              : "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">
            {isEn ? "Liability for Content" : "Haftung für Inhalte"}
          </h2>
          <p>
            {isEn
              ? "As a service provider we are responsible for our own content on these pages according to § 7 (1) DDG under general laws. According to §§ 8 to 10 DDG we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."
              : "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."}
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
