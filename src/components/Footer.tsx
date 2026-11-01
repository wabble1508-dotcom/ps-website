import { SocialIcons } from "./SocialIcons";
import { Link } from "react-router-dom";
import { openConsentSettings } from "@/lib/consent";
import { submitForm } from "@/lib/submitForm";
import { Mail, Phone, Clock, ShieldCheck, Lock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const featureLinks = [
    { to: "/ki-telefon-assistent", label: t("nav", "kiAssistant") },
    {
      to: "/intelligente-termin-automation",
      label: t("nav", "terminAutomation"),
    },
    { to: "/ki-live-chat", label: t("nav", "liveChat") },
    { to: "/google-business-optimierung", label: t("nav", "googleSeo") },
    { to: "/webseiten", label: t("nav", "websites") },
    { to: "/app-entwicklung", label: t("nav", "appDev") },
    { to: "/software-entwicklung", label: t("nav", "softwareDev") },
    { to: "/guenstige-website", label: t("nav", "cheapWebsite") },
    { to: "/webdesign-dortmund", label: t("nav", "webdesignDortmund") },
    {
      to: "/all-in-one-dashboard",
      label: "All-in-One Dashboard",
    },
    {
      to: "/design-druck",
      label: language === "de" ? "Design & Druck" : "Design & Print",
    },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await submitForm("newsletter", { email });

    setEmail("");
    setIsSubmitting(false);
    toast({
      title:
        language === "de"
          ? "Erfolgreich angemeldet!"
          : "Successfully subscribed!",
      description:
        language === "de"
          ? "Vielen Dank für Ihre Anmeldung zum Newsletter."
          : "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <footer className="bg-secondary pt-16 pb-40 md:pb-16 text-white border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="space-y-6 md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png"
                alt="PS Professional Solutions Logo"
                className="h-24 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 leading-relaxed max-w-sm">
              {t("footer", "partner")}
            </p>

            <div className="mt-8">
              <h4 className="mb-4 text-sm font-bold text-white uppercase tracking-wider">
                {language === "de"
                  ? "Newsletter abonnieren"
                  : "Subscribe to Newsletter"}
              </h4>
              <form
                className="flex gap-2 max-w-sm"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="email"
                  name="email"
                  id="footer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={
                    language === "de" ? "E-Mail Adresse" : "Email Address"
                  }
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary placeholder:text-white/40"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white hover:bg-primary/90 shrink-0"
                >
                  {isSubmitting
                    ? "..."
                    : language === "de"
                      ? "Abonnieren"
                      : "Subscribe"}
                </Button>
              </form>
            </div>

            <SocialIcons className="mt-8 border-t border-white/10 pt-6" />
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-primary">
              {t("nav", "features")}
            </h4>
            <ul className="space-y-4 text-white/70">
              {featureLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-primary">
              {t("nav", "industries")}
            </h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  to="/handwerker"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "handwerker")}
                </Link>
              </li>
              <li>
                <Link
                  to="/beautysalon"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "beauty")}
                </Link>
              </li>
              <li>
                <Link
                  to="/gesundheitswesen"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "gesundheitswesen")}
                </Link>
              </li>
              <li>
                <Link
                  to="/kfz-zulassung"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "kfz") || "KFZ-Zulassung & Schilder"}
                </Link>
              </li>
              <li>
                <Link
                  to="/festivals"
                  className="hover:text-primary transition-colors"
                >
                  Festivals & Events (Sunset Sounds)
                </Link>
              </li>
              <li>
                <Link
                  to="/vereine"
                  className="hover:text-primary transition-colors"
                >
                  Vereine & Verbände (Cohedo)
                </Link>
              </li>
              <li>
                <Link
                  to="/gastronomie"
                  className="hover:text-primary transition-colors"
                >
                  Gastronomie & Restaurants (Öz Urfa, AM, Sis)
                </Link>
              </li>
              <li>
                <Link
                  to="/bildung"
                  className="hover:text-primary transition-colors"
                >
                  Bildung & Nachhilfe (S&D Zentrum, KS Dill)
                </Link>
              </li>
              <li>
                <Link
                  to="/textil"
                  className="hover:text-primary transition-colors"
                >
                  Textil, Mode & Merch
                </Link>
              </li>
              <li>
                <Link
                  to="/app-entwicklung"
                  className="hover:text-primary transition-colors"
                >
                  Apps & Plattformen (SkyJoin, WebsiteNova)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-primary">
              {language === "de" ? "Unternehmen" : "Company"}
            </h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  to="/erfolgsgeschichten"
                  className="hover:text-primary transition-colors"
                >
                  {language === "de" ? "Fallstudien" : "Case Studies"}
                </Link>
              </li>
              <li>
                <Link
                  to="/ki-lexikon"
                  className="hover:text-primary transition-colors"
                >
                  {language === "de" ? "KI-Lexikon" : "Glossary"}
                </Link>
              </li>
              <li>
                <Link
                  to="/magazin"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "magazine")}
                </Link>
              </li>
              <li>
                <Link
                  to="/karriere"
                  className="hover:text-primary transition-colors"
                >
                  {language === "de" ? "Karriere" : "Careers"}
                </Link>
              </li>
              <li>
                <Link
                  to="/ueber-uns"
                  className="hover:text-primary transition-colors"
                >
                  {language === "de" ? "Über uns" : "About us"}
                </Link>
              </li>
              <li>
                <Link
                  to="/ablauf"
                  className="hover:text-primary transition-colors"
                >
                  {language === "de" ? "Ablauf" : "Process"}
                </Link>
              </li>
              <li>
                <Link
                  to="/preise"
                  className="text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  {language === "de" ? "Preise & Pakete" : "Pricing & Packages"}
                </Link>
              </li>
              <li>
                <Link
                  to="/nfc-karten"
                  className="text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  {language === "de"
                    ? "Bewertungs-Karten Shop"
                    : "Review Cards Shop"}
                </Link>
              </li>
              <li>
                <Link
                  to="/design-druck"
                  className="text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  {language === "de" ? "Design & Druck" : "Design & Print"}
                </Link>
              </li>
              <li>
                <Link
                  to="/integrationen"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav", "integrations")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-primary">
              {t("footer", "availability")}
            </h4>
            <ul className="space-y-4 text-white/70 mb-8">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                24/7 {language === "de" ? "KI-Support" : "AI Support"}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:info@ps-professional-solutions.de"
                  className="hover:text-primary transition-colors"
                >
                  info@ps-professional-solutions.de
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href="tel:+4915207595260"
                  className="hover:text-primary transition-colors"
                >
                  +49 152 0759 5260
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  SSL Secure
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                <Lock className="h-8 w-8 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  100% Privacy
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Made in Dortmund
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} PS Professional Solutions.{" "}
            {t("footer", "rights")}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/info"
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {t("footer", "imprint")}
            </Link>
            <Link
              to="/datenschutz"
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {t("footer", "privacy")}
            </Link>
            <Link
              to="/agb"
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              AGB
            </Link>
            <button
              type="button"
              onClick={openConsentSettings}
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Cookie-Einstellungen
            </button>
            <a
              href="https://wa.me/4915207595260"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>
            <a
              href="mailto:info@ps-professional-solutions.de"
              className="font-semibold text-white/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              E-Mail
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
