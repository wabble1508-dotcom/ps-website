import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  Search,
  Sun,
  Moon,
  Nfc,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useContactForm } from "./ContactFormDialog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSearchData } from "@/lib/searchData";
import { MobileMenu } from "./MobileMenu";

const WhatsAppIconSmall = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openForm } = useContactForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setIsScrolled(totalScroll > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchSelect = (to: string) => {
    setSearchOpen(false);
    navigate(to);
  };

  const { featureLinks, industryLinks, searchData, searchCategories } =
    useSearchData();

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300 ${isScrolled ? "py-0" : "py-1"}`}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${isScrolled ? "h-16 md:h-20" : "h-24 md:h-28"}`}
        >
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <Link
              to="/"
              className="flex items-center shrink-0 transition-transform hover:scale-105"
            >
              <img
                src="/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png"
                alt="PS Professional Solutions Logo"
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"}`}
              />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-widest text-foreground hover:text-primary-foreground hover:bg-primary transition-all border border-border/40 hover:border-primary/20 rounded-full px-3 h-8"
            >
              <Search className="h-3.5 w-3.5" />
              {language === "de" ? "SUCHEN" : "SEARCH"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-widest text-foreground hover:text-primary-foreground hover:bg-primary transition-all border border-border/40 hover:border-primary/20 rounded-full px-3 h-8"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[420px] p-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {[
                    {
                      label: language === "de" ? "Europäisch" : "European",
                      items: languages.slice(0, 6),
                    },
                    {
                      label:
                        language === "de"
                          ? "Osteuropäisch"
                          : "Eastern European",
                      items: languages.slice(6, 9),
                    },
                    {
                      label: language === "de" ? "Naher Osten" : "Middle East",
                      items: languages.slice(9, 12),
                    },
                    {
                      label: language === "de" ? "Asiatisch" : "Asian",
                      items: languages.slice(12, 13),
                    },
                  ].map((group) => (
                    <div key={group.label} className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 pt-1 pb-0.5">
                        {group.label}
                      </span>
                      {group.items.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`rounded-lg text-sm ${language === lang.code ? "bg-primary/10 text-primary font-bold" : ""}`}
                        >
                          {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-widest text-foreground hover:text-primary-foreground hover:bg-primary transition-all border border-border/40 hover:border-primary/20 rounded-full px-3 h-8"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-700" />
              )}
            </Button>
          </div>

          {/* Trennlinie zwischen Tools (Logo, Suche, Sprache, Dark Mode) und Hauptnavigation */}
          <div
            className="hidden lg:block h-6 w-px bg-border/60 mx-1 shrink-0"
            aria-hidden="true"
          />

          {/* Tablet compact nav — visible between md and lg */}
          <nav className="hidden md:flex lg:hidden items-center gap-1.5 ml-auto mr-2">
            <Link
              to="/webseiten"
              className="px-2.5 py-1.5 text-xs font-extrabold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all flex items-center gap-1.5 shadow-md"
            >
              <Monitor className="h-3.5 w-3.5" />
              {language === "de" ? "Webdesign" : "Web Design"}
            </Link>
            <Link
              to="/preise"
              className="px-2.5 py-1.5 text-xs font-extrabold text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all border border-primary/20 flex items-center gap-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              {language === "de" ? "Preise" : "Pricing"}
            </Link>
            <Link
              to="/nfc-karten"
              className="px-2.5 py-1.5 text-xs font-bold text-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Nfc className="h-3.5 w-3.5 text-primary" />
              {language === "de" ? "Bewertungs-Karten" : "Review Cards"}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-full outline-none">
                  {t("nav", "features")}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {featureLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.to}
                    onClick={() => navigate(link.to)}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-full outline-none">
                  {t("nav", "industries")}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {industryLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.to}
                    onClick={() => navigate(link.to)}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-full outline-none">
                  {language === "de" ? "Unternehmen" : "Company"}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={() => navigate("/erfolgsgeschichten")}
                >
                  {language === "de" ? "Fallstudien" : "Case Studies"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/ki-lexikon")}>
                  {language === "de" ? "KI-Lexikon" : "Glossary"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/magazin")}>
                  {t("nav", "magazine")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/ablauf")}>
                  {language === "de" ? "Ablauf" : "Process"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/ueber-uns")}>
                  {language === "de" ? "Über uns" : "About us"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/karriere")}>
                  {language === "de" ? "Karriere" : "Careers"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/integrationen")}>
                  {t("nav", "integrations")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <nav className="hidden lg:flex items-center gap-1.5 lg:gap-2 ml-4">
            <Link
              to="/webseiten"
              className="px-4 py-2 text-sm font-extrabold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all shadow-md shadow-primary/30 hover:scale-105 flex items-center gap-1.5"
            >
              <Monitor className="h-4 w-4" />
              {language === "de" ? "Webdesign" : "Web Design"}
            </Link>
            <Link
              to="/preise"
              className="px-3 py-2 text-sm font-extrabold text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all border border-primary/20 hover:scale-105 flex items-center gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {language === "de" ? "Preise" : "Pricing"}
            </Link>
            <Link
              to="/nfc-karten"
              className="px-3 py-2 text-sm font-bold text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all flex items-center gap-1.5"
            >
              <Nfc className="h-4 w-4 text-primary" />
              {language === "de" ? "Bewertungs-Karten" : "Review Cards"}
            </Link>
            {/* Features Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-lg outline-none">
                {t("nav", "features")}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-[560px] bg-background border border-border shadow-2xl p-4 rounded-2xl grid grid-cols-2 gap-2 max-h-[80vh] overflow-y-auto">
                  {featureLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex flex-col text-left p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors group/link"
                    >
                      <span className="font-bold text-sm mb-1">
                        {link.label}
                      </span>
                      <span className="text-xs text-muted-foreground group-hover/link:text-primary/70 line-clamp-2">
                        {language === "de"
                          ? "Entdecken Sie unsere Lösung für " + link.label
                          : "Discover our solution for " + link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-lg outline-none">
                {t("nav", "industries")}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-[300px] bg-background border border-border shadow-2xl p-3 rounded-2xl flex flex-col gap-1">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="w-full text-left px-4 py-3 text-sm font-semibold rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-all hover:text-primary hover:bg-primary/5 rounded-lg outline-none">
                {language === "de" ? "Unternehmen" : "Company"}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-[250px] bg-background border border-border shadow-2xl p-3 rounded-2xl flex flex-col gap-1">
                  <Link
                    to="/erfolgsgeschichten"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {language === "de" ? "Fallstudien" : "Case Studies"}
                  </Link>
                  <Link
                    to="/ki-lexikon"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {language === "de" ? "KI-Lexikon" : "Glossary"}
                  </Link>
                  <Link
                    to="/magazin"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {t("nav", "magazine")}
                  </Link>
                  <Link
                    to="/ablauf"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {language === "de" ? "Ablauf" : "Process"}
                  </Link>
                  <Link
                    to="/preise"
                    className="w-full text-left px-3 py-2 text-sm font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {language === "de"
                      ? "Preise & Pakete"
                      : "Pricing & Packages"}
                  </Link>
                  <Link
                    to="/nfc-karten"
                    className="w-full text-left px-3 py-2 text-sm font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    {language === "de"
                      ? "Bewertungs-Karten Shop"
                      : "Review Cards Shop"}
                  </Link>
                  <Link
                    to="/ueber-uns"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {language === "de" ? "Über uns" : "About us"}
                  </Link>
                  <Link
                    to="/karriere"
                    className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {language === "de" ? "Karriere" : "Careers"}
                  </Link>
                </div>
              </div>
            </div>

            {/* Social icons — desktop */}
            <div className="hidden xl:flex items-center gap-1.5 ml-1">
              <a
                href="https://www.instagram.com/ps_professional_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white hover:scale-110 transition-transform shadow-md"
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
                className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background hover:scale-110 transition-transform shadow-md"
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

            <Button
              className="ml-2 rounded-full px-3 py-1.5 text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center gap-1.5 whitespace-nowrap shrink-0"
              onClick={() => openForm("contact", "Header Button")}
            >
              <WhatsAppIconSmall />
              <span>
                {language === "de"
                  ? "Gratis-Check"
                  : language === "tr"
                    ? "Ücretsiz Analiz"
                    : "Free Check"}
              </span>
            </Button>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              className="p-1.5 text-foreground hover:text-primary-foreground hover:bg-primary rounded-full transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Suchen"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="flex items-center gap-1 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white px-2 py-1.5 text-[11px] font-bold shadow-md transition-all hover:scale-105 shrink-0"
              onClick={() => openForm("contact", "Header Button Mobile")}
              aria-label="WhatsApp Gratis-Check"
            >
              <WhatsAppIconSmall />
              <span className="hidden xs:inline sm:inline">WhatsApp</span>
            </button>
            {/* Hamburger only on small phones — tablets use the inline compact nav */}
            <button
              className="p-1.5 text-foreground hover:text-primary-foreground hover:bg-primary rounded-full transition-colors md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menü"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && <MobileMenu />}
      </header>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput
          placeholder={
            language === "de"
              ? "Suchen Sie nach Seiten oder Inhalten..."
              : "Search for pages or content..."
          }
        />
        <CommandList>
          <CommandEmpty>
            {language === "de"
              ? "Keine Ergebnisse gefunden."
              : "No results found."}
          </CommandEmpty>
          {searchCategories.map((category) => (
            <CommandGroup key={category} heading={category}>
              {searchData
                .filter((item) => item.category === category)
                .map((item) => (
                  <CommandItem
                    key={item.path}
                    value={`${item.label} ${item.keywords}`}
                    onSelect={() => handleSearchSelect(item.path)}
                    className="py-3 cursor-pointer"
                  >
                    <span className="font-medium">{item.label}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
