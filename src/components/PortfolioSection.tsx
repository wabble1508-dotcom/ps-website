import { ArrowUpRight, Plus } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";

// Portfolio: von uns gebaute Websites im Browser-Rahmen. Neue Projekte hier ergänzen
// (Bildschirmfoto 1200×750 nach public/media/portfolio/).
type L = { de: string; en: string; tr: string };

const PROJECTS: { name: string; url: string; image: string; type: L; tags: string[] }[] = [
  {
    name: "Matou Kfz Schilder Express",
    url: "https://matou-kfz-express.de/",
    image: "/media/portfolio/matou.jpg",
    type: { de: "Online-Shop & Zulassungsplattform", en: "Online shop & registration platform", tr: "Online mağaza ve tescil platformu" },
    tags: ["E-Commerce", "Konfigurator", "SEO"],
  },
  {
    name: "WebsiteNova",
    url: "https://websitenova.de/",
    image: "/media/portfolio/websitenova.jpg",
    type: { de: "SaaS-Plattform & Web-App", en: "SaaS platform & web app", tr: "SaaS platformu ve web uygulaması" },
    tags: ["Web-App", "SaaS", "KI"],
  },
];

const UI = {
  kicker: { de: "Portfolio", en: "Portfolio", tr: "Portföy" },
  title: { de: "Websites, die wir gebaut haben", en: "Websites we have built", tr: "Yaptığımız web siteleri" },
  subtitle: {
    de: "Echte Projekte, programmiert statt aus dem Baukasten – klicken Sie rein und sehen Sie selbst.",
    en: "Real projects, hand-coded rather than built with a site builder – click through and see for yourself.",
    tr: "Site oluşturucuyla değil, kodlanarak yapılmış gerçek projeler – tıklayın ve kendiniz görün.",
  },
  visit: { de: "Website ansehen", en: "Visit website", tr: "Siteyi ziyaret et" },
  nextTitle: { de: "Ihre Website als Nächstes?", en: "Your website next?", tr: "Sıradaki siteniz mi?" },
  nextText: {
    de: "Ab 49 € im Monat, 0 € Einrichtung – wir zeigen Ihnen gern, wie Ihre neue Website aussehen kann.",
    en: "From €49 a month, €0 setup – we'd be happy to show you what your new website could look like.",
    tr: "Aylık 49 €'dan, 0 € kurulum – yeni sitenizin nasıl görünebileceğini memnuniyetle gösteririz.",
  },
  nextBtn: { de: "Projekt anfragen", en: "Request a project", tr: "Proje talep et" },
};

const BrowserFrame = ({ children, url }: { children: React.ReactNode; url: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-shadow duration-300 group-hover:shadow-2xl">
    <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 truncate rounded-md bg-background px-3 py-0.5 text-xs text-muted-foreground">{url}</span>
    </div>
    {children}
  </div>
);

export const PortfolioSection = () => {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <section id="portfolio" className="scroll-mt-24 py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">{pick(UI.kicker)}</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-5xl">{pick(UI.title)}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{pick(UI.subtitle)}</p>
        </FadeIn>
        <div className="grid gap-10 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <FadeIn key={p.name}>
              <a href={p.url} target="_blank" rel="noopener" className="group block">
                <BrowserFrame url={p.url.replace(/^https:\/\/|\/$/g, "")}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.name} – ${pick(p.type)}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </BrowserFrame>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{pick(p.type)}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5" data-no-translate>
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary">
                    {pick(UI.visit)} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12">
          <button
            type="button"
            onClick={() => openForm("contact", "Portfolio")}
            className="group flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 p-8 text-center transition-colors hover:border-primary hover:bg-primary/5 sm:flex-row sm:text-left"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Plus className="h-7 w-7" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-bold text-foreground">{pick(UI.nextTitle)}</span>
              <span className="block text-sm text-muted-foreground">{pick(UI.nextText)}</span>
            </span>
            <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">{pick(UI.nextBtn)}</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};
