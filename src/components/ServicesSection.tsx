import { FadeIn } from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { TiltCard } from "@/components/TiltCard";
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
type L = { de: string; en: string; tr: string };

// Hauptleistungen mit Preis-Hinweis und Stichworten
const MAIN: { service: Service; price: L; tags: string[] }[] = [
  {
    service: services[0],
    price: { de: "ab 49 € / Monat", en: "from €49 / month", tr: "aylık 49 €'dan" },
    tags: ["SEO", "GEO", "Mobile first"],
  },
  {
    service: devServices[0] as Service,
    price: { de: "ab 4.900 €", en: "from €4,900", tr: "4.900 €'dan" },
    tags: ["iOS", "Android", "Web-App"],
  },
  {
    service: devServices[1] as Service,
    price: { de: "nach Angebot", en: "on quote", tr: "teklife göre" },
    tags: ["Tools", "Schnittstellen", "KI"],
  },
];

// Leistungsliste im Studio-Stil: nummerierte Zeilen statt Kacheln mit Symbolen
export const ServicesSection = () => {
  const { language } = useLanguage();
  const more = services.slice(1);

  const labels = {
    kicker: pick(language, { de: "Leistungen", en: "Services", tr: "Hizmetler" }),
    sub: pick(language, {
      de: "Drei Schwerpunkte, ein Ansprechpartner. Alles selbst programmiert – keine Baukästen, keine Vorlagen.",
      en: "Three focus areas, one contact person. Everything hand-coded – no site builders, no templates.",
      tr: "Üç odak alanı, tek muhatap. Her şey elle kodlanmış – site oluşturucu yok, şablon yok.",
    }),
    more: pick(language, { de: "Außerdem", en: "Also", tr: "Ayrıca" }),
  };

  const title =
    language === "en" ? (
      <>Websites, apps & software – <span className="accent-serif text-[#7ee3ee]">built by hand.</span></>
    ) : language === "tr" ? (
      <>Web siteleri, uygulamalar ve yazılım – <span className="accent-serif text-[#7ee3ee]">elle yapılmış.</span></>
    ) : (
      <>Websites, Apps & Software – <span className="accent-serif text-[#7ee3ee]">von Hand gebaut.</span></>
    );

  return (
    <section className="dark relative overflow-hidden bg-background py-20 text-foreground md:py-28">
      {/* farbige Lichtflächen hinter dem Glas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-[8%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-[#1e9fae]/25 blur-[120px]" />
        <div className="absolute right-[5%] top-[45%] h-[24rem] w-[24rem] rounded-full bg-[#3b5bdb]/20 blur-[120px]" />
      </div>
      <div className="container relative mx-auto max-w-6xl px-4">
        <SectionHead index="01" kicker={labels.kicker} title={title} sub={labels.sub} />

        <div className="grid gap-4 md:grid-cols-3">
          {MAIN.map(({ service, price, tags }, i) => (
            <FadeIn key={service.link} delay={i * 90}>
              <TiltCard to={service.link} className="flex h-full min-h-[22rem] flex-col p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tabular-nums text-white/60">0{i + 1}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7ee3ee]" />
                </div>
                <h3 className="mt-auto pt-16 text-3xl font-semibold leading-tight text-white md:text-4xl">{pick(language, service.titles)}</h3>
                <p className="mt-3 text-sm text-white/70">{pick(language, service.descs)}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-sm">
                  <span className="font-semibold text-white">{pick(language, price)}</span>
                  <span className="text-white/55" data-no-translate>
                    {tags.join(" · ")}
                  </span>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <div className="glass mt-6 grid gap-x-12 rounded-3xl p-6 md:grid-cols-[10rem_1fr] md:p-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{labels.more}</p>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">
            {more.map((service, i) => (
              <li key={service.link}>
                <Link
                  to={service.link}
                  className="group flex items-baseline gap-4 border-b border-white/10 py-4 transition-colors hover:text-[#7ee3ee]"
                >
                  <span className="font-display text-xs tabular-nums text-muted-foreground">0{i + 4}</span>
                  <span className="flex-1">
                    <span className="block font-semibold">{pick(language, service.titles)}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{pick(language, service.descs)}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[#7ee3ee]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
