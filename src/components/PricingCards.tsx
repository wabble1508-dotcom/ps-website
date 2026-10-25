import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import { formatEuro, offers, packages, type L } from "@/lib/pricingData";

const UI = {
  from: { de: "ab", en: "from", tr: "başlangıç" },
  perMonth: { de: "pro Monat", en: "per month", tr: "aylık" },
  setup: { de: "Einrichtung", en: "Setup", tr: "Kurulum" },
  noSetup: { de: "0 € Einrichtung", en: "€0 setup", tr: "0 € kurulum" },
  popular: { de: "Beliebteste Wahl", en: "Most popular", tr: "En popüler" },
  cta: { de: "Jetzt anfragen", en: "Enquire now", tr: "Hemen talep et" },
  monthly: { de: "Monatlich kündbar", en: "Cancellable monthly", tr: "Aylık iptal edilebilir" },
  moreTitle: { de: "Weitere Leistungen", en: "More services", tr: "Diğer hizmetler" },
  vat: {
    de: "Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    en: "All prices are final prices. In accordance with Section 19 of the German VAT Act (UStG), no VAT is charged.",
    tr: "Tüm fiyatlar nihai fiyatlardır. Alman KDV Kanunu § 19 UStG uyarınca KDV alınmaz.",
  },
  fromNote: {
    de: "„ab“-Preise gelten für den beschriebenen Grundumfang. Vor dem Start erhalten Sie ein verbindliches Angebot. Bei jährlicher Zahlung schenken wir Ihnen 2 Monatsbeiträge.",
    en: "“From” prices apply to the basic scope described. You receive a binding quote before we start. Pay annually and get 2 monthly fees free.",
    tr: "\"Başlangıç\" fiyatları açıklanan temel kapsam için geçerlidir. Başlamadan önce bağlayıcı bir teklif alırsınız. Yıllık ödemede 2 aylık ücret bizden.",
  },
};

export const PricingCards = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <FadeIn key={pkg.id} direction={i === 1 ? "up" : i === 0 ? "left" : "right"} delay={i * 150}>
                <div id={pkg.id} className="scroll-mt-32 h-full">
                  <Card
                    className={`relative h-full flex flex-col rounded-3xl border ${
                      pkg.popular ? "border-primary shadow-xl shadow-primary/10 md:scale-[1.03]" : "border-border"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 rounded-t-3xl bg-primary py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white">
                        {pick(UI.popular)}
                      </div>
                    )}
                    <CardHeader className={`text-center pb-4 ${pkg.popular ? "pt-10" : "pt-8"}`}>
                      <div
                        className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                          pkg.popular ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">{pick(pkg.tag)}</span>
                      <CardTitle className="text-xl font-bold text-foreground">{pick(pkg.name)}</CardTitle>
                    </CardHeader>

                    <div className="px-6 pb-2 text-center">
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="text-sm font-medium text-muted-foreground">{pick(UI.from)}</span>
                        <span className="text-5xl font-black text-foreground">{formatEuro(pkg.monthlyFrom, language)}</span>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{pick(UI.perMonth)}</p>
                      <p className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {pkg.setupFrom === 0
                          ? pick(UI.noSetup)
                          : `${pick(UI.setup)} ${pick(UI.from)} ${formatEuro(pkg.setupFrom, language)}`}
                      </p>
                      {pkg.extra && <p className="mt-2 text-xs text-muted-foreground">{pick(pkg.extra)}</p>}
                    </div>

                    <CardContent className="flex flex-1 flex-col pt-4">
                      <p className="mb-5 text-center text-sm text-muted-foreground">{pick(pkg.desc)}</p>
                      <ul className="mb-6 flex-1 space-y-2.5">
                        {[...pkg.features, { text: UI.monthly }].map((f, k) => (
                          <li key={k} className="flex items-start gap-2 text-sm">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${"highlight" in f && f.highlight ? "text-primary" : "text-green-600"}`}
                            />
                            <span className={"highlight" in f && f.highlight ? "font-semibold text-foreground" : "text-foreground/90"}>
                              {pick(f.text)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full rounded-full"
                        variant={pkg.popular ? "default" : "outline"}
                        onClick={() => openForm("contact", `Preise: ${pick(pkg.name)}`)}
                      >
                        {pick(UI.cta)} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* App-Entwicklung, Unternehmen, Wartung */}
        <h3 className="mt-20 mb-8 text-center text-2xl font-bold text-foreground">{pick(UI.moreTitle)}</h3>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div id={offer.id} key={offer.id} className="scroll-mt-32 flex flex-col rounded-3xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{pick(offer.name)}</h4>
                </div>
                <p className="mb-2 text-xl font-black text-primary">{pick(offer.price)}</p>
                <p className="mb-4 text-sm text-muted-foreground">{pick(offer.desc)}</p>
                <ul className="mb-6 flex-1 space-y-2">
                  {offer.points.map((p, k) => (
                    <li key={k} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {pick(p)}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full rounded-full" onClick={() => openForm("contact", `Preise: ${pick(offer.name)}`)}>
                  {pick(offer.cta)} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-1 text-center text-xs text-muted-foreground">
          <p>{pick(UI.vat)}</p>
          <p>{pick(UI.fromNote)}</p>
        </div>
      </div>
    </section>
  );
};
