import { Button } from "@/components/ui/button";
import { ExternalEmbed } from "@/components/ExternalEmbed";
import { FadeIn } from "@/components/FadeIn";
import { useContactForm } from "@/components/ContactFormDialog";
import { HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

import { useLanguage } from "@/components/LanguageContext";

export interface FeaturePageProps {
  seo: {
    title: string;
    description: string;
    keywords?: string;
    localBusiness?: boolean;
  };
  hero: {
    icon: React.ReactNode | string;
    title: string;
    highlight: string;
    subtitle: string;
  };
  problem: {
    image: string;
    items: { title: string; description: string }[];
    buttonText: string;
  };
  solution: {
    title: string;
    checkmarks: { text: string; icon: React.ReactNode }[];
    cards: {
      icon: React.ReactNode | string;
      title: string;
      description: string;
    }[];
  };
  einsatzgebiete: {
    icon: React.ReactNode;
    title: string;
  }[];
  videoTestimonial?: {
    url: string;
    title: string;
    description: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

const labels: Record<
  string,
  { problem: string; solution: string; areas: string }
> = {
  de: {
    problem: "Das Problem",
    solution: "Die Lösung",
    areas: "Einsatzgebiete",
  },
  en: {
    problem: "The Problem",
    solution: "The Solution",
    areas: "Application Areas",
  },
  es: {
    problem: "El Problema",
    solution: "La Solución",
    areas: "Áreas de Aplicación",
  },
  fr: {
    problem: "Le Problème",
    solution: "La Solution",
    areas: "Domaines d'Application",
  },
  it: {
    problem: "Il Problema",
    solution: "La Soluzione",
    areas: "Aree di Applicazione",
  },
  pt: {
    problem: "O Problema",
    solution: "A Solução",
    areas: "Áreas de Aplicação",
  },
  pl: {
    problem: "Problem",
    solution: "Rozwiązanie",
    areas: "Obszary Zastosowania",
  },
  tr: { problem: "Sorun", solution: "Çözüm", areas: "Uygulama Alanları" },
  ro: {
    problem: "Problema",
    solution: "Soluția",
    areas: "Domenii de Aplicare",
  },
  ru: { problem: "Проблема", solution: "Решение", areas: "Сферы применения" },
  bg: {
    problem: "Проблемът",
    solution: "Решението",
    areas: "Области на приложение",
  },
  ar: { problem: "المشكلة", solution: "الحل", areas: "مجالات التطبيق" },
  hi: { problem: "समस्या", solution: "समाधान", areas: "अनुप्रयोग क्षेत्र" },
  zh: { problem: "问题", solution: "解决方案", areas: "应用领域" },
  ja: { problem: "問題", solution: "解決策", areas: "適用分野" },
  vi: { problem: "Vấn đề", solution: "Giải pháp", areas: "Lĩnh vực áp dụng" },
  fa: { problem: "مشکل", solution: "راه‌حل", areas: "حوزه‌های کاربرد" },
  ps: { problem: "ستونزه", solution: "حل", areas: "د پلي کیدو ساحې" },
};

export const FeaturePage = ({ data }: { data: FeaturePageProps }) => {
  const { openForm } = useContactForm();
  const { t, language } = useLanguage();
  const pick = (de: string, en: string) => (language === "en" ? en : de);
  const pickTr = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;
  const lbl = labels[language] || labels.de;

  return (
    <div className="w-full bg-background">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        faqs={data.faqs}
        localBusiness={data.seo.localBusiness}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-300 py-20 lg:py-32">
        <FadeIn className="container mx-auto px-4 max-w-6xl" direction="down">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center text-primary group">
              {typeof data.hero.icon === "string" ? (
                <img
                  src={data.hero.icon}
                  alt="Icon"
                  className="w-48 md:w-64 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                />
              ) : (
                <div className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {data.hero.icon}
                </div>
              )}
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4 leading-tight">
                {data.hero.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary/80 mb-6">
                {data.hero.highlight}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {data.hero.subtitle}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Problem */}
      <section className="bg-slate-900 py-20">
        <FadeIn className="container mx-auto px-4 max-w-5xl" direction="left">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-colors duration-500">
            <div className="w-full md:w-1/2">
              <img
                src={data.problem.image}
                alt="Problem"
                className="w-full h-auto object-contain rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 text-white">
              <h3 className="text-primary font-bold tracking-widest uppercase mb-6 text-xl">
                {lbl.problem}
              </h3>
              <div className="space-y-6 mb-8">
                {data.problem.items.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-lg mb-1 text-white">
                      {item.title}
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal"
                onClick={() =>
                  openForm("contact", `Feature: ${data.hero.title}`)
                }
              >
                {data.problem.buttonText}
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Solution */}
      <section className="py-20 bg-background border-b border-border">
        <FadeIn className="container mx-auto px-4 max-w-5xl" direction="right">
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold tracking-widest uppercase mb-4 text-xl">
              {lbl.solution}
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              {data.solution.title}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                {data.solution.checkmarks.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {data.solution.cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-secondary text-white rounded-2xl p-6 flex items-center gap-6 shadow-lg hover:scale-105 hover:bg-secondary/90 transition-all duration-300 group cursor-default"
                >
                  <div className="w-16 h-16 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform duration-300">
                    {typeof card.icon === "string" ? (
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    ) : (
                      card.icon
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Einsatzgebiete */}
      <section className="py-20 bg-background">
        <FadeIn
          className="container mx-auto px-4 max-w-5xl text-center"
          direction="up"
        >
          <h3 className="text-secondary font-bold tracking-widest uppercase mb-12 text-2xl">
            {lbl.areas}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.einsatzgebiete.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 group cursor-default hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-primary group-hover:scale-110 transition-transform duration-300 bg-muted/50 p-6 rounded-full group-hover:bg-primary group-hover:text-white">
                  {item.icon}
                </div>
                <span className="font-bold text-secondary text-lg group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Branchen */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-secondary">
              {t("home", "indTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home", "indDesc")}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {[
              {
                title: pickTr(
                  "Handwerk & Bau",
                  "Crafts & Construction",
                  "Zanaatkârlık & İnşaat",
                ),
                description: pickTr(
                  "Kunden gewinnen statt Baustelle verlassen – Ihr KI-Assistent regelt die Termine direkt vor Ort.",
                  "Win customers instead of leaving the construction site – your AI assistant handles appointments directly on site.",
                  "Şantiyeyi terk etmek yerine müşteri kazanın – Yapay zeka asistanınız randevuları doğrudan yerinde düzenler.",
                ),
                image:
                  "/media/vibe.filesafe.space/1778931020193405557/assets/4d0a0e7d-3e36-4239-b90d-3c52d1c72a30.png",
                video: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
              },
              {
                title: pickTr(
                  "Friseure & Beauty",
                  "Hairdressers & Beauty",
                  "Kuaförler & Güzellik",
                ),
                description: pickTr(
                  "Fokus auf das Styling, nicht aufs Telefon. Online-Buchungen und SMS-Erinnerungen senken Ausfälle.",
                  "Focus on styling, not the phone. Online bookings and SMS reminders reduce cancellations.",
                  "Saç stilistine değil, telefona değil. Online randevular ve SMS hatırlatmaları iptalleri azaltır.",
                ),
                image:
                  "/media/vibe.filesafe.space/1778931020193405557/assets/d2954749-7bd7-45e0-828b-1e2482d8b79b.png",
                video: "https://www.youtube.com/embed/7SEMZ-6fEhg?rel=0",
              },
              {
                title: pickTr(
                  "Gesundheitswesen & Praxen",
                  "Healthcare & Practices",
                  "Sağlık Sektörü & Muayenehaneler",
                ),
                description: pickTr(
                  "Diskrete und effiziente Terminvergabe rund um die Uhr – für eine entlastete Anmeldung.",
                  "Discreet and efficient appointment scheduling around the clock – for a relieved reception.",
                  "Günün her saatinde gizli ve verimli randevu verme – rahatlatılmış resepsiyon için.",
                ),
                image:
                  "/media/vibe.filesafe.space/1778931020193405557/assets/19a5d2a4-7892-4b4d-a9c8-bd1da3e22eaa.jpg",
                video: "https://www.youtube.com/embed/DQ9XO4OQsEM?rel=0",
              },
            ].map((industry, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-black text-white shadow-xl flex flex-col group cursor-pointer hover:-translate-y-2 transition-transform duration-500"
                onClick={() =>
                  openForm(
                    "contact",
                    `Feature: ${data.hero.title} - Branche: ${industry.title}`,
                  )
                }
              >
                <div className="relative h-48 overflow-hidden">
                  {industry.video ? (
                    <ExternalEmbed src={industry.video} title={industry.title} className="absolute inset-0 w-full h-full" allowFullScreen />
                  ) : (
                    <>
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="h-full w-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/80 group-hover:scale-125 transition-all duration-500">
                          <div className="w-0 h-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white ml-1"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6 text-center flex-1 flex flex-col justify-center">
                  <h3 className="mb-2 text-xl font-bold">{industry.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="mb-6 text-muted-foreground">
              {t("home", "indFooterDesc")}
            </p>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal"
              onClick={() =>
                openForm(
                  "contact",
                  `Feature: ${data.hero.title} - Branchen Footer`,
                )
              }
            >
              {t("home", "indBtn")}
            </Button>
          </div>
        </div>
      </section>

      {/* Video Testimonial Section */}
      {data.videoTestimonial && (
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {data.videoTestimonial.title}
            </h2>
            <p className="mb-10 text-lg text-white/80">
              {data.videoTestimonial.description}
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-primary">
              <div className="aspect-video relative flex items-center justify-center">
                <ExternalEmbed src={data.videoTestimonial.url} title="Kundenstimme" className="absolute inset-0 w-full h-full" allowFullScreen />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs — alle sichtbar für SEO */}
      <section id="faqs" className="py-20 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-secondary">
              {t("home", "faqTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home", "faqDesc")}
            </p>
          </div>
          <div className="space-y-6">
            {data.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card px-8 py-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-secondary mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <h3 className="mb-6 text-2xl font-bold text-secondary">
              {t("home", "faqFooterTitle")}
            </h3>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal"
              onClick={() =>
                openForm("contact", `Feature: ${data.hero.title} - FAQ`)
              }
            >
              {t("home", "faqBtn")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
