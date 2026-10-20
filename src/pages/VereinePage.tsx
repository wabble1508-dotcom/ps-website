import { SEO } from "@/components/SEO";
import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { useLanguage } from "@/components/LanguageContext";

export default function VereinePage() {
  const { language } = useLanguage();

  const cohedoLogo =
    "/media/vibe.filesafe.space/1778931020193405557/attachments/cbfcce06-b294-4a66-a5c9-ed86dcce69a5.png";

  const dataDe: IndustryPageProps = {
    customPartnerLogos: [cohedoLogo],
    customPartnerTitle: "Referenz-Partner im Vereinswesen: Cohedo",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Ehrenamt entlasten, Mitglieder begeistern – Vereins-Websites & Automatisierung.",
      subtitle:
        "Digitale Mitgliedsanträge per Klick, automatisierte Spenden-Funnels und zeitsparende News-Verteilung. Wir befreien Ihren Vorstand vom Papierkrieg – damit mehr Zeit für die Vereinsgemeinschaft bleibt.",
      buttonText: "Vereins-Digitalisierung starten",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Papier-Mitgliedsanträge & Zettelchaos? Manuelles Abtippen raubt dem Vorstand jede Woche Stunden.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_bag/3D/money_bag_3d.png",
        title:
          "Schleppende Spenden & Beiträge? Veraltete Banküberweisungen bremsen neue Unterstützer aus.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Veraltete Termine & News? Vereinsmitglieder erfahren oft zu spät von Hallenbelegungen oder Events.",
      },
    ],
    leadMagnet: {
      title: "Der Vereins-Digitalisierungs-Fahrplan 2026.",
      description:
        "Kompakter Leitfaden: So stellen Sie Mitgliedsanträge, Spendenquittungen und WhatsApp-Vereinsgruppen in unter 14 Tagen auf Autopilot um. 100% DSGVO-konform.",
      buttonText: "Gratis Vereins-Fahrplan herunterladen",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title:
        "Vom ersten Website-Besuch zur lebenslangen Vereins-Mitgliedschaft.",
      description:
        "Interessierte füllen den Mitgliedsantrag direkt auf dem Smartphone aus – inklusive digitaler Unterschrift und automatischem SEPA-Mandat. Bestätigungs-E-Mails und Willkommens-Pakete werden automatisch generiert.",
      image: cohedoLogo,
    },
    benefits: {
      title: "Transparenz für Förderer, Entlastung für den Vorstand.",
      description:
        "Spendenformulare mit PayPal, Apple Pay und Sofortüberweisung senken die Hemmschwelle. Spendenbescheinigungen werden auf Wunsch direkt nach Zahlungseingang versendet.",
      image: cohedoLogo,
    },
    checkmarksSection: {
      title: "Das Rundum-Sorglos-Paket für moderne Vereine & NGOs.",
      subtitle:
        "DSGVO-sicher, mobil optimiert und kinderleicht vom Vereinsvorstand zu pflegen.",
      image: cohedoLogo,
      list: [
        {
          title: "Digitaler Mitgliedsantrag mit E-Signatur",
          description:
            "(Direkt im Browser unterschreiben, automatische SEPA-Erfassung)",
        },
        {
          title: "Integrierter Spenden-Funnel mit PayPal & Stripe",
          description:
            "(Einmal- und Dauerspenden sekundenschnell per Smartphone)",
        },
        {
          title: "Automatisierter Vereins-Kalender & Belegungsplan",
          description:
            "(Spielpläne, Trainingszeiten & Hallenbelegung immer aktuell)",
        },
        {
          title: "Sicherer interner Mitgliederbereich",
          description:
            "(Protokolle, Dokumente und Downloads nur für autorisierte Mitglieder)",
        },
      ],
    },
    testimonials: [
      {
        title: "Cohedo – Digitale Initiative & Vereinsförderung",
        description:
          "Ergebnis: Vollständige Umstellung auf papierlose Mitgliedsanträge und 60% mehr Spenden über den neuen Online-Spenden-Funnel.",
        image: cohedoLogo,
      },
      {
        title: "Sportverein Ruhrgebiet e.V. (650 Mitglieder)",
        description:
          "Ergebnis: Vorstand spart monatlich ca. 25 Stunden Bürozeit durch automatisierte Anmeldeprozesse und SEPA-Export.",
        image: cohedoLogo,
      },
    ],
    faqs: [
      {
        question:
          "Können ältere Vorstandsmitglieder die Vereinsseite einfach bedienen?",
        answer:
          "Ja! Sie erhalten ein extrem einfaches, übersichtliches Redaktionssystem. Neue Termine, Spielberichte oder Fotos können ohne Programmierkenntnisse in wenigen Minuten veröffentlicht werden.",
      },
      {
        question:
          "Ist die digitale Erfassung von Mitgliedsdaten 100% DSGVO-konform?",
        answer:
          "Absolut. Alle Daten werden verschlüsselt auf deutschen Hochsicherheitsservern verarbeitet. Einwilligungen, Datenschutzerklärungen und SEPA-Mandate sind rechtssicher hinterlegt.",
      },
      {
        question:
          "Wie funktioniert die Anbindung an bestehende Vereinssoftware?",
        answer:
          "Wir bieten standardisierte Schnittstellen und CSV/Excel-Exporte für gängige Vereinsprogramme wie Lexware, ClubDesk, WISO Mein Verein und viele mehr.",
      },
      {
        question: "Welche Kosten entstehen für gemeinnützige Vereine?",
        answer:
          "Wir bieten spezielle, rabattierte Konditionen für gemeinnützige Vereine, Stiftungen und Hilfsorganisationen. Sprechen Sie uns einfach unverbindlich an.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: [cohedoLogo],
    customPartnerTitle: "Featured Association Partner: Cohedo",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Relieve volunteers, inspire members – Club websites & automation.",
      subtitle:
        "Online member registration, automated donation funnels and seamless news updates. Free your leadership team from endless paperwork.",
      buttonText: "Start Club Digitalization",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Paper member forms everywhere? Manual data entry wastes hours every week.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_bag/3D/money_bag_3d.png",
        title:
          "Stagnant donations? Outdated bank transfers stop generous supporters.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Outdated events calendar? Members find out about matches and hall schedules too late.",
      },
    ],
    leadMagnet: {
      title: "The Non-Profit Digitalization Roadmap 2026.",
      description:
        "How associations switch to paperless applications and automated donations in under 14 days. 100% GDPR compliant.",
      buttonText: "Download Free Roadmap",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "From first website visit to active club membership.",
      description:
        "Prospective members sign application forms directly on mobile with e-signature and automated SEPA capture.",
      image: cohedoLogo,
    },
    benefits: {
      title: "Full transparency for sponsors, relief for the board.",
      description:
        "Seamless donation checkouts via PayPal, Apple Pay and credit card increase giving rates by up to 50%.",
      image: cohedoLogo,
    },
    checkmarksSection: {
      title: "The all-inclusive package for sports clubs & NGOs.",
      subtitle: "GDPR-safe, mobile-first and easy for board members to update.",
      image: cohedoLogo,
      list: [
        {
          title: "Digital membership application with e-signature",
          description:
            "(Sign directly in mobile browser, automated SEPA mandate)",
        },
        {
          title: "Integrated donation checkout",
          description:
            "(Single or recurring contributions via Apple Pay & PayPal)",
        },
        {
          title: "Automated match & training calendar",
          description: "(Always up to date without complicated CMS workflows)",
        },
        {
          title: "Secure member portal",
          description: "(Private downloads and minutes for verified members)",
        },
      ],
    },
    testimonials: [
      {
        title: "Cohedo – Non-Profit Digital Initiative",
        description:
          "Switched 100% of memberships to digital signup and increased online donations by 60%.",
        image: cohedoLogo,
      },
    ],
    faqs: [
      {
        question: "Is it easy for non-technical volunteers to maintain?",
        answer:
          "Yes, we build simplified dashboard editors so anyone can post events and updates in minutes.",
      },
      {
        question: "Are member records GDPR compliant?",
        answer:
          "Yes, all data processing complies strictly with European data protection regulations.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: [cohedoLogo],
    customPartnerTitle: "Öne Çıkan Dernek Ortağı: Cohedo",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Gönüllüleri rahatlatın, üyeleri heyecanlandırın – Dernek web siteleri & otomasyon.",
      subtitle:
        "Online üye kaydı, otomatik bağış funnelleri ve sorunsuz haber güncellemeleri. Yönetim ekibinizi sonsuz evrak işinden kurtarın.",
      buttonText: "Dernek Dijitalleşmesini Başlat",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Her yerde kağıt üye formları mı? Manuel veri girişi her hafta saatler kaybettiriyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money_bag/3D/money_bag_3d.png",
        title:
          "Durgun bağışlar mı? Eski banka transferleri cömert destekçileri durduruyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Eski etkinlik takvimi mi? Üyeler maç ve salon programlarını çok geç öğreniyor.",
      },
    ],
    leadMagnet: {
      title: "Sivil Toplum Dijitalleşme Yol Haritası 2026.",
      description:
        "Dernekler başvuruları ve bağışları 14 günden kısa sürede nasıl kağıtsız ve otomatik hale getirir. %100 GDPR uyumlu.",
      buttonText: "Ücretsiz Yol Haritasını İndir",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "İlk web sitesi ziyaretinden aktif dernek üyeliğine.",
      description:
        "Üye adayları başvuru formlarını doğrudan mobilde e-imza ve otomatik SEPA kaydı ile doldurur.",
      image: cohedoLogo,
    },
    benefits: {
      title: "Sponsorlar için tam şeffaflık, yönetim için rahatlama.",
      description:
        "PayPal, Apple Pay ve kredi kartı ile sorunsuz bağış ödemeleri bağış oranlarını %50'ye kadar artırır.",
      image: cohedoLogo,
    },
    checkmarksSection: {
      title: "Spor kulüpleri & STK'lar için her şey dahil paket.",
      subtitle:
        "GDPR güvenli, mobil öncelikli ve yönetim için kolay güncelleme.",
      image: cohedoLogo,
      list: [
        {
          title: "E-imzalı dijital üyelik başvurusu",
          description:
            "(Mobil tarayıcıda doğrudan imzala, otomatik SEPA yetkisi)",
        },
        {
          title: "Entegre bağış ödemesi",
          description:
            "(Apple Pay & PayPal ile tek seferlik veya tekrarlayan katkılar)",
        },
        {
          title: "Otomatik maç & antrenman takvimi",
          description: "(Karmaşık CMS iş akışları olmadan her zaman güncel)",
        },
        {
          title: "Güvenli üye portalı",
          description:
            "(Doğrulanmış üyeler için özel indirmeler ve tutanaklar)",
        },
      ],
    },
    testimonials: [
      {
        title: "Cohedo – Sivil Toplum Dijital İnisiyatifi",
        description:
          "Üyeliklerin %100'ünü dijital kayda geçirdi ve online bağışları %60 artırdı.",
        image: cohedoLogo,
      },
    ],
    faqs: [
      {
        question: "Teknik olmayan gönüllüler için bakımı kolay mı?",
        answer:
          "Evet, herkesin dakikalar içinde etkinlik ve güncelleme yayınlayabileceği basitleştirilmiş kontrol paneli editörleri kuruyoruz.",
      },
      {
        question: "Üye kayıtları GDPR uyumlu mu?",
        answer:
          "Evet, tüm veri işleme Avrupa veri koruma yönetmeliklerine katı bir şekilde uyar.",
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
            ? "Websites & Membership Automation for Clubs & Non-Profits | Cohedo"
            : language === "tr"
              ? "Kulüpler & STK'lar için Web Siteleri & Üyelik Otomasyonu | Cohedo"
              : "Websites & Mitglieder-Automatisierung für Vereine & Verbände | Cohedo"
        }
        description={
          language === "en"
            ? "Modern non-profit websites, digital member registration, donation funnels and automated communication for sports clubs, cultural associations and charities."
            : language === "tr"
              ? "Modern dernek web siteleri, dijital üye kaydı, bağış funnelleri, otomatik ücret yönetimi ve spor kulüpleri, kültür dernekleri ve STK'lar için şeffaf iletişim."
              : "Moderne Vereins-Websites, digitale Mitgliedsanträge, Spenden-Funnels, automatisierte Beitragsverwaltung und transparente Kommunikation für Sportvereine, Kulturvereine und NGOs."
        }
        keywords="Vereinswebsite erstellen, Mitgliederverwaltung digital, Spendenformular Verein, Cohedo, Sportverein Homepage, Verband Digitalisierung"
      />
      <IndustryPage data={currentData} />
    </>
  );
}
