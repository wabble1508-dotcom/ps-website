import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import {
  ArrowRight,
  Link as LinkIcon,
  Zap,
  MessageCircle,
  Calendar,
  Share2,
  ShoppingCart,
} from "lucide-react";

const IntegrationenPage = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const isEn = language === "en";

  const integrations = [
    {
      name: "Zapier & Make",
      icon: Zap,
      desc: isEn
        ? "Automate workflows across 5000+ apps"
        : "Automatisieren Sie Workflows über 5000+ Apps",
    },
    {
      name: "WhatsApp & SMS",
      icon: MessageCircle,
      desc: isEn
        ? "Direct customer communication & reminders"
        : "Direkte Kundenkommunikation & Erinnerungen",
    },
    {
      name: "Google Calendar & Outlook",
      icon: Calendar,
      desc: isEn
        ? "Seamless appointment synchronization"
        : "Nahtlose Terminsynchronisation",
    },
    {
      name: "Facebook & Instagram",
      icon: Share2,
      desc: isEn
        ? "Lead generation & auto-replies"
        : "Leadgenerierung & Auto-Replies",
    },
    {
      name: "Shopify & WooCommerce",
      icon: ShoppingCart,
      desc: isEn
        ? "E-commerce & order automation"
        : "E-Commerce & Bestellautomation",
    },
    {
      name: "CRM Systems",
      icon: LinkIcon,
      desc: isEn
        ? "HubSpot, Salesforce, GoHighLevel & more"
        : "HubSpot, Salesforce, GoHighLevel & mehr",
    },
  ];

  return (
    <div className="w-full bg-white">
      <SEO
        title={
          isEn
            ? "Integrations & Interfaces | PS Professional Solutions"
            : "Integrationen & Schnittstellen | PS Professional Solutions"
        }
        description={
          isEn
            ? "We connect your favorite tools. Discover our integrations for Zapier, Make, WhatsApp, Google Calendar and more."
            : "Wir verbinden Ihre Lieblings-Tools. Entdecken Sie unsere Integrationen für Zapier, Make, WhatsApp, Google Kalender und mehr."
        }
        keywords="Integrationen, Schnittstellen, Zapier, Make, API, Automatisierung"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 lg:py-32">
        <FadeIn
          className="container relative z-10 mx-auto px-4 text-center"
          direction="up"
        >
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {isEn ? "We connect your" : "Wir verbinden Ihre"} <br />
            <span className="text-primary-foreground/80">
              {isEn ? "Favorite Tools." : "Lieblings-Tools."}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            {isEn
              ? "Seamless interfaces for a fully automated workflow without system breaks."
              : "Nahtlose Schnittstellen für einen vollautomatisierten Workflow ohne Systembrüche."}
          </p>
        </FadeIn>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 100}>
                <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-muted/30">
                  <item.icon className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-white text-center">
        <FadeIn className="container mx-auto px-4" direction="up">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            {isEn ? "Missing an integration?" : "Ihre Integration fehlt?"}
          </h2>
          <p className="mb-10 text-lg text-white/80 max-w-2xl mx-auto">
            {isEn
              ? "Thanks to custom API connections, we can integrate almost any modern software."
              : "Dank individueller API-Anbindungen können wir nahezu jede moderne Software integrieren."}
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            onClick={() => openForm("contact", "Integrationen")}
          >
            {isEn ? "Request Check" : "Machbarkeit anfragen"}{" "}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
};

export default IntegrationenPage;
