import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";

import { useEffect, useState, useRef } from "react";
import { useContactForm } from "@/components/ContactFormDialog";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { PromiseSection } from "@/components/PromiseSection";
import { HeroKeynote } from "@/components/HeroKeynote";
import { SectionHead } from "@/components/SectionHead";
import { ServicesSection } from "@/components/ServicesSection";
import { LogoSliderSection } from "@/components/LogoAndReferences";
import { FounderSection } from "@/components/FounderSection";
import { QuizSection } from "@/components/QuizSection";
import { WebsiteNovaSection } from "@/components/WebsiteNovaSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { CtaRow } from "@/components/CtaRow";

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


  // Kennzahlen: nur überprüfbare Fakten (keine unbelegten Prozentangaben)
  const pickL = (t: { de: string; en: string; tr: string }) =>
    language === "en" ? t.en : language === "tr" ? t.tr : t.de;
  const statItems = [
    {
      value: "49",
      label: pickL({ de: "€ im Monat", en: "€ a month", tr: "€ aylık" }),
      description: pickL({
        de: "Professionelle Website ab 49 € – monatlich kündbar.",
        en: "Professional website from €49 – cancellable monthly.",
        tr: "49 €'dan profesyonel web sitesi – aylık iptal edilebilir.",
      }),
    },
    {
      value: "0",
      label: pickL({ de: "€ Einrichtung", en: "€ setup", tr: "€ kurulum" }),
      description: pickL({
        de: "Keine Startkosten beim Start-Paket.",
        en: "No upfront cost with the Start package.",
        tr: "Start paketinde başlangıç maliyeti yok.",
      }),
    },
    {
      value: "24",
      label: pickL({ de: "Std. Antwortzeit", en: "hrs reply time", tr: "saat yanıt süresi" }),
      description: pickL({
        de: "Werktags melden wir uns innerhalb von 24 Stunden.",
        en: "On working days we reply within 24 hours.",
        tr: "İş günlerinde 24 saat içinde yanıt veririz.",
      }),
    },
    {
      value: "13",
      label: pickL({ de: "Sprachen", en: "languages", tr: "dil" }),
      description: pickL({
        de: "Diese Website gibt es in 13 Sprachen – Ihre auf Wunsch auch.",
        en: "This website is available in 13 languages – yours can be too.",
        tr: "Bu site 13 dilde – isterseniz sizinki de.",
      }),
    },
  ];
  const stat5Item = {
    value: "1",
    label: pickL({ de: "fester Ansprechpartner", en: "fixed contact person", tr: "sabit muhatap" }),
    description: pickL({
      de: "Ich begleite Sie von der Idee bis zum fertigen Produkt.",
      en: "I'll accompany you from the idea to the finished product.",
      tr: "Fikirden bitmiş ürüne kadar size eşlik ediyorum.",
    }),
  };


  useEffect(() => {
    fetch("/api/geo")
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
        faqs={faqs}
      />
      {/* Hero Section */}
      <HeroKeynote
        title={heroTitle}
        subtitle={t("home", "heroSubtitle")}
        ctaLabel={language === "tr" ? "Teklif iste" : pick("Angebot anfragen", "Request a quote")}
        bookLabel={language === "tr" ? "Randevu al" : pick("Termin buchen", "Book an appointment")}
        onCta={() => openForm("contact", "Startseite - Hero")}
        projectsLabel={pick("Projekte ansehen", "View projects")}
        eyebrow={pick("Webdesign · Apps · Software – Dortmund", "Web design · Apps · Software – Dortmund")}
        priceNote={pick("Website ab 49 €/Monat · 0 € Einrichtung · monatlich kündbar", "Website from €49/month · €0 setup · cancellable monthly")}
        cityNote={
          city
            ? language === "tr"
              ? `Artık ${city}'deki işletmeler için uygun`
              : pick(`Jetzt auch für Unternehmen in ${city}`, `Now available for businesses in ${city}`)
            : undefined
        }
      />


      {/* Services Section */}
      <ServicesSection />
      <div className="dark bg-background pb-20">
        <CtaRow source="Startseite – Leistungen" />
      </div>

      {/* Portfolio: gebaute Websites */}
      <PortfolioSection />



      {/* Stats Section */}
      <section className="dark relative bg-background py-20 text-foreground md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHead index="03" kicker={t("home", "whyTitle")} title={t("home", "whySubtitle")} sub={t("home", "whyDesc")} />
          <FadeIn className="grid grid-cols-2 border-y border-border md:grid-cols-5">
            {[...statItems, stat5Item].map((stat, i) => (
              <div
                key={i}
                className={`border-border px-4 py-8 md:border-l md:first:border-l-0 md:px-6 ${i % 2 === 1 ? "border-l" : ""} ${i < 4 ? "border-b md:border-b-0" : "col-span-2 md:col-span-1"}`}
              >
                <div className="font-display text-6xl font-semibold leading-none lg:text-7xl">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="mt-4 font-semibold">{stat.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>
      <div className="dark bg-background pb-20">
        <CtaRow source="Startseite – Kennzahlen" />
      </div>

      <FounderSection />

      <LogoSliderSection />


      <WebsiteNovaSection />


      <QuizSection />


      {/* Zusagen statt erfundener Bewertungen */}
      <PromiseSection />



      {/* Kontakt direkt auf der Seite */}
      <ContactSection />

      {/* FAQ Section */}
      <section id="faqs" className="py-20 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHead index="06" kicker="FAQ" title={t("home", "faqTitle")} sub={t("home", "faqDesc")} />
          <div className="border-t border-border">
            {faqs.map((faq, i) => (
              <div key={i} className="grid gap-2 border-b border-border py-7 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <h3 className="mb-6 text-2xl font-bold">
              {t("home", "faqFooterTitle")}
            </h3>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto whitespace-normal"
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
