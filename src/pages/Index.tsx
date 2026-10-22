import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useContactForm } from "@/components/ContactFormDialog";
import { SEO } from "@/components/SEO";
import { RoiCalculator } from "@/components/RoiCalculator";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { WallOfLove } from "@/components/WallOfLove";
import { TrustSeals } from "@/components/TrustSeals";
import { ReferralBonusSection } from "@/components/ReferralBonusSection";
import { ServicesSection } from "@/components/ServicesSection";
import {
  LogoSliderSection,
  ReferencesSection,
} from "@/components/LogoAndReferences";
import { ChatHighlightSection } from "@/components/ChatHighlightSection";
import { FounderSection } from "@/components/FounderSection";
import { QuizSection } from "@/components/QuizSection";

const AnimatedCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (value === "∞") return;

    const end = parseInt(value, 10);
    if (isNaN(end)) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  if (value === "∞") {
    return <span ref={ref}>∞</span>;
  }

  return <span ref={ref}>{count}</span>;
};

const industryMedia = [
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/assets/4d0a0e7d-3e36-4239-b90d-3c52d1c72a30.png",
  },
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/assets/d2954749-7bd7-45e0-828b-1e2482d8b79b.png",
  },
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/assets/19a5d2a4-7892-4b4d-a9c8-bd1da3e22eaa.jpg",
  },
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/99f38e0d-ce8b-4958-b3c9-7f6452069919.png",
  },
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/cbfcce06-b294-4a66-a5c9-ed86dcce69a5.png",
  },
  {
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/26ab2136-d794-47ac-bc6d-879c27dc36e8.png",
  },
];

const industryRoutes = [
  "/handwerker",
  "/beautysalon",
  "/gesundheitswesen",
  "/festivals",
  "/vereine",
  "/textil",
];

