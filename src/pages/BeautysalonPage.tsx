import { IndustryPage } from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";

export default function BeautysalonPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      seo: {
        title: "Automatisierung für Beautysalons — PS Professional Solutions",
        description:
          "Ihr Salon auf Autopilot. Vollautomatische Termine, Online-Buchungen und weniger Ausfälle für Ihren Beauty-Salon.",
        keywords:
          "Beautysalon, Friseur, Terminbuchung, Automatisierung, KI, Salon Software",
      },
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1778931020193405557/attachments/b0d176a1-eb5e-4139-953f-f6ebd8af6d1a.png", // Lilyum Cosmetics
        "/media/vibe.filesafe.space/1778931020193405557/attachments/e109f0da-e936-4668-955f-5484b6b3917e.png", // PureSkin Bochum
        "/media/vibe.filesafe.space/1778931020193405557/attachments/5ec2ed97-535c-4ec2-8c6b-c5b459c2f643.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/1581d816-62fb-42c0-934a-b764b6c059a5.png",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/b8943ca4-7beb-4f04-9a19-6a27cb624eb0.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/679d3f78-3acb-4ba2-ae74-6d056734ab5f.jpg",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/b644a54f-e4a4-4718-846c-d73a3ab96bb2.png",
        "/media/vibe.filesafe.space/1778931020193405557/attachments/3c0772b0-8ceb-4ebb-84cd-f7152044fa7c.png",
      ],
      customPartnerTitle:
        "Erfolgreiche Partner-Salons (Lilyum Cosmetics, PureSkin Bochum, Istanbul Barbershop, Caracalla & mehr)",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69d8eab7a4e6aa34cb82ef4c.mp4",
        title: "Ihr Salon auf Autopilot – Mehr Zeit für das Wesentliche.",
        subtitle:
          "Verwandeln Sie Anfragen in feste Termine. Vollautomatisch, 24/7 erreichbar und perfekt organisiert.",
        buttonText: "Kostenlose Salon-Analyse anfordern",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Feierabend heißt bei Ihnen Büroarbeit? Schluss mit dem Terminzettel-Chaos bis Mitternacht.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Anrufe im Föhnlärm überhört? Jedes Klingeln ohne Antwort ist eine verlorene Kundin.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Kunde erreicht Sie nicht? Er bucht sofort beim nächsten Salon in der Nähe.",
        },
      ],
      leadMagnet: {
        title:
          "Vom Terminchaos zum Autopiloten: Sichern Sie sich Ihren Gratis-Automatisierungs-Plan.",
        description:
          "Stellen Sie sich vor, 3 nervige Aufgaben zwischen Haarschnitt und Kasse fallen ab morgen weg – weil die KI sie übernimmt. Wir werfen einen Blick auf Ihren Salon und zeigen Ihnen schlüsselfertig, wie Sie sofort mehr Zeit für Ihre Kunden gewinnen. Kein technisches Wissen nötig.",
        buttonText: "Kostenlosen KI-Check anfordern",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "Vom Anruf zum vollen Terminbuch – ohne dass Sie den Föhn beiseitelegen.",
        description:
          "Hören Sie auf, abends noch Termine zu bestätigen. Unser System übernimmt das Nachfassen vollautomatisch per SMS. Während Sie im Salon kreativ sind, wird im Hintergrund Ihr Kalender gefüllt. Jeder Interessent bekommt sofort eine Antwort – kein Warten, kein Vergessen.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
      },
      benefits: {
        title: "Mehr Kunden begeistern – ohne mehr Zeit im Büro.",
        description:
          "Ein voller Salon bedeutet normalerweise mehr Papierkram. Bei uns nicht. Egal ob 5 oder 50 Anfragen: Das System bleibt stabil und hält Ihnen den Rücken frei. So bleibt Ihr Umsatz planbar und Ihr Feierabend heilig.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
      },
      checkmarksSection: {
        title:
          "Verschwenden Sie wertvolle Zeit mit Papierkram? Wir automatisieren Ihre Salon-Abläufe, damit Sie sich wieder voll auf die Schönheit Ihrer Kunden konzentrieren können.",
        subtitle:
          "Schluss mit Termin-Chaos und verpassten Kundinnen. Sparen Sie jede Woche wertvolle Stunden.",
        image:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
        list: [
          {
            title: "Automatisierte Terminbuchung & SMS-Erinnerung",
            description: "(Verhindert 90% der teuren Terminausfälle)",
          },
          {
            title: "KI-gestützte Beratung & Buchung",
            description:
              "(Termine werden auch nachts vergeben, während Sie schlafen)",
          },
          {
            title: "Zentrales Kunden-Management (CRM)",
            description: "(Alle Kunden-Anfragen & Behandlungen in einer App)",
          },
          {
            title: "Automatisierter Missed Call Text Back",
            description:
              "(Rettet Neukunden, wenn Sie gerade eine Behandlung machen und nicht rangehen können)",
          },
        ],
      },
      testimonials: [
        {
          title: "Premium Hair-Salon (NRW)",
          description:
            'Ergebnis: Senkung der Terminausfälle um 85%.\n\nWie: Durch die automatisierte SMS-Erinnerungsstrecke und eine integrierte Anzahlungsfunktion für Neukunden. Kein Geldverlust mehr durch "No-Shows".',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/65a52476-273a-4d5d-b335-995561191917.png",
        },
        {
          title: "Kosmetik- & Laser-Praxis (Dortmund)",
          description:
            "Ergebnis: 100% Erreichbarkeit ohne Rezeptionskraft.\n\nWie: Der KI-Telefon-Assistent bucht Termine direkt ins System, während das Team Laser-Behandlungen durchführt. 35 neue Buchungen vollautomatisch im ersten Monat.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/d96ddb74-9244-4555-9131-4d6ba35a0f4a.png",
        },
        {
          title: "Nagel- & Lash-Studio (Berlin)",
          description:
            'Ergebnis: 12 neue Leads pro Woche über Instagram & Website.\n\nWie: Automatisierter "Missed Call Text Back" und sofortige Antwort-Bots auf Anfragen. Jede Interessentin erhält innerhalb von 30 Sekunden eine Rückmeldung.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/8327775c-56bc-45cd-9bdc-0e97555f23ae.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/7SEMZ-6fEhg?rel=0",
        title: "Kundenstimme Beauty-Salon",
        description:
          "Wie dieser Salon durch KI-Automatisierung 10 Stunden pro Woche spart und Ausfälle reduziert.",
      },
      faqs: [
        {
          question: "Kann ich die Buchung von einer Anzahlung abhängig machen?",
          answer:
            "Ja, das ist bei hochpreisigen Behandlungen absolut ratsam. Kunden können direkt bei der Online-Terminbuchung eine Reservierungsgebühr via PayPal oder Kreditkarte leisten. Das sorgt für maximale Verbindlichkeit und schützt Sie vor Umsatzeinbußen durch kurzfristige Absagen.",
        },
        {
          question:
            "Was passiert, wenn ich während einer Behandlung angerufen werde?",
          answer:
            "Ihr neuer KI-gesteuerter Buchungsassistent übernimmt das für Sie. Statt die Arbeit am Kunden zu unterbrechen, Ihr System den Anrufer sanft zur Online-Terminauswahl. So sichern Sie sich neue Termine, während Sie sich zu 100% auf Ihr Handwerk konzentrieren können.",
        },
        {
          question: "Wie werden meine Kunden an ihre Termine erinnert?",
          answer:
            "Um No-Shows (Nichterscheinen) fast vollständig zu eliminieren, sendet das System automatisierte SMS- und WhatsApp-Reminder (z. B. 24 Stunden vorher). Ihre Kunden in Dortmund schätzen diesen exklusiven Service, und Ihr Terminkalender bleibt profitabel ausgelastet.",
        },
        {
          question: "Können Kunden auch Zusatzleistungen direkt mitbuchen?",
          answer:
            "Definitiv. Sie können den Buchungsprozess so einstellen, dass Kunden direkt Upsells oder Zusatzservices (z. B. Haarkur, Wimpern färben oder Spezial-Finish) auswählen. Das erhöht Ihren Durchschnittsumsatz pro Kunde vollautomatisch, ohne dass Sie aktiv verkaufen müssen.",
        },
      ],
    },
    en: {
      seo: {
        title: "Automation for Beauty Salons — PS Professional Solutions",
        description:
          "Your salon on autopilot. Fully automated appointments, online bookings, and fewer cancellations for your beauty salon.",
        keywords:
          "Beauty salon, Hairdresser, Appointment booking, Automation, AI, Salon Software",
      },
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69d8eab7a4e6aa34cb82ef4c.mp4",
        title: "Your salon on autopilot – More time for the essentials.",
        subtitle:
          "Turn inquiries into firm appointments. Fully automated, available 24/7, and perfectly organized.",
        buttonText: "Request Free Salon Analysis",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Does quitting time mean office work for you? End the appointment slip chaos until midnight.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Missed calls in the hairdryer noise? Every unanswered ring is a lost customer.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Customer can't reach you? They immediately book at the next salon nearby.",
        },
      ],
      leadMagnet: {
        title:
          "From appointment chaos to autopilot: Secure your free automation plan.",
        description:
          "Imagine 3 annoying tasks between haircut and checkout disappearing tomorrow – because AI takes them over. We take a look at your salon and show you turnkey solutions on how to immediately gain more time for your customers. No technical knowledge required.",
        buttonText: "Request Free AI Check",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "From call to full appointment book – without putting the hairdryer aside.",
        description:
          "Stop confirming appointments in the evening. Our system handles follow-ups fully automatically via SMS. While you're creative in the salon, your calendar is filled in the background. Every prospect gets an immediate answer – no waiting, no forgetting.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
      },
      benefits: {
        title: "Inspire more customers – without more time in the office.",
        description:
          "A full salon usually means more paperwork. Not with us. Whether 5 or 50 inquiries: The system remains stable and has your back. This keeps your revenue predictable and your evening sacred.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
      },
      checkmarksSection: {
        title:
          "Are you wasting valuable time with paperwork? We automate your salon processes so you can fully concentrate on the beauty of your customers again.",
        subtitle:
          "End appointment chaos and missed customers. Save valuable hours every week.",
        image:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
        list: [
          {
            title: "Automated appointment booking & SMS reminder",
            description:
              "(Prevents 90% of expensive appointment cancellations)",
          },
          {
            title: "AI-supported consultation & booking",
            description:
              "(Appointments are also given at night while you sleep)",
          },
          {
            title: "Central Customer Management (CRM)",
            description: "(All customer inquiries & treatments in one app)",
          },
          {
            title: "Automated Missed Call Text Back",
            description:
              "(Saves new customers when you are currently doing a treatment and cannot answer)",
          },
        ],
      },
      testimonials: [
        {
          title: "Premium Hair Salon (NRW)",
          description:
            'Result: Reduction of appointment cancellations by 85%.\n\nHow: Through the automated SMS reminder sequence and an integrated deposit function for new customers. No more money lost through "no-shows".',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/65a52476-273a-4d5d-b335-995561191917.png",
        },
        {
          title: "Cosmetics & Laser Practice (Dortmund)",
          description:
            "Result: 100% availability without a receptionist.\n\nHow: The AI telephone assistant books appointments directly into the system while the team performs laser treatments. 35 new bookings fully automatically in the first month.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/d96ddb74-9244-4555-9131-4d6ba35a0f4a.png",
        },
        {
          title: "Nail & Lash Studio (Berlin)",
          description:
            'Result: 12 new leads per week via Instagram & Website.\n\nHow: Automated "Missed Call Text Back" and instant reply bots for inquiries. Every interested party receives feedback within 30 seconds.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/8327775c-56bc-45cd-9bdc-0e97555f23ae.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/7SEMZ-6fEhg?rel=0",
        title: "Customer Testimonial Beauty Salon",
        description:
          "How this salon saves 10 hours per week and reduces cancellations through AI automation.",
      },
      faqs: [
        {
          question: "Can I make the booking dependent on a deposit?",
          answer:
            "Yes, this is absolutely advisable for high-priced treatments. Customers can pay a reservation fee via PayPal or credit card directly during online appointment booking. This ensures maximum commitment and protects you from revenue losses due to short-term cancellations.",
        },
        {
          question: "What happens if I am called during a treatment?",
          answer:
            "Your new AI-controlled booking assistant takes care of that for you. Instead of interrupting the work on the customer, your system gently guides the caller to online appointment selection. This secures new appointments while you can concentrate 100% on your craft.",
        },
        {
          question: "How are my customers reminded of their appointments?",
          answer:
            "To almost completely eliminate no-shows, the system sends automated SMS and WhatsApp reminders (e.g., 24 hours in advance). Your customers in Dortmund appreciate this exclusive service, and your appointment calendar remains profitably utilized.",
        },
        {
          question: "Can customers also book additional services directly?",
          answer:
            "Definitely. You can set up the booking process so that customers can directly select upsells or additional services (e.g., hair treatment, eyelash tinting, or special finish). This fully automatically increases your average revenue per customer without you having to actively sell.",
        },
      ],
    },
    tr: {
      seo: {
        title: "Güzellik Salonları için Otomasyon — PS Professional Solutions",
        description:
          "Salonunuz otomatik pilotta. Tam otomatik randevular, online rezervasyonlar ve beauty salonunuz için daha az iptal.",
        keywords:
          "Güzellik salonu, Kuaför, Randevu, Otomasyon, Yapay Zeka, Salon Yazılımı",
      },
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69d8eab7a4e6aa34cb82ef4c.mp4",
        title: "Salonunuz otomatik pilotta – Özüne daha çok zaman.",
        subtitle:
          "Talepleri kesin randevulara dönüştürün. Tam otomatik, 7/24 ulaşılabilir ve mükemmel organize.",
        buttonText: "Ücretsiz Salon Analizi İste",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Kapanma saati sizin için ofis işi mi demek? Gece yarısına kadar randevu kaosuna son.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Saç kurutma gürültüsünde aramaları kaçırdınız mı? Cevapsız her zil bir kayıp müşteri.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Müşteri size ulaşamıyor mu? Hemen yakındaki bir sonraki salona gidiyor.",
        },
      ],
      leadMagnet: {
        title:
          "Randevu kaosundan otomatik pilota: Ücretsiz otomasyon planınızı garantileyin.",
        description:
          "Hayatınızdan 3 sinir bozucu görevin yarından itibaren kaybolmasını hayal edin – yapay zeka üstleniyor. Salonunuza bakıyor ve müşterileriniz için nasıl daha fazla zaman kazanacağınızı anahtar teslim gösteriyoruz. Teknik bilgi gerekmez.",
        buttonText: "Ücretsiz Yapay Zeka Kontrolü İste",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title: "Aramadan dolu randevu defterine – saç kurutmayı bırakmadan.",
        description:
          "Akşam randevuları onaylamayı bırakın. Sistemimiz takip işlemlerini SMS ile tam otomatik yürütür. Siz salonda yaratıcıyken, arka planda takviminiz dolar. Her ilgilenen anında yanıt alır – bekleme yok, unutma yok.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/aa5aae20-bf3a-4d0f-83a3-016c6fade722.png",
      },
      benefits: {
        title:
          "Daha fazla müşteriye ilham verin – ofiste daha fazla zaman olmadan.",
        description:
          "Dolu bir salon normalde daha fazla evrak demek. Bizde değil. 5 veya 50 talep: Sistem kararlı kalır ve arkanızı kollar. Böylece geliriniz öngörülebilir ve akşamınız kutsal kalır.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/69315927-1c72-481c-9ea3-adacca2087b2.png",
      },
      checkmarksSection: {
        title:
          "Evrakla değerli zaman mı kaybediyorsunuz? Salon süreçlerinizi otomatikleştiriyoruz, böylece tekrar müşterilerinizin güzelliğine tam odaklanabilirsiniz.",
        subtitle:
          "Randevu kaosuna ve kayıp müşterilere son. Her hafta değerli saatler kazanın.",
        image:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69dbfea7a4e6aa34cb09da91.png",
        list: [
          {
            title: "Otomatik randevu & SMS hatırlatma",
            description: "(Pahalı randevu iptallerinin %90'ını önler)",
          },
          {
            title: "Yapay zeka destekli danışmanlık & rezervasyon",
            description: "(Siz uyurken gece bile randevular verilir)",
          },
          {
            title: "Merkezi Müşteri Yönetimi (CRM)",
            description: "(Tüm müşteri talepleri ve tedaviler tek uygulamada)",
          },
          {
            title: "Otomatik Cevapsız Arama Geri Dönüşü",
            description:
              "(Tedavi yaparken cevap veremediğinizde yeni müşterileri kurtarır)",
          },
        ],
      },
      testimonials: [
        {
          title: "Premium Saç Salonu (NRW)",
          description:
            'Sonuç: Randevu iptallerinde %85 azalma.\n\nNasıl: Otomatik SMS hatırlatma dizisi ve yeni müşteriler için entegre depozito işlevi. "Gelmeyenler" nedeniyle para kaybı yok.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/65a52476-273a-4d5d-b335-995561191917.png",
        },
        {
          title: "Kozmetik & Lazer Pratiği (Dortmund)",
          description:
            "Sonuç: Resepsiyonist olmadan %100 ulaşılabilirlik.\n\nNasıl: Yapay zeka telefon asistanı randevuları doğrudan sisteme kaydederken ekip lazer tedavileri yapıyor. İlk ayda 35 yeni otomatik rezervasyon.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/d96ddb74-9244-4555-9131-4d6ba35a0f4a.png",
        },
        {
          title: "Tırnak & Kirpik Stüdyosu (Berlin)",
          description:
            'Sonuç: Instagram & Web sitesi üzerinden haftada 12 yeni müşteri.\n\nNasıl: Otomatik "Cevapsız Arama Geri Dönüşü" ve anında yanıt botları. Her ilgilenen 30 saniye içinde geri bildirim alır.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/8327775c-56bc-45cd-9bdc-0e97555f23ae.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/7SEMZ-6fEhg?rel=0",
        title: "Müşteri Görüşü Güzellik Salonu",
        description:
          "Bu salon yapay zeka otomasyonu ile haftada 10 saat nasıl tasarruf ediyor ve iptalleri azaltıyor.",
      },
      faqs: [
        {
          question: "Rezervasyonu bir depozitoya bağlayabilir miyim?",
          answer:
            "Evet, yüksek fiyatlı tedaviler için kesinlikle tavsiye edilir. Müşteriler online randevu sırasında PayPal veya kredi kartı ile rezervasyon ücreti ödeyebilir. Bu maksimum bağlılık sağlar ve kısa süreli iptallerden kaynaklanan gelir kayıplarına karşı korur.",
        },
        {
          question: "Tedavi sırasında aranırsam ne olur?",
          answer:
            "Yeni yapay zeka destekli rezervasyon asistanınız bunu sizin için üstlenir. Müşteri üzerindeki çalışmayı bölmek yerine sisteminiz arayan kişiyi nazikçe online randevu seçimine yönlendirir. Böylece kendinizi %100 zanaatınıza odaklarken yeni randevular güvence altına alınır.",
        },
        {
          question: "Müşterilerim randevularına nasıl hatırlatılır?",
          answer:
            "Gelmeyenleri neredeyse tamamen ortadan kaldırmak için sistem otomatik SMS ve WhatsApp hatırlatmaları gönderir (örn. 24 saat önceden). Dortmund'daki müşterileriniz bu özel hizmeti takdir eder ve randevu takviminiz kârlı dolu kalır.",
        },
        {
          question: "Müşteriler ek hizmetleri de doğrudan rezerve edebilir mi?",
          answer:
            "Kesinlikle. Rezervasyon sürecini, müşterilerin doğrudan ek satışlar veya ek hizmetler (örn. saç bakımı, kirpik boyama veya özel finish) seçebileceği şekilde ayarlayabilirsiniz. Bu, ortalama müşteri başına gelirinizi aktif satış yapmadan tam otomatik artırır.",
        },
      ],
    },
  };

  const currentData = content[language] || content.de;

  return (
    <>
      <SEO
        title={currentData.seo.title}
        description={currentData.seo.description}
        keywords={currentData.seo.keywords}
        faqs={currentData.faqs}
      />
      <IndustryPage data={currentData} />
    </>
  );
}
