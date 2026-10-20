import React from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";

export interface ServiceItem {
  image: string;
  title: string;
  description: string;
  link: string;
}

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

const buildServices = (lang: string): ServiceItem[] => [
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone/3D/telephone_3d.png",
    title: pick(lang, {
      de: "KI-Telefon-Assistent",
      en: "AI Telephone Assistant",
      tr: "Yapay Zeka Telefon Asistanı",
    }),
    description: pick(lang, {
      de: "Ihr 24/7 KI-Mitarbeiter. Unsere Voice-KI nimmt Anrufe entgegen, beantwortet Fragen und bucht Termine – klingt wie ein Mensch, arbeitet wie eine Maschine, spart Ihnen täglich Stunden.",
      en: "Your 24/7 AI employee. Our Voice AI takes calls, answers questions and books appointments – sounds like a human, works like a machine, saves you hours every day.",
      tr: "7/24 yapay zeka çalışanınız. Sesli yapay zekamız aramaları karşılar, soruları yanıtlar ve randevuları ayarlar – insan gibi konuşur, makine gibi çalışır, size her gün saatler kazandırır.",
    }),
    link: "/ki-telefon-assistent",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
    title: pick(lang, {
      de: "Intelligente Termin-Automation",
      en: "Intelligent Appointment Automation",
      tr: "Akıllı Randevu Otomasyonu",
    }),
    description: pick(lang, {
      de: "Nie wieder Terminausfälle. Kunden buchen direkt online in Ihren Kalender. Inklusive automatischer Anzahlung und SMS-Erinnerung, damit Ihre Zeit profitabel bleibt.",
      en: "No more missed appointments. Customers book directly online into your calendar. Including automatic deposit and SMS reminder, so your time remains profitable.",
      tr: "Bir daha randevu iptali yok. Müşteriler doğrudan online takviminize randevu alır. Otomatik depozito ve SMS hatırlatması dahil, böylece zamanınız kârlı kalır.",
    }),
    link: "/intelligente-termin-automation",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Robot/3D/robot_3d.png",
    title: pick(lang, {
      de: "KI Live-Chat",
      en: "AI Live Chat",
      tr: "Yapay Zeka Canlı Sohbet",
    }),
    description: pick(lang, {
      de: "Besucher in Kunden verwandeln. Intelligente Chat-Interaktion, die Fragen klärt und Leads rund um die Uhr qualifiziert.",
      en: "Turn visitors into customers. Intelligent chat interaction that answers questions and qualifies leads around the clock.",
      tr: "Ziyaretçileri müşteriye dönüştürün. Soruları yanıtlayan ve 7/24 potansiyel müşterileri nitelendiren akıllı sohbet etkileşimi.",
    }),
    link: "/ki-live-chat",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round_pushpin/3D/round_pushpin_3d.png",
    title: pick(lang, {
      de: "Google Business Optimierung",
      en: "Google Business Optimization",
      tr: "Google İşletme Optimizasyonu",
    }),
    description: pick(lang, {
      de: "Sichtbarkeit bei Google, die Leads bringt. Wir optimieren Ihren Google-Eintrag, damit lokale Kunden Sie sofort finden und Termine direkt über Google bei Ihnen buchen können.",
      en: "Visibility on Google that brings leads. We optimize your Google listing so that local customers can find you immediately and book appointments directly via Google.",
      tr: "Müşteri getiren Google görünürlüğü. Google kaydınızı optimize ediyoruz, böylece yerel müşteriler sizi hemen bulur ve doğrudan Google üzerinden randevu alabilir.",
    }),
    link: "/google-business-optimierung",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
    title: pick(lang, {
      de: "Programmierte Webseiten & SEO",
      en: "High-Converting Websites",
      tr: "Programlanmış Web Siteleri & SEO",
    }),
    description: pick(lang, {
      de: "Gefunden werden bei Google. Wir programmieren Ihre neue Firmenhomepage – rasend schnell, modern und perfekt für Handys optimiert.",
      en: "Websites that sell. Your digital storefront turns visitors into paying customers - fully integrated into your CRM, your payment processing and high-converting.",
      tr: "Google'da bulunun. Yeni şirket web sitenizi programlıyoruz – ışık hızında, modern ve mobil için mükemmel optimize.",
    }),
    link: "/webseiten",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
    title: pick(lang, {
      de: "All-in-One CRM",
      en: "All-in-One CRM System",
      tr: "All-in-One CRM",
    }),
    description: pick(lang, {
      de: "Alle Kundenanfragen, Termine und Kampagnen an einem Ort. Schluss mit Software-Chaos – zentral, übersichtlich, hocheffizient.",
      en: "Central control for your business. Manage all customer leads, messages, pipeline stages, reviews, and automated follow-ups in one single interface.",
      tr: "Tüm müşteri talepleri, randevular ve kampanyalar tek yerde. Yazılım karmaşasına son – merkezi, net, son derece verimli.",
    }),
    link: "/all-in-one-dashboard",
  },
  {
    image:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Printer/3D/printer_3d.png",
    title: pick(lang, {
      de: "Design & Druck",
      en: "Design & Print Solutions",
      tr: "Tasarım & Baskı",
    }),
    description: pick(lang, {
      de: "Visitenkarten, Flyer, Banner & Speisekarten. Professionelles Design und hochwertiger Druck aus einer Hand – inkl. NFC-Bewertungskarten.",
      en: "High-quality print collateral. Business cards, flyers, banners, stickers & NFC Google review cards created and printed for your business.",
      tr: "Kartvizitler, el ilanları, afişler & menüler. Profesyonel tasarım ve tek kaynaktan kaliteli baskı – NFC değerlendirme kartları dahil.",
    }),
    link: "/design-druck",
  },
];

