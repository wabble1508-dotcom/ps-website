import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { Monitor } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const services = [
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
    link: "/webseiten",
    titles: {
      de: "Programmierte Webseiten & SEO",
      en: "Custom Websites & SEO",
      tr: "Programlanmış Web Siteleri & SEO",
    },
    descs: {
      de: "Gefunden werden bei Google. Wir programmieren Ihre neue Firmenhomepage – rasend schnell, modern und perfekt für Handys optimiert.",
      en: "Get found on Google. We program your new company website – blazing fast, modern and perfectly optimized for mobile.",
      tr: "Google'da bulunun. Yeni şirket web sitenizi programlıyoruz – ışık hızında, modern ve mobil için mükemmel optimize.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone/3D/telephone_3d.png",
    link: "/ki-telefon-assistent",
    titles: {
      de: "KI-Telefon-Assistent",
      en: "AI Phone Assistant",
      tr: "Yapay Zeka Telefon Asistanı",
    },
    descs: {
      de: "Ihr 24/7 KI-Mitarbeiter. Unsere Voice-KI nimmt Anrufe entgegen, beantwortet Fragen und bucht Termine.",
      en: "Your 24/7 AI employee. Our voice AI answers calls, handles questions and books appointments.",
      tr: "7/24 yapay zeka çalışanınız. Sesli yapay zekamız aramaları karşılar, soruları yanıtlar ve randevuları ayarlar.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
    link: "/intelligente-termin-automation",
    titles: {
      de: "Intelligente Termin-Automation",
      en: "Smart Appointment Automation",
      tr: "Akıllı Randevu Otomasyonu",
    },
    descs: {
      de: "Nie wieder Terminausfälle. Kunden buchen direkt online in Ihren Kalender inkl. SMS-Erinnerung.",
      en: "No more missed appointments. Customers book directly online into your calendar incl. SMS reminders.",
      tr: "Bir daha randevu iptali yok. Müşteriler doğrudan online takviminize randevu alır, SMS hatırlatması dahil.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Robot/3D/robot_3d.png",
    link: "/ki-live-chat",
    titles: {
      de: "KI Live-Chat",
      en: "AI Live Chat",
      tr: "Yapay Zeka Canlı Sohbet",
    },
    descs: {
      de: "Besucher in Kunden verwandeln. Intelligente Chat-Interaktion, die Fragen klärt und Leads qualifiziert.",
      en: "Turn visitors into customers. Intelligent chat interaction that answers questions and qualifies leads.",
      tr: "Ziyaretçileri müşteriye dönüştürün. Soruları yanıtlayan ve potansiyel müşterileri nitelendiren akıllı sohbet.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round_pushpin/3D/round_pushpin_3d.png",
    link: "/google-business-optimierung",
    titles: {
      de: "Google Business Optimierung",
      en: "Google Business Optimization",
      tr: "Google İşletme Optimizasyonu",
    },
    descs: {
      de: "Sichtbarkeit bei Google, die Leads bringt. Wir optimieren Ihren Eintrag für lokale Dominanz.",
      en: "Google visibility that brings leads. We optimize your listing for local dominance.",
      tr: "Müşteri getiren Google görünürlüğü. Yerel hakimiyet için kaydınızı optimize ediyoruz.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
    link: "/all-in-one-dashboard",
    titles: {
      de: "All-in-One CRM",
      en: "All-in-One CRM",
      tr: "All-in-One CRM",
    },
    descs: {
      de: "Alle Kundenanfragen, Termine und Kampagnen an einem Ort. Schluss mit Software-Chaos – zentral, übersichtlich, hocheffizient.",
      en: "All customer inquiries, appointments and campaigns in one place. No more software chaos – centralized, clear, highly efficient.",
      tr: "Tüm müşteri talepleri, randevular ve kampanyalar tek yerde. Yazılım karmaşasına son – merkezi, net, son derece verimli.",
    },
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Printer/3D/printer_3d.png",
    link: "/design-druck",
    titles: {
      de: "Design & Druck",
      en: "Design & Print",
      tr: "Tasarım & Baskı",
    },
    descs: {
      de: "Visitenkarten, Flyer, Banner & Speisekarten. Professionelles Design und hochwertiger Druck aus einer Hand – inkl. NFC-Bewertungskarten.",
      en: "Business cards, flyers, banners & menus. Professional design and high-quality printing from one source – incl. NFC review cards.",
      tr: "Kartvizitler, el ilanları, afişler & menüler. Profesyonel tasarım ve tek kaynaktan kaliteli baskı – NFC değerlendirme kartları dahil.",
    },
  },
];

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const ServicesSection = () => {
  const { language } = useLanguage();

  const mainService = services[0];
  const secondaryServices = services.slice(1, 5);
  const tertiaryServices = services.slice(5);

  const labels = {
    coreProduct: pick(language, {
      de: "Unser Hauptprodukt",
      en: "Our Core Product",
      tr: "Ana Ürünümüz",
    }),
    learnMore: pick(language, {
      de: "Mehr erfahren",
      en: "Learn more",
      tr: "Daha fazla bilgi",
    }),
    tags: [
      pick(language, { de: "Responsiv", en: "Responsive", tr: "Responsive" }),
      pick(language, {
        de: "SEO-optimiert",
        en: "SEO-Optimized",
        tr: "SEO-Optimize",
      }),
      pick(language, { de: "Blitzschnell", en: "Fast", tr: "Şimşek Hızında" }),
      pick(language, { de: "Modern", en: "Modern", tr: "Modern" }),
    ],
  };

  return (
    <section className="bg-muted/30 py-20 overflow-hidden">
      <FadeIn className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            <Monitor className="h-4 w-4" />
            {labels.coreProduct}
          </span>
        </div>

        {/* Main product — Webdesign — large featured card */}
        <Card
          className="p-8 md:p-12 border-none shadow-xl bg-card rounded-3xl relative overflow-hidden mb-8 cursor-pointer group hover:shadow-2xl transition-shadow"
          onClick={() => (window.location.href = mainService.link)}
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
          <div className="grid gap-8 md:grid-cols-2 items-center relative z-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500"></div>
                <img
                  src={mainService.image}
                  alt={pick(language, mainService.titles)}
                  className="relative h-28 w-28 md:h-36 md:w-36 object-contain drop-shadow-xl group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {pick(language, mainService.titles)}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                {pick(language, mainService.descs)}
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                {labels.learnMore} →
              </span>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {labels.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary/5 border border-primary/10 px-3 py-3 text-sm font-semibold text-foreground"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Secondary KI features — 4 cards */}
        <Card className="p-8 md:p-12 border-none shadow-xl bg-card rounded-3xl mb-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {secondaryServices.map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group cursor-pointer"
                onClick={() => (window.location.href = service.link)}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500"></div>
                  <img
                    src={service.image}
                    alt={pick(language, service.titles)}
                    className="relative h-24 w-24 md:h-28 md:w-28 object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {pick(language, service.titles)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pick(language, service.descs)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tertiary features — CRM & Design/Druck */}
        <Card className="p-8 md:p-12 border-none shadow-xl bg-card rounded-3xl max-w-5xl mx-auto w-full">
          <div className="grid gap-10 md:grid-cols-2">
            {tertiaryServices.map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group cursor-pointer"
                onClick={() => (window.location.href = service.link)}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500"></div>
                  <img
                    src={service.image}
                    alt={pick(language, service.titles)}
                    className="relative h-24 w-24 md:h-28 md:w-28 object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {pick(language, service.titles)}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pick(language, service.descs)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </section>
  );
};
