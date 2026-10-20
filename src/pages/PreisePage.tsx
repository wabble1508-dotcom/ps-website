import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { useState } from "react";
import { PricingQuickNav } from "@/components/PricingQuickNav";
import { PricingCards } from "@/components/PricingCards";
import { PricingTrustBadges } from "@/components/PricingTrustBadges";
import { PricingComparisonTable } from "@/components/PricingComparisonTable";
import { PricingCapabilities } from "@/components/PricingCapabilities";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

const FaqItem = ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="rounded-xl border border-border bg-card px-6 py-4 shadow-sm hover:border-primary/40 transition-all">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 text-left"
    >
      <span className="text-base font-bold text-foreground">{q}</span>
      <ChevronDown
        className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
    {open && (
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
    )}
  </div>
);

export default function PreisePage() {
  const { language } = useLanguage();
  const t = getPricingT(language);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full bg-background">
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        keywords="Webdesign Preise, Website Kosten, KI Automatisierung Preise, Homepage erstellen lassen Kosten, Webdesign Dortmund Preise, KI Telefonassistent Kosten, CRM Pakete"
        faqs={t.faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

      {/* Hero */}
      <section className="bg-secondary py-20 md:py-24 text-center text-white relative overflow-hidden">
        <FadeIn className="container relative z-10 mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.heroTitle}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {t.heroSubtitle}
          </p>
        </FadeIn>
      </section>

      <PricingQuickNav />
      <PricingCards />
      <PricingTrustBadges />
      <PricingComparisonTable />
      <PricingCapabilities />

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 scroll-mt-24">
        <div className="container mx-auto max-w-3xl px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t.faqTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{t.faqDesc}</p>
          </FadeIn>
          <FadeIn className="space-y-4">
            {t.faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
