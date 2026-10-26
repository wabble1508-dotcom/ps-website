import { ArrowUpRight, Handshake } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";

// CRM-Partner Une Solutions. Das Logo wechselt wie auf unesolutions.co.uk
// fließend durch alle Farben (Animation „partner-hue“ in index.css).
const UI = {
  badge: { de: "Offizieller CRM-Partner", en: "Official CRM partner", tr: "Resmi CRM ortağı" },
  title: {
    de: "Ihr CRM – gemeinsam mit Une Solutions",
    en: "Your CRM – together with Une Solutions",
    tr: "CRM'iniz – Une Solutions ile birlikte",
  },
  text: {
    de: "Für Kundenverwaltung, Pipelines und automatisierte Nachfassaktionen arbeiten wir mit unserem CRM-Partner Une Solutions zusammen. Wir verbinden Ihre Website, den KI-Chat und die Terminbuchung direkt mit dem CRM – alles aus einer Hand.",
    en: "For customer management, pipelines and automated follow-ups we work with our CRM partner Une Solutions. We connect your website, AI chat and online booking directly to the CRM – all from one source.",
    tr: "Müşteri yönetimi, satış süreçleri ve otomatik takip için CRM ortağımız Une Solutions ile çalışıyoruz. Web sitenizi, AI sohbeti ve online randevuyu doğrudan CRM'e bağlıyoruz – hepsi tek elden.",
  },
  points: [
    { de: "Kontakte & Anfragen an einem Ort", en: "Contacts & enquiries in one place", tr: "Kişiler ve talepler tek yerde" },
    { de: "Automatische Erinnerungen & Follow-ups", en: "Automatic reminders & follow-ups", tr: "Otomatik hatırlatmalar ve takipler" },
    { de: "Einrichtung & Schulung durch uns", en: "Setup & training by us", tr: "Kurulum ve eğitim bizden" },
  ],
  cta: { de: "Une Solutions ansehen", en: "Visit Une Solutions", tr: "Une Solutions'ı ziyaret et" },
};

export const CrmPartnerSection = () => {
  const { language } = useLanguage();
  const pick = (t: { de: string; en: string; tr: string }) =>
    language === "en" ? t.en : language === "tr" ? t.tr : t.de;

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1fr_1.4fr] md:p-12 shadow-sm">
            <a
              href="https://unesolutions.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center"
              aria-label="Une Solutions"
            >
              <img
                src="/media/partner/une-solutions.png"
                alt="Une Solutions Logo"
                width={320}
                height={202}
                loading="lazy"
                className="partner-hue w-56 md:w-72 h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Handshake className="h-4 w-4" /> {pick(UI.badge)}
              </span>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">{pick(UI.title)}</h2>
              <p className="mt-3 text-muted-foreground">{pick(UI.text)}</p>
              <ul className="mt-5 space-y-2">
                {UI.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="partner-hue mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {pick(p)}
                  </li>
                ))}
              </ul>
              <a
                href="https://unesolutions.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {pick(UI.cta)} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
