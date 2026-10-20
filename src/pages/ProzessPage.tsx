import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { Search, PenTool, Code, Rocket, ArrowRight } from "lucide-react";
import { AnimatedTimeline } from "@/components/AnimatedTimeline";

export default function ProzessPage() {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const isEn = language === "en";

  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: isEn ? "1. Potential Analysis" : "1. Potenzial-Analyse",
      description: isEn
        ? "We analyze your current workflows, website, and customer acquisition processes to identify the biggest leverage points for automation and SEO."
        : "Wir analysieren Ihre aktuellen Workflows, Ihre Website und Kundengewinnung, um die größten Hebel für Automatisierung und SEO zu identifizieren.",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: isEn ? "2. Strategy & Concept" : "2. Strategie & Konzept",
      description: isEn
        ? "You receive a customized concept: From the structure of your new website to the exact dialogue scripts for your AI telephone assistant."
        : "Sie erhalten ein maßgeschneidertes Konzept: Von der Struktur Ihrer neuen Website bis hin zu den exakten Dialog-Skripten für Ihren KI-Telefon-Assistenten.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: isEn
        ? "3. Implementation & Integration"
        : "3. Umsetzung & Integration",
      description: isEn
        ? "We build everything turnkey. We design the website, program the AI, and seamlessly integrate everything into your existing calendar or CRM."
        : "Wir bauen alles schlüsselfertig. Wir designen die Website, programmieren die KI und integrieren alles nahtlos in Ihren bestehenden Kalender oder Ihr CRM.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: isEn ? "4. Go-Live & Support" : "4. Go-Live & Support",
      description: isEn
        ? "After thorough testing, we go live. We continuously monitor the systems, optimize SEO, and are always available for adjustments."
        : "Nach ausführlichen Tests gehen wir live. Wir überwachen die Systeme kontinuierlich, optimieren das SEO und stehen jederzeit für Anpassungen bereit.",
    },
  ];

  return (
    <div className="w-full bg-white">
      <SEO
        title={
          isEn
            ? "Our Process | PS Professional Solutions"
            : "Unser Ablauf | PS Professional Solutions"
        }
        description={
          isEn
            ? "From analysis to go-live: This is how we implement your AI automation and website transparently and efficiently."
            : "Von der Analyse bis zum Go-Live: So setzen wir Ihre KI-Automatisierung und Website transparent und effizient um."
        }
      />

      {/* Hero Section */}
      <section className="bg-secondary py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/media/vibe.filesafe.space/1778931020193405557/assets/cd64b89b-6d75-4307-b596-a997ff8dec3f.jpg')] opacity-5 bg-cover bg-center"></div>
        <FadeIn className="container relative z-10 mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {isEn ? "The Path to Automation" : "Der Weg zur Automatisierung"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {isEn
              ? "Transparent, fast, and turnkey. How we transform your business in 4 simple steps."
              : "Transparent, schnell und schlüsselfertig. Wie wir Ihren Betrieb in 4 einfachen Schritten transformieren."}
          </p>
        </FadeIn>
      </section>

      {/* Animated Timeline Section */}
      <section className="py-24 relative overflow-hidden bg-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedTimeline steps={steps} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30 text-center">
        <FadeIn className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            {isEn ? "Ready for Step 1?" : "Bereit für Schritt 1?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {isEn
              ? "Let's find out together how much potential lies in your business."
              : "Lassen Sie uns gemeinsam herausfinden, wie viel Potenzial in Ihrem Betrieb steckt."}
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            onClick={() => openForm("contact", "Ablauf")}
          >
            {isEn ? "Start Free Analysis" : "Kostenlose Analyse starten"}{" "}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
