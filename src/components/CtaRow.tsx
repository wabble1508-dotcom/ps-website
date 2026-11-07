import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";

// Klare nächste Schritte zwischen den Abschnitten: Angebot anfragen oder Termin buchen
const UI = {
  quote: { de: "Angebot anfragen", en: "Request a quote", tr: "Teklif iste" },
  book: { de: "Termin buchen", en: "Book an appointment", tr: "Randevu al" },
};

export const CtaRow = ({ source, className = "" }: { source: string; className?: string }) => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const pick = (t: { de: string; en: string; tr: string }) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <div className={`flex flex-col items-center justify-center gap-3 sm:flex-row ${className}`}>
      <button
        type="button"
        onClick={() => openForm("contact", source)}
        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-[0_10px_40px_-12px_rgba(30,159,174,0.8)] transition hover:-translate-y-0.5 hover:bg-primary/90"
      >
        {pick(UI.quote)}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <Link
        to="/analyse-bestaetigungen"
        className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary hover:bg-primary/5"
      >
        <CalendarCheck className="h-4 w-4 text-primary" />
        {pick(UI.book)}
      </Link>
    </div>
  );
};
