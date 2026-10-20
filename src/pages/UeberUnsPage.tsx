import { FadeIn } from "@/components/FadeIn";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import { Users, Target, Zap, ShieldCheck } from "lucide-react";

export default function UeberUnsPage() {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const isEn = language === "en";

  return (
    <div className="w-full bg-white">
      <SEO
        title={
          isEn
            ? "About Us | PS Professional Solutions"
            : "Über uns | PS Professional Solutions"
        }
        description={
          isEn
            ? "We are your team for AI automation and web design. Learn more about our mission to make your everyday business easier."
            : "Wir sind Ihr Team für KI-Automatisierung und Webdesign. Erfahren Sie mehr über unsere Mission, Ihren Unternehmensalltag zu erleichtern."
        }
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-300 py-20 lg:py-32">
        <FadeIn
          className="container mx-auto px-4 max-w-4xl text-center"
          direction="down"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
            {isEn
              ? "We automate your success."
              : "Wir automatisieren Ihren Erfolg."}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {isEn
              ? "As a passionate team of digital experts, we transform complex processes into simple, automated solutions. So you can focus on what really matters: your customers."
              : "Als passioniertes Team von Digital-Experten verwandeln wir komplexe Prozesse in einfache, automatisierte Lösungen. Damit Sie sich auf das konzentrieren können, was wirklich zählt: Ihre Kunden."}
          </p>
        </FadeIn>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-colors duration-500"></div>
                <img
                  src="/media/vibe.filesafe.space/1778931020193405557/attachments/c70c6bd8-d167-4824-8111-52bdb725f254.jpg"
                  alt={
                    isEn
                      ? "Pankaj Mondjal — Founder PS Professional Solutions"
                      : "Pankaj Mondjal — Gründer PS Professional Solutions"
                  }
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[450px] border-2 border-slate-200 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                {isEn ? "Our Mission" : "Unsere Mission"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEn
                  ? "We believe that technology should serve people, not the other way around. That's why we develop AI solutions and websites that don't just look good, but actually save you time and money."
                  : "Wir glauben, dass Technologie dem Menschen dienen sollte und nicht umgekehrt. Deshalb entwickeln wir KI-Lösungen und Webseiten, die nicht nur gut aussehen, sondern Ihnen spürbar Zeit und Geld sparen."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEn
                  ? "Whether you're a craftsman, a beauty salon, or a medical practice – we understand your daily challenges. Our goal is to free you from administrative tasks so you can fully dedicate yourself to your core business."
                  : "Egal ob Handwerker, Beautysalon oder Praxis – wir verstehen Ihre täglichen Herausforderungen. Unser Ziel ist es, Sie von administrativen Aufgaben zu befreien, damit Sie sich wieder voll und ganz Ihrem Kerngeschäft widmen können."}
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
                  onClick={() => openForm("contact", "Über uns - Hero")}
                >
                  {isEn ? "Get to know us" : "Lernen Sie uns kennen"}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founder Profile — Pankaj Mondjal */}
      <section className="py-24 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn direction="left" className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-colors duration-700"></div>
                <img
                  src="/media/vibe.filesafe.space/1778931020193405557/attachments/6c0b29ab-e370-4b58-8219-100f9213eee1.jpg"
                  alt="Pankaj Mondjal — Gründer & CEO von PS Professional Solutions"
                  className="relative w-72 h-auto md:w-80 rounded-3xl shadow-2xl object-cover border-4 border-white/20 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-secondary px-6 py-3 rounded-2xl font-bold shadow-xl rotate-3 hidden md:block">
                  B.A. Marketing Management 🎓
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-primary mb-6 backdrop-blur-md border border-white/20">
                {isEn ? "Founder & CEO" : "Gründer & Geschäftsführer"}
              </div>
              <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight">
                {isEn
                  ? "Hi, I'm Pankaj Mondjal 👋"
                  : "Hallo, ich bin Pankaj Mondjal 👋"}
              </h2>
              <p className="text-lg md:text-xl mb-6 text-white/90 leading-relaxed font-medium">
                {isEn
                  ? "I founded PS Professional Solutions with one mission: To help local businesses like yours get found, get calls, and get paid — on autopilot."
                  : "Ich habe PS Professional Solutions mit einer Mission gegründet: Lokalen Unternehmen wie Ihrem zu helfen, gefunden zu werden, Anrufe zu erhalten und Umsatz zu machen — vollautomatisch."}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  isEn
                    ? "🎓 B.A. in Marketing Management — Data-driven growth strategies"
                    : "🎓 B.A. Marketing Management — Datengestützte Wachstumsstrategien",
                  isEn
                    ? "🚀 100+ businesses automated across Germany"
                    : "🚀 Über 100+ Unternehmen bundesweit automatisiert",
                  isEn
                    ? "💡 No fluff — Just measurable ROI & more leads"
                    : "💡 Kein Gelaber — Nur messbarer ROI & mehr Leads",
                  isEn
                    ? "🤝 Your dedicated partner, not just another agency"
                    : "🤝 Ihr fester Partner, keine anonyme Agentur",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-base md:text-lg font-medium bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal bg-white text-secondary hover:bg-white/90"
                onClick={() => openForm("contact", "Über uns - Gründer CTA")}
              >
                {isEn
                  ? "Let's talk growth — Free consultation"
                  : "Lassen Sie uns über Wachstum sprechen — Kostenlos & unverbindlich"}
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {isEn ? "What drives us" : "Was uns antreibt"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "Our core values shape every project we touch."
                : "Unsere Grundwerte prägen jedes Projekt, das wir anpacken."}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10" />,
                title: isEn ? "Partnership" : "Partnerschaftlichkeit",
                desc: isEn
                  ? "We work with you at eye level. Your success is our success."
                  : "Wir arbeiten mit Ihnen auf Augenhöhe. Ihr Erfolg ist unser Erfolg.",
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: isEn ? "Efficiency" : "Effizienz",
                desc: isEn
                  ? "We eliminate unnecessary steps and automate what can be automated."
                  : "Wir streichen unnötige Schritte und automatisieren, was automatisiert werden kann.",
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: isEn ? "Results-oriented" : "Resultatorientiert",
                desc: isEn
                  ? "We don't just deliver beautiful designs, we deliver measurable results."
                  : "Wir liefern nicht nur schöne Designs, sondern messbare Ergebnisse.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: isEn ? "Reliability" : "Zuverlässigkeit",
                desc: isEn
                  ? "What we promise, we deliver. Fast, secure, and transparent."
                  : "Was wir versprechen, halten wir. Schnell, sicher und transparent.",
              },
            ].map((value, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 100}
                className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 border border-border group"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <FadeIn
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
          direction="up"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {isEn
              ? "Ready for the next step?"
              : "Bereit für den nächsten Schritt?"}
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {isEn
              ? "Let's find out together how we can make your everyday business easier and more profitable."
              : "Lassen Sie uns gemeinsam herausfinden, wie wir Ihren Unternehmensalltag einfacher und profitabler gestalten können."}
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-lg font-semibold shadow-xl bg-white text-secondary hover:bg-white/90 hover:scale-105 transition-all duration-300"
            onClick={() => openForm("contact", "Über uns - Footer")}
          >
            {isEn ? "Start Free Check" : "Gratis-Check starten"}
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
