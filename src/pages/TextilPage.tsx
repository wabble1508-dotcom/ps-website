import { SEO } from "@/components/SEO";
import { ExternalEmbed } from "@/components/ExternalEmbed";
import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { useLanguage } from "@/components/LanguageContext";

export default function TextilPage() {
  const { language } = useLanguage();

  const textilLogo =
    "/media/vibe.filesafe.space/1778931020193405557/attachments/26ab2136-d794-47ac-bc6d-879c27dc36e8.png";

  const dataDe: IndustryPageProps = {
    customPartnerLogos: [textilLogo],
    customPartnerTitle: "Referenz im Textil- & Veredelungsbereich",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Von der Stofffaser zum Bestseller – Online-Shops & B2B-Plattformen für Textil & Mode.",
      subtitle:
        "Schnelle E-Commerce-Stores, automatisierte Größenberater, Konfiguratoren für Stick & Druck und WhatsApp-Support. Machen Sie Ihre Textilkollektion oder Druckerei zur digitalen Umsatz-Maschine.",
      buttonText: "Textil-Shop unverbindlich anfragen",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/T-shirt/3D/t-shirt_3d.png",
        title:
          "Hohe Retourenquoten? Falsche Größen und unklare Passform-Angaben fressen den Gewinn auf.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Endlose E-Mail-Schleifen bei B2B-Stick- und Druckanfragen? Farbwerte und Vektordateien fehlen ständig.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Package/3D/package_3d.png",
        title:
          "Veraltete Shopsysteme? Langsame Ladezeiten auf dem Smartphone vertreiben kaufbereite Mode-Käufer.",
      },
    ],
    leadMagnet: {
      title:
        "Textil-E-Commerce Leitfaden: Retouren um 35% senken, Warenkorbwert verdoppeln.",
      description:
        "Erfahren Sie, wie erfolgreiche Textilmarken durch smarte KI-Größenfinder, B2B-Muster-Funnels und WhatsApp-Styling-Chats ihren Gewinn maximieren.",
      buttonText: "Kostenlosen Mode-Leitfaden laden",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Vom Stoffentwurf zum vollautomatisierten B2C- und B2B-Verkauf.",
      description:
        "Wir vereinen atemberaubendes Lookbook-Design mit modernster Shop-Technologie. Ob Einzelstück-Kauf per Apple Pay oder Großbestellung mit Firmenlogo-Upload im Veredelungskonfigurator.",
      image: textilLogo,
    },
    benefits: {
      title: "Höhere Warenkörbe, weniger Rücksendungen.",
      description:
        "Integrierte KI-Größenempfehlungen, Cross-Selling-Vorschläge ('Complete the Look') und ein WhatsApp-Supportkanal für individuelle Stoff- & Veredelungsfragen sichern maximale Kundenzufriedenheit.",
      image: textilLogo,
    },
    checkmarksSection: {
      title: "Maßgeschneiderte Funktionen für Mode, Merch & Textilveredelung.",
      subtitle:
        "Optimiert für visuelle Ästhetik und maximale Conversion-Raten.",
      image: textilLogo,
      list: [
        {
          title: "Interaktiver Textildruck- & Stick-Konfigurator",
          description:
            "(Logo hochladen, Position wählen, Mengenrabatt sofort berechnen)",
        },
        {
          title: "KI-Größenberater & Passform-Assistent",
          description:
            "(Senkt Textil-Retouren messbar um durchschnittlich 30-40%)",
        },
        {
          title: "B2B-Großkundenportal mit Staffelpreisen",
          description:
            "(Geschützter Login für Händler, Vereine und Firmenkunden)",
        },
        {
          title: "Nahtlose Anbindung an ERP, Lager & Versand",
          description:
            "(Automatischer Etikettendruck und Tracking-SMS an Käufer)",
        },
      ],
    },
    testimonials: [
      {
        title: "Textilveredelung & Corporate Wear Manufaktur",
        description:
          "Ergebnis: B2B-Anfragen für Arbeitskleidung werden über den neuen Konfigurator zu 70% schneller abgeschlossen – ohne Rückfragen zu Druckdaten.",
        image: textilLogo,
      },
      {
        title: "Streetwear & Merch Label",
        description:
          "Ergebnis: Drop-Verkäufe in Minuten ausverkauft bei absoluter Shop-Stabilität und 40% mehr Warenkorbwert durch Bundle-Empfehlungen.",
        image: textilLogo,
      },
    ],
    faqs: [
      {
        question: "Unterstützt das System B2B-Staffelpreise und Logo-Uploads?",
        answer:
          "Ja! Geschäftskunden können ihre Druckdaten (PDF, AI, EPS) direkt beim Bestellen hochladen, Freigaben digital erteilen und erhalten automatische Staffelpreise nach Stückzahl.",
      },
      {
        question: "Wie wird die Retourenquote effektiv gesenkt?",
        answer:
          "Durch interaktive Größentabellen, Vorher-Nachher-Modelmaße und smarte KI-Assistenten, die anhand von Körpergröße und Gewicht die ideale Passform empfehlen.",
      },
      {
        question:
          "Kann der Shop mit Shopify, WooCommerce oder GHL verknüpft werden?",
        answer:
          "Ja. Wir integrieren alle gängigen E-Commerce-Engines oder bauen hochperformante Headless-Shops mit direkter CRM- und ERP-Synchronisation.",
      },
      {
        question: "Gibt es Schnittstellen zu Stick- und Siebdruckmaschinen?",
        answer:
          "Ja, Bestellungen können mit vorbereiteten Produktionsdateien und Auftragszetteln direkt an die Fertigung übermittelt werden.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: [textilLogo],
    customPartnerTitle: "Featured Partner: Textile & Fashion",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "From raw fabric to bestseller – Online stores & B2B platforms for fashion & textile.",
      subtitle:
        "Fast mobile shopping, smart sizing assistants, embroidery configurators and WhatsApp styling chats.",
      buttonText: "Request Textile Store",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/T-shirt/3D/t-shirt_3d.png",
        title:
          "High return rates? Unclear sizing and fit details destroy e-commerce profit margins.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Chaotic B2B embroidery inquiries? Missing vector logos cause endless back-and-forth emails.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Package/3D/package_3d.png",
        title:
          "Slow mobile store? Mobile shoppers leave before checkout if pages take more than 2 seconds.",
      },
    ],
    leadMagnet: {
      title:
        "Textile E-Commerce Blueprint: Cut Returns by 35%, Double Cart Size.",
      description:
        "Discover how top apparel brands leverage AI fit recommendations and B2B volume pricing to grow faster.",
      buttonText: "Get Free Fashion Blueprint",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "From design collection to automated wholesale and retail sales.",
      description:
        "We blend high-end editorial lookbook design with lightning-fast cloud checkout and direct warehouse fulfillment.",
      image: textilLogo,
    },
    benefits: {
      title: "Bigger orders, fewer returns.",
      description:
        "Smart cross-sell bundles, interactive size finders, and WhatsApp VIP styling advice keep buyers delighted.",
      image: textilLogo,
    },
    checkmarksSection: {
      title:
        "Built specifically for apparel brands, merch and embroidery shops.",
      subtitle:
        "Optimized for conversion speed, stunning visuals and repeat customer loyalty.",
      image: textilLogo,
      list: [
        {
          title: "Custom print & embroidery configurator",
          description: "(Instant price tiers and high-res vector logo uploads)",
        },
        {
          title: "AI size recommendation tool",
          description: "(Measurably cuts return rates by 30-40%)",
        },
        {
          title: "Wholesale B2B member portal",
          description:
            "(Tiered volume discounts for clubs, schools and enterprises)",
        },
        {
          title: "Seamless ERP & courier integration",
          description: "(Automated shipping labels and instant tracking SMS)",
        },
      ],
    },
    testimonials: [
      {
        title: "Corporate Apparel & Embroidery Studio",
        description:
          "70% faster inquiry-to-order completion with zero back-and-forth about vector resolution.",
        image: textilLogo,
      },
    ],
    faqs: [
      {
        question:
          "Can business clients order bulk quantities with tier pricing?",
        answer:
          "Yes, automated tiered discounts kick in based on order volume.",
      },
      {
        question: "Does this connect to existing inventory systems?",
        answer:
          "Yes, we build bi-directional sync with leading ERP and warehouse platforms.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: [textilLogo],
    customPartnerTitle: "Öne Çıkan Ortak: Tekstil & Moda",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Ham kumaştan bestseller'a – Moda & tekstil için online mağazalar & B2B platformları.",
      subtitle:
        "Hızlı mobil alışveriş, akıllı beden asistanları, nakış konfigüratörleri ve WhatsApp stil sohbetleri.",
      buttonText: "Tekstil Mağazası Talep Et",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/T-shirt/3D/t-shirt_3d.png",
        title:
          "Yüksek iade oranları mı? Belirsiz beden ve uyum detayları e-ticaret kâr marjlarını yok ediyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
        title:
          "Kaotik B2B nakış talepleri mi? Eksik vektör logolar sonsuz e-posta trafiğine neden oluyor.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Package/3D/package_3d.png",
        title:
          "Yavaş mobil mağaza mı? Mobil alıcılar sayfa 2 saniyeden uzun sürerse ödemeden önce ayrılıyor.",
      },
    ],
    leadMagnet: {
      title:
        "Tekstil E-Ticaret Planı: İadeleri %35 Azaltın, Sepet Tutarını İkiye Katlayın.",
      description:
        "En iyi moda markalarının yapay zeka uyum önerileri ve B2B hacim fiyatlandırması ile nasıl daha hızlı büyüdüğünü keşfedin.",
      buttonText: "Ücretsiz Moda Planını Al",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Tasarım koleksiyonundan otomatik toptan ve perakende satışa.",
      description:
        "Yüksek kaliteli editöryel lookbook tasarımını yıldırım hızında bulut ödemesi ve doğrudan depo sevkiyatı ile birleştiriyoruz.",
      image: textilLogo,
    },
    benefits: {
      title: "Daha büyük siparişler, daha az iade.",
      description:
        "Akıllı çapraz satış paketleri, interaktif beden bulucular ve WhatsApp VIP stil danışmanlığı alıcıları memnun tutar.",
      image: textilLogo,
    },
    checkmarksSection: {
      title:
        "Moda markaları, merch ve nakış atölyeleri için özel olarak inşa edildi.",
      subtitle:
        "Dönüşüm hızı, etkileyici görseller ve tekrar eden müşteri sadakati için optimize.",
      image: textilLogo,
      list: [
        {
          title: "Özel baskı & nakış konfigüratörü",
          description:
            "(Anlık fiyat katmanları ve yüksek çözünürlüklü vektör logo yükleme)",
        },
        {
          title: "Yapay zeka beden önerme aracı",
          description: "(İade oranlarını ölçülebilir şekilde %30-40 azaltır)",
        },
        {
          title: "Toptan B2B üye portalı",
          description:
            "(Kulüpler, okullar ve işletmeler için kademeli hacim indirimleri)",
        },
        {
          title: "Sorunsuz ERP & kurye entegrasyonu",
          description: "(Otomatik kargo etiketleri ve anlık takip SMS)",
        },
      ],
    },
    testimonials: [
      {
        title: "Kurumsal Giyim & Nakış Stüdyosu",
        description:
          "Vektör çözünürlüğü hakkında sıfır geri dönüş ile talepten siparişe tamamlama %70 daha hızlı.",
        image: textilLogo,
      },
    ],
    faqs: [
      {
        question:
          "İş müşterileri kademeli fiyatlandırma ile toplu sipariş verebilir mi?",
        answer:
          "Evet, otomatik kademeli indirimler sipariş hacmine göre devreye girer.",
      },
      {
        question: "Bu mevcut envanter sistemlerine bağlanıyor mu?",
        answer:
          "Evet, önde gelen ERP ve depo platformları ile çift yönlü senkronizasyon kuruyoruz.",
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
            ? "Web Design & E-Commerce for Textile, Fashion & Apparel | PS Professional Solutions"
            : language === "tr"
              ? "Tekstil, Moda & Giyim için Web Tasarım & E-Ticaret | PS Professional Solutions"
              : "Webdesign & E-Commerce für Textil, Mode & Merch-Hersteller | PS Professional Solutions"
        }
        description={
          language === "en"
            ? "High-converting fashion shops, B2B catalogs, embroidery & print configurators, size finders and WhatsApp styling support."
            : language === "tr"
              ? "Yüksek dönüşümlü moda mağazaları, B2B kataloglar, nakış & baskı konfigüratörleri, beden bulucular ve WhatsApp stil desteği."
              : "High-Converting Online-Shops, B2B-Kataloge, 3D-Konfiguratoren für Textildruck & Stickerei, automatisierte Musteranfragen und WhatsApp-Beratung für Modemarken und Textilveredler."
        }
        keywords="Textil Webdesign, Modemarke Online Shop, Textildruck Konfigurator, Merch Shop erstellen, Textilveredelung B2B, Mode Landingpage"
        canonical="https://ps-professional-solutions.de/textil"
      />
      <IndustryPage data={currentData} />

      {/* Cinematic background video section (YouTube QVEFNfRUe90) */}
      <section className="relative overflow-hidden bg-black py-0">
        <div className="absolute inset-0 overflow-hidden">
          <ExternalEmbed src="https://www.youtube-nocookie.com/embed/QVEFNfRUe90?autoplay=1&mute=1&controls=0&loop=1&playlist=QVEFNfRUe90&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1" title="Textil Cinematic Background" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full border-0" background />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/15 text-white backdrop-blur-md mb-4">
            {language === "en"
              ? "Cinematic Showcase"
              : language === "tr"
                ? "Sinematik Vitrin"
                : "Cinematischer Showcase"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            {language === "en"
              ? "Textile Craft in Motion"
              : language === "tr"
                ? "Hareket Halinde Tekstil Zanaatı"
                : "Textilhandwerk in Bewegung"}
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
            {language === "en"
              ? "Experience how we stage fashion, embroidery and textile finishing with cinematic visuals that turn visitors into customers."
              : language === "tr"
                ? "Moda, nakış ve tekstil işlemesini ziyaretçileri müşteriye dönüştüren sinematik görsellerle nasıl sergilediğimizi deneyimleyin."
                : "Erleben Sie, wie wir Mode, Stickerei und Textilveredelung mit filmreifen Bildern inszenieren, die Besucher zu Kunden machen."}
          </p>
        </div>
      </section>

      {/* Embedded Textil Production Showcase Video Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary mb-3">
            {language === "en"
              ? "Live Production Video"
              : language === "tr"
                ? "Canlı Üretim Videosu"
                : "Live Produktion & Handwerk"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {language === "en"
              ? "High-End Textile & Embroidery Showcase"
              : language === "tr"
                ? "Yüksek Kaliteli Tekstil & Nakış Vitrini"
                : "Textilveredelung, Stickerei & Präzisionsfertigung"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "See how we present fashion and textile craft with cinema-grade visuals and clear call-to-actions that convert visitors into paying clients."
              : language === "tr"
                ? "Moda ve tekstil zanaatını, ziyaretçileri müşteriye dönüştüren sinematik görseller ve net eylemlerle nasıl sunduğumuzu görün."
                : "Sehen Sie, wie wir Modemarken und Textilmanufakturen mit gestochen scharfen Visuals und glasklaren Konversionspfaden inszenieren."}
          </p>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-2xl border border-border bg-black aspect-video group">
            <ExternalEmbed src="https://www.youtube-nocookie.com/embed/QVEFNfRUe90?rel=0&modestbranding=1&playsinline=1" title="Textil & Veredelung Showcase Video" className="w-full h-full border-0 rounded-3xl" allowFullScreen />
          </div>
        </div>
      </section>
    </>
  );
}
