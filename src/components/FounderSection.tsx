import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const FounderSection = () => {
  const { language } = useLanguage();
  const { openForm } = useContactForm();

  const badge = pick(language, {
    de: "Ihr Wachstums-Partner",
    en: "Your Growth Partner",
    tr: "Büyüme Ortağınız",
  });
  const heading = pick(language, {
    de: "Hallo, ich bin Pankaj Mondjal",
    en: "Hi, I'm Pankaj Mondjal",
    tr: "Merhaba, ben Pankaj Mondjal",
  });
  const intro = pick(language, {
    de: "Gemeinsam mit meinem Team entwickle ich professionelle Webseiten, automatisierte Buchungs- und Chatsysteme und digitale Komplettlösungen für lokale Unternehmen, Dienstleister und den Mittelstand. Keine leeren Marketing-Versprechen, sondern echte messbare Neukundenanfragen über Google, WhatsApp und modernste Web-Technologie.",
    en: "Together with my team, I build high-performing websites, automated booking & chat solutions, and full-stack digital workflows for local businesses and enterprises. No hollow promises, just tangible new client inquiries via Google, WhatsApp, and cutting-edge web infrastructure.",
    tr: "Ekibimle birlikte yerel işletmeler, hizmet sektörü ve KOBİ'ler için yüksek performanslı web siteleri, otomatik randevu ve sohbet sistemleri ile uçtan uca dijital çözümler geliştiriyorum. Boş vaatler yok; Google, WhatsApp ve modern web altyapısı üzerinden gerçek, ölçülebilir müşteri talepleri var.",
  });
  const bullets = [
    pick(language, {
      de: "🎓 B.A. Marketing Management — Strategische Markenführung & Conversion-Optimierung",
      en: "🎓 B.A. in Marketing Management — Strategic brand growth & conversion rate optimization",
      tr: "🎓 B.A. Pazarlama Yönetimi — Stratejik marka yönetimi & dönüşüm optimizasyonu",
    }),
    pick(language, {
      de: "💻 Maßgeschneiderte Webentwicklung & SEO — Direkt auf Ihre Zielgruppe ausgerichtet",
      en: "💻 Custom web development & SEO — Tailored precisely to your local target audience",
      tr: "💻 Özel web geliştirme & SEO — Doğrudan hedef kitlenize göre uyarlanmış",
    }),
    pick(language, {
      de: "⚡ KI-Assistenten & CRM-Automation — 24/7 Anfragen annehmen und Zeit sparen",
      en: "⚡ AI Assistants & CRM Automation — Capture 24/7 leads and save hours of manual work",
      tr: "⚡ Yapay Zeka Asistanları & CRM Otomasyonu — 7/24 talep toplayın ve zamandan tasarruf edin",
    }),
    pick(language, {
      de: "🤝 Ihr persönlicher Ansprechpartner — Schnelle Umsetzung ohne lange Agentur-Umwege",
      en: "🤝 Your direct partner — Fast execution without bureaucratic agency delays",
      tr: "🤝 Doğrudan kişisel muhatabınız — Uzun ajans dolambaçları olmadan hızlı teslimat",
    }),
  ];
  const cta = pick(language, {
    de: "Unverbindliches Erstgespräch via WhatsApp starten",
    en: "Start free consultation via WhatsApp",
    tr: "WhatsApp üzerinden ücretsiz görüşme başlatın",
  });

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid items-center gap-10 md:gap-12 md:grid-cols-2">
          <FadeIn direction="left" className="flex justify-center">
            <div className="relative group w-full max-w-xs">
              <div className="absolute -inset-4 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-colors duration-700"></div>
              <img
                src="/media/vibe.filesafe.space/1778931020193405557/attachments/6c0b29ab-e370-4b58-8219-100f9213eee1.jpg"
                alt="Pankaj Mondjal — Gründer & CEO von PS Professional Solutions"
                className="relative w-64 h-auto sm:w-72 md:w-80 mx-auto rounded-3xl shadow-2xl object-cover border-4 border-white/20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-yellow-400 text-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold shadow-xl rotate-3 text-sm sm:text-base">
                B.A. Marketing Management 🎓
              </div>
              <div className="absolute -top-4 -left-2 sm:-left-4 bg-white text-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold shadow-xl -rotate-3">
                <span className="text-base sm:text-lg">Pankaj Mondjal</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            direction="right"
            className="text-center md:text-left mt-12 md:mt-0"
          >
            <div className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-primary mb-6 backdrop-blur-md border border-white/20">
              {badge}
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight">
              {heading}
            </h2>
            <p className="text-lg md:text-xl mb-6 text-white/90 leading-relaxed font-medium">
              {intro}
            </p>

            <div className="space-y-4 mb-8">
              {bullets.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-base md:text-lg font-medium bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal bg-white text-secondary hover:bg-white/90"
                onClick={() => openForm("contact", "Startseite - Gründer CTA")}
              >
                {cta}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
