import { Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { formatEuro, packages, type Pkg } from "@/lib/pricingData";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

export const PricingQuickNav = () => {
  const { language } = useLanguage();
  const t = getPricingT(language);

  return (
    <section className="py-6 border-b border-border bg-muted/20 dark:bg-muted/40 sticky top-[64px] z-30 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {packages.map((pkg: Pkg) => (
            <a
              key={pkg.id}
              href={`#${pkg.id}`}
              className={`group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                pkg.popular
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105"
                  : "bg-card border border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {pkg.popular && (
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
              )}
              <span className="whitespace-nowrap">
                {language === "en" ? pkg.name.en : language === "tr" ? pkg.name.tr : pkg.name.de}
              </span>
              <span
                className={`text-[10px] sm:text-xs font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full transition-colors duration-300 whitespace-nowrap ${
                  pkg.popular
                    ? "bg-white/20 text-white"
                    : "bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white"
                }`}
              >
                {`${t.fromPrefix} ${formatEuro(pkg.monthlyFrom, language)}${language === "de" ? "/Monat" : language === "tr" ? "/ay" : "/mo"}`}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
