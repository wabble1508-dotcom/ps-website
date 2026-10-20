import { useLanguage } from "@/components/LanguageContext";

export const useSearchData = () => {
  const { language, t } = useLanguage();

  const featureLinks = [
    { to: "/ki-telefon-assistent", label: t("nav", "kiAssistant") },
    {
      to: "/intelligente-termin-automation",
      label: t("nav", "terminAutomation"),
    },
    { to: "/ki-live-chat", label: t("nav", "liveChat") },
    { to: "/google-business-optimierung", label: t("nav", "googleSeo") },
    { to: "/webseiten", label: t("nav", "websites") },
    {
      to: "/all-in-one-dashboard",
      label:
        language === "de"
          ? "All-in-One CRM"
          : language === "en"
            ? "All-in-One CRM"
            : language === "es"
              ? "CRM Todo-en-Uno"
              : language === "fr"
                ? "CRM Tout-en-Un"
                : "CRM All-in-One",
    },
    {
      to: "/design-druck",
      label:
        language === "de"
          ? "Design & Druck"
          : language === "en"
            ? "Design & Print"
            : language === "es"
              ? "Diseño & Impresión"
              : language === "fr"
                ? "Design & Impression"
                : "Design & Stampa",
    },
  ];

  const industryLinks = [
    { to: "/handwerker", label: t("nav", "handwerker") },
    { to: "/beautysalon", label: t("nav", "beauty") },
    { to: "/gesundheitswesen", label: t("nav", "gesundheitswesen") },
    {
      to: "/gastronomie",
      label:
        language === "de"
          ? "Gastronomie & Restaurants"
          : language === "tr"
            ? "Restoran & Kafe"
            : "Restaurants & Cafes",
    },
    { to: "/kfz-zulassung", label: t("nav", "kfz") },
    {
      to: "/bildung",
      label:
        language === "de"
          ? "Bildung & Nachhilfe"
          : language === "tr"
            ? "Eğitim & Kurslar"
            : "Education & Tutoring",
    },
    { to: "/festivals", label: t("nav", "festivals") || "Festivals & Events" },
    { to: "/vereine", label: t("nav", "vereine") || "Vereine & Verbände" },
    { to: "/textil", label: t("nav", "textil") || "Textil & Merch" },
  ];

  const searchData = [
    {
      path: "/ki-telefon-assistent",
      label: t("nav", "kiAssistant"),
      keywords:
        language === "de"
          ? "telefon anrufe ki assistent stimme voice 24/7 erreichbarkeit kundenservice sekretariat"
          : "phone calls ai assistant voice 24/7 availability customer service secretary",
      category: t("nav", "features"),
    },
    {
      path: "/intelligente-termin-automation",
      label: t("nav", "terminAutomation"),
      keywords:
        language === "de"
          ? "termine kalender buchung online erinnerung sms no-shows ausfälle planung"
          : "appointments calendar booking online reminder sms no-shows cancellations planning",
      category: t("nav", "features"),
    },
    {
      path: "/ki-live-chat",
      label: t("nav", "liveChat"),
      keywords:
        language === "de"
          ? "chat bot website leads qualifizierung fragen antworten support kundenservice"
          : "chat bot website leads qualification questions answers support customer service",
      category: t("nav", "features"),
    },
    {
      path: "/google-business-optimierung",
      label: t("nav", "googleSeo"),
      keywords:
        language === "de"
          ? "google seo ranking lokal bewertungen sichtbarkeit maps profil suche"
          : "google seo ranking local reviews visibility maps profile search",
      category: t("nav", "features"),
    },
    {
      path: "/webseiten",
      label: t("nav", "websites"),
      keywords:
        language === "de"
          ? "webdesign homepage website seo conversion landingpage erstellen internetseite programmierte webseite webentwickler firmenhomepage programmieren lassen"
          : "web design homepage website seo conversion landing page create internet site programmed website web developer",
      category: t("nav", "features"),
    },
    {
      path: "/all-in-one-dashboard",
      label:
        language === "de"
          ? "All-in-One CRM"
          : language === "en"
            ? "All-in-One CRM"
            : language === "es"
              ? "CRM Todo-en-Uno"
              : language === "fr"
                ? "CRM Tout-en-Un"
                : "CRM All-in-One",
      keywords:
        language === "de"
          ? "dashboard crm vertrieb marketing kommunikation übersicht"
          : "dashboard crm sales marketing communication overview",
      category: t("nav", "features"),
    },
    {
      path: "/nfc-karten",
      label: language === "de" ? "NFC Karten Shop" : "NFC Cards Shop",
      keywords:
        language === "de"
          ? "nfc karte google bewertung shop kaufen marketing"
          : "nfc card google review shop buy marketing",
      category: t("nav", "features"),
    },
    {
      path: "/design-druck",
      label:
        language === "de"
          ? "Design & Druck"
          : language === "en"
            ? "Design & Print"
            : language === "es"
              ? "Diseño & Impresión"
              : language === "fr"
                ? "Design & Impression"
                : "Design & Stampa",
      keywords:
        language === "de"
          ? "design druck visitenkarten flyer banner aufkleber speisekarten druckerei print"
          : "design print business cards flyers banners stickers menus print shop",
      category: t("nav", "features"),
    },
    {
      path: "/handwerker",
      label: t("nav", "handwerker"),
      keywords:
        language === "de"
          ? "handwerk bau sanitär elektro shk maler dachdecker baustelle handwerksbetrieb"
          : "crafts construction plumbing electrical painter roofer site craft business",
      category: t("nav", "industries"),
    },
    {
      path: "/beautysalon",
      label: t("nav", "beauty"),
      keywords:
        language === "de"
          ? "beauty salon friseur kosmetik haare nägel terminbuchung wellness spa"
          : "beauty salon hairdresser cosmetics hair nails appointment booking wellness spa",
      category: t("nav", "industries"),
    },
    {
      path: "/gesundheitswesen",
      label: t("nav", "gesundheitswesen"),
      keywords:
        language === "de"
          ? "gesundheit praxis arzt zahnarzt physio therapeut patienten klinik"
          : "health practice doctor dentist physio therapist patients clinic",
      category: t("nav", "industries"),
    },
    {
      path: "/kfz-zulassung",
      label: t("nav", "kfz"),
      keywords:
        language === "de"
          ? "kfz zulassung wunschkennzeichen schilder kennzeichen i-kfz zulassungsstelle auto anmelden matou xl schilder"
          : "vehicle registration custom license plate plates i-kfz registration office car matou xl schilder",
      category: t("nav", "industries"),
    },
    {
      path: "/festivals",
      label:
        language === "de"
          ? "Festivals & Events (Sunset Sounds)"
          : "Festivals & Events (Sunset Sounds Fest)",
      keywords:
        language === "de"
          ? "festivals events konzerte sunset sounds ticket drop timetable line up festival website"
          : "festivals events concerts sunset sounds tickets timetable line up festival website",
      category: t("nav", "industries"),
    },
    {
      path: "/vereine",
      label:
        language === "de"
          ? "Vereine & Verbände (Cohedo)"
          : "Clubs & Non-Profit (Cohedo)",
      keywords:
        language === "de"
          ? "vereine verbaende cohedo sportverein ngo mitgliedsantrag spenden ehrenamt mitgliederverwaltung"
          : "clubs associations non profit charity membership donations cohedo sports club",
      category: t("nav", "industries"),
    },
    {
      path: "/textil",
      label:
        language === "de" ? "Textil, Mode & Merch" : "Textile, Fashion & Merch",
      keywords:
        language === "de"
          ? "textil mode fashion merch shop stickerei textildruck b2b konfigurator groessenberater"
          : "textile fashion merch store embroidery custom apparel b2b size finder clothing",
      category: t("nav", "industries"),
    },
    {
      path: "/magazin",
      label: t("nav", "magazine"),
      keywords:
        language === "de"
          ? "blog magazin artikel ratgeber news neuigkeiten tipps wissen"
          : "blog magazine articles guide news tips knowledge",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/erfolgsgeschichten",
      label: language === "de" ? "Fallstudien" : "Case Studies",
      keywords:
        language === "de"
          ? "fallstudien erfolgsgeschichten referenzen kunden cases ergebnisse"
          : "case studies success stories references clients results",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/ki-lexikon",
      label: language === "de" ? "KI-Lexikon" : "AI Glossary",
      keywords:
        language === "de"
          ? "lexikon glossar begriffe wissen erklärung seo automation"
          : "glossary terms knowledge explanation seo automation",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/ablauf",
      label: language === "de" ? "Ablauf" : "Process",
      keywords:
        language === "de"
          ? "prozess ablauf schritte zusammenarbeit onboarding start projekt"
          : "process steps collaboration onboarding start project",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/preise",
      label: language === "de" ? "Preise" : "Pricing",
      keywords:
        language === "de"
          ? "preise kosten pakete investition roi rechner tarife angebot"
          : "prices costs packages investment roi calculator plans offer",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/ueber-uns",
      label: language === "de" ? "Über uns" : "About us",
      keywords:
        language === "de"
          ? "team über uns vision mission kontakt agentur wer wir sind philosophie"
          : "team about us vision mission contact agency who we are philosophy",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/karriere",
      label: language === "de" ? "Karriere" : "Careers",
      keywords:
        language === "de"
          ? "karriere jobs bewerbung offene stellen"
          : "careers jobs application open positions",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/integrationen",
      label: t("nav", "integrations"),
      keywords:
        language === "de"
          ? "integrationen schnittstellen zapier make api"
          : "integrations interfaces zapier make api",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/",
      label: language === "de" ? "Startseite" : "Home",
      keywords:
        language === "de"
          ? "startseite home ki automation webdesign leadgenerierung marketing agentur"
          : "home ai automation web design lead generation marketing agency",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/info",
      label: t("footer", "imprint"),
      keywords:
        language === "de"
          ? "impressum rechtliches betreiber kontakt"
          : "imprint legal operator contact",
      category: language === "de" ? "Unternehmen" : "Company",
    },
    {
      path: "/datenschutz",
      label: t("footer", "privacy"),
      keywords:
        language === "de"
          ? "datenschutz dsgvo cookies daten privacy"
          : "privacy gdpr cookies data",
      category: language === "de" ? "Unternehmen" : "Company",
    },
  ];

  const searchCategories = Array.from(
    new Set(searchData.map((item) => item.category)),
  );

  return { featureLinks, industryLinks, searchData, searchCategories };
};
