import { SEO } from "@/components/SEO";
import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { useLanguage } from "@/components/LanguageContext";

export default function FestivalsPage() {
  const { language } = useLanguage();

  const sunsetLogo =
    "/media/vibe.filesafe.space/1778931020193405557/attachments/99f38e0d-ce8b-4958-b3c9-7f6452069919.png";

  const dataDe: IndustryPageProps = {
    customPartnerLogos: [sunsetLogo],
    customPartnerTitle: "Erfolgreicher Referenz-Kunde: Sunset Sounds Fest",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Volle Bühnen, ausverkaufte Tickets – Websites & Automatisierung für Festivals.",
      subtitle:
        "Digitale Ticketing-Funnels, interaktive Timetables und 24/7 Fan-Support per WhatsApp. Wir verwandeln Festival-Besucher in treue Stammgäste – ohne Server-Abstürze beim Ticket-Drop.",
      buttonText: "Festival-Plattform anfragen",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ticket/3D/ticket_3d.png",
        title:
          "Ticket-Drops brechen zusammen? Wenn die Server streiken, gehen tausende Euro Umsatz verloren.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Dauerfeuer auf Social Media? Hunderte Fragen zu Anreise, Camping & Line-Up blockieren das Team.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Loudspeaker/3D/loudspeaker_3d.png",
        title:
          "Kurzfristige Änderungen im Timetable? E-Mails liest niemand mehr kurz vor dem Auftritt.",
      },
    ],
    leadMagnet: {
      title:
        "Festival-Marketing Checkliste: In 5 Schritten zum ausverkauften Event.",
      description:
        "Entdecken Sie, wie moderne Festivals durch WhatsApp-VIP-Listen, Early-Bird-Funnels und KI-Support die Ticket-Verkäufe um bis zu 40% steigern. Kostenlos für Veranstalter.",
      buttonText: "Gratis Festival-Leitfaden sichern",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Vom Ankündigungs-Teaser zum ausverkauften Open-Air.",
      description:
        "Unsere High-Performance Festival-Plattformen halten extremen Besucher-Anstürmen stand. Integrierte Ticket-Shops, automatisierte WhatsApp-Erinnerungen für Camping-Infos und Timetable-Push-Nachrichten sorgen für ein unvergessliches Erlebnis vor, während und nach dem Event.",
      image: sunsetLogo,
    },
    benefits: {
      title: "Maximale Ticket-Sales – minimale Support-Kosten.",
      description:
        "Ein 24/7 KI-Chatbot beantwortet 95% aller Besucher-Fragen zu Einlass, Parken, Jugendschutz und Verpflegung sofort. Ihr Orga-Team kann sich voll auf die Künstler und den reibungslosen Ablauf konzentrieren.",
      image: sunsetLogo,
    },
    checkmarksSection: {
      title: "Alles, was ein modernes Festival für volles Haus braucht.",
      subtitle:
        "Skalierbare Cloud-Architektur, virale Vorverkaufs-Tools und automatisierte Gästeführung.",
      image: sunsetLogo,
      list: [
        {
          title: "Crash-resistente Ticket-Drops",
          description:
            "(Hält zehntausenden gleichzeitigen Zugriffen problemlos stand)",
        },
        {
          title: "Interaktiver Timetable & Line-Up Slider",
          description:
            "(Mobile-first für Smartphone-Nutzung direkt auf dem Festivalgelände)",
        },
        {
          title: "WhatsApp Broadcast & Notfall-Push",
          description:
            "(Wichtige Durchsagen & Wetter-Updates sekundenschnell aufs Handy der Fans)",
        },
        {
          title: "Automatisierter FAQ-KI-Chat",
          description:
            "(Beantwortet Einlass-, Camping- und Jugendschutzfragen ohne Personalaufwand)",
        },
      ],
    },
    testimonials: [
      {
        title: "Sunset Sounds Fest – Open-Air Headliner Edition",
        description:
          "Ergebnis: Ticket-Verkaufswellen ohne Server-Lag und über 12.000 generierte WhatsApp-VIP-Leads vor dem offiziellen Line-Up Release.",
        image: sunsetLogo,
      },
      {
        title: "Electronic Beats Open-Air (8.000 Besucher)",
        description:
          "Ergebnis: 85% weniger Support-Anfragen per Mail durch den interaktiven KI-Geländeguide und WhatsApp-Support.",
        image: sunsetLogo,
      },
    ],
    faqs: [
      {
        question:
          "Hält die Festival-Webseite massiven Anstürmen beim Ticket-Drop stand?",
        answer:
          "Ja, absolut. Wir setzen auf hochmoderne, serverless Cloud-Architekturen mit weltweitem CDN-Caching. Selbst wenn zehntausende Fans in der ersten Minute auf die Seite strömen, bleibt die Website blitzschnell und reaktionsfähig.",
      },
      {
        question:
          "Können wir Ticket-Dienstleister wie Eventim, Ticketmaster oder Eventbrite einbinden?",
        answer:
          "Selbstverständlich. Wir binden jeden beliebigen Ticket-Anbieter nahtlos ein – entweder als direktes Widget, Conversion-optimierten Iframe oder über eine API-Schnittstelle.",
      },
      {
        question: "Wie hilft WhatsApp-Marketing bei Festival-Events?",
        answer:
          "WhatsApp erreicht Öffnungsraten von über 90%. Durch exklusive Vorverkaufs-Links für WhatsApp-VIPs verkaufen Festivals ihre ersten Kontingente oft innerhalb weniger Stunden aus.",
      },
      {
        question:
          "Können Timetables während des Festivals kurzfristig aktualisiert werden?",
        answer:
          "Ja! Unser System erlaubt Echtzeit-Änderungen innerhalb von Sekunden – direkt vom Smartphone des Stage-Managers aus. Besucher sehen die aktualisierten Zeiten sofort ohne App-Download.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    customPartnerLogos: [sunsetLogo],
    customPartnerTitle: "Featured Reference: Sunset Sounds Fest",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Packed stages, sold-out tickets – Web design & automation for festivals.",
      subtitle:
        "High-speed ticketing funnels, interactive stage schedules and 24/7 fan WhatsApp support. Turn festival attendees into lifelong community members.",
      buttonText: "Request Festival Platform",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ticket/3D/ticket_3d.png",
        title:
          "Servers crashing during ticket drop? Every second of downtime burns thousands in sales.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Overwhelmed support team? Endless repetitive questions about camping, parking and admission.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Loudspeaker/3D/loudspeaker_3d.png",
        title:
          "Last minute schedule changes? Nobody checks email right before their favorite act performs.",
      },
    ],
    leadMagnet: {
      title: "Festival Marketing Blueprint: 5 Steps to a Sold-Out Event.",
      description:
        "Learn how top music festivals use WhatsApp VIP drops and AI ticket funnels to boost sales by 40%. Free for event organizers.",
      buttonText: "Get Free Festival Blueprint",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "From announcement teaser to a completely sold-out festival.",
      description:
        "High-performance infrastructure built to withstand massive spikes. Integrated ticket stores, automated WhatsApp notifications and instant timetable updates.",
      image: sunsetLogo,
    },
    benefits: {
      title: "Maximum ticket sales – zero support headaches.",
      description:
        "Our 24/7 AI festival concierge answers 95% of guest queries immediately, letting your team focus on artists and on-site production.",
      image: sunsetLogo,
    },
    checkmarksSection: {
      title: "Everything modern festivals need to sell out.",
      subtitle:
        "Scalable cloud architecture, viral pre-sale funnels and instant fan communications.",
      image: sunsetLogo,
      list: [
        {
          title: "Crash-resistant ticket drops",
          description:
            "(Handles tens of thousands of concurrent visitors effortlessly)",
        },
        {
          title: "Interactive mobile line-up schedule",
          description:
            "(Optimized for festival field usage without slow app installs)",
        },
        {
          title: "WhatsApp broadcast & safety alerts",
          description:
            "(Reach fans instantly with crucial weather or stage updates)",
        },
        {
          title: "Automated FAQ AI assistant",
          description: "(Answers entry, camping and rules questions 24/7)",
        },
      ],
    },
    testimonials: [
      {
        title: "Sunset Sounds Fest – Open-Air Edition",
        description:
          "Zero downtime during ticket drops and over 12,000 WhatsApp VIP subscribers before the official line-up announcement.",
        image: sunsetLogo,
      },
    ],
    faqs: [
      {
        question: "Can this handle massive traffic spikes during drops?",
        answer:
          "Yes. We use edge-cached, distributed cloud hosting designed specifically for extreme traffic spikes during public ticket sales.",
      },
      {
        question: "Can we integrate Eventim, Ticketmaster or custom shops?",
        answer:
          "Yes, we can seamlessly connect any ticketing provider via iframe, API, or direct link.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    customPartnerLogos: [sunsetLogo],
    customPartnerTitle: "Öne Çıkan Referans: Sunset Sounds Fest",
    hidePartnerSlider: false,
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Dolu sahneler, tükenmiş biletler – Festivaller için web tasarım & otomasyon.",
      subtitle:
        "Yüksek hızlı bilet funnelleri, interaktif sahne programları ve 7/24 hayran WhatsApp desteği. Festival katılımcılarını ömür boyu topluluk üyelerine dönüştürün.",
      buttonText: "Festival Platformu Talep Et",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ticket/3D/ticket_3d.png",
        title:
          "Bilet drop sırasında sunucular çöküyor mu? Her saniye kesinti binlerce satış kaybı demek.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Aşırı yüklenmiş destek ekibi mi? Kamp, otopark ve giriş hakkında sonsuz tekrarlayan sorular.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Loudspeaker/3D/loudspeaker_3d.png",
        title:
          "Son dakika program değişiklikleri? Kimse favori sanatçısı çalmadan hemen önce e-posta kontrol etmez.",
      },
    ],
    leadMagnet: {
      title: "Festival Marketing Planı: Tükenmiş Etkinliğe 5 Adım.",
      description:
        "Modern festivallerin WhatsApp VIP drop'ları ve yapay zeka bilet funnelleri ile satışları %40 nasıl artırdığını öğrenin. Etkinlik düzenleyiciler için ücretsiz.",
      buttonText: "Ücretsiz Festival Planını Al",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
    },
    workflow: {
      title: "Duyuru teaserından tamamen tükenmiş festivale.",
      description:
        "Aşırı artışlara dayanacak yüksek performanslı altyapı. Entegre bilet mağazaları, otomatik WhatsApp bildirimleri ve anlık program güncellemeleri.",
      image: sunsetLogo,
    },
    benefits: {
      title: "Maksimum bilet satışı – sıfır destek baş ağrısı.",
      description:
        "7/24 yapay zeka festival asistanımız misafir sorularının %95'ini anında yanıtlar, ekibinizin sanatçılara ve saha üretimine odaklanmasını sağlar.",
      image: sunsetLogo,
    },
    checkmarksSection: {
      title: "Modern festivallerin tükenmesi için gereken her şey.",
      subtitle:
        "Ölçeklenebilir bulut mimarisi, viral ön satış funnelleri ve anlık hayran iletişimi.",
      image: sunsetLogo,
      list: [
        {
          title: "Çökme dirençli bilet drop'ları",
          description:
            "(On binlerce eşzamanlı ziyaretçiyi zahmetsizce yönetir)",
        },
        {
          title: "İnteraktif mobil program",
          description:
            "(Yavaş uygulama indirmeleri olmadan festival sahası kullanımı için optimize)",
        },
        {
          title: "WhatsApp yayın & güvenlik uyarıları",
          description:
            "(Hayranlara önemli hava veya sahne güncellemelerini anında ulaştırın)",
        },
        {
          title: "Otomatik SSS yapay zeka asistanı",
          description: "(Giriş, kamp ve kurallar sorularını 7/24 yanıtlar)",
        },
      ],
    },
    testimonials: [
      {
        title: "Sunset Sounds Fest – Açık Hava Sürümü",
        description:
          "Bilet drop'ları sırasında sıfır kesinti ve resmi program duyurusundan önce 12.000'den fazla WhatsApp VIP abonesi.",
        image: sunsetLogo,
      },
    ],
    faqs: [
      {
        question:
          "Bu, drop sırasında büyük trafik artışlarını kaldırabilir mi?",
        answer:
          "Evet. Açık bilet satışları sırasında aşırı trafik artışları için özel olarak tasarlanmış, kenar önbellekli, dağıtık bulut barındırma kullanıyoruz.",
      },
      {
        question:
          "Eventim, Ticketmaster veya özel mağazaları entegre edebilir miyiz?",
        answer:
          "Evet, herhangi bir bilet sağlayıcısını iframe, API veya doğrudan bağlantı ile sorunsuz bağlayabiliriz.",
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
            ? "Web Design & Ticket Automation for Festivals & Events | Sunset Sounds Fest"
            : language === "tr"
              ? "Festivaller & Etkinlikler için Web Tasarım & Bilet Otomasyonu | Sunset Sounds Fest"
              : "Webdesign & Ticket-Automatisierung für Festivals & Events | Sunset Sounds Fest"
        }
        description={
          language === "en"
            ? "High-traffic festival websites, ticket sales funnels, line-up showcase, WhatsApp fan communication and automated support for event promoters."
            : language === "tr"
              ? "Yüksek trafikli festival web siteleri, bilet satış funnelleri, program vitrini, WhatsApp hayran iletişimi ve etkinlik düzenleyiciler için otomatik destek."
              : "High-Traffic Festival-Websites, Ticket-Verkauf, Line-Up Showcase, WhatsApp-Fan-Kommunikation und automatisierter Support für Eventveranstalter."
        }
        keywords="Festival Website, Event Landingpage, Ticketverkauf Website, Festival App, Sunset Sounds Fest, Event Marketing, Ticketshop Automatisierung"
      />
      <IndustryPage data={currentData} />
    </>
  );
}
