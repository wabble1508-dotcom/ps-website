import { ShieldCheck, RefreshCw, Lock, Headphones } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

export const PricingTrustBadges = () => {
  const { language } = useLanguage();
  const t = getPricingT(language);

  const badges = [
    {
      icon: RefreshCw,
      title: t.trustMonthly,
      desc: t.trustMonthlyDesc,
    },
    {
      icon: ShieldCheck,
      title: t.trustNoHidden,
      desc: t.trustNoHiddenDesc,
    },
    {
      icon: Lock,
      title: t.trustSsl,
      desc: t.trustSslDesc,
    },
    {
      icon: Headphones,
      title: t.trustSupport,
      desc: t.trustSupportDesc,
    },
  ];

  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {b.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
