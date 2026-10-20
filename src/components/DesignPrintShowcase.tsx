import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { PrintProductDetail } from "@/components/PrintProductDetail";
import {
  printCategories,
  printBenefits,
  printSteps,
} from "@/lib/printShopData";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "4915207595260";
const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const DesignPrintShowcase = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("cards");

  return (
    <>
      {/* Benefits */}
      <section className="py-16 md:py-20 bg-muted/30">
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-secondary">
              {pick(language, {
                de: "Warum Design & Druck bei uns",
                en: "Why Design & Print With Us",
                tr: "Neden Bizimle Tasarım & Baskı",
              })}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {pick(language, {
                de: "Vom ersten Entwurf bis zur Lieferung — alles aus einer Hand.",
                en: "From the first sketch to delivery — everything from one partner.",
                tr: "İlk taslaktan teslimata kadar — tek bir ortaktan her şey.",
              })}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {printBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Card
                  key={i}
                  className="p-6 border-border bg-card hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-lg rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-secondary">
                    {pick(language, {
                      de: b.tDe,
                      en: b.tEn,
                      tr: b.tTr,
                    })}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pick(language, {
                      de: b.dDe,
                      en: b.dEn,
                      tr: b.dTr,
                    })}
                  </p>
                </Card>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Products */}
      <section
        id="produkte"
        className="py-16 md:py-20 bg-background scroll-mt-24"
      >
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              {pick(language, {
                de: "6 Kategorien",
                en: "6 Categories",
                tr: "6 Kategori",
              })}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-secondary">
              {pick(language, {
                de: "Wählen Sie Ihr Druck-Produkt",
                en: "Choose Your Print Product",
                tr: "Baskı Ürününüzü Seçin",
              })}
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              {pick(language, {
                de: "Klicken Sie eine Kategorie an für Details und bestellen Sie direkt per WhatsApp.",
                en: "Tap a category to see details and order directly via WhatsApp.",
                tr: "Detay için bir kategoriye tıklayın ve doğrudan WhatsApp ile sipariş verin.",
              })}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {printCategories.map((c) => {
              const Icon = c.icon;
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {pick(language, {
                    de: c.tDe,
                    en: c.tEn,
                    tr: c.tTr,
                  })}
                </button>
              );
            })}
          </div>

          <PrintProductDetail
            lang={language}
            activeCategory={activeCategory}
            categories={printCategories}
          />
        </FadeIn>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-muted/20 border-t border-border">
        <FadeIn className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-secondary">
              {pick(language, {
                de: "Von der Idee bis zur Lieferung in 3 Schritten",
                en: "From Idea to Delivery in 3 Steps",
                tr: "Fikirden Teslimata 3 Adımda",
              })}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {printSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="text-center bg-card p-6 rounded-2xl border border-border shadow-sm"
                >
                  <div className="relative w-14 h-14 mx-auto rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-secondary text-xs font-extrabold flex items-center justify-center border-2 border-background">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 text-secondary">
                    {pick(language, {
                      de: s.tDe,
                      en: s.tEn,
                      tr: s.tTr,
                    })}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {pick(language, {
                      de: s.dDe,
                      en: s.dEn,
                      tr: s.dTr,
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-secondary text-white">
        <FadeIn className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pick(language, {
              de: "Bereit für markenstarkes Druckmaterial?",
              en: "Ready for Brand-Strong Print Material?",
              tr: "Marka gücü olan baskı malzemesine hazır mısınız?",
            })}
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            {pick(language, {
              de: "Senden Sie uns Ihre Anfrage per WhatsApp — kostenlose Beratung, Premium-Design & Druck, versandkostenfreie Lieferung.",
              en: "Send us your request via WhatsApp — free consultation, premium design & print, free delivery.",
              tr: "Talebinizi WhatsApp ile gönderin — ücretsiz danışmanlık, premium tasarım & baskı, ücretsiz teslimat.",
            })}
          </p>
          <Button
            size="lg"
            className="h-auto min-h-[3.5rem] py-3 px-8 text-base sm:text-lg font-bold shadow-xl hover:scale-105 transition-transform duration-300 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full border-none"
            onClick={() =>
              window.open(
                buildWhatsAppLink(
                  pick(language, {
                    de: "Hallo Pankaj, ich möchte Design- & Druckmaterial bestellen.",
                    en: "Hello Pankaj, I'd like to order design & print material.",
                    tr: "Merhaba Pankaj, tasarım & baskı malzemesi sipariş etmek istiyorum.",
                  }),
                ),
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {pick(language, {
              de: "Jetzt per WhatsApp bestellen",
              en: "Order Now via WhatsApp",
              tr: "WhatsApp ile sipariş ver",
            })}
          </Button>
        </FadeIn>
      </section>
    </>
  );
};