const Index = () => {
  const { openForm } = useContactForm();
  const { t, language } = useLanguage();

  const pick = (de: string, en: string) => (language === "en" ? en : de);

  const heroTitle = t("home", "heroTitle");
  const [city, setCity] = useState("");

  const deHome = translations.de.home;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqsRaw = t("home", "faqItems") as any;
  const faqs: { question: string; answer: string }[] = Array.isArray(faqsRaw)
    ? faqsRaw
    : Array.isArray(deHome.faqItems)
      ? (deHome.faqItems as { question: string; answer: string }[])
      : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industryItemsRaw = t("home", "industryItems") as any;
  const industryItems: { title: string; description: string }[] = Array.isArray(
    industryItemsRaw,
  )
    ? industryItemsRaw
    : Array.isArray(deHome.industryItems)
      ? (deHome.industryItems as { title: string; description: string }[])
      : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statItemsRaw = t("home", "statItems") as any;
  const statItems: {
    value: string;
    label: string;
    description: string;
  }[] = Array.isArray(statItemsRaw)
    ? statItemsRaw
    : Array.isArray(deHome.statItems)
      ? (deHome.statItems as {
          value: string;
          label: string;
          description: string;
        }[])
      : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stat5Raw = t("home", "stat5Item") as any;
  const deStat5 = deHome.stat5Item as {
    value: string;
    label: string;
    description: string;
  };
  const stat5Item: { value: string; label: string; description: string } =
    stat5Raw && typeof stat5Raw === "object" && !Array.isArray(stat5Raw)
      ? stat5Raw
      : deStat5 && typeof deStat5 === "object"
        ? deStat5
        : { value: "100", label: "", description: "" };

  const industries = Array.isArray(industryItems)
    ? industryItems
        .slice(0, 6)
        .map((item, i) => ({ ...item, ...industryMedia[i] }))
    : [];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city) {
          setCity(data.city);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full">
      <SEO
        localBusiness
        canonical="/"
        title={
          language === "tr"
            ? "Profesyonel Web Siteleri & Web Tasarım | AI Otomasyon tek elden | PS Professional Solutions"
            : pick(
                "Webdesign & professionelle Webseiten | KI-Automatisierung aus einer Hand | PS Professional Solutions",
                "Professional Websites & Web Design | AI Automation from one source | PS Professional Solutions",
              )
        }
        description={
          language === "tr"
            ? "PS Professional Solutions ile profesyonel web siteleri ve web tasarımı. AI canlı sohbet ve randevu sistemi entegre SEO uyumlu web siteleri programlıyoruz – hepsi tek elden. Web sitesi kontrolünüzü şimdi güvence altına alın!"
            : pick(
                "Professionelle Webseiten & Webdesign von PS Professional Solutions. Wir programmieren SEO-optimierte Websites mit KI-Automatisierung, KI-Live-Chat und Terminbuchung – alles aus einer Hand. Jetzt Website-Check sichern!",
                "Professional websites & web design by PS Professional Solutions. We program SEO-optimized websites with AI automation, AI live chat and appointment booking – all from one source. Secure your website check now!",
              )
        }
        keywords="Webdesign, professionelle Webseiten, Website erstellen lassen, Homepage programmieren, SEO-optimierte Website, KI-Automatisierung, KI Live-Chat, Terminbuchung Automation, Webdesign Agentur, maßgeschneiderte Website"
        ogImage="/media/vibe.filesafe.space/1778931020193405557/attachments/7b0c0d72-8ebc-4422-ad74-f9dbd2f547ec.png"
        faqs={faqs}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 lg:py-32">
        {/* Cinematic background video (YouTube xycMn76O0M0) with robust mobile autoplay parameters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube-nocookie.com/embed/xycMn76O0M0?autoplay=1&mute=1&muted=1&controls=0&loop=1&playlist=xycMn76O0M0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1&origin=https://ps-professional-solutions.de"
            title="Cinematic Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] sm:w-[177.78vh] h-[100vh] min-w-full min-h-full border-0 object-cover pointer-events-none"
          />
        </div>
        {/* Cinematic gradient overlay — video stays visible but text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/65 to-secondary/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/55 via-transparent to-secondary/55 pointer-events-none" />

        <FadeIn
          className="container relative z-10 mx-auto px-4 text-center"
          direction="up"
        >
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {heroTitle}
          </h1>
          {city && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
              <MapPin className="h-4 w-4 text-primary" />
              <span>
                {language === "tr"
                  ? `Artık ${city}'deki işletmeler için uygun`
                  : pick(
                      `Jetzt auch für Unternehmen in ${city}`,
                      `Now available for businesses in ${city}`,
                    )}
              </span>
            </div>
          )}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t("home", "heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 rounded-full px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal"
              onClick={() => openForm("contact", "Startseite - Hero")}
            >
              {t("home", "heroBtn")}
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Trust Seals */}
      <TrustSeals />

      {/* Services Section */}
      <ServicesSection />

      <ChatHighlightSection />

      {/* Stats Section */}
      <section className="py-20 text-center">
        <FadeIn className="container mx-auto px-4">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            {t("home", "whyTitle")}
          </h2>
          <h3 className="mb-8 text-2xl font-semibold">
            {t("home", "whySubtitle")}
          </h3>
          <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
            {t("home", "whyDesc")}
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            {statItems.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl lg:text-7xl group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-lg font-medium">{stat.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center justify-center p-8 rounded-3xl hover:bg-muted/30 transition-colors duration-300 inline-flex mx-auto">
            <div className="mb-2 text-5xl font-bold text-primary md:text-6xl lg:text-8xl hover:scale-110 transition-transform duration-300 cursor-default">
              <AnimatedCounter value={stat5Item.value} />
            </div>
            <div className="text-xl font-medium">{stat5Item.label}</div>
            <p className="mt-2 text-muted-foreground">
              {stat5Item.description}
            </p>
          </div>
        </FadeIn>
      </section>

      <FounderSection />

      <LogoSliderSection />

      <ReferencesSection />

      <QuizSection />

      {/* ROI Calculator Section */}
      <RoiCalculator />

      {/* Reviews Automation Section */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="mb-4 text-2xl font-bold text-primary md:text-4xl">
                {t("home", "reviewsTitle")}
              </h2>
              <p className="mb-6 md:mb-8 text-base md:text-lg text-muted-foreground">
                {t("home", "reviewsDesc")}
              </p>
              <Button
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-4 md:px-8 text-base md:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal text-center hover:scale-105 transition-transform duration-300"
                onClick={() =>
                  openForm("contact", "Startseite - Automatisierung")
                }
              >
                {t("home", "reviewsBtn")}
              </Button>
            </FadeIn>
            <FadeIn
              className="flex flex-col items-center justify-center mt-8 md:mt-0 p-8 rounded-3xl bg-muted/20 hover:bg-muted/40 transition-colors duration-500 hover:shadow-xl"
              direction="right"
            >
              <div className="flex items-center gap-2 text-5xl md:text-6xl font-bold text-primary">
                Google
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-4xl md:text-5xl font-bold text-yellow-500">
                  5.0
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-6 w-6 md:h-8 md:w-8 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {t("home", "indTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home", "indDesc")}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {industries.map((industry, i) => (
              <Card
                key={i}
                className="overflow-hidden border-none shadow-lg group hover:-translate-y-2 transition-transform duration-500 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>
                <CardContent
                  className="p-6 text-center bg-card group-hover:bg-primary/5 transition-colors duration-500 cursor-pointer flex-1 flex flex-col justify-center"
                  onClick={() => {
                    window.location.href = industryRoutes[i] || "/";
                  }}
                >
                  <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="mb-6 font-semibold">{t("home", "indFooterDesc")}</p>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal"
              onClick={() =>
                openForm("contact", "Startseite - Branchen Footer")
              }
            >
              {t("home", "indBtn")}
            </Button>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <WallOfLove />

      {/* 250€ Weiterempfehlungs-Bonus */}
      <ReferralBonusSection />

      {/* E-Book Lead Magnet & Before/After Slider */}
      <LeadMagnetSection />

      {/* FAQ Section */}
      <section id="faqs" className="py-20 bg-background">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {t("home", "faqTitle")}
            </h2>
            <p className="text-lg text-muted-foreground font-semibold">
              {t("home", "faqDesc")}
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
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
          <div className="mt-12 text-center">
            <h3 className="mb-6 text-2xl font-bold">
              {t("home", "faqFooterTitle")}
            </h3>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal"
              onClick={() => openForm("contact", "Startseite - FAQ")}
            >
              {t("home", "faqBtn")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
