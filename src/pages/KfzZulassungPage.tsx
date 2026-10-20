import { IndustryPage } from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function KfzZulassungPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      seo: {
        title:
          "KFZ-Zulassung & Schilder Online | Wunschkennzeichen in 5 Min – PS Professional Solutions",
        description:
          "Online-Zulassung mit Wunschkennzeichen-Konfigurator. Verfügbarkeit beim Amt prüfen, DIN-zertifizierte Schilder bestellen & i-Kfz Stufe 4 digital einleiten – in unter 5 Minuten von zuhause.",
        keywords:
          "KFZ Zulassung, Wunschkennzeichen, Schilder online bestellen, i-Kfz Stufe 4, Zulassungsstelle, Kennzeichen online, Autoschilder, KFZ Zulassung Dortmund, Auto online anmelden, Schilder bestellen, digitale Zulassung, Zulassungsstelle Dortmund",
      },
      showMatouShowcase: true,
      hidePartnerSlider: false,
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/646d589d-652a-498d-9fc3-afbe9e891029.png",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/285a343c-7317-4c26-9fa3-fb7c908c1cb3.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/df4a8ce7-e403-44cc-be92-abcd7a24fd43.png",
      ],
      customPartnerTitle:
        "Erfolgreiche Partner & Kfz-Dienste (Matou, Zulassungsdienst Bolat, Madani Automobil & XL Schilder)",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title:
          "Wunschkennzeichen in 5 Minuten – Zulassung komplett digital von zuhause.",
        subtitle:
          "Geben Sie Ihr Kennzeichen ein, prüfen Sie die Verfügbarkeit beim Amt und bestellen Sie DIN-zertifizierte Schilder online. Wir verlinken Sie direkt zur Zulassungsstelle Ihrer Stadt.",
        buttonText: "Wunschkennzeichen jetzt prüfen",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hourglass_done/3D/hourglass_done_3d.png",
          title:
            "Stundenlange Wartezeiten an der Zulassungsstelle? Ihr Kunde hat Besseres zu tun als Schlangen stehen.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Warning/3D/warning_3d.png",
          title:
            "Schilder mühsam vor Ort kaufen? Jeder Gang zum Schilderhersteller kostet Zeit und Nerven.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Papierkram-Chaos und kein digitaler Prozess? Veraltete Formulare verlieren Kunden an den Wettbewerb.",
        },
      ],
      leadMagnet: {
        title:
          "Vom Schlangestehen zum Digital-Profi: Sichern Sie sich Ihren Gratis-Automatisierungs-Plan.",
        description:
          "Stellen Sie sich vor, Ihre Kunden geben ihr Wunschkennzeichen online ein, prüfen die Verfügbarkeit in Sekunden und bestellen die Schilder direkt – ohne einen einzigen Gang zum Amt. Wir zeigen Ihnen schlüsselfertig, wie Sie sofort Zeit sparen und Kunden begeistern. Kein technisches Wissen nötig.",
        buttonText: "Kostenlosen KI-Check anfordern",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "Vom Kennzeichen zur Zulassung – ohne einen Schritt vor die Tür.",
        description:
          "Hören Sie auf, Ihren Kunden Wartezeiten und Wege zuzumuten. Unser System prüft das Wunschkennzeichen live, verlinkt direkt zur Zulassungsstelle der jeweiligen Stadt und leitet den digitalen i-Kfz-Stufe-4-Prozess ein. DIN-zertifizierte Schilder werden online bestellt und zugestellt. Ihr Kunde ist in unter 5 Minuten durch – komplett von zuhause aus.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      benefits: {
        title: "Mehr Zulassungen abwickeln – ohne mehr Personal am Schalter.",
        description:
          "Wachstum bedeutet normalerweise mehr Personal. Bei uns nicht. Egal ob 5 oder 500 Anfragen: Das System bleibt stabil und hält Ihren Rücken frei. So bleibt Ihr Umsatz planbar und Ihre Kunden rundum zufrieden.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      checkmarksSection: {
        title:
          "Verschwenden Sie Ihre Zeit mit Warteschlangen? Wir digitalisieren Ihren Zulassungsprozess komplett, damit Sie sich wieder auf Ihr Kerngeschäft konzentrieren können.",
        subtitle:
          "Schluss mit Wartezeiten und Papierkram. Sparen Sie jede Woche wertvolle Stunden.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
        list: [
          {
            title:
              "Wunschkennzeichen-Konfigurator mit Live-Verfügbarkeitsprüfung",
            description: "(Prüft das Amt in Sekunden, nicht in Stunden)",
          },
          {
            title: "Direkt-Verlinkung zur Zulassungsstelle jeder Stadt",
            description: "(Vom Kennzeichen zum Amt in einem Klick)",
          },
          {
            title: "i-Kfz Stufe 4 – digitaler Zulassungsprozess",
            description: "(100% online, ohne persönliches Vorsprechen)",
          },
          {
            title:
              "DIN-zertifizierte Schilder online bestellen & liefern lassen",
            description: "(Schilder kommen per Post, kein Weg mehr nötig)",
          },
        ],
      },
      websitePreview: {
        title: "Live-Showcase: Matou Kfz Schilder Express",
        description:
          "Sehen Sie, wie die von uns entwickelte Plattform für Matou Kfz Schilder Express funktioniert: Live-Wunschkennzeichen-Konfigurator, i-Kfz Stufe 4 Express-Zulassung, Schilder-Shop & städtischer Behörden-Finder.",
        beforeImage:
          "/media/vibe.filesafe.space/1779266194699726281/assets/9f6c39b7-8d87-45d2-815d-644557c02b98.png",
        afterImage:
          "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
      },
      testimonials: [
        {
          title: "Matou Kfz Schilder Express (Dortmund & Bundesweit)",
          description:
            "Ergebnis: +350% Online-Schilder-Bestellungen & automatisierte i-Kfz Zulassungen im ersten Quartal.\n\nWie: Entwicklung der vollständigen Matou Web-Plattform mit Wunschkennzeichen-Prüfung, digitalem Dokumenten-Upload (eID, eVB, Ausweis), Schilder-Konfigurator und Behörden-Finder. Interessenten können sich direkt auf matou-kfz-express.de vom System überzeugen.",
          image:
            "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        },
      ],
      faqs: [
        {
          question:
            "Wer baut professionelle Webseiten & Wunschkennzeichen-Systeme für Kfz-Zulassungsdienste und Schilderpräger?",
          answer:
            "Pankaj Mondjal und das Team von PS Professional Solutions sind spezialisiert auf maßgeschneiderte E-Commerce-Plattformen und Webseiten für Kfz-Zulassungsdienste, Autoschilder-Präger und i-Kfz-Agenturen. Wir liefern schlüsselfertige Systeme inklusive Live-Verfügbarkeitsprüfung beim Straßenverkehrsamt, digitalem Dokumentenupload, DIN-Schilder-Shop und städtischer Amtsverlinkung.",
        },
        {
          question:
            "Wie kann mein Kfz-Zulassungsdienst über Google & KI-Suchmaschinen (ChatGPT, Perplexity, Gemini) gefunden werden?",
          answer:
            "Durch gezielte Local-SEO-Architektur, semantisches Schema-Markup (LocalBusiness, AutomotiveBusiness, Service), blitzschnelle Ladezeiten unter 1 Sekunde und automatisierte Google-Unternehmensprofil-Optimierung. Kunden in Ihrer Stadt, die nach 'Kfz Zulassung Express', 'Autoschilder kaufen' oder 'Wunschkennzeichen reservieren' suchen, finden Ihre Webseite direkt auf Platz 1 bei Google und in KI-Suchantworten.",
        },
        {
          question:
            "Wie funktioniert die Online-Zulassung mit Wunschkennzeichen für meine Endkunden?",
          answer:
            "Der Kunde gibt sein Wunschkennzeichen in den Konfigurator ein. Das System prüft in Sekunden die Verfügbarkeit bei der zuständigen Zulassungsstelle. Ist das Kennzeichen frei, kann der Kunde DIN-zertifizierte Schilder direkt online bestellen und den digitalen i-Kfz-Stufe-4-Zulassungsprozess einleiten – komplett von zuhause, ohne persönliches Vorsprechen beim Amt.",
        },
        {
          question:
            "Welche Software & Schnittstellen brauche ich als Zulassungsdienst für i-Kfz Stufe 4?",
          answer:
            "Sie benötigen keine komplizierte IT-Infrastruktur. Wir richten Ihre Webseite so ein, dass sie den gesamten Vorprozess automatisiert: Kunden erfassen ihre Fahrzeugdaten (FIN, eVB-Nummer, Zulassungsbescheinigung Teil I/II), verifizieren sich per Ausweis/eID und leiten die offizielle i-Kfz-Stufe-4-Übermittlung digital ein. Alle Daten kommen strukturiert in Ihrem Dashboard oder WhatsApp an.",
        },
        {
          question:
            "Muss mein Kunde trotzdem noch persönlich zur Zulassungsstelle?",
          answer:
            "Nein. Durch den i-Kfz-Stufe-4-Prozess läuft die Zulassung zu 100% digital ab. Ihr Kunde gibt alle Daten online ein, das System verlinkt direkt zur Zulassungsstelle seiner Stadt und übermittelt den Antrag digital. Die DIN-zertifizierten Schilder werden per Post zugestellt. Kein Warten, keine Wege, kein Papierkram.",
        },
        {
          question:
            "Was kostet eine professionelle Webseite für einen Kfz-Zulassungsdienst bei PS Professional Solutions?",
          answer:
            "Wir bieten transparente Festpreise mit Bestpreis-Garantie: Unsere Starter- und Wachstums-Pakete (inkl. Schilder-Shop, Live-Wunschkennzeichen-Konfigurator, SEO und Wartung) sind sofort einsatzbereit. Bei jährlicher Zahlungsweise sparen Sie 2 volle Monatsbeiträge (Zahlen für 10 Monate, 12 Monate vollumfänglicher Service).",
        },
        {
          question: "Was sind DIN-zertifizierte Schilder und brauche ich sie?",
          answer:
            "Ja, in Deutschland sind Kennzeichenschilder nach DIN 74071 zertifiziert vorgeschrieben. Unsere Plattform bietet nur offiziell zugelassene, DIN-zertifizierte Schilder an. Diese werden direkt nach der erfolgreichen Zulassung produziert und zum Kunden geliefert – legal, geprüft und ohne Umwege.",
        },
        {
          question:
            "Kann ich die Plattform für mehrere Städte und Zulassungsstellen anbieten?",
          answer:
            "Absolut. Das System erkennt automatisch die zuständige Zulassungsstelle anhand der Postleitzahl und verlinkt Ihren Kunden direkt zum richtigen Amt – egal ob Dortmund, Berlin, München oder eine Kleinstadt. So bieten Sie bundesweit Zulassungen an, ohne jede Stadt einzeln pflegen zu müssen.",
        },
        {
          question:
            "Wie finden Kfz-Zulassungsdienste und Schilderpräger meine Dienstleistungen bei Google und in KI-Suchmaschinen?",
          answer:
            "Wir optimieren Ihre Plattform mit gezielten Rich Snippets, Local-SEO und semantischen FAQs für spezifische Suchbegriffe wie 'Kfz Zulassungsservice online', 'Wunschkennzeichen Expressversand', 'Schilderpräger Website erstellen lassen' und 'i-Kfz Stufe 4 Schnittstelle'. Dadurch wird Ihre Seite sowohl in den klassischen Google-Rankings als auch von KI-Engines wie ChatGPT, Perplexity und Google AI Overviews als führende Empfehlung zitiert.",
        },
        {
          question:
            "Wie schnell ist die Webseite für meinen Kfz-Zulassungsdienst online?",
          answer:
            "In der Regel ist Ihre maßgeschneiderte Zulassungsplattform innerhalb von 7 bis 14 Werktagen komplett betriebsbereit – inklusive Anbindung an Zahlungsmethoden (PayPal, Apple Pay, Klarna), WhatsApp-Schnittstelle, Schilder-Konfigurator und Google-Maps-Optimierung.",
        },
        {
          question:
            "Kann ich auch Sonderkennzeichen wie E-, H- oder Saisonkennzeichen anbieten?",
          answer:
            "Ja, unser System unterstützt sämtliche DIN-zertifizierten Kennzeichen: Standard-Pkw, E-Kennzeichen, H-Kennzeichen für Oldtimer, Saison- und Kurzzeitkennzeichen sowie Motorrad- und Traktorenschilder.",
        },
        {
          question:
            "Funktioniert die digitale Zulassung auch für Importfahrzeuge und Ummeldungen?",
          answer:
            "Ja. Das System unterstützt Erstzulassungen, Ummeldungen, Abmeldungen und Wiederzulassungen gleichermaßen. Auch Gebrauchtwagen-Importe mit ausländischen Dokumenten können digital angemeldet werden – der Dokumenten-Upload akzeptiert alle gängigen Formate. Ihr Kunde lädt alles bequem vom Smartphone hoch, das System validiert die Daten und leitet den Antrag an die zuständige Zulassungsstelle weiter.",
        },
        {
          question:
            "Wie sicher sind die hochgeladenen Kundendaten beim i-Kfz Stufe 4 Prozess?",
          answer:
            "Alle Datenübertragungen erfolgen DSGVO-konform über verschlüsselte Verbindungen (SSL/TLS). Der eID-Verifizierungsprozess entspricht den Sicherheitsstandards der Bundesdruckerei. Dokumente werden nicht dauerhaft gespeichert, sondern nur für die Dauer des Zulassungsvorgangs verarbeitet und danach automatisch gelöscht. Ihr Kunde behält jederzeit die Kontrolle über seine Daten.",
        },
      ],
    },
    en: {
      seo: {
        title:
          "Vehicle Registration & Plates Online | Custom Plates in 5 Min – PS Professional Solutions",
        description:
          "Online registration with custom plate configurator. Check availability at the office, order DIN-certified plates & initiate digital i-Kfz Stage 4 – in under 5 minutes from home.",
        keywords:
          "vehicle registration, custom license plate, plates online, i-Kfz Stage 4, registration office, license plates, KFZ registration Dortmund, car registration online, order plates, digital registration",
      },
      showMatouShowcase: true,
      hidePartnerSlider: false,
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/646d589d-652a-498d-9fc3-afbe9e891029.png",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/285a343c-7317-4c26-9fa3-fb7c908c1cb3.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/df4a8ce7-e403-44cc-be92-abcd7a24fd43.png",
      ],
      customPartnerTitle:
        "Trusted Partners & Vehicle Services (Matou, Bolat, Madani Automobil, XL)",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title:
          "Custom license plates in 5 minutes – fully digital registration from home.",
        subtitle:
          "Enter your plate, check availability at the registry office, and order DIN-certified plates online. We link you directly to your city's registration authority.",
        buttonText: "Check your plate now",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hourglass_done/3D/hourglass_done_3d.png",
          title:
            "Hours of waiting at the registration office? Your customer has better things to do than stand in line.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Warning/3D/warning_3d.png",
          title:
            "Buying plates on-site the hard way? Every trip to the plate maker costs time and nerves.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Paperwork chaos and no digital process? Outdated forms lose customers to the competition.",
        },
      ],
      leadMagnet: {
        title:
          "From standing in line to digital pro: Secure your free automation plan.",
        description:
          "Imagine your customers entering their custom plate online, checking availability in seconds, and ordering the plates directly – without a single trip to the office. We show you turnkey how to immediately save time and delight customers. No technical knowledge required.",
        buttonText: "Request Free AI Check",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "From license plate to registration – without stepping out the door.",
        description:
          "Stop imposing waiting times and trips on your customers. Our system checks the custom plate live, links directly to the registration authority of the respective city, and initiates the digital i-Kfz Stage 4 process. DIN-certified plates are ordered online and delivered. Your customer is done in under 5 minutes – completely from home.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      benefits: {
        title: "Handle more registrations – without more staff at the counter.",
        description:
          "Growth usually means more staff. Not with us. Whether 5 or 500 inquiries: the system stays stable and has your back. This keeps your revenue predictable and your customers fully satisfied.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      checkmarksSection: {
        title:
          "Wasting time with queues? We digitize your registration process completely so you can focus on your core business again.",
        subtitle:
          "No more waiting times and paperwork. Save valuable hours every week.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
        list: [
          {
            title: "Custom plate configurator with live availability check",
            description: "(Checks the office in seconds, not hours)",
          },
          {
            title: "Direct linking to every city's registration authority",
            description: "(From plate to office in one click)",
          },
          {
            title: "i-Kfz Stage 4 – fully digital registration process",
            description: "(100% online, no in-person visit)",
          },
          {
            title: "Order DIN-certified plates online & have them delivered",
            description: "(Plates arrive by post, no trip needed)",
          },
        ],
      },
      websitePreview: {
        title: "Live Showcase: Matou Kfz Schilder Express",
        description:
          "See how the platform developed by us for Matou Kfz Schilder Express works: Live plate configurator, i-Kfz Stage 4 express registration, plate shop & city office locator.",
        beforeImage:
          "/media/vibe.filesafe.space/1779266194699726281/assets/9f6c39b7-8d87-45d2-815d-644557c02b98.png",
        afterImage:
          "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
      },
      testimonials: [
        {
          title: "Matou Kfz Schilder Express (Dortmund & Nationwide)",
          description:
            "Result: +350% online plate orders & automated i-Kfz registrations in Q1.\n\nHow: Full web platform engineering for Matou including plate availability checker, digital document upload (eID, eVB, ID), plate configurator, and city registration finder. Prospects can verify the live system directly on matou-kfz-express.de.",
          image:
            "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        },
      ],
      faqs: [
        {
          question: "How does online registration with custom plates work?",
          answer:
            "The customer enters their custom plate into the configurator. The system checks availability at the responsible registration office in seconds. If the plate is available, the customer can order DIN-certified plates directly online and initiate the digital i-Kfz Stage 4 registration process – completely from home, without an in-person visit to the office.",
        },
        {
          question:
            "Does my customer still have to go to the registration office in person?",
          answer:
            "No. Through the i-Kfz Stage 4 process, registration runs 100% digitally. Your customer enters all data online, the system links directly to their city's registration office and submits the application digitally. The DIN-certified plates are delivered by post. No waiting, no trips, no paperwork.",
        },
        {
          question: "What are DIN-certified plates and do I need them?",
          answer:
            "Yes, in Germany license plates certified to DIN 74071 are mandatory. Our platform only offers officially approved, DIN-certified plates. These are produced directly after successful registration and delivered to the customer – legal, tested, and without detours.",
        },
        {
          question:
            "Can I offer the platform for multiple cities and registration offices?",
          answer:
            "Absolutely. The system automatically detects the responsible registration office based on the postal code and links your customer directly to the right office – whether Dortmund, Berlin, Munich, or a small town. This way you offer registrations nationwide without having to maintain each city individually.",
        },
        {
          question:
            "How much does online registration cost and how long does the process take?",
          answer:
            "Online registration with a custom plate usually takes under 5 minutes. Your customer enters their plate, checks availability, uploads the required documents (eID, eVB, vehicle registration), and orders the DIN-certified plates directly. The cost of the plates is shown transparently in the shop. The actual authority visit is handled by the digital i-Kfz Stage 4 process – no waiting room involved.",
        },
        {
          question:
            "Does the digital registration also work for imported vehicles and re-registrations?",
          answer:
            "Yes. The system supports initial registrations, re-registrations, de-registrations, and re-registrations alike. Used car imports with foreign documents can also be registered digitally – the document upload accepts all common formats. Your customer uploads everything conveniently from their smartphone, the system validates the data, and forwards the application to the responsible registration office.",
        },
        {
          question:
            "How secure are the uploaded customer data in the i-Kfz Stage 4 process?",
          answer:
            "All data transfers are GDPR-compliant via encrypted connections (SSL/TLS). The eID verification process meets the security standards of the Bundesdruckerei. Documents are not stored permanently but only processed for the duration of the registration process and then automatically deleted. Your customer always retains control over their data.",
        },
        {
          question:
            "Do I offer the plates myself or does the system work with a manufacturer?",
          answer:
            "The DIN-certified plates are ordered via the integrated shop and produced and shipped directly by the certified manufacturer. You don't need to maintain a warehouse or production facility. The system handles ordering, production, and shipping – including accessories like holders and fastening material. You earn on every order without lifting a hand.",
        },
      ],
    },
    tr: {
      seo: {
        title:
          "Araç Tescili & Plakalar Online | 5 Dakikada İstenen Plaka – PS Professional Solutions",
        description:
          "İstenen plaka konfigüratörlü online tescil. Kurumda müsaitliği kontrol edin, DIN sertifikalı plakalar sipariş edin & dijital i-Kfz Aşama 4'ü başlatın – evden 5 dakikadan kısa sürede.",
        keywords:
          "Araç tescili, İstenen plaka, Online plaka siparişi, i-Kfz Aşama 4, Tescil dairesi, Plakalar, KFZ tescili Dortmund, Online araç kaydı, Plaka siparişi, Dijital tescil",
      },
      showMatouShowcase: true,
      hidePartnerSlider: false,
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/646d589d-652a-498d-9fc3-afbe9e891029.png",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/285a343c-7317-4c26-9fa3-fb7c908c1cb3.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/df4a8ce7-e403-44cc-be92-abcd7a24fd43.png",
      ],
      customPartnerTitle:
        "Güvenilir Ortaklar & Araç Hizmetleri (Matou, Bolat, Madani Automobil, XL)",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title: "5 dakikada istenen plaka – evden tamamen dijital tescil.",
        subtitle:
          "Plakanızı girin, kurumda müsaitliği kontrol edin ve DIN sertifikalı plakaları online sipariş edin. Sizi doğrudan şehrinizin tescil dairesine yönlendiriyoruz.",
        buttonText: "Plakanızı şimdi kontrol edin",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hourglass_done/3D/hourglass_done_3d.png",
          title:
            "Tescil dairesinde saatlerce bekleme? Müşterinizin sıra beklemekten daha iyi işleri var.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Warning/3D/warning_3d.png",
          title:
            "Plakaları zahmetli şekilde yerinde mi alıyorsunuz? Plaka üreticisine her gidiş zaman ve sinir kaybı.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Evrak kaosu ve dijital süreç yok mu? Eski formlar müşterileri rakibe kaybettiriyor.",
        },
      ],
      leadMagnet: {
        title:
          "Sıra beklemekten dijital profesyonele: Ücretsiz otomasyon planınızı garantileyin.",
        description:
          "Müşterilerinizin istenen plakayı online girmesini, müsaitliği saniyeler içinde kontrol etmesini ve plakaları doğrudan sipariş etmesini hayal edin – kuruma tek bir gidiş olmadan. Zaman nasıl hemen kazanıp müşterileri büyüleyeceğinizi anahtar teslim gösteriyoruz. Teknik bilgi gerekmez.",
        buttonText: "Ücretsiz Yapay Zeka Kontrolü İste",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title: "Plakadan tescile – kapıdan dışarı adım atmadan.",
        description:
          "Müşterilerinize bekleme süreleri ve yolculuklar dayatmayı bırakın. Sistemimiz istenen plakayı canlı kontrol eder, ilgili şehrin tescil dairesine doğrudan bağlantı verir ve dijital i-Kfz Aşama 4 sürecini başlatır. DIN sertifikalı plakalar online sipariş edilir ve teslim edilir. Müşteriniz 5 dakikadan kısa sürede işini bitirir – tamamen evden.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      benefits: {
        title: "Daha fazla tescil işle – gişede daha fazla personel olmadan.",
        description:
          "Büyüme normalde daha fazla personel demek. Bizde değil. 5 veya 500 talep: Sistem kararlı kalır ve arkanızı kollar. Böylece geliriniz öngörülebilir ve müşterileriniz tamamen memnun kalır.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
      },
      checkmarksSection: {
        title:
          "Sıralarla zaman mı kaybediyorsunuz? Tescil sürecinizi tamamen dijitalleştiriyoruz, böylece tekrar ana işinize odaklanabilirsiniz.",
        subtitle:
          "Bekleme sürelerine ve evraka son. Her hafta değerli saatler kazanın.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/706d07b7-1221-424b-845f-eed64de36c4c.png",
        list: [
          {
            title: "Canlı müsaitlik kontrolü ile istenen plaka konfigüratörü",
            description: "(Kurumu saatler değil saniyeler içinde kontrol eder)",
          },
          {
            title: "Her şehrin tescil dairesine doğrudan bağlantı",
            description: "(Plakadan kuruma tek tıkla)",
          },
          {
            title: "i-Kfz Aşama 4 – tamamen dijital tescil süreci",
            description: "(%100 online, şahsen başvuru yok)",
          },
          {
            title: "DIN sertifikalı plakaları online sipariş edip teslim alın",
            description: "(Plakalar postayla gelir, yol gerekmez)",
          },
        ],
      },
      websitePreview: {
        title: "Canlı Vitrin: Matou Kfz Schilder Express",
        description:
          "Matou Kfz Schilder Express için geliştirdiğimiz platformun nasıl çalıştığını görün: Canlı plaka konfigüratörü, i-Kfz Aşama 4 hızlı tescil, plaka mağazası & şehir kurum bulucu.",
        beforeImage:
          "/media/vibe.filesafe.space/1779266194699726281/assets/9f6c39b7-8d87-45d2-815d-644557c02b98.png",
        afterImage:
          "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
      },
      testimonials: [
        {
          title: "Matou Kfz Schilder Express (Dortmund & Ulusal)",
          description:
            "Sonuç: İlk çeyrekte +%350 online plaka siparişi & otomatik i-Kfz tescilleri.\n\nNasıl: Plaka müsaitlik kontrolü, dijital belge yükleme (eID, eVB, kimlik), plaka konfigüratörü ve şehir kurum bulucu içeren tam Matou web platformunun geliştirilmesi. İlgilenenler matou-kfz-express.de'de canlı sistemden doğrudan emin olabilir.",
          image:
            "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
        },
      ],
      faqs: [
        {
          question: "İstenen plaka ile online tescil nasıl çalışır?",
          answer:
            "Müşteri istenen plakayı konfigüratöre girer. Sistem sorumlu tescil dairesinde müsaitliği saniyeler içinde kontrol eder. Plaka müsaitsse, müşteri DIN sertifikalı plakaları doğrudan online sipariş edebilir ve dijital i-Kfz Aşama 4 tescil sürecini başlatabilir – tamamen evden, kuruma şahsen başvuru olmadan.",
        },
        {
          question:
            "Müşterim yine de şahsen tescil dairesine gitmek zorunda mı?",
          answer:
            "Hayır. i-Kfz Aşama 4 süreci ile tescil %100 dijital yürür. Müşteriniz tüm verileri online girer, sistem doğrudan şehrinin tescil dairesine bağlantı verir ve başvuyu dijital iletir. DIN sertifikalı plakalar postayla teslim edilir. Bekleme yok, yolculuk yok, evrak yok.",
        },
        {
          question: "DIN sertifikalı plakalar nedir ve ihtiyacım var mı?",
          answer:
            "Evet, Almanya'da DIN 74071 sertifikalı plakalar zorunludur. Platformumuz yalnızca resmen onaylı, DIN sertifikalı plakalar sunar. Bunlar başarılı tescilden sonra doğrudan üretilir ve müşteriye teslim edilir – yasal, test edilmiş ve dolambaçlı yolsuz.",
        },
        {
          question:
            "Platformu birden fazla şehir ve tescil dairesi için sunabilir miyim?",
          answer:
            "Kesinlikle. Sistem posta koduna göre sorumlu tescil dairesini otomatik tanır ve müşterinizi doğru kuruma doğrudan bağlar – Dortmund, Berlin, Münih veya küçük bir kasaba fark etmez. Böylece her şehri tek tek bakım yapmadan ulusal tescil sunarsınız.",
        },
        {
          question: "Online tescil ne kadar ve süreç ne kadar sürer?",
          answer:
            "İstenen plaka ile online tescil genellikle 5 dakikadan kısa sürer. Müşteriniz plakayı girer, müsaitliği kontrol eder, gerekli belgeleri (eID, eVB, araç ruhsatı) yükler ve DIN sertifikalı plakaları doğrudan sipariş eder. Plaka maliyeti mağazada şeffaf şekilde gösterilir. Gerçek kurum ziyareti dijital i-Kfz Aşama 4 süreci tarafından yürütülür – bekleme odası yok.",
        },
        {
          question:
            "Dijital tescil ithal araçlar ve yeniden kayıtlar için de çalışır mı?",
          answer:
            "Evet. Sistem ilk kayıt, yeniden kayıt, kayıt silme ve yeniden kayıt işlemlerini eşit derecede destekler. Yabancı belgelerle ikinci el araç ithalatı da dijital olarak kaydedilebilir – belge yükleme tüm yaygın formatları kabul eder. Müşteriniz her şeyi akıllı telefonundan yükler, sistem verileri doğrular ve başvuyu sorumlu tescil dairesine iletir.",
        },
        {
          question:
            "i-Kfz Aşama 4 sürecinde yüklenen müşteri verileri ne kadar güvenli?",
          answer:
            "Tüm veri aktarımları şifreli bağlantılar (SSL/TLS) üzerinden GDPR uyumludur. eID doğrulama süreci Bundesdruckerei güvenlik standartlarını karşılar. Belgeler kalıcı olarak saklanmaz, yalnızca tescil süreci boyunca işlenir ve sonra otomatik silinir. Müşteriniz verileri üzerinde her zaman kontrol sahibidir.",
        },
        {
          question:
            "Plakaları kendim mi sunuyorum yoksa sistem bir üretici ile mi çalışıyor?",
          answer:
            "DIN sertifikalı plakalar entegre mağaza üzerinden sipariş edilir ve sertifikalı üretici tarafından doğrudan üretilip gönderilir. Depo veya üretim tesisi tutmanız gerekmez. Sistem sipariş, üretim ve gönderimi üstlenir – tutucular ve sabitleme malzemesi gibi aksesuarlar dahil. Tek el kaldırmadan her siparişten kazanırsınız.",
        },
      ],
    },
  };

  const currentData = (content as any)[language] || content.de;

  return (
    <>
      <SEO
        title={currentData.seo.title}
        description={currentData.seo.description}
        keywords={currentData.seo.keywords}
        ogImage="/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg"
        faqs={currentData.faqs}
      />
      <IndustryPage data={currentData} />
    </>
  );
}
