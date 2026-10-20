import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { FadeIn } from "@/components/FadeIn";
import { DesignPrintShowcase } from "@/components/DesignPrintShowcase";
import {
  MessageCircle,
  Palette,
  Printer,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const WHATSAPP_NUMBER = "4915207595260";
const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const heroIcon =
  "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Printer/3D/printer_3d.png";

export default function DesignPrintPage() {
  const { language } = useLanguage();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  const problemItems = [
    {
      title: pick("Template-Look", "Template Look", "Şablon görünümü"),
      description: pick(
        "Fertige Vorlagen machen Ihr Unternehmen austauschbar und billig — keine Markenwirkung.",
        "Ready-made templates make your business look interchangeable and cheap — no brand recognition.",
        "Hazır şablonlar işletmenizi sıradan ve ucuz gösterir — marka etkisi yok.",
      ),
    },
    {
      title: pick(
        "Zersplitterte Dienstleister",
        "Scattered Vendors",
        "Dağınık tedarikçiler",
      ),
      description: pick(
        "Einer für Design, einer für Druck, einer für Lieferung. Informationen gehen verloren, Kosten steigen.",
        "One for design, one for print, one for delivery. Information gets lost and costs add up.",
        "Biri tasarım, biri baskı, biri teslimat için. Bilgiler kaybolur, maliyetler artar.",
      ),
    },
    {
      title: pick(
        "Langsame Nachbestellung",
        "Slow Reorders",
        "Yavaş yeniden sipariş",
      ),
      description: pick(
        "Wenn Sie schnell neue Karten brauchen, kosten lange Lieferzeiten Kunden und Chancen.",
        "When you need new cards fast, long lead times cost you customers and opportunities.",
        "Hızlıca yeni kartlara ihtiyacınız olduğunda uzun teslimat süreleri müşteri ve fırsat kaybettirir.",
      ),
    },
  ];

  const solutionCheckmarks = [
    {
      text: pick(
        "Design + Druck aus einer Hand",
        "Design + Print from one source",
        "Tek elden tasarım + baskı",
      ),
      icon: <Palette className="w-6 h-6" />,
    },
    {
      text: pick(
        "Premium-Materialien & Veredelung",
        "Premium materials & finishes",
        "Premium malzemeler ve işlem",
      ),
      icon: <Printer className="w-6 h-6" />,
    },
    {
      text: pick(
        "Versandkostenfrei in Deutschland",
        "Free shipping in Germany",
        "Almanya içi ücretsiz kargo",
      ),
      icon: <Truck className="w-6 h-6" />,
    },
  ];

  const solutionCards = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: pick(
        "Zufriedenheitsgarantie",
        "Satisfaction Guarantee",
        "Memnuniyet garantisi",
      ),
      description: pick(
        "Nicht zufrieden? Wir drucken nach — ohne Wenn und Aber. Ihre Marke verdient Perfektion.",
        "Not happy? We reprint — no questions asked. Your brand deserves perfection.",
        "Memnun değil misiniz? Yeniden basarız — soru sorulmaz. Markanız mükemmellik hak ediyor.",
      ),
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: pick(
        "Bestellung via WhatsApp",
        "Order via WhatsApp",
        "WhatsApp ile sipariş",
      ),
      description: pick(
        "Sagen Sie uns in Minuten, was Sie brauchen. Kostenlose Beratung, Premium-Ergebnis, versandkostenfrei.",
        "Tell us what you need in minutes. Free consultation, premium result, free delivery.",
        "Dakikalar içinde ihtiyacınızı söyleyin. Ücretsiz danışmanlık, premium sonuç, ücretsiz teslimat.",
      ),
    },
  ];

  const einsatzgebiete = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: pick("Design", "Design", "Tasarım"),
    },
    {
      icon: <Printer className="w-8 h-8" />,
      title: pick("Druck", "Print", "Baskı"),
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: pick("Lieferung", "Delivery", "Teslimat"),
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: pick("Qualität", "Quality", "Kalite"),
    },
  ];

  const faqs = [
    {
      question: pick(
        "Welche Druckprodukte bieten Sie an?",
        "What print products do you offer?",
        "Hangi baskı ürünlerini sunuyorsunuz?",
      ),
      answer: pick(
        "Visitenkarten, Flyer, Banner, Aufkleber, Speisekarten und NFC-Bewertungskarten — alles von uns gestaltet und in Premium-Qualität gedruckt. Kein Template-Look, echte Markenwirkung.",
        "Business cards, flyers, banners, stickers, menus and NFC review cards — all designed by us and printed to premium quality. No template look, real brand power.",
        "Kartvizitler, el ilanları, bannerlar, etiketler, menüler ve NFC değerlendirme kartları — hepsi bizim tasarladığımız ve premium kalitede basılan. Şablon görünümü yok, gerçek marka gücü.",
      ),
    },
    {
      question: pick(
        "Wie bestelle ich?",
        "How do I order?",
        "Nasıl sipariş veririm?",
      ),
      answer: pick(
        "Schreiben Sie uns einfach per WhatsApp, was Sie brauchen. Wir beraten kostenlos, liefern einen Design-Entwurf zur Freigabe und drucken sowie versenden versandkostenfrei innerhalb Deutschlands.",
        "Simply send us a WhatsApp message with what you need. We consult you for free, deliver a design draft for approval, then print and ship free of charge within Germany.",
        "İhtiyacınızı WhatsApp ile bize gönderin. Ücretsiz danışmanlık yapar, onay için tasarım taslağı sunar, ardından Almanya içinde ücretsiz basar ve göndeririz.",
      ),
    },
    {
      question: pick(
        "Programmieren Sie auch NFC-Bewertungskarten?",
        "Do you also program NFC review cards?",
        "NFC değerlendirme kartlarını da programlıyor musunuz?",
      ),
      answer: pick(
        "Ja. Unsere NFC-Karten sind so programmiert, dass Kunden sie mit dem Handy berühren und direkt auf Ihrer Google-Bewertungsseite landen — der schnellste Weg zu 5-Sterne-Bewertungen.",
        "Yes. Our NFC cards are programmed so customers tap them with their phone and land directly on your Google review page — the fastest way to collect 5-star reviews.",
        "Evet. NFC kartlarımız müşterinin telefonuyla dokunması ve doğrudan Google değerlendirme sayfanıza yönlendirilmesi için programlanır — 5 yıldızlı değerlendirme toplamanın en hızlı yolu.",
      ),
    },
    {
      question: pick(
        "Wie lange dauert die Lieferung?",
        "How long does delivery take?",
        "Teslimat ne kadar sürer?",
      ),
      answer: pick(
        "Je nach Produkt und Veredelung typischerweise 3–7 Werktage nach Design-Freigabe. Express-Optionen auf Anfrage.",
        "Depending on the product and finish, typically 3–7 business days after design approval. Express options are available on request.",
        "Ürüne ve işlemeye göre tipik olarak tasarım onayından sonra 3–7 iş günü. Talep üzerine express seçenekler mevcuttur.",
      ),
    },
  ];

  return (
    <div className="w-full bg-white">
      <SEO
        title={pick(
          "Design & Druck Service | Visitenkarten, Flyer, Banner | PS Professional Solutions",
          "Design & Print Service | Business Cards, Flyers, Banners | PS Professional Solutions",
          "Tasarım & Baskı Hizmeti | Kartvizit, El İlanı, Banner | PS Professional Solutions",
        )}
        description={pick(
          "Professionelles Design und Druck von Visitenkarten, Flyern, Bannern, Aufklebern, Speisekarten und NFC-Karten. Markenstarkes Design, Premium-Druckqualität, versandkostenfrei. Jetzt per WhatsApp anfragen.",
          "Professional design and printing of business cards, flyers, banners, stickers, menus and NFC cards. Brand-strong design, premium print quality, free shipping. Order via WhatsApp.",
          "Kartvizit, el ilanı, banner, etiket, menü ve NFC kartlarının profesyonel tasarımı ve baskısı. Marka gücü olan tasarım, premium baskı kalitesi, ücretsiz kargo. WhatsApp ile sipariş verin.",
        )}
        keywords="Design Druck, Visitenkarten drucken, Flyer drucken, Banner drucken, Aufkleber drucken, Speisekarten drucken, Druckerei Dortmund, Design Agentur, Print Service"
      />

      {/* Hero — wie FeaturePage */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-300 py-20 lg:py-32">
        <FadeIn className="container mx-auto px-4 max-w-6xl" direction="down">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center text-primary group">
              <div className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <img
                  src={heroIcon}
                  alt="Design & Druck"
                  className="w-48 md:w-64 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4 leading-tight">
                {pick("Design & Druck", "Design & Print", "Tasarım & Baskı")}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary/80 mb-6">
                {pick(
                  "Markenstarkes Druckmaterial, das auffällt",
                  "Brand-strong print material that gets noticed",
                  "Dikkat çeken marka gücü olan baskı malzemesi",
                )}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {pick(
                  "Visitenkarten, Flyer, Banner, Aufkleber, Speisekarten & NFC-Karten — von uns gestaltet und in Premium-Qualität gedruckt. Kein Template-Look. Versandkostenfrei. In Minuten per WhatsApp bestellt.",
                  "Business cards, flyers, banners, stickers, menus & NFC cards — designed by us and printed to premium quality. No template look. Free shipping. Order in minutes via WhatsApp.",
                  "Kartvizit, el ilanı, banner, etiket, menü ve NFC kartları — bizim tasarladığımız ve premium kalitede basılan. Şablon görünümü yok. Ücretsiz kargo. Dakikalar içinde WhatsApp ile sipariş.",
                )}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Problem — wie FeaturePage */}
      <section className="bg-slate-900 py-20">
        <FadeIn className="container mx-auto px-4 max-w-5xl" direction="left">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-colors duration-500">
            <div className="w-full md:w-1/2">
              <img
                src={heroIcon}
                alt="Problem"
                className="w-full h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 text-white">
              <h3 className="text-primary font-bold tracking-widest uppercase mb-6 text-xl">
                {pick("Das Problem", "The Problem", "Sorun")}
              </h3>
              <div className="space-y-6 mb-8">
                {problemItems.map((item, i) => (
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
                className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl w-full sm:w-auto whitespace-normal bg-[#25D366] hover:bg-[#1ebe5b] text-white border-none"
                onClick={() =>
                  window.open(
                    buildWhatsAppLink(
                      pick(
                        "Hallo Pankaj, ich möchte eine kostenlose Design & Druck-Beratung.",
                        "Hello Pankaj, I'd like a free design & print consultation.",
                        "Merhaba Pankaj, ücretsiz tasarım & baskı danışmanlığı istiyorum.",
                      ),
                    ),
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {pick(
                  "Kostenlose Beratung via WhatsApp",
                  "Free Consultation via WhatsApp",
                  "WhatsApp ile ücretsiz danışmanlık",
                )}
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Solution — wie FeaturePage */}
      <section className="py-20 bg-white border-b border-muted">
        <FadeIn className="container mx-auto px-4 max-w-5xl" direction="right">
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold tracking-widest uppercase mb-4 text-xl">
              {pick("Die Lösung", "The Solution", "Çözüm")}
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              {pick(
                "Alles aus einer Hand",
                "Everything from one partner",
                "Her şey tek elden",
              )}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                {solutionCheckmarks.map((item, i) => (
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
              {solutionCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-secondary text-white rounded-2xl p-6 flex items-center gap-6 shadow-lg hover:scale-105 hover:bg-secondary/90 transition-all duration-300 group cursor-default"
                >
                  <div className="w-16 h-16 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
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

      {/* Einsatzgebiete — wie FeaturePage */}
      <section className="py-20 bg-white">
        <FadeIn
          className="container mx-auto px-4 max-w-5xl text-center"
          direction="up"
        >
          <h3 className="text-secondary font-bold tracking-widest uppercase mb-12 text-2xl">
            {pick("Einsatzgebiete", "Application Areas", "Uygulama Alanları")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {einsatzgebiete.map((item, i) => (
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

      {/* Benefits + Products + Steps + CTA */}
      <DesignPrintShowcase />

      {/* FAQs — wie FeaturePage */}
      <section id="faqs" className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-secondary">
              {pick(
                "Häufig gestellte Fragen",
                "Frequently Asked Questions",
                "Sıkça Sorulan Sorular",
              )}
            </h2>
            <p className="text-lg text-muted-foreground">
              {pick(
                "Alles, was Sie über unseren Design & Druck-Service wissen müssen.",
                "Everything you need to know about our design & print service.",
                "Tasarım & baskı hizmetimiz hakkında bilmeniz gereken her şey.",
              )}
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card px-8 py-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-secondary mb-3 flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
