import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function SchneidereiPage() {
  const { language } = useLanguage();

  const schneidereiLogos = [
    "/media/vibe.filesafe.space/1778931020193405557/attachments/e11423c1-e8bd-44f9-bee0-46c49c534364.jpg", // Änderungsatelier Eving
    "/media/vibe.filesafe.space/1778931020193405557/attachments/d6ff2edc-916e-4727-a8ff-cab993f944ee.jpg", // Münster Nähstube Änderungsschneiderei
  ];

  const dataDe: IndustryPageProps = {
    customPartnerLogos: schneidereiLogos,
    customPartnerTitle:
      "Erfolgreiche Partner: Änderungsatelier Eving & Münster Nähstube Änderungsschneiderei",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Volle Auftragsbücher, treue Stammkunden – Webdesign für Änderungsschneidereien & Ateliers.",
      subtitle:
        "Maßgeschneiderte Webseiten mit WhatsApp-Foto-Preisanfrage, automatischem Abholbereit-Status, Google-Top-Rankings und digitaler Preisliste für Änderungsschneidereien.",
      buttonText: "Schneiderei-Webseite anfragen",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Kunden rufen ständig an: 'Ist meine Hose schon fertig?' Kostbare Nähzeit geht am Telefon verloren.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Preisauskünfte ohne Fotos? Kunden fragen nach Preisen, können den Aufwand aber nicht beschreiben.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying_glass_tilted_left/3D/magnifying_glass_tilted_left_3d.png",
        title:
          "Bei Google unsichtbar? Neukunden finden die Konkurrenz zuerst, wenn sie nach 'Änderungsschneiderei in der Nähe' suchen.",
      },
    ],
    leadMagnet: {
      title:
        "Schneiderei-Umsatz-Guide: 40% mehr Aufträge mit digitalem Abhol-Service.",
      description:
        "Erfahren Sie, wie moderne Änderungsateliers durch WhatsApp-Foto-Anfragen und Google-Local-SEO jeden Monat Dutzende neue Stammkunden gewinnen.",
      buttonText: "Gratis Schneiderei-Guide sichern",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Preisanfrage per WhatsApp mit Foto – in unter 60 Sekunden.",
      description:
        "Kunden fotografieren das Kleidungsstück (z.B. Brautkleid, Reißverschluss, Anzug kürzen) und schicken es direkt per WhatsApp. Sie nennen mit einem Klick den Richtpreis und sichern sich den Auftrag.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Automatische 'Abholbereit'-Nachricht per WhatsApp.",
      description:
        "Sobald die Änderung fertig ist, genügt ein Klick: Der Kunde erhält eine freundliche Nachricht mit Öffnungszeiten und Betrag. Keine Anrufe, keine Wartezeiten an der Theke.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Die digitale Lösung für moderne Änderungsschneidereien.",
      subtitle:
        "Von der transparenten Preisliste bis zum automatischen 5-Sterne-Bewertungsbooster.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Digitale Preisübersicht für Änderungen",
          description:
            "(Kürzen, Engerstellen, Reißverschlüsse, Brautmoden-Anpassung)",
        },
        {
          title: "WhatsApp Foto-Preisanfrage",
          description:
            "(Kunden senden Kleidungs-Fotos direkt zur Vorab-Einschätzung)",
        },
        {
          title: "Lokales Google-Maps SEO",
          description:
            "(Platz 1 bei Suchen wie 'Änderungsschneiderei [Stadt]')",
        },
        {
          title: "NFC Google-Bewertungskarten für die Theke",
          description:
            "(Zufriedene Kunden bewerten mit einem Smartphone-Tap bei der Abholung)",
        },
      ],
    },
    testimonials: [
      {
        title: "Änderungsatelier Eving",
        description:
          "Ergebnis: Deutlich mehr Brautkleid- und Anzugsanpassungen durch gezielte regionale Sichtbarkeit und schnelle Vorab-Einschätzung per WhatsApp.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/e11423c1-e8bd-44f9-bee0-46c49c534364.jpg",
      },
      {
        title: "Münster Nähstube Änderungsschneiderei",
        description:
          "Ergebnis: Hunderte neue Stammkunden über Google Maps und spürbare Zeitersparnis bei telefonischen Status-Nachfragen.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/d6ff2edc-916e-4727-a8ff-cab993f944ee.jpg",
      },
    ],
    faqs: [
      {
        question:
          "Wie können Kunden Fotos ihrer Kleidung für eine Preisanfrage senden?",
        answer:
          "Direkt über unsere WhatsApp-Schnittstelle. Mit einem Klick auf Ihrer Webseite öffnet sich WhatsApp mit vorformuliertem Text – der Kunde hängt einfach ein Foto an.",
      },
      {
        question: "Kann eine transparente Preisliste online gestellt werden?",
        answer:
          "Ja! Eine strukturierte Preisübersicht (z.B. Hose kürzen, Sakko anpassen, Reißverschluss erneuern) schafft Vertrauen und filtert unseriöse Anfragen vorab.",
      },
      {
        question: "Werden wir bei Google vor anderen Schneidereien gelistet?",
        answer:
          "Mit unserem lokalen Google-SEO und Google Business Profil-Optimierung optimieren wir Ihren Betrieb gezielt auf Top-Platzierungen bei Suchbegriffen wie 'Änderungsschneiderei [Stadt]'.",
      },
      {
        question: "Wie lange dauert die Erstellung der Webseite?",
        answer:
          "In der Regel ist Ihre maßgeschneiderte Schneiderei-Webseite innerhalb von 5 bis 7 Werktagen voll funktionsfähig und online.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: schneidereiLogos,
    customPartnerTitle:
      "Featured Tailoring Partners: Änderungsatelier Eving & Münster Nähstube",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Full Order Books, Loyal Clients – Websites for Tailors & Alteration Shops.",
      subtitle:
        "Custom websites with WhatsApp photo quote requests, automated pickup-ready notifications, and top local Google rankings.",
      buttonText: "Request Tailoring Website",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Endless phone calls asking 'Is my dress ready?' Sewing time gets lost.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Price inquiries without photos: clients can't explain the needed adjustment.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying_glass_tilted_left/3D/magnifying_glass_tilted_left_3d.png",
        title:
          "Invisible on Google? New customers find competitors nearby first.",
      },
    ],
    leadMagnet: {
      title:
        "Tailor Growth Guide: 40% more orders with digital pickup notifications.",
      description:
        "Discover how modern alteration shops win loyal customers each month with WhatsApp funnels and local SEO.",
      buttonText: "Get Free Tailoring Guide",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Quote requests via WhatsApp with photo – under 60 seconds.",
      description:
        "Clients take a photo of the garment and send it directly via WhatsApp for quick pricing.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Automated 'Ready for Pickup' WhatsApp notifications.",
      description:
        "One tap notifies the customer that their garment is finished and ready for pickup.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "The complete digital solution for modern alteration shops.",
      subtitle: "From clear pricing to automatic 5-star Google reviews.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Digital Pricing Overview",
          description:
            "(Hemming, tapering, zippers, wedding dress alterations)",
        },
        {
          title: "WhatsApp Photo Quote Inquiries",
          description: "(Customers send garment photos for instant estimates)",
        },
        {
          title: "Local Google Maps SEO",
          description: "(Rank #1 for 'alterations near me' in your city)",
        },
        {
          title: "Counter NFC Review Cards",
          description:
            "(Happy clients leave 5-star reviews with one smartphone tap)",
        },
      ],
    },
    testimonials: [
      {
        title: "Änderungsatelier Eving",
        description:
          "Significant increase in wedding dress and suit adjustments via fast WhatsApp quotes.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/e11423c1-e8bd-44f9-bee0-46c49c534364.jpg",
      },
    ],
    faqs: [
      {
        question: "Can customers send photos for a preliminary price estimate?",
        answer: "Yes, directly via WhatsApp with an automated message format.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: schneidereiLogos,
    customPartnerTitle:
      "Öne Çıkan Terzi Ortakları: Änderungsatelier Eving & Münster Nähstube",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Dolu Siparişler, Sadık Müşteriler – Terziler & Tadilat Atölyeleri için Web Tasarım.",
      subtitle:
        "WhatsApp fotoğraflı fiyat talebi, otomatik hazır bildirimleri ve yerel Google üst sıraları ile terziler için profesyonel web siteleri.",
      buttonText: "Terzi Web Sitesi Talep Et",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Sürekli 'Pantolonum bitti mi?' telefonları dikiş vaktinizi mi çalıyor?",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cross_mark/3D/cross_mark_3d.png",
        title:
          "Fotoğrafsız fiyat sorulması: Müşteri yapılacak işi tarif edemiyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying_glass_tilted_left/3D/magnifying_glass_tilted_left_3d.png",
        title:
          "Google'da görünmüyor musunuz? Müşteriler yakındaki rakipleri buluyor.",
      },
    ],
    leadMagnet: {
      title:
        "Terzi Büyüme Rehberi: Dijital teslimat bildirimi ile %40 daha fazla sipariş.",
      description:
        "Modern terzilerin WhatsApp ve yerel SEO ile nasıl büyüdüğünü keşfedin.",
      buttonText: "Ücretsiz Terzi Rehberini İndir",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "WhatsApp ile fotoğraflı fiyat teklifi – 60 saniyede.",
      description:
        "Müşteriler kıyafetin fotoğrafını çekip doğrudan WhatsApp'tan gönderir.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "WhatsApp ile otomatik 'Teslim Almaya Hazır' mesajı.",
      description: "Tadilat bittiğinde tek tıkla müşteriye hazır mesajı gider.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Modern tadilat terzileri için eksiksiz dijital altyapı.",
      subtitle: "Şeffaf fiyat listesinden Google 5 yıldızlı yorumlara kadar.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Dijital Tadilat Fiyat Listesi",
          description: "(Paça, daraltma, fermuar ve gelinlik tadilatı)",
        },
        {
          title: "WhatsApp Fotoğraflı Fiyat Talebi",
          description: "(Kıyafet fotoğrafı ile hızlı ön fiyatlandırma)",
        },
        {
          title: "Yerel Google Harita SEO",
          description: "('Bana en yakın terzi' aramalarında 1. sıra)",
        },
        {
          title: "NFC Google Yorum Kartları",
          description: "(Teslimatta tek dokunuşla 5 yıldız yorum)",
        },
      ],
    },
    testimonials: [
      {
        title: "Änderungsatelier Eving",
        description:
          "WhatsApp üzerinden fotoğraflı fiyat teklifleriyle gelinlik ve takım elbise tadilatlarında artış.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/e11423c1-e8bd-44f9-bee0-46c49c534364.jpg",
      },
    ],
    faqs: [
      {
        question: "Müşteriler fotoğrafla ön fiyat alabilir mi?",
        answer: "Evet, doğrudan WhatsApp üzerinden fotoğraflı talep iletilir.",
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
            ? "Web Design for Alteration Shops & Tailors | PS Professional Solutions"
            : language === "tr"
              ? "Terziler & Tadilat Atölyeleri Web Tasarım | PS Professional Solutions"
              : "Webdesign für Änderungsschneidereien & Ateliers | PS Professional Solutions"
        }
        description={
          language === "en"
            ? "Modern websites for tailor shops, alteration studios and sewing services. WhatsApp photo quote requests, automated pickup reminders, and local SEO."
            : language === "tr"
              ? "Tadilat terzileri ve dikiş atölyeleri için profesyonel web tasarımı. WhatsApp fotoğraflı fiyat teklifi ve yerel SEO."
              : "Maßgeschneiderte Webseiten für Änderungsschneidereien & Ateliers. Foto-Preisanfrage per WhatsApp, automatische Abholbereit-Benachrichtigung und Platz 1 bei Google."
        }
        keywords="Änderungsschneiderei Webdesign, Schneider Website erstellen lassen, Änderungsatelier Eving, Münster Nähstube, Schneiderei Marketing, Hose kürzen Preis online"
        canonical="https://ps-professional-solutions.de/schneiderei"
      />
      <IndustryPage data={currentData} />
    </>
  );
}
