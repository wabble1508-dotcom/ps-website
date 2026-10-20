import { useState } from "react";
import { Check, ArrowRight, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import { packages, type Pkg } from "@/lib/pricingData";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

export const PricingCards = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const t = getPricingT(language);

  const pick = <T,>(de: T, en: T, tr: T): T =>
    language === "en" ? en : language === "tr" ? tr : de;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Billing cycle toggle: Monthly vs. Annual (Pay 10 months, get 2 free) */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-muted border border-border shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {language === "en"
                ? "Monthly Billing"
                : language === "tr"
                  ? "Aylık Ödeme"
                  : "Monatliche Zahlung"}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "annual"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === "en"
                  ? "Annual Plan (10 Mo. = 12 Mo.)"
                  : language === "tr"
                    ? "Yıllık Plan (10 Ay = 12 Ay)"
                    : "Jahres-Abo (10 Mon. zahlen = 12 Mon. nutzen)"}
              </span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-black uppercase tracking-wider">
                {language === "en"
                  ? "2 Mo. FREE"
                  : language === "tr"
                    ? "2 AY BEDAVA"
                    : "2 MONATE GRATIS"}
              </span>
            </button>
          </div>
          <p className="mt-2.5 text-xs text-muted-foreground">
            {language === "en"
              ? "Annual billing saves you 2 full months (e.g. €150/mo becomes €1,500/year instead of €1,800)."
              : language === "tr"
                ? "Yıllık ödemede 2 tam ay kazanırsınız (örn. aylık 150 € yerine yıllık 1.500 €)."
                : "Sparen Sie bei Jahreszahlung 2 volle Monatsbeiträge (z.B. 150 €/Monat = 1.500 €/Jahr statt 1.800 €)."}
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {packages.map((pkg: Pkg, i) => {
            const Icon = pkg.icon;
            const bonusCount = pkg.featuresDe.filter((f) => f.bonus).length;
            return (
              <FadeIn
                key={pkg.id}
                direction={i === 1 ? "up" : i === 0 ? "left" : "right"}
                delay={i * 150}
              >
                <div id={pkg.id} className="scroll-mt-32 h-full">
                  <Card
                    className={`relative h-full flex flex-col rounded-3xl border ${pkg.popular ? "border-primary shadow-xl shadow-primary/10 md:scale-[1.03] bg-card" : "border-border bg-card"} overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center text-[11px] font-semibold py-1.5 uppercase tracking-wider z-10">
                        {t.mostPopular}
                      </div>
                    )}

                    {/* Urgency / Scarcity Badge */}
                    {pkg.limited && (pkg.urgencyDe || pkg.urgencyEn) && (
                      <div
                        className={`absolute ${pkg.popular ? "top-8" : "top-0"} left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center text-[10px] font-bold py-1 uppercase tracking-wider z-10 animate-pulse`}
                      >
                        {pick(pkg.urgencyDe, pkg.urgencyEn, pkg.urgencyTr)}
                      </div>
                    )}

                    {/* Free bonus banner */}
                    <div
                      className={`absolute ${pkg.limited ? (pkg.popular ? "top-14" : "top-6") : "top-3"} right-3 z-20 flex flex-col items-end gap-1`}
                    >
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2.5 py-1 border border-green-500/20">
                        <Gift className="w-3 h-3" />
                        {bonusCount} {t.freeCount}
                      </span>
                    </div>

                    <CardHeader
                      className={`text-center pb-4 ${pkg.popular ? "pt-10" : "pt-8"}`}
                    >
                      <div
                        className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${pkg.popular ? "bg-primary/10" : "bg-muted"}`}
                      >
                        <Icon
                          className={`w-6 h-6 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                        {pick(pkg.tagDe, pkg.tagEn, pkg.tagTr)}
                      </span>
                      <CardTitle className="text-xl font-bold mb-1 text-foreground">
                        {pick(pkg.nameDe, pkg.nameEn, pkg.nameTr)}
                      </CardTitle>
                    </CardHeader>

                    <div className="px-6 pb-2 text-center">
                      {pkg.billingType === "monthly-setup" ? (
                        <div className="w-full">
                          <div className="mb-1.5 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium line-through decoration-muted-foreground/40 text-muted-foreground/60">
                              {pick(
                                pkg.originalSetupPriceDe,
                                pkg.originalSetupPriceEn,
                                pkg.originalSetupPriceDe,
                              )}
                            </span>
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {pick(pkg.badgeDe, pkg.badgeEn, pkg.badgeTr)}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-center gap-1.5">
                            <span className="text-4xl font-black text-foreground">
                              {pick(
                                pkg.setupPriceDe,
                                pkg.setupPriceEn,
                                pkg.setupPriceDe,
                              )}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {pick(
                                pkg.setupPeriodDe,
                                pkg.setupPeriodEn,
                                pkg.setupPeriodTr,
                              )}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border flex flex-col items-center justify-center gap-1">
                            {billingCycle === "annual" ? (
                              <>
                                <div className="flex items-baseline justify-center gap-1.5">
                                  <span className="text-2xl font-bold text-primary">
                                    {pkg.id === "starter"
                                      ? "990 €"
                                      : pkg.id === "elite"
                                        ? "1.490 €"
                                        : "1.500 €"}
                                  </span>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    {language === "en"
                                      ? "/ YEAR (10 Mo.)"
                                      : language === "tr"
                                        ? "/ YIL (10 Ay)"
                                        : "/ JAHR (10 Mon.)"}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-green-600 dark:text-green-400">
                                  {language === "en"
                                    ? "+ 2 Months FREE (saves 20%)"
                                    : language === "tr"
                                      ? "+ 2 Ay BEDAVA (%20 Tasarruf)"
                                      : "+ 2 Monate GRATIS geschenkt"}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="flex items-baseline justify-center gap-1.5">
                                  <span className="text-2xl font-bold text-primary">
                                    {pick(
                                      pkg.priceDe,
                                      pkg.priceEn,
                                      pkg.priceDe,
                                    )}
                                  </span>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    {pick(
                                      pkg.priceSubDe,
                                      pkg.priceSubEn,
                                      pkg.priceSubTr,
                                    )}
                                  </span>
                                </div>
                                {pkg.dailyPriceDe && (
                                  <p className="text-xs font-medium text-muted-foreground/80 italic">
                                    ≈{" "}
                                    {pick(
                                      pkg.dailyPriceDe,
                                      pkg.dailyPriceEn,
                                      pkg.dailyPriceTr,
                                    )}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="mb-1.5 flex items-center justify-center gap-2">
                            <span className="text-sm font-medium line-through decoration-muted-foreground/40 text-muted-foreground/60">
                              {billingCycle === "annual"
                                ? "3.900 €"
                                : pick(
                                    pkg.originalPriceDe,
                                    pkg.originalPriceEn,
                                    pkg.originalPriceDe,
                                  )}
                            </span>
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {billingCycle === "annual"
                                ? "−62% + 2 Mon. GRATIS"
                                : pick(pkg.badgeDe, pkg.badgeEn, pkg.badgeTr)}
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-1">
                            {billingCycle === "annual" ? (
                              <>
                                <div className="flex items-baseline justify-center gap-1.5">
                                  <span className="text-4xl font-black text-foreground">
                                    1.500 €
                                  </span>
                                  <span className="text-xs font-medium text-muted-foreground">
                                    {language === "en"
                                      ? "/ YEAR (10 Mo.)"
                                      : language === "tr"
                                        ? "/ YIL (10 Ay)"
                                        : "/ JAHR (10 Mon.)"}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-green-600 dark:text-green-400">
                                  {language === "en"
                                    ? "10 × €150 = €1,500 (+ 2 Months FREE)"
                                    : language === "tr"
                                      ? "10 × 150 € = 1.500 € (+ 2 Ay BEDAVA)"
                                      : "10 × 150 € = 1.500 € (+ 2 Monate GRATIS)"}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="flex items-baseline justify-center gap-1.5">
                                  <span className="text-4xl font-black text-foreground">
                                    {pick(
                                      pkg.priceDe,
                                      pkg.priceEn,
                                      pkg.priceDe,
                                    )}
                                  </span>
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    {pick(
                                      pkg.priceSubDe,
                                      pkg.priceSubEn,
                                      pkg.priceSubTr,
                                    )}
                                  </span>
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  {language === "en"
                                    ? "cancel monthly"
                                    : language === "tr"
                                      ? "aylık iptal edilebilir"
                                      : "monatlich kündbar"}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex items-baseline justify-center gap-1.5">
                            <span className="text-4xl font-black text-foreground">
                              {pick(pkg.priceDe, pkg.priceEn, pkg.priceDe)}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                              {pick(
                                pkg.priceSubDe,
                                pkg.priceSubEn,
                                pkg.priceSubTr,
                              )}
                            </span>
                          </div>
                          {/* Daily Price — Psychological Pricing */}
                          {pkg.dailyPriceDe && (
                            <p className="mt-1.5 text-xs font-medium text-muted-foreground/80 italic">
                              ≈{" "}
                              {pick(
                                pkg.dailyPriceDe,
                                pkg.dailyPriceEn,
                                pkg.dailyPriceTr,
                              )}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-green-500/10 px-2.5 py-1 text-[11px] font-bold text-green-600 dark:text-green-400">
                        <Gift className="w-3 h-3" />
                        {pick(pkg.saveDe, pkg.saveEn, pkg.saveTr)}
                      </div>
                    </div>

                    <CardContent className="flex flex-col flex-1 pt-5">
                      <p className="text-sm mb-6 text-center text-muted-foreground">
                        {pick(pkg.descDe, pkg.descEn, pkg.descTr)}
                      </p>
                      <ul className="space-y-3 mb-8 flex-1">
                        {pick(
                          pkg.featuresDe,
                          pkg.featuresEn,
                          pkg.featuresTr,
                        ).map((feature, j) => (
                          <li
                            key={j}
                            className={`flex items-start gap-2.5 text-sm rounded-lg px-2 py-1 ${
                              feature.bonus
                                ? "bg-green-500/5 border border-green-500/15"
                                : ""
                            }`}
                          >
                            {feature.bonus ? (
                              <Gift className="w-4 h-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                            )}
                            <span
                              className={
                                feature.bonus
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground"
                              }
                            >
                              {feature.text}
                            </span>
                            {feature.bonus && (
                              <span className="ml-auto shrink-0 rounded-full bg-green-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-green-600 dark:text-green-400">
                                {t.free}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <Button
                        size="lg"
                        className={`w-full font-bold h-12 text-base rounded-full shadow-md transition-all duration-300 ${
                          pkg.popular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25 hover:scale-[1.02]"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-[1.02]"
                        }`}
                        onClick={() =>
                          openForm("contact", `Preise - ${pkg.id}`)
                        }
                      >
                        {pkg.limited ? t.btnSecure : t.btnStart}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Minimal note */}
        <FadeIn className="mt-12">
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            {t.note}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
