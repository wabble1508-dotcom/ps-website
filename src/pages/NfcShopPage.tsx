import { useState, useEffect, useRef } from "react";
import { saveConsent, useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";
import { FadeIn } from "@/components/FadeIn";
import { NfcShopHero } from "@/components/NfcShopHero";
import { NfcShopProducts } from "@/components/NfcShopProducts";
import {
  Nfc,
  Smartphone,
  Star,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Globe,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function NfcShopPage() {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  const [activeCategory, setActiveCategory] = useState<"stands" | "flat">(
    "stands",
  );
  const [selectedPlatform, setSelectedPlatform] = useState<
    "google" | "instagram" | "whatsapp"
  >("google");

  const igRef = useRef<HTMLQuoteElement>(null);
  const { media } = useConsent();

  useEffect(() => {
    // Instagram erst nach Einwilligung laden (externe Medien)
    if (!media) return;
    // Instagram embed script needs to (re)process the blockquote after mount
    const tryProcess = () => {
      const w = window as unknown as {
        instgrm?: { Embeds?: { process: () => void } };
      };
      if (w.instgrm?.Embeds?.process) {
        w.instgrm.Embeds.process();
        return true;
      }
      return false;
    };
    if (tryProcess()) return;
    // Script not yet loaded — load it dynamically then process
    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (existing) {
      const interval = setInterval(() => {
        if (tryProcess()) clearInterval(interval);
      }, 300);
      const timeout = setTimeout(() => clearInterval(interval), 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      setTimeout(tryProcess, 100);
    };
    document.body.appendChild(script);
  }, [media]);

  const benefits = [
    {
      icon: Nfc,
      tDe: "NTAG215 Chip-Technologie",
      tEn: "NTAG215 Chip Tech",
      tTr: "NTAG215 Çip Teknolojisi",
      dDe: "Nahtloses Schreiben & Lesen über NFC — reagiert in unter 0,5 Sekunden.",
      dEn: "Seamless NFC reading & writing — responds in under 0.5 seconds.",
      dTr: "NFC üzerinden kesintisiz yazma ve okuma — 0,5 saniyeden kısa sürede yanıt verir.",
    },
    {
      icon: Star,
      tDe: "Mehr 5-Sterne-Bewertungen",
      tEn: "More 5-Star Reviews",
      tTr: "Daha fazla 5 yıldızlı değerlendirme",
      dDe: "Kunden bewerten in 10 Sekunden direkt im Geschäft — ohne Suchen.",
      dEn: "Customers rate in 10 seconds directly in-store — no searching.",
      dTr: "Müşteriler 10 saniyede mağazada değerlendirme yapar — arama yok.",
    },
    {
      icon: TrendingUp,
      tDe: "Multi-Plattform (Google, IG, WA)",
      tEn: "Multi-Platform (Google, IG, WA)",
      tTr: "Çoklu platform (Google, IG, WA)",
      dDe: "Egal ob Google-Bewertung, Instagram-Follower oder WhatsApp-Kundenservice.",
      dEn: "Whether Google reviews, Instagram followers or WhatsApp chat.",
      dTr: "Google değerlendirmesi, Instagram takipçisi veya WhatsApp müşteri hizmetleri.",
    },
    {
      icon: Smartphone,
      tDe: "Auf jedem Smartphone",
      tEn: "Works on Every Smartphone",
      tTr: "Her akıllı telefonda çalışır",
      dDe: "Funktioniert mit iOS (iPhone) & Android — komplett ohne Zusatz-App.",
      dEn: "Works with iOS (iPhone) & Android — completely app-free.",
      dTr: "iOS (iPhone) ve Android ile çalışır — tamamen uygulamaysız.",
    },
    {
      icon: RefreshCw,
      tDe: "Langlebig & Wasserfest",
      tEn: "Durable & Waterproof",
      tTr: "Dayanıklı ve suya dayanıklı",
      dDe: "Hochwertiges PVC & Acryl schützt vor Spritzwasser, Abnutzung & UV.",
      dEn: "High-grade PVC & acrylic protects against water, wear & UV.",
      dTr: "Yüksek kaliteli PVC ve akril su, aşınma ve UV'ye karşı korur.",
    },
    {
      icon: ShieldCheck,
      tDe: "Schlüsselfertig geliefert",
      tEn: "Turnkey Delivery",
      tTr: "Kullanıma hazır teslim",
      dDe: "Von PS Professional Solutions fertig auf Ihr Profil programmiert.",
      dEn: "Pre-programmed to your profile by PS Professional Solutions.",
      dTr: "PS Professional Solutions tarafından profilinize önceden programlanmış.",
    },
  ];

  const steps = [
    {
      icon: Nfc,
      step: "1",
      tDe: "1. Bestellen & Link nennen",
      tEn: "1. Order & Provide Link",
      tTr: "1. Sipariş verin ve linki iletin",
      dDe: "Senden Sie uns einfach Ihren Google, Instagram oder WhatsApp Link per WhatsApp.",
      dEn: "Send us your Google, Instagram or WhatsApp link via WhatsApp.",
      dTr: "Google, Instagram veya WhatsApp linkinizi WhatsApp üzerinden bize gönderin.",
    },
    {
      icon: Globe,
      step: "2",
      tDe: "2. Programmiert geliefert",
      tEn: "2. Delivered Pre-Programmed",
      tTr: "2. Programlanmış teslim",
      dDe: "Wir beschreiben den NTAG215-Chip schlüsselfertig und senden das Paket zu Ihnen.",
      dEn: "We write the NTAG215 chip and ship your ready-to-use package.",
      dTr: "NTAG215 çipini programlar ve kullanıma hazır paketinizi göndeririz.",
    },
    {
      icon: Star,
      step: "3",
      tDe: "3. Vor Ort aufstellen & profitieren",
      tEn: "3. Set Up & Collect Reviews",
      tTr: "3. Yerleştirin ve kazanın",
      dDe: "Kunden halten das Handy an den Aufsteller — Bewertung oder Follower in 10 Sekunden!",
      dEn: "Customers hold phone to stand — reviews or followers in 10 seconds!",
      dTr: "Müşteri telefonu standa yaklaştırır — 10 saniyede değerlendirme veya takipçi!",
    },
  ];

  return (
    <div className="w-full bg-background text-foreground">
      <SEO
        title={pick(
          "NFC Aufsteller, Karten & Sticker für Google, Instagram & WhatsApp | PS Professional Solutions",
          "NFC Google, Instagram & WhatsApp Products | PS Professional Solutions",
          "Google, Instagram & WhatsApp için NFC Ürünleri | PS Professional Solutions",
        )}
        description={pick(
          "Bestellen Sie programmierte NFC Tischaufsteller, Karten & Sticker für Google-Bewertungen, Instagram & WhatsApp. Hochwertige NTAG215 Chips, wasserfest, versandkostenfrei.",
          "Order custom NFC table stands, cards, and stickers for Google Reviews, Instagram followers, and WhatsApp chats. Pre-programmed NTAG215 technology with no monthly fees.",
          "Google değerlendirmeleri, Instagram takipçileri ve WhatsApp sohbetleri için özel NFC masa standları, kartlar ve etiketler sipariş edin. Önceden programlanmış NTAG215 teknolojisi.",
        )}
        keywords="NFC Tischaufsteller, NFC Google Bewertung Aufsteller, NFC Karte kaufen, Google Bewertung Stand, Instagram NFC Aufkleber, WhatsApp NFC Stand, NFC Marketing Dortmund"
      />

      <NfcShopHero
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />

      {/* Instagram Reel Showcase */}
      <section className="py-16 md:py-20 bg-background">
        <FadeIn className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              {pick("In Aktion sehen", "See it in action", "Aksiyonda görün")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">
              {pick(
                "So funktionieren NFC-Bewertungskarten — Live Demo",
                "How NFC Review Cards Work — Live Demo",
                "NFC Değerlendirme Kartları Nasıl Çalışır — Canlı Demo",
              )}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {pick(
                "Sehen Sie, wie ein Kunde sein Handy an die Karte hält und in Sekunden eine 5-Sterne Google-Bewertung hinterlässt.",
                "Watch how a customer taps their phone and leaves a 5-star Google review in seconds.",
                "Müşterinin telefonunu karta yaklaştırıp saniyeler içinde 5 yıldızlı Google değerlendirmesi bırakmasını izleyin.",
              )}
            </p>
          </div>
          <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-black">
            {!media && (
              <div className="flex aspect-[9/14] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-6 text-center text-white">
                <button
                  type="button"
                  onClick={() => saveConsent(true)}
                  className="rounded-full bg-white/25 px-5 py-2 font-semibold backdrop-blur transition hover:bg-white/35"
                >
                  Instagram-Video laden
                </button>
                <p className="max-w-xs text-xs text-white/85">
                  Mit Klick stimmen Sie zu, dass Daten an Instagram (Meta) übermittelt werden.
                </p>
              </div>
            )}
            {media && (
            <blockquote
              ref={igRef}
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/Dc63FgCMPuc/?utm_source=ig_web_copy_link"
              data-instgrm-version="14"
              style={{
                background: "#000",
                border: "0",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "280px",
                padding: "0",
                width: "100%",
              }}
            ></blockquote>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 bg-muted/30">
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">
              {pick(
                "Warum NFC-Marketing Ihren Umsatz steigert",
                "Why NFC Marketing Drives Revenue",
                "NFC Pazarlaması Neden Gelirinizi Artırır",
              )}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {pick(
                "Kein Tippen, kein Suchen, keine Barrieren. Der Kunde hält sein Handy ran und gibt in 10 Sekunden Feedback.",
                "Remove all friction. Customers tap their phone and take action in under 10 seconds.",
                "Sürtünme yok. Müşteri telefonunu yaklaştırır ve 10 saniyede harekete geçer.",
              )}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Card
                  key={i}
                  className="p-6 border-border bg-card hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-lg rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {pick(b.tDe, b.tEn, b.tTr)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pick(b.dDe, b.dEn, b.dTr)}
                  </p>
                </Card>
              );
            })}
          </div>
        </FadeIn>
      </section>

      <NfcShopProducts
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedPlatform={selectedPlatform}
      />

      {/* How it works 3-step */}
      <section className="py-16 md:py-20 bg-muted/20 border-t border-border">
        <FadeIn className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {pick(
                "In 3 einfachen Schritten zu mehr Kunden",
                "In 3 Easy Steps to 5-Star Reviews",
                "3 kolay adımda daha fazla müşteriye",
              )}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => {
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
                  <h3 className="font-bold text-base sm:text-lg mb-2">
                    {pick(s.tDe, s.tEn, s.tTr)}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {pick(s.dDe, s.dEn, s.dTr)}
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
          <Sparkles className="w-12 h-12 mx-auto text-amber-300 mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pick(
              "Bereit für automatisierte lokale Sichtbarkeit?",
              "Ready for Automated Local Growth?",
              "Otomatik yerel büyüme için hazır mısınız?",
            )}
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            {pick(
              "Bestellen Sie jetzt Ihre NFC Tischaufsteller, Scheckkarten oder Sticker — individuell programmiert und versandkostenfrei geliefert.",
              "Order your NFC Tischaufsteller or Cards now — custom programmed and shipped within a few business days.",
              "NFC masa standları, kartlar veya etiketlerinizi hemen sipariş edin — özel programlanmış ve birkaç iş günü içinde gönderilir.",
            )}
          </p>
          <Button
            size="lg"
            className="h-auto min-h-[3.5rem] py-3 px-8 text-base sm:text-lg font-bold shadow-xl hover:scale-105 transition-transform duration-300 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full"
            onClick={() => openForm("contact", "NFC Shop - Bottom CTA")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {pick(
              "Jetzt per WhatsApp bestellen",
              "Order Now via WhatsApp",
              "WhatsApp ile hemen sipariş ver",
            )}
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
