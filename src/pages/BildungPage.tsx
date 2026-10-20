import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function BildungPage() {
  const { language } = useLanguage();

  const bildungLogos = [
    "/media/vibe.filesafe.space/1778931020193405557/attachments/4f435173-f042-494b-b3d6-35817d23a103.png", // S&D Nachhilfe Zentrum
    "/media/vibe.filesafe.space/1778931020193405557/attachments/d6882ce2-4b5e-46f6-b8d9-80581a6e4199.png", // KS Dill Sprachschule / Institut
  ];

  const dataDe: IndustryPageProps = {
    customPartnerLogos: bildungLogos,
    customPartnerTitle:
      "Erfolgreiche Partner im Bildungs- & Nachhilfebereich: S&D Nachhilfe Zentrum & KS Dill",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Volle Kurse, planbare Anmeldungen – Webdesign & Automatisierung für Bildung & Nachhilfe.",
      subtitle:
        "Smarte Beratungs-Funnels für Eltern, automatisierte Probestunden-Buchung, WhatsApp-Eltern-Support und digitale Kursverwaltung. Wir bringen qualifizierte Schüleranfragen auf Autopilot.",
      buttonText: "Bildungs-Plattform anfragen",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Eltern rufen mitten im Unterricht an? Lehrkräfte und Institutsleitung werden ständig unterbrochen.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Probestunden werden vergessen? Ohne automatisierte Terminerinnerungen erscheinen bis zu 40% der Neukunden nicht.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Page_facing_up/3D/page_facing_up_3d.png",
        title:
          "Papier-Anmeldeformulare & Datenchaos? Stundenlange manuelle Nacharbeit bei jeder Schüleranmeldung.",
      },
    ],
    leadMagnet: {
      title:
        "Leitfaden für Bildungsinstitute: 50% mehr Anmeldungen für Nachhilfe & Kurse.",
      description:
        "Erfahren Sie, wie moderne Nachhilfezentren und Sprachschulen durch automatisierte Eltern-Funnels und WhatsApp-Probestunden-Reminder planbar wachsen.",
      buttonText: "Gratis Bildungs-Leitfaden downloaden",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Kostenlose Probestunde online buchen – in unter 60 Sekunden.",
      description:
        "Eltern wählen Fach, Klassenstufe und Wunschtermin direkt online. Unser System bestätigt sofort und erinnert Eltern 24h vorher per WhatsApp – für eine 95%+ Erscheinungsquote.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Zentraler WhatsApp-Kanal für Eltern-Fragen & Kurs-Infos.",
      description:
        "Kein E-Mail-Stau mehr: Häufige Elternfragen zu Ferienkursen, Tarifen und Stundenplänen beantwortet Ihr KI-Assistent rund um die Uhr sofort und sympathisch.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Die digitale All-in-One Plattform für Schulen & Nachhilfe.",
      subtitle:
        "Vom ersten Webseiten-Besuch der Eltern bis zur festen Kursanmeldung.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Automatisierter Probestunden-Kalender",
          description:
            "(Eltern buchen freie Slots ohne Hin- und Her-Telefonieren)",
        },
        {
          title: "WhatsApp Eltern-Kommunikation",
          description:
            "(Erinnerungen, Stundenplan-Updates und Notenfeedback per Chat)",
        },
        {
          title: "Digitales Anmeldeformular mit Signatur",
          description:
            "(Verträge rechtssicher online in 2 Minuten abschließen)",
        },
        {
          title: "Google-Ranking für lokale Nachhilfe",
          description:
            "(Platz 1 bei Suchen wie 'Nachhilfe Mathe [Stadt]' oder 'Sprachkurs')",
        },
      ],
    },
    testimonials: [
      {
        title: "S&D Nachhilfe Zentrum",
        description:
          "Ergebnis: Deutlicher Anstieg qualifizierter Probestunden-Buchungen durch mobilen Beratungs-Funnel und automatisierte WhatsApp-Erinnerungen.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/4f435173-f042-494b-b3d6-35817d23a103.png",
      },
      {
        title: "KS Dill Bildungs- & Sprachinstitut",
        description:
          "Ergebnis: Schnelle Online-Einstufungstests und direkte Kursanmeldungen für Sprachschüler ohne Medienbrüche.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/d6882ce2-4b5e-46f6-b8d9-80581a6e4199.png",
      },
    ],
    faqs: [
      {
        question: "Wie läuft die Probestunden-Buchung für Eltern ab?",
        answer:
          "Eltern wählen Fach, Schuljahr und ihren Wunschtermin auf Ihrer Webseite aus. Die Daten landen direkt in Ihrem Dashboard und die Eltern erhalten eine automatische Bestätigung inklusive Terminerinnerung per WhatsApp und SMS.",
      },
      {
        question: "Können Verträge digital unterzeichnet werden?",
        answer:
          "Ja. Nach der Probestunde können Eltern den Nachhilfevertrag direkt am Smartphone oder Tablet rechtssicher digital unterzeichnen. Keine Zettelwirtschaft, keine Scans.",
      },
      {
        question: "Werden sensible Schülerdaten DSGVO-konform verarbeitet?",
        answer:
          "Selbstverständlich. Alle Formulare, Server und Kommunikationswege entsprechen zu 100% den strengen deutschen Datenschutzrichtlinien (DSGVO).",
      },
      {
        question: "Können mehrere Standorte und Lehrkräfte verwaltet werden?",
        answer:
          "Ja, unser System skaliert problemlos über mehrere Filialen, Räume und Nachhilfelehrer hinweg – inklusive individueller Verfügbarkeitspläne.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: bildungLogos,
    customPartnerTitle:
      "Featured Education & Tutoring Partners: S&D Nachhilfe Zentrum & KS Dill",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Full Classes, Predictable Enrollments – Web Design & Automation for Education & Tutoring.",
      subtitle:
        "Smart enrollment funnels for parents, automated trial lesson booking, WhatsApp parent support, and digital student onboarding.",
      buttonText: "Request Education Platform",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title:
          "Parents calling during class? Constant interruptions distract tutors.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Trial lessons forgotten? No-show rates hit up to 40% without automatic reminders.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Page_facing_up/3D/page_facing_up_3d.png",
        title:
          "Paper enrollment forms and lost data? Hours of administrative overhead.",
      },
    ],
    leadMagnet: {
      title:
        "Education Growth Guide: 50% more course enrollments on autopilot.",
      description:
        "Learn how tutoring institutes scale with smart parent funnels and WhatsApp booking reminders.",
      buttonText: "Download Free Education Guide",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Trial lessons booked in under 60 seconds.",
      description:
        "Parents select subject, grade, and date online. Automated reminders ensure a 95%+ attendance rate.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Dedicated WhatsApp channel for parent inquiries.",
      description:
        "Instant answers to common questions about schedules, fees, and holiday programs 24/7.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "The complete digital setup for tutoring centers & schools.",
      subtitle:
        "From initial parent consultation to automated digital contract signing.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Automated Trial Lesson Calendar",
          description: "(Parents book available slots without phone tag)",
        },
        {
          title: "WhatsApp Parent Communications",
          description: "(Reminders, schedule updates, and student feedback)",
        },
        {
          title: "Digital Enrollment with E-Signature",
          description: "(Compliant digital sign-up completed in minutes)",
        },
        {
          title: "Local Education SEO",
          description: "(Rank #1 for local searches like 'tutoring near me')",
        },
      ],
    },
    testimonials: [
      {
        title: "S&D Nachhilfe Zentrum",
        description:
          "Massive rise in qualified trial lesson bookings through automated WhatsApp reminders.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/4f435173-f042-494b-b3d6-35817d23a103.png",
      },
    ],
    faqs: [
      {
        question: "Can parents sign tutoring contracts digitally?",
        answer:
          "Yes, legal digital signatures on mobile devices eliminate all paper hassle.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: bildungLogos,
    customPartnerTitle:
      "Öne Çıkan Eğitim & Dershane Ortakları: S&D Nachhilfe Zentrum & KS Dill",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Dolu Sınıflar, Düzenli Kayıtlar – Eğitim & Kurslar için Web Tasarım ve Otomasyon.",
      subtitle:
        "Veliler için akıllı kayıt funnelleri, otomatik deneme dersi randevusu, WhatsApp veli desteği ve dijital kurs yönetimi.",
      buttonText: "Eğitim Platformu Talep Et",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
        title: "Ders sırasında çalan veli telefonları öğretmenleri bölüyor mu?",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Unutulan deneme dersleri %40'a varan katılım kaybına neden olur.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Page_facing_up/3D/page_facing_up_3d.png",
        title:
          "Kağıt formlar ve manuel kayıtlar saatlerce idari iş yükü yaratır.",
      },
    ],
    leadMagnet: {
      title: "Eğitim Merkezleri Büyüme Rehberi: %50 daha fazla öğrenci kaydı.",
      description:
        "Modern etüt merkezlerinin WhatsApp deneme dersi hatırlatıcılarıyla nasıl büyüdüğünü keşfedin.",
      buttonText: "Ücretsiz Eğitim Rehberini İndir",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "60 saniyede online ücretsiz deneme dersi rezervasyonu.",
      description:
        "Veliler ders ve saati online seçer. Otomatik hatırlatıcılar %95+ katılım sağlar.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
    },
    benefits: {
      title: "Veli soruları ve ders bilgileri için 7/24 WhatsApp kanalı.",
      description:
        "E-posta kuyruklarına son: Tatil kursları ve program sorularını anında yanıtlayın.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
    },
    checkmarksSection: {
      title: "Eğitim ve kurs merkezleri için eksiksiz dijital platform.",
      subtitle: "İlk veli temasından dijital sözleşme imzasına kadar.",
      image:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
      list: [
        {
          title: "Otomatik Deneme Dersi Takvimi",
          description: "(Veliler telefon trafiği olmadan uygun saati seçer)",
        },
        {
          title: "WhatsApp Veli İletişimi",
          description: "(Hatırlatıcılar ve ders bilgilendirmeleri)",
        },
        {
          title: "Dijital Sözleşme & İmza",
          description: "(Akıllı telefonda dakikalar içinde yasal kayıt)",
        },
        {
          title: "Yerel Eğitim SEO",
          description: "(Bölgesel kurs aramalarında Google'da üst sıralar)",
        },
      ],
    },
    testimonials: [
      {
        title: "S&D Nachhilfe Zentrum",
        description:
          "Otomatik veli hatırlatıcıları ile deneme dersi katılımlarında rekor artış.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/attachments/4f435173-f042-494b-b3d6-35817d23a103.png",
      },
    ],
    faqs: [
      {
        question: "Kayıt sözleşmeleri dijital imzalanabilir mi?",
        answer:
          "Evet, veliler sözleşmeleri doğrudan akıllı telefonlarından yasal geçerli imzalayabilir.",
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
            ? "Web Design & Automation for Tutoring Centers & Schools | S&D Nachhilfe"
            : language === "tr"
              ? "Etüt Merkezleri & Kurslar için Web Tasarım & Kayıt Otomasyonu | S&D Nachhilfe"
              : "Webdesign & Automatisierung für Nachhilfe & Bildungsinstitute | S&D Nachhilfe"
        }
        description={
          language === "en"
            ? "Specialized websites and student enrollment funnels for tutoring centers, language schools, and educational institutes. Automated trial lessons and WhatsApp support."
            : language === "tr"
              ? "Dershaneler, etüt merkezleri ve dil okulları için özel web siteleri ve otomatik deneme dersi rezervasyon sistemleri."
              : "Spezialisierte Webseiten und Schüler-Anmeldefunnels für Nachhilfeinstitute, Sprachschulen und Bildungszentren. Automatisierte Probestunden und WhatsApp-Elternsupport."
        }
        keywords="Nachhilfe Website erstellen, Nachhilfeinstitut Webdesign, Sprachschule Homepage, S&D Nachhilfe Zentrum, KS Dill, Online Probestunde buchen, Schülergewinnung Bildung"
        canonical="https://ps-professional-solutions.de/bildung"
      />
      <IndustryPage data={currentData} />
    </>
  );
}
