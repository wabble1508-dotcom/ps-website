import { Link } from "react-router-dom";
import { submitForm } from "@/lib/submitForm";
import { Mail, Phone, Clock, ShieldCheck, Lock, Star } from "lucide-react";
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

            <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
              <a
                href="https://www.instagram.com/ps_professional_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@psprofessional.solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.34-2.85 5.75-1.74 1.45-4.14 2.1-6.38 1.6-2.22-.49-4.13-1.92-5.18-3.9-1.03-1.93-1.13-4.3-.26-6.29 1.05-2.38 3.51-4.01 6.13-4.13.01 1.4.01 2.8.01 4.2-1.06.14-2.12.72-2.77 1.55-.66.84-.88 2.01-.54 3.02.29.87 1.05 1.55 1.95 1.76.92.21 1.93.02 2.68-.53.76-.56 1.21-1.47 1.24-2.41.06-4.99.03-9.98.03-14.97z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@psprofessionalsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
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
                <Star className="h-8 w-8 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Top Rated
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
