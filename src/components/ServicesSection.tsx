import { FadeIn } from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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

// App- und Software-Entwicklung: eigene Zeile direkt unter dem Hauptprodukt
const devServices = [
  {
    image: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
    link: "/app-entwicklung",
    titles: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
    descs: {
      de: "Web-Apps, iOS- und Android-Apps, Kundenportale und Bonus-Apps – vom Prototyp bis zum App Store.",
      en: "Web apps, iOS and Android apps, customer portals and loyalty apps – from prototype to app store.",
      tr: "Web uygulamaları, iOS ve Android uygulamaları, müşteri portalları ve sadakat uygulamaları – prototipten mağazaya.",
    },
  },
  {
    image: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Gear/3D/gear_3d.png",
    link: "/software-entwicklung",
    titles: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" },
    descs: {
      de: "Individuelle Software, interne Tools, Schnittstellen und KI-Automatisierung, die genau zu Ihren Abläufen passt.",
      en: "Custom software, internal tools, integrations and AI automation that fit your processes exactly.",
      tr: "Süreçlerinize tam uyan özel yazılım, dahili araçlar, entegrasyonlar ve AI otomasyonu.",
    },
  },
];

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

type Service = (typeof services)[number];

// Kachel im Bento-Raster: dunkel, mit Lichtschein beim Überfahren
const Tile = ({
  service,
  language,
  className = "",
  big = false,
  children,
}: {
  service: Service;
  language: string;
  className?: string;
  big?: boolean;
  children?: React.ReactNode;
}) => (
  <Link
    to={service.link}
    className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 md:p-8 ${className}`}
  >
    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/30" />
    <img
      src={service.image}
      alt={pick(language, service.titles)}
      loading="lazy"
      className={`relative mb-6 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 ${big ? "h-28 w-28 md:h-40 md:w-40" : "h-16 w-16"}`}
    />
    <h3 className={`relative font-semibold tracking-tight text-white ${big ? "text-3xl md:text-5xl" : "text-xl"}`}>
      {pick(language, service.titles)}
    </h3>
    <p className={`relative mt-3 text-white/75 ${big ? "max-w-md text-base md:text-lg" : "text-sm"}`}>
      {pick(language, service.descs)}
    </p>
    {children}
    <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
  </Link>
);

export const ServicesSection = () => {
  const { language } = useLanguage();
  const [web, ...rest] = services;
  const ki = rest.slice(0, 4);
  const more = rest.slice(4);

  const labels = {
    kicker: pick(language, { de: "Leistungen", en: "Services", tr: "Hizmetler" }),
    title: pick(language, {
      de: "Alles, was Ihr Business online braucht.",
      en: "Everything your business needs online.",
      tr: "İşletmenizin online ihtiyacı olan her şey.",
    }),
    priceBadge: pick(language, {
      de: "Website ab 49 €/Monat · 0 € Einrichtung",
      en: "Website from €49/month · €0 setup",
      tr: "Web sitesi aylık 49 €'dan · 0 € kurulum",
    }),
    tags: [
      pick(language, { de: "Responsiv", en: "Responsive", tr: "Responsive" }),
      pick(language, { de: "SEO-optimiert", en: "SEO-Optimized", tr: "SEO-Optimize" }),
      pick(language, { de: "Blitzschnell", en: "Fast", tr: "Şimşek Hızında" }),
    ],
  };

  return (
    <section className="dark relative overflow-hidden bg-background py-20 text-white md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7ee3ee]">{labels.kicker}</span>
          <h2 className="mx-auto mt-3 max-w-3xl  text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {labels.title}
          </h2>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-6">
          {/* Hauptprodukt Webdesign: große Kachel */}
          <FadeIn className="md:col-span-4 md:row-span-2">
            <Tile service={web} language={language} big className="h-full min-h-[420px] justify-end">
              <div className="relative mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black">{labels.priceBadge}</span>
                {labels.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </Tile>
          </FadeIn>
          {devServices.map((service) => (
            <FadeIn key={service.link} className="md:col-span-2">
              <Tile service={service} language={language} className="h-full" />
            </FadeIn>
          ))}
          {ki.map((service) => (
            <FadeIn key={service.link} className="md:col-span-3 lg:col-span-3 xl:col-span-3">
              <Tile service={service} language={language} className="h-full" />
            </FadeIn>
          ))}
          {more.map((service) => (
            <FadeIn key={service.link} className="md:col-span-3">
              <Tile service={service} language={language} className="h-full" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
