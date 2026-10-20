import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function GastronomiePage() {
  const { language } = useLanguage();

  const gastroLogos = [
    "/media/vibe.filesafe.space/1778931020193405557/attachments/5adb3919-af67-49d1-905d-22aac3fc8cf2.png", // Burek Bar
    "/media/vibe.filesafe.space/1778931020193405557/attachments/b9526442-40fd-4557-8b49-fecebcca6fad.png", // Öz Urfa
    "/media/vibe.filesafe.space/1778931020193405557/attachments/c3fedf79-deb1-401a-b8a9-f94a12346b8c.png", // AM Hähnchenbuderei
    "/media/vibe.filesafe.space/1778931020193405557/attachments/c0d2d99f-a3ec-4b6e-b299-599a3a899844.png", // Café Sis
    "/media/vibe.filesafe.space/1778931020193405557/attachments/033385ce-5c4d-42dc-bb95-0348615e3827.png", // La Roma
    "/media/vibe.filesafe.space/1778931020193405557/attachments/ec2cff87-208b-4d77-8bad-7d349fc9f8f1.png", // Juicy Flame
    "/media/vibe.filesafe.space/1778931020193405557/attachments/2ffe9c2a-bd0d-4ad8-a0f9-cdde2678adf3.png", // Delphin Feinkost
    "/media/vibe.filesafe.space/1778931020193405557/attachments/80f19b88-7fa1-4837-9517-08c9f6c75a4a.png", // madebyanu
  ];

  const dataDe: IndustryPageProps = {
    customPartnerLogos: gastroLogos,
    customPartnerTitle:
      "Erfolgreiche Gastronomie-Partner: Burek Bar, Öz Urfa, AM Hähnchenbuderei, Café Sis, La Roma, Juicy Flame & Delphin",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Volle Tische, treue Gäste – Webdesign & Automatisierung für Gastronomie.",
      subtitle:
        "Smarte Online-Tischreservierung, digitale Speisekarten mit QR-Code, automatische Google-Bewertungen und WhatsApp-Vorbestellung. Machen Sie Ihr Restaurant zum Publikumsmagneten.",
      buttonText: "Gastronomie-Webseite anfragen",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Telefon klingelt mitten im Abendservice? Personal muss Bestellungen annehmen statt Gäste zu bewirten.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Leere Tische durch No-Shows? Kurzfristige Reservierungs-Ausfälle kosten bares Geld.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_with_wings/3D/money_with_wings_3d.png",
        title:
          "Hohe Lieferdienst-Provisionen? Bis zu 30% Marge gehen an Lieferando und Co. verloren.",
      },
    ],
    leadMagnet: {
      title:
        "Gastronomie-Umsatz-Guide: 35% mehr Tischreservierungen ohne Provision.",
      description:
        "Erfahren Sie, wie Top-Restaurants mit eigener digitaler Bestell- und Reservierungs-Infrastruktur unabhängig von teuren Drittanbietern werden.",
      buttonText: "Gratis Gastro-Guide sichern",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Tischreservierung 24/7 vollautomatisch per WhatsApp und Web.",
      description:
        "Gäste reservieren rund um die Uhr in Sekunden. Automatische SMS/WhatsApp-Erinnerungen senken No-Shows um bis zu 85%. Ihr Team konzentriert sich voll auf perfekten Service und glückliche Gäste.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Eigener provisionsfreier Online-Shop für Abholung & Lieferung.",
      description:
        "Sparen Sie monatlich tausende Euro an Vermittlungsgebühren. Mit Ihrem eigenen Online-Bestellsystem bestellen Stammkunden direkt bei Ihnen – mobiloptimiert und blitzschnell.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Die digitale Komplettlösung für moderne Restaurants & Cafés.",
      subtitle:
        "Von der interaktiven Speisekarte bis zum automatisierten Google-Bewertungs-Booster.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Digitale QR-Code Speisekarte",
          description:
            "(Tagesgerichte und Preise mit einem Klick in Echtzeit aktualisieren)",
        },
        {
          title: "Online-Tischreservierung ohne Provision",
          description:
            "(Gäste reservieren online mit automatischer SMS-Bestätigung)",
        },
        {
          title: "Google-Bewertungs-Booster & NFC-Aufsteller",
          description:
            "(5-Sterne Bewertungen direkt am Tisch mit einem Smartphone-Tap)",
        },
        {
          title: "WhatsApp Vorbestell- & Lieferassistent",
          description:
            "(Kunden bestellen ihr Essen direkt über WhatsApp – 0% Gebühren)",
        },
      ],
    },
    testimonials: [
      {
        title: "Öz Urfa Deluxe Café & Restaurant",
        description:
          "Ergebnis: Über 140 neue Tischreservierungen pro Monat und deutliche Reduktion von No-Shows durch WhatsApp-Erinnerung.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/b9526442-40fd-4557-8b49-fecebcca6fad.png",
      },
      {
        title: "AM Hähnchenbuderei Grillhähnchen Restaurant",
        description:
          "Ergebnis: Digitaler Vorbestellservice für Stoßzeiten. Gäste bestellen online vor und holen ohne Wartezeit ab.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/c3fedf79-deb1-401a-b8a9-f94a12346b8c.png",
      },
      {
        title: "Café Sis Coffee Kitchen & La Roma Steinofenpizza",
        description:
          "Ergebnis: Höhere Sichtbarkeit bei lokalen Google-Suchen und hunderte 5-Sterne-Bewertungen über NFC-Tischaufsteller.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/c0d2d99f-a3ec-4b6e-b299-599a3a899844.png",
      },
    ],
    faqs: [
      {
        question: "Können Gäste direkt online Tische reservieren?",
        answer:
          "Ja, unser System ermöglicht schnelle Online-Reservierungen rund um die Uhr. Das Restaurant bestätigt Tische automatisch oder manuell, und Gäste erhalten eine Bestätigung inklusive Terminerinnerung per WhatsApp/SMS.",
      },
      {
        question: "Funktioniert die Speisekarte auch ohne App-Download?",
        answer:
          "Absolut. Gäste scannen einfach einen QR-Code auf dem Tisch mit ihrer Smartphone-Kamera. Die Speisekarte öffnet sich sofort im Browser – schnell, responsive und ohne jede App-Installation.",
      },
      {
        question: "Wie helfen die NFC-Karten bei Google-Bewertungen?",
        answer:
          "Zufriedene Gäste halten ihr Smartphone kurz an die NFC-Karte oder den Tischaufsteller. Die Google-Bewertungsmaske Ihres Restaurants öffnet sich sofort – so sammeln Sie spielend 5-Sterne-Bewertungen.",
      },
      {
        question: "Fallen monatliche Vermittlungsgebühren pro Bestellung an?",
        answer:
          "Nein! Im Gegensatz zu gängigen Lieferportalen zahlen Sie bei uns 0% Provision pro Gast oder Bestellung. Der gesamte Umsatz gehört zu 100% Ihnen.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: gastroLogos,
    customPartnerTitle:
      "Featured Restaurant Partners: Öz Urfa, AM Hähnchenbuderei, Café Sis, La Roma & more",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Packed Tables, Loyal Guests – Websites & Automation for Restaurants.",
      subtitle:
        "Smart online table bookings, digital QR code menus, automated Google reviews, and zero-commission WhatsApp ordering.",
      buttonText: "Request Restaurant Website",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Phone ringing during dinner rush? Staff answers calls instead of serving guests.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Empty tables caused by no-shows? Last-minute cancellations drain revenue.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_with_wings/3D/money_with_wings_3d.png",
        title:
          "High delivery portal fees? Up to 30% margin lost to third-party delivery apps.",
      },
    ],
    leadMagnet: {
      title:
        "Restaurant Growth Guide: 35% more table bookings without commission.",
      description:
        "Discover how modern restaurants use proprietary booking and ordering funnels to eliminate third-party commission fees.",
      buttonText: "Get Free Restaurant Guide",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Table bookings on autopilot 24/7 via WhatsApp and Web.",
      description:
        "Guests reserve in seconds. Automated reminders reduce no-shows by up to 85%.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Your own commission-free online ordering platform.",
      description:
        "Keep 100% of your earnings. Customers order directly from your mobile-optimized website.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "The complete digital infrastructure for restaurants and cafes.",
      subtitle: "From digital QR menus to automated Google review boosters.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Digital QR Code Menu",
          description: "(Update daily specials and prices in real-time)",
        },
        {
          title: "Zero-Commission Table Booking",
          description: "(Guests book online with automated SMS confirmation)",
        },
        {
          title: "Google Review Booster & NFC Stands",
          description: "(Instant 5-star reviews with one tap at the table)",
        },
        {
          title: "WhatsApp Pre-Order System",
          description: "(Direct ordering via WhatsApp – 0% commissions)",
        },
      ],
    },
    testimonials: [
      {
        title: "Öz Urfa Deluxe Café & Restaurant",
        description:
          "Over 140 new online reservations monthly and drastically reduced no-shows.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/b9526442-40fd-4557-8b49-fecebcca6fad.png",
      },
      {
        title: "AM Hähnchenbuderei Grill Restaurant",
        description:
          "Pre-order rush service for express pickup with zero counter queues.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/c3fedf79-deb1-401a-b8a9-f94a12346b8c.png",
      },
    ],
    faqs: [
      {
        question: "Can guests book tables online 24/7?",
        answer:
          "Yes, automated booking works 24/7 with instant WhatsApp and SMS reminders.",
      },
      {
        question: "Are there any per-order commission fees?",
        answer:
          "None! You keep 100% of your order revenue with zero middleman fees.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: gastroLogos,
    customPartnerTitle:
      "Öne Çıkan Restoran Ortakları: Öz Urfa, AM Hähnchenbuderei, Café Sis, La Roma & daha fazlası",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Dolu Masalar, Sadık Müşteriler – Restoranlar için Web Tasarım & Otomasyon.",
      subtitle:
        "Akıllı online masa rezervasyonu, QR kodlu dijital menü, otomatik Google yorumları ve %0 komisyonlu WhatsApp siparişi.",
      buttonText: "Restoran Web Sitesi Talep Et",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title: "Yoğun saatte çalan telefonlar personeli meşgul ediyor mu?",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Gelmeyen rezervasyonlar nedeniyle boş masalar ciro kaybettiriyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_with_wings/3D/money_with_wings_3d.png",
        title:
          "Yemek portallarına ödenen %30'a varan komisyonlar karınızı eritiyor.",
      },
    ],
    leadMagnet: {
      title:
        "Restoran Büyüme Rehberi: Komisyonsuz %35 daha fazla masa rezervasyonu.",
      description:
        "Modern restoranların komisyonsuz kendi sistemleriyle nasıl büyüdüğünü keşfedin.",
      buttonText: "Ücretsiz Restoran Rehberini İndir",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "WhatsApp ve Web üzerinden 7/24 otomatik masa rezervasyonu.",
      description:
        "Müşteriler saniyeler içinde rezervasyon yapar. Otomatik hatırlatıcılar gelmeme oranını %85 düşürür.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Kendi komisyonsuz paket servis ve sipariş mağazanız.",
      description:
        "Kazancınızın %100'ü sizde kalsın. Müşterileriniz doğrudan kendi sitenizden sipariş verir.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Restoran ve kafeler için eksiksiz dijital altyapı.",
      subtitle: "QR menülerden NFC Google yorum arttırıcılara kadar.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Dijital QR Kod Menü",
          description: "(Fiyatları ve günlük yemekleri anında güncelleyin)",
        },
        {
          title: "Komisyonsuz Masa Rezervasyonu",
          description: "(SMS/WhatsApp onaylı otomatik rezervasyon)",
        },
        {
          title: "NFC Google Yorum Kartları",
          description: "(Masada tek dokunuşla 5 yıldızlı değerlendirmeler)",
        },
        {
          title: "WhatsApp Ön Sipariş Sistemi",
          description: "(Doğrudan WhatsApp üzerinden komisyonsuz sipariş)",
        },
      ],
    },
    testimonials: [
      {
        title: "Öz Urfa Deluxe Café & Restoran",
        description:
          "Ayda 140'tan fazla yeni online rezervasyon ve düşen rezervasyon iptalleri.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/b9526442-40fd-4557-8b49-fecebcca6fad.png",
      },
    ],
    faqs: [
      {
        question: "Komisyon veya sipariş başı kesinti var mı?",
        answer:
          "Kesinlikle hayır! Sipariş ve rezervasyonlardan %0 komisyon alınır.",
      },
    ],
  };

  const content: Record<string, IndustryPageProps> = {
    de: dataDe,
    en: dataEn,
    tr: dataTr,
  };
  const currentData = content[language] || dataDe;

  return (
    <>
      <SEO
        title={
          language === "en"
            ? "Web Design & Automation for Restaurants & Cafes | PS Professional Solutions"
            : language === "tr"
              ? "Restoran & Kafe Web Tasarım & Rezervasyon Otomasyonu | PS Professional Solutions"
              : "Webdesign & Automatisierung für Gastronomie & Restaurants | PS Professional Solutions"
        }
        description={
          language === "en"
            ? "Custom restaurant websites, QR code digital menus, 24/7 table booking automation, and zero-commission ordering for dining businesses."
            : language === "tr"
              ? "Restoranlar ve kafeler için özel web siteleri, QR menü, otomatik masa rezervasyonu ve komisyonsuz sipariş altyapısı."
              : "Maßgeschneiderte Webseiten für Gastronomie, Restaurants & Cafés. QR-Code Speisekarten, 24/7 Tischreservierung, Google-Bewertungen und provisionsfreie Vorbestellung."
        }
        keywords="Gastronomie Webdesign, Restaurant Website erstellen lassen, Tischreservierung online, QR Speisekarte, Öz Urfa, AM Hähnchenbuderei, Café Sis, Restaurant Marketing"
        canonical="https://ps-professional-solutions.de/gastronomie"
      />
      <IndustryPage data={currentData} />
    </>
  );
}
