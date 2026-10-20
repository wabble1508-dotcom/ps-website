import {
  IndustryPage,
  type IndustryPageProps,
} from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function HandwerkerPage() {
  const { language } = useLanguage();

  const dataDe: IndustryPageProps = {
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Baustelle im Griff, das Handy im Büro – wir retten Ihre verpassten Anrufe.",
      subtitle:
        "Während die Säge läuft, bucht unsere KI Ihre nächsten Aufträge. 24/7 erreichbar, ohne dass Sie selbst abheben müssen.",
      buttonText: "Legen Sie Ihr Handy Beiseite - Wir Übernehmen.",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Anrufe im Lärm überhört? Jedes Klingeln ist eine verlorene Baustelle.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
        title:
          "Feierabend heißt bei Ihnen Büroarbeit? Schluss mit dem Papierkram bis Mitternacht.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Kunde erreicht Sie nicht? Er ruft sofort den nächsten Betrieb an.",
      },
    ],
    leadMagnet: {
      title:
        "Vom Zettelchaos zum Autopiloten: Sichern Sie sich Ihren Gratis-Automatisierungs-Plan.",
      description:
        "Stellen Sie sich vor, 3 nervige Büro-Aufgaben fallen ab morgen weg – weil die KI sie macht. Wir werfen einen Blick auf Ihren Betrieb und zeigen Ihnen schlüsselfertig, wo Sie sofort Zeit gewinnen. Kein technisches Wissen nötig.",
      buttonText: "Kostenlosen KI-Check Anfordern",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/a3c9dd74-8624-4cce-be45-1c029e9e5cd8.png",
    },
    workflow: {
      title: "Vom Anruf zum Auftrag – ohne dass Sie den Hörer halten.",
      description:
        "Hören Sie auf, abends noch Termine zu bestätigen. Unser System übernimmt das Nachfassen vollautomatisch per SMS. Während Sie auf der Baustelle Gas geben, wird im Hintergrund Ihr Kalender gefüllt. Jeder Interessent bekommt sofort eine Antwort – kein Warten, kein Vergessen.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/70eae435-8182-4919-8250-c8e7b34bfb4d.jpg",
    },
    benefits: {
      title: "Mehr Aufträge schaffen – ohne mehr Zeit im Büro.",
      description:
        "Wachstum bedeutet normalerweise mehr Papierkram. Bei uns nicht. Egal ob 5 oder 50 Anfragen: Das System bleibt stabil und hält Ihnen den Rücken frei. So bleibt Ihr Umsatz planbar und Ihr Feierabend heilig.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7b604297-5c2c-490d-9ee2-c68d97f2ca18.png",
    },
    checkmarksSection: {
      title:
        "Verschwenden Sie wertvolle Zeit im Büro? Wir automatisieren Ihre Abläufe mit intelligenten Systemen, damit Sie sich wieder auf Ihr Kerngeschäft konzentrieren können.",
      subtitle:
        "Sparen Sie jede Woche wertvolle Stunden. Mehr Effizienz, weniger Stress, bessere Ergebnisse.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7a661b8e-f320-46a9-8761-45f0d6b1e43e.png",
      list: [
        {
          title: "Automatisierte Terminbuchung & SMS-Erinnerungen",
          description: "(Verhindert 90% der Ausfälle)",
        },
        {
          title: "KI-gestütztes Angebotssystem",
          description: "(Angebote in Sekunden, nicht Stunden)",
        },
        {
          title: "Zentrales Kunden-Management (CRM)",
          description: "(Alle Anfragen direkt in einer App)",
        },
        {
          title: "Automatisierter Missed Call Text Back",
          description: "(Rettet Anrufe, wenn Sie nicht rangehen)",
        },
      ],
    },
    videoTestimonial: {
      url: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
      title: "Erfahrungsbericht Handwerk",
      description:
        "Wie dieser Betrieb durch unseren KI-Assistenten seine Anfragen verdoppelt hat.",
    },
    testimonials: [
      {
        title: "Elektro-Fachbetrieb (15 Mitarbeiter), Bayern",
        description:
          "Ergebnis: 42 Termine vollautomatisch gebucht im ersten Monat.\n\nWie: Durch den KI-Telefon-Assistenten wurden Anfragen direkt qualifiziert und eingebucht, während das gesamte Team auf der Baustelle im Einsatz war. Kein wichtiger Auftrag ging mehr verloren.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e2c1019e-7265-48e1-b03f-07ee277de34c.png",
      },
      {
        title: "Sanitär- & Heizungsbau (NRW)",
        description:
          "Ergebnis: Senkung der Fehlfahrten und Material-Verzögerungen um 70%.\n\nWie: Automatisierte Bestätigungsstrecke und digitale Vorab-Abfrage von Fotos der Baustelle. Der Monteur weiß schon vor der Abfahrt exakt, was ihn erwartet und welches Teil er braucht.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e3467e9b-4e19-472d-a362-434b2db9295f.png",
      },
      {
        title: "Schreinerei / Innenausbau (Berlin)",
        description:
          'Ergebnis: 100% Erreichbarkeit durch "Missed Call Text Back".\n\nWie: Jeder verpasste Anruf erhielt innerhalb von 30 Sekunden eine SMS-Antwort mit einem Link zur Terminbuchung. Das Ergebnis: 12 neue qualifizierte Leads pro Woche ohne einen einzigen Rückruf.',
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/fbb16852-5543-447f-a9a5-421b56223091.png",
      },
    ],
    websitePreview: {
      title: "So könnte Ihre neue Handwerker-Website aussehen",
      description:
        "Modern, schnell und perfekt für Smartphones optimiert. Sehen Sie selbst, wie wir Handwerksbetriebe online präsentieren – mit integrierter Terminbuchung, KI-Chat und automatisierter Anfragen-Erfassung.",
      beforeImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
      afterImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
    },
    faqs: [
      {
        question: "Wie gewinne ich als Handwerker mehr Kunden über Google?",
        answer:
          "Die meisten Kunden suchen heute online nach Handwerkern in ihrer Nähe. Durch lokale Suchmaschinenoptimierung (Local SEO) und einen gepflegten Google Business Eintrag sorgen wir dafür, dass Ihr Betrieb bei Suchanfragen in Ihrer Region ganz oben steht – auch ohne technisches Vorwissen.",
      },
      {
        question:
          "Brauche ich als kleiner Handwerksbetrieb überhaupt eine professionelle Webseite?",
        answer:
          "Ja, Ihre Webseite ist Ihr digitales Aushängeschild. Auch wenn Sie aktuell genug Aufträge haben, suchen gute Fachkräfte und lukrative Neukunden online nach Ihnen. Eine moderne, für Smartphones optimierte Webseite baut Vertrauen auf und hebt Sie von der Konkurrenz ab.",
      },
      {
        question:
          "Ich habe keine Ahnung von Technik und SEO. Können Sie alles übernehmen?",
        answer:
          "Absolut. Wir richten uns speziell an kleine und mittelständische Unternehmen (KMU), die sich auf ihr Handwerk konzentrieren wollen. Wir übernehmen die komplette Erstellung der Webseite, die Google-Optimierung und die Automatisierung Ihrer Kundenanfragen – schlüsselfertig und verständlich.",
      },
      {
        question:
          "Wie hilft mir eine neue Webseite dabei, Zeit im Büro zu sparen?",
        answer:
          "Eine intelligente Webseite verkauft und informiert für Sie. Durch integrierte Kontaktformulare, automatisierte Terminbuchungen und klare Antworten auf häufige Kundenfragen (FAQs) auf der Webseite rufen weniger Leute wegen Kleinigkeiten an. Sie erhalten qualifizierte Anfragen direkt auf Ihr Handy.",
      },
    ],
  };

  const dataEn: IndustryPageProps = {
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Construction site under control, phone in the office – we rescue your missed calls.",
      subtitle:
        "While the saw is running, our AI books your next jobs. Available 24/7 without you having to pick up.",
      buttonText: "Put Your Phone Aside - We Take Over.",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Missed calls in the noise? Every ring is a lost construction job.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
        title:
          "Quitting time means office work for you? End the paperwork until midnight.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title:
          "Customer can't reach you? They immediately call the next company.",
      },
    ],
    leadMagnet: {
      title: "From note chaos to autopilot: Secure your free automation plan.",
      description:
        "Imagine 3 annoying office tasks disappearing tomorrow – because AI does them. We take a look at your business and show you turnkey where you can immediately gain time. No technical knowledge required.",
      buttonText: "Request Free AI Check",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/a3c9dd74-8624-4cce-be45-1c029e9e5cd8.png",
    },
    workflow: {
      title: "From call to order – without you holding the receiver.",
      description:
        "Stop confirming appointments in the evening. Our system handles follow-ups fully automatically via SMS. While you push hard on the construction site, your calendar is filled in the background. Every prospect gets an immediate answer – no waiting, no forgetting.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/70eae435-8182-4919-8250-c8e7b34bfb4d.jpg",
    },
    benefits: {
      title: "Create more orders – without more time in the office.",
      description:
        "Growth usually means more paperwork. Not with us. Whether 5 or 50 inquiries: The system stays stable and has your back. This keeps your revenue predictable and your evening sacred.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7b604297-5c2c-490d-9ee2-c68d97f2ca18.png",
    },
    checkmarksSection: {
      title:
        "Wasting valuable time in the office? We automate your processes with intelligent systems so you can focus on your core business again.",
      subtitle:
        "Save valuable hours every week. More efficiency, less stress, better results.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7a661b8e-f320-46a9-8761-45f0d6b1e43e.png",
      list: [
        {
          title: "Automated appointment booking & SMS reminders",
          description: "(Prevents 90% of cancellations)",
        },
        {
          title: "AI-supported quote system",
          description: "(Quotes in seconds, not hours)",
        },
        {
          title: "Central Customer Management (CRM)",
          description: "(All inquiries directly in one app)",
        },
        {
          title: "Automated Missed Call Text Back",
          description: "(Saves calls when you can't answer)",
        },
      ],
    },
    videoTestimonial: {
      url: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
      title: "Craftsman Experience Report",
      description:
        "How this business doubled its inquiries through our AI assistant.",
    },
    testimonials: [
      {
        title: "Electrical Company (15 employees), Bavaria",
        description:
          "Result: 42 appointments fully automatically booked in the first month.\n\nHow: Through the AI telephone assistant, inquiries were directly qualified and booked while the entire team was on the construction site. No important order was lost anymore.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e2c1019e-7265-48e1-b03f-07ee277de34c.png",
      },
      {
        title: "Plumbing & Heating (NRW)",
        description:
          "Result: Reduction of wrong trips and material delays by 70%.\n\nHow: Automated confirmation sequence and digital pre-query of construction site photos. The fitter knows exactly what to expect and which part he needs before departure.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e3467e9b-4e19-472d-a362-434b2db9295f.png",
      },
      {
        title: "Carpentry / Interior (Berlin)",
        description:
          'Result: 100% availability through "Missed Call Text Back".\n\nHow: Every missed call received an SMS reply within 30 seconds with a link to book an appointment. The result: 12 new qualified leads per week without a single callback.',
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/fbb16852-5543-447f-a9a5-421b56223091.png",
      },
    ],
    websitePreview: {
      title: "This is what your new craftsman website could look like",
      description:
        "Modern, fast and perfectly optimized for smartphones. See for yourself how we present trades businesses online – with integrated appointment booking, AI chat and automated inquiry capture.",
      beforeImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
      afterImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
    },
    faqs: [
      {
        question: "How do I win more customers via Google as a craftsman?",
        answer:
          "Most customers today search online for tradespeople nearby. Through local search engine optimization (Local SEO) and a well-maintained Google Business listing, we ensure your business ranks at the top for searches in your region – without technical prior knowledge.",
      },
      {
        question:
          "Do I even need a professional website as a small trades business?",
        answer:
          "Yes, your website is your digital business card. Even if you currently have enough orders, good skilled workers and lucrative new customers search for you online. A modern, smartphone-optimized website builds trust and sets you apart from the competition.",
      },
      {
        question:
          "I have no idea about technology and SEO. Can you take care of everything?",
        answer:
          "Absolutely. We cater specifically to small and medium-sized enterprises (SMEs) that want to focus on their craft. We handle the complete creation of the website, Google optimization and the automation of your customer inquiries – turnkey and understandable.",
      },
      {
        question: "How does a new website help me save time in the office?",
        answer:
          "An intelligent website sells and informs for you. Through integrated contact forms, automated appointment bookings and clear answers to frequent customer questions (FAQs) on the website, fewer people call about little things. You receive qualified inquiries directly on your phone.",
      },
    ],
  };

  const dataTr: IndustryPageProps = {
    hero: {
      videoSrc:
        "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
      title:
        "Şantiye kontrol altında, telefon ofiste – kaçırılan aramalarınızı kurtarıyoruz.",
      subtitle:
        "Testere çalışırken yapay zekamız sonraki işlerinizi ayarlar. Siz açmadan 7/24 ulaşılabilir.",
      buttonText: "Telefonunuzuzu Bir Kenara Bırakın - Biz Devralıyoruz.",
    },
    painPoints: [
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
        title:
          "Gürültüde aramaları kaçırdınız mı? Her zil bir kayıp şantiye işi.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
        title:
          "Kapanma saati sizin için ofis işi mi demek? Gece yarısına kadar evrak işine son.",
      },
      {
        icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
        title: "Müşteri size ulaşamıyor mu? Hemen bir sonraki firmayı arıyor.",
      },
    ],
    leadMagnet: {
      title:
        "Not kaosundan otomatik pilota: Ücretsiz otomasyon planınızı garantileyin.",
      description:
        "Hayatınızdan 3 sinir bozucu ofis görevinin yarından itibaren kaybolmasını hayal edin – yapay zeka yapıyor. İşletmenize bakıyor ve nerede hemen zaman kazanacağınızı anahtar teslim gösteriyoruz. Teknik bilgi gerekmez.",
      buttonText: "Ücretsiz Yapay Zeka Kontrolü İste",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/a3c9dd74-8624-4cce-be45-1c029e9e5cd8.png",
    },
    workflow: {
      title: "Aramadan işe – ahizeyi tutmadan.",
      description:
        "Akşam randevuları onaylamayı bırakın. Sistemimiz takip işlemlerini SMS ile tam otomatik yürütür. Siz şantiyede hız yaparken, arka planda takviminiz dolar. Her ilgilenen anında yanıt alır – bekleme yok, unutma yok.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/70eae435-8182-4919-8250-c8e7b34bfb4d.jpg",
    },
    benefits: {
      title: "Daha fazla iş yaratın – ofiste daha fazla zaman olmadan.",
      description:
        "Büyüme normalde daha fazla evrak demek. Bizde değil. 5 veya 50 talep: Sistem kararlı kalır ve arkanızı kollar. Böylece geliriniz öngörülebilir ve akşamınız kutsal kalır.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7b604297-5c2c-490d-9ee2-c68d97f2ca18.png",
    },
    checkmarksSection: {
      title:
        "Ofiste değerli zaman mı kaybediyorsunuz? Süreçlerinizi akıllı sistemlerle otomatikleştiriyoruz, böylece tekrar ana işinize odaklanabilirsiniz.",
      subtitle:
        "Her hafta değerli saatler kazanın. Daha fazla verimlilik, daha az stres, daha iyi sonuçlar.",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/7a661b8e-f320-46a9-8761-45f0d6b1e43e.png",
      list: [
        {
          title: "Otomatik randevu & SMS hatırlatmalar",
          description: "(İptallerin %90'ını önler)",
        },
        {
          title: "Yapay zeka destekli teklif sistemi",
          description: "(Saatler değil saniyeler içinde teklifler)",
        },
        {
          title: "Merkezi Müşteri Yönetimi (CRM)",
          description: "(Tüm talepler doğrudan tek uygulamada)",
        },
        {
          title: "Otomatik Cevapsız Arama Geri Dönüşü",
          description: "(Cevap veremediğinizde aramaları kurtarır)",
        },
      ],
    },
    videoTestimonial: {
      url: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
      title: "Zanaatkâr Deneyim Raporu",
      description:
        "Bu işletme yapay zeka asistanımız ile taleplerini nasıl ikiye katladı.",
    },
    testimonials: [
      {
        title: "Elektrik Firması (15 çalışan), Bavyera",
        description:
          "Sonuç: İlk ayda 42 randevu tam otomatik ayarlandı.\n\nNasıl: Yapay zeka telefon asistanı ile talepler doğrudan nitelendirildi ve kaydedildi, tüm ekip şantiyedeyken. Hiçbir önemli iş daha fazla kaybolmadı.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e2c1019e-7265-48e1-b03f-07ee277de34c.png",
      },
      {
        title: "Tesisat & Isıtma (NRW)",
        description:
          "Sonuç: Yanlış seferler ve malzeme gecikmelerinde %70 azalma.\n\nNasıl: Otomatik onay dizisi ve şantiye fotoğraflarının dijital ön sorgusu. Montajcı yola çıkmadan önce neyle karşılaşacağını ve hangi parçaya ihtiyacı olduğunu tam olarak biliyor.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/e3467e9b-4e19-472d-a362-434b2db9295f.png",
      },
      {
        title: "Marangozhane / İç Mimari (Berlin)",
        description:
          'Sonuç: "Cevapsız Arama Geri Dönüşü" ile %100 ulaşılabilirlik.\n\nNasıl: Her kaçırılan arama 30 saniye içinde randevu linki içeren bir SMS yanıtı aldı. Sonuç: Tek bir geri arama olmadan haftada 12 yeni nitelikli müşteri.',
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/fbb16852-5543-447f-a9a5-421b56223091.png",
      },
    ],
    websitePreview: {
      title: "Yeni zanaatkâr web siteniz böyle olabilir",
      description:
        "Modern, hızlı ve akıllı telefonlar için mükemmel optimize. Zanaatkâr işletmelerini online nasıl sunduğumuzu kendiniz görün – entegre randevu, yapay zeka sohbeti ve otomatik talep yakalama ile.",
      beforeImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
      afterImage:
        "/media/vibe.filesafe.space/1778931020193405557/assets/b2e515e2-c9f8-4727-9cd4-9cfd4580e5af.png",
    },
    faqs: [
      {
        question:
          "Zanaatkâr olarak Google üzerinden nasıl daha fazla müşteri kazanırım?",
        answer:
          "Çoğu müşteri bugün çevresindeki zanaatkârları online arıyor. Yerel arama motoru optimizasyonu (Local SEO) ve iyi bakımlı bir Google İşletme kaydı ile işletmenizin bölgenizdeki aramalarda en üstte yer almasını sağlıyoruz – teknik ön bilgi olmadan.",
      },
      {
        question:
          "Küçük bir zanaatkâr işletmesi olarak profesyonel bir web sitesine ihtiyacım var mı?",
        answer:
          "Evet, web siteniz dijital vitrininizdir. Şu anda yeterli işiniz olsa bile, iyi kalifiye elemanlar ve kârlı yeni müşteriler sizi online arıyor. Modern, akıllı telefon için optimize bir web sitesi güven inşa eder ve sizi rakiplerden ayırır.",
      },
      {
        question:
          "Teknoloji ve SEO hakkında hiç bilgim yok. Her şeyi üstlenebilir misiniz?",
        answer:
          "Kesinlikle. Özellikle zanaatına odaklanmak isteyen küçük ve orta ölçekli işletmelere (KOBİ) yöneliyoruz. Web sitesinin tam oluşturulması, Google optimizasyonu ve müşteri taleplerinizin otomasyonunu üstleniyoruz – anahtar teslim ve anlaşılır.",
      },
      {
        question:
          "Yeni bir web sitesi ofiste zaman kazanmama nasıl yardımcı olur?",
        answer:
          "Akıllı bir web sitesi sizin için satar ve bilgilendirir. Entegre iletişim formları, otomatik randevular ve web sitesindeki sık müşteri sorularına (SSS) net yanıtlar sayesinde daha az kişi küçük şeyler için arıyor. Nitelikli talepleri doğrudan telefonunuza alırsınız.",
      },
    ],
  };

  const content: Record<string, IndustryPageProps> = {
    de: dataDe,
    en: dataEn,
    tr: dataTr,
  };
  const data = content[language] || dataDe;

  return (
    <>
      <SEO
        title={
          language === "en"
            ? "AI Call Rescue for Craftsmen | PS Professional Solutions"
            : language === "tr"
              ? "Zanaatkârlar için Yapay Zeka Arama Kurtarma | PS Professional Solutions"
              : "KI-Anruf-Rettung für Handwerker | PS Professional Solutions"
        }
        description={
          language === "en"
            ? "Don't miss any more orders. We automate availability and marketing for trades businesses nationwide."
            : language === "tr"
              ? "Daha fazla iş kaçırmayın. Zanaatkâr işletmeleri için ulaşılabilirlik ve pazarlamayı ulusal çapta otomatikleştiriyoruz."
              : "Verpassen Sie keine Aufträge mehr. Wir automatisieren Erreichbarkeit und Marketing für Handwerksbetriebe bundesweit."
        }
        keywords="Handwerker Marketing, KI Telefonassistent, Erreichbarkeit verbessern Handwerk"
        ogImage="/media/vibe.filesafe.space/1778931020193405557/attachments/43a309d7-acd4-49f0-bf96-43245c6d52b2.png"
        faqs={data.faqs}
      />
      <IndustryPage data={data} />
    </>
  );
}
