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
  <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#121214] shadow-[0_30px_80px_-30px_rgba(30,159,174,0.45)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/30">
    <div className="flex items-center gap-2 border-b border-white/10 bg-[#1c1c1f] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 truncate rounded-md bg-white/10 px-3 py-0.5 text-xs text-white/60">{url}</span>
    </div>
    {children}
  </div>
);

export const PortfolioSection = () => {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <section id="portfolio" className="scroll-mt-24 bg-background pb-24 pt-8 text-white md:pb-32">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7ee3ee]">{pick(UI.kicker)}</span>
          <h2 className="mt-3 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl">{pick(UI.title)}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{pick(UI.subtitle)}</p>
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#7ee3ee]">{p.name}</h3>
                    <p className="text-sm text-white/55">{pick(p.type)}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5" data-no-translate>
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-medium text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#7ee3ee]">
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
            className="group flex w-full flex-col items-center gap-3 rounded-3xl border border-dashed border-white/20 p-8 text-center transition-colors hover:border-white/40 hover:bg-white/[0.04] sm:flex-row sm:text-left"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110">
              <Plus className="h-7 w-7" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-semibold text-white">{pick(UI.nextTitle)}</span>
              <span className="block text-sm text-white/55">{pick(UI.nextText)}</span>
            </span>
            <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">{pick(UI.nextBtn)}</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};