const ServiceCard = ({
  service,
  size = "lg",
}: {
  service: ServiceItem;
  size?: "lg" | "sm";
}) => (
  <div
    className="flex flex-col items-center text-center group cursor-pointer"
    onClick={() => (window.location.href = service.link)}
  >
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500" />
      <img
        src={service.image}
        alt={service.title}
        className={`relative object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ${
          size === "lg"
            ? "h-24 w-24 md:h-32 md:w-32"
            : "h-24 w-24 md:h-28 md:w-28"
        }`}
      />
    </div>
    <h3
      className={`font-bold mb-${size === "lg" ? "4" : "3"} group-hover:text-primary transition-colors ${
        size === "lg" ? "text-xl" : "text-lg"
      }`}
    >
      {service.title}
    </h3>
    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
      {service.description}
    </p>
  </div>
);

export const IndustryServicesGrid = () => {
  const { language } = useLanguage();
  const services = buildServices(language);

  return (
    <section className="bg-muted/30 py-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-secondary md:text-4xl mb-4">
              {pick(language, {
                de: "Automatisierungen & Digitale Lösungen für Ihren Betrieb",
                en: "Automations & Digital Solutions for Your Business",
                tr: "İşletmeniz için Otomasyonlar & Dijital Çözümler",
              })}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {pick(language, {
                de: "Wählen Sie ein Feature, um zu erfahren, wie wir zeitfressende Prozesse in planbaren Umsatz verwandeln.",
                en: "Select a solution below to learn how we turn time-consuming tasks into predictable revenue.",
                tr: "Zaman alan süreçleri öngörülebilir gelire nasıl dönüştürdüğümüzü öğrenmek için bir özellik seçin.",
              })}
            </p>
          </div>

          {/* Top 4 Feature Cards */}
          <Card className="p-8 md:p-12 border-none shadow-xl bg-card rounded-3xl relative">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {services.slice(0, 4).map((service, i) => (
                <ServiceCard key={i} service={service} size="lg" />
              ))}
            </div>
          </Card>

          {/* Bottom 3 Feature Cards */}
          <Card className="p-8 md:p-12 border-none shadow-xl bg-card rounded-3xl max-w-5xl mx-auto w-full">
            <div className="grid gap-10 md:grid-cols-3">
              {services.slice(4).map((service, i) => (
                <ServiceCard key={i} service={service} size="sm" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
