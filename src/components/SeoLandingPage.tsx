import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";
import { COMPARISON, RELATED, UI, type L, type LandingData } from "@/lib/landingPages";

const DOMAIN = "https://ps-professional-solutions.de";

const REFERENCES: { name: string; logo: string; text: L }[] = [
  { name: "SkyJoin", logo: "/media/kunden/skyjoin.jpg", text: { de: "Mobile App", en: "Mobile app", tr: "Mobil uygulama" } },
  { name: "WebsiteNova", logo: "/media/kunden/websitenova.jpg", text: { de: "SaaS-Plattform", en: "SaaS platform", tr: "SaaS platformu" } },
];

// Vorlage für die SEO-Landingpages. Inhalte in src/lib/landingPages.ts.
export const SeoLandingPage = ({ data }: { data: LandingData }) => {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const enquire = () => openForm("contact", `Landingpage: ${data.seo.service}`);

  // Leistung mit Preis für Google und KI-Suchmaschinen
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.seo.service,
    description: pick(data.seo.description),
    url: `${DOMAIN}${data.path}`,
    provider: { "@id": `${DOMAIN}/#business` },
    areaServed: [{ "@type": "City", name: "Dortmund" }, { "@type": "Country", name: "Deutschland" }],
  };

  return (
    <div key={data.path} className="w-full bg-background">
      <SEO
        title={pick(data.seo.title)}
        description={pick(data.seo.description)}
        keywords={data.seo.keywords}
        canonical={data.path}
        localBusiness={data.localBusiness}
        schemaJson={serviceSchema}
        faqs={data.faq.map((f) => ({ question: pick(f.q), answer: pick(f.a) }))}
      />

      {/* Kopfbereich */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 text-center text-white lg:py-28">
        <FadeIn className="container relative z-10 mx-auto max-w-4xl px-4">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {pick(data.hero.kicker)}
          </span>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">{pick(data.hero.title)}</h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/85 md:text-xl">{pick(data.hero.subtitle)}</p>
          <ul className="mb-10 flex flex-wrap justify-center gap-2">
            {data.hero.badges.map((b) => (
              <li key={b.de} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
                <Check className="h-4 w-4 text-[#7ee3ee]" /> {pick(b)}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="rounded-full" onClick={enquire}>
              {pick(data.hero.cta)} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/preise">{pick(UI.prices)}</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Einleitungstext */}
      <section className="py-16 md:py-20">
        <FadeIn className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">{pick(data.intro.title)}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {data.intro.paragraphs.map((p) => (
              <p key={p.de}>{pick(p)}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Leistungen */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(data.features.title)}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.items.map(({ icon: Icon, title, text }) => (
              <FadeIn key={title.de} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{pick(title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(text)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vergleich Baukasten / Agentur / wir */}
      {data.comparison && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(COMPARISON.title)}</h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4" />
                    {COMPARISON.columns.map((c, i) => (
                      <th key={c.de} className={`p-4 font-bold ${i === 3 ? "bg-primary text-white" : "text-foreground"}`}>
                        {pick(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row) => (
                    <tr key={row.label.de} className="border-t border-border">
                      <th className="p-4 font-semibold text-foreground">{pick(row.label)}</th>
                      {row.values.map((v, i) => (
                        <td key={i} className={`p-4 ${i === 3 ? "bg-primary/5 font-semibold text-primary" : "text-muted-foreground"}`}>
                          {pick(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">{pick(COMPARISON.note)}</p>
          </div>
        </section>
      )}

      {/* Referenzen */}
      {data.references && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(UI.referencesTitle)}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {REFERENCES.map((ref) => (
                <FadeIn key={ref.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <img src={ref.logo} alt={`${ref.name} – ${pick(ref.text)}`} className="aspect-[1000/560] w-full object-cover" loading="lazy" />
                  <div className="p-4 text-center">
                    <p className="font-bold text-foreground">{ref.name}</p>
                    <p className="text-sm text-muted-foreground">{pick(ref.text)}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ablauf */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(data.steps.title)}</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {data.steps.items.map((step, i) => (
              <FadeIn key={step.title.de} className="rounded-2xl bg-card p-6 shadow-sm">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-white">{i + 1}</span>
                <h3 className="mb-2 font-bold text-foreground">{pick(step.title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(step.text)}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Preis */}
      <section className="py-16 md:py-24">
        <FadeIn className="container mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-primary bg-card p-8 text-center shadow-xl shadow-primary/10">
            <h2 className="mb-2 text-2xl font-bold text-foreground">{pick(data.price.title)}</h2>
            <p className="mb-4 text-4xl font-black text-primary">{pick(data.price.value)}</p>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">{pick(data.price.text)}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full" onClick={enquire}>
                {pick(data.hero.cta)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/preise">{pick(UI.prices)}</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{pick(UI.vat)}</p>
          </div>
        </FadeIn>
      </section>

      {/* Häufige Fragen: <details> statt Akkordeon, damit die Antworten im HTML stehen */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(UI.faqTitle)}</h2>
          <div className="space-y-3">
            {data.faq.map((f) => (
              <details key={f.q.de} className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{pick(f.q)}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{pick(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Verlinkung */}
      <section className="py-14">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold text-foreground">{pick(UI.relatedTitle)}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.related.map((to) => (
              <Link
                key={to}
                to={to}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {pick(RELATED[to])}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 text-center text-white">
        <FadeIn className="container mx-auto max-w-2xl px-4">
          <h2 className="mb-3 text-3xl font-bold">{pick(data.final.title)}</h2>
          <p className="mb-6 text-white/80">{pick(data.final.text)}</p>
          <Button size="lg" variant="secondary" className="rounded-full" onClick={enquire}>
            {pick(UI.freeCall)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
};
