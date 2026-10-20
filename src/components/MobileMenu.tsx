import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";
import { ChevronDown } from "lucide-react";
import { useContactForm } from "./ContactFormDialog";

export const MobileMenu = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openForm } = useContactForm();

  const languages = [
    { code: "de", name: "Deutsch" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
    { code: "tr", name: "Türkçe" },
    { code: "ro", name: "Română" },
    { code: "ru", name: "Русский" },
    { code: "bg", name: "Български" },
    { code: "ar", name: "العربية" },
    { code: "fa", name: "فارسی" },
    { code: "ps", name: "پښتو" },
    { code: "zh", name: "中文" },
  ] as const;

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
      label: t("nav", "crm") || "All-in-One CRM",
    },
    {
      to: "/design-druck",
      label: t("nav", "designPrint") || "Design & Druck",
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

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = e.currentTarget.nextElementSibling;
    if (next) next.classList.toggle("hidden");
    e.currentTarget.querySelector("svg")?.classList.toggle("rotate-180");
  };

  return (
    <div className="lg:hidden border-t bg-background h-[calc(100vh-5.5rem)] overflow-y-auto animate-in slide-in-from-top duration-300">
      <div className="flex flex-col gap-2 py-3 px-3 pb-24">
        {/* Social row — compact */}
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/4915207595260?text=${encodeURIComponent(t("nav", "waMsg") || "Hallo Pankaj, ich interessiere mich für Ihre Leistungen!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white text-xs font-bold shadow-md transition-all"
          >
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/ps_professional_solutions/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white shadow-md transition-all hover:scale-105 shrink-0"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.357.198-6.78 2.618-6.978 6.978-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.198 4.357 2.618 6.78 6.978 6.978 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.198 6.778-2.618 6.978-6.978.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.198-4.354-2.617-6.78-6.977-6.978-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@psprofessional.solutions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background shadow-md transition-all hover:scale-105 shrink-0"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.06v14.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
            </svg>
          </a>
        </div>

        <Link
          to="/webseiten"
          className="block text-sm font-extrabold py-2.5 text-primary-foreground bg-primary px-3 rounded-lg text-center shadow-md flex items-center justify-center gap-1.5"
        >
          {t("nav", "websites")}
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/preise"
            className="block text-sm font-bold py-2 text-primary bg-primary/10 px-3 rounded-lg text-center"
          >
            {t("nav", "preise") || "Preise"}
          </Link>
          <Link
            to="/nfc-karten"
            className="block text-sm font-bold py-2 text-primary bg-primary/5 px-3 rounded-lg text-center"
          >
            {t("nav", "reviewCards") || "Bewertungs-Karten"}
          </Link>
        </div>

        {/* Features — collapsible */}
        <div className="border border-muted rounded-xl p-2">
          <button
            className="flex items-center justify-between w-full px-2 py-2 text-sm font-bold text-secondary"
            onClick={toggle}
          >
            {t("nav", "features")}
            <ChevronDown className="h-4 w-4 transition-transform" />
          </button>
          <div className="hidden flex-col gap-0.5 px-2 pb-2">
            {featureLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Industries — collapsible */}
        <div className="border border-muted rounded-xl p-2">
          <button
            className="flex items-center justify-between w-full px-2 py-2 text-sm font-bold text-secondary"
            onClick={toggle}
          >
            {t("nav", "industries")}
            <ChevronDown className="h-4 w-4 transition-transform" />
          </button>
          <div className="hidden flex-col gap-0.5 px-2 pb-2">
            {industryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company — collapsible */}
        <div className="border border-muted rounded-xl p-2">
          <button
            className="flex items-center justify-between w-full px-2 py-2 text-sm font-bold text-secondary"
            onClick={toggle}
          >
            {t("nav", "company") || "Unternehmen"}
            <ChevronDown className="h-4 w-4 transition-transform" />
          </button>
          <div className="hidden flex-col gap-0.5 px-2 pb-2">
            <Link
              to="/erfolgsgeschichten"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "caseStudies") || "Fallstudien"}
            </Link>
            <Link
              to="/ki-lexikon"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "glossary") || "KI-Lexikon"}
            </Link>
            <Link
              to="/magazin"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "magazine")}
            </Link>
            <Link
              to="/ablauf"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "process") || "Ablauf"}
            </Link>
            <Link
              to="/ueber-uns"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "about") || "Über uns"}
            </Link>
            <Link
              to="/karriere"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "careers") || "Karriere"}
            </Link>
            <Link
              to="/integrationen"
              className="block text-sm font-medium py-1.5 px-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/5"
            >
              {t("nav", "integrations")}
            </Link>
          </div>
        </div>

        <div className="pt-1 space-y-1.5">
          {[
            {
              label: t("nav", "langEuropean") || "Europäisch",
              items: languages.slice(0, 6),
            },
            {
              label: t("nav", "langEastern") || "Osteuropäisch",
              items: languages.slice(6, 9),
            },
            {
              label: t("nav", "langMiddleEast") || "Naher Osten",
              items: languages.slice(9, 12),
            },
            {
              label: t("nav", "langAsian") || "Asiatisch",
              items: languages.slice(12, 13),
            },
          ].map((group) => (
            <div key={group.label}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                {group.label}
              </span>
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                {group.items.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    className="w-full rounded-full h-8 text-[11px] px-1"
                    onClick={() => setLanguage(lang.code)}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
