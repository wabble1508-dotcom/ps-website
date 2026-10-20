import { IndustryPage } from "@/components/IndustryPage";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/components/LanguageContext";
import { FadeIn } from "@/components/FadeIn";

export default function GesundheitswesenPage() {
  const { language } = useLanguage();

  const content = {
    de: {
      seo: {
        title:
          "PS Professional Solutions | Digitale Praxis & KI-Automatisierung Dortmund",
        description:
          "Revolutionieren Sie Ihren Praxisalltag in Dortmund. KI-Telefon-Assistent, automatisierte Terminbuchung & SEO für Ärzte. Gewinnen Sie 10 Stunden Patientenzeit pro Woche zurück. Jetzt Gratis-Check buchen!",
        keywords:
          "KI Telefonassistent Praxis, Digitalisierung Gesundheitswesen Dortmund, Patienten, Physiotherapie Dortmund, Physiotherapie Rossa",
      },
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1778931020193405557/attachments/9c691161-716a-42f9-b6c3-a345f56e8321.png",
      ],
      customPartnerTitle:
        "Erfolgreicher Referenz-Kunde: Physiotherapie Rossa Dortmund",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title:
          "Patienten im Fokus, das Telefon im Griff – wir retten Ihre verpassten Anrufe.",
        subtitle:
          "Während Sie behandeln, bucht unsere KI Ihre nächsten Termine. 24/7 erreichbar, damit keine Anfrage verloren geht.",
        buttonText: "Mehr Zeit für Patienten - Jetzt starten.",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Telefon im Behandlungsstress überhört? Jedes Freizeichen ohne Antwort ist ein unversorgter Patient.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Feierabend heißt bei Ihnen Patientenakten pflegen? Beenden Sie den administrativen Stress nach der Sprechstunde.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Patient erreicht Sie nicht? Er sucht frustriert nach der nächsten freien Sprechstunde bei der Konkurrenz.",
        },
      ],
      leadMagnet: {
        title:
          "Vom Zettelchaos zum Autopiloten: Sichern Sie sich Ihren Gratis-Automatisierungs-Plan.",
        description:
          "Stellen Sie sich vor, 3 nervige Büro-Aufgaben fallen ab morgen weg – weil die KI sie macht. Wir werfen einen Blick auf Ihren Betrieb und zeigen Ihnen schlüsselfertig, wo Sie sofort Zeit gewinnen. Kein technisches Wissen nötig.",
        buttonText: "Kostenlosen KI-Check Anfordern",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "Patienten am Telefon, Hände an der Arbeit – Wir managen Ihre Termine.",
        description:
          "Hören Sie auf, wertvolle Zeit mit Terminabsagen und Rückrufen zu verschwenden. Unser System übernimmt das Patienten-Management vollautomatisch. Während Sie sich im Behandlungszimmer voll auf Ihre Patienten konzentrieren, wird im Hintergrund Ihr Kalender koordiniert. Jeder Patient bekommt sofort eine Bestätigung – kein Besetztzeichen, kein langes Warten, keine vergessenen Termine.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d423db02-a69d-46fa-90e9-1ca12f8b0adb.png",
      },
      checkmarksSection: {
        title:
          "Verlieren Sie wertvolle Zeit am Empfang? Wir automatisieren Ihr Patienten-Management mit KI, damit Sie sich wieder auf die Medizin konzentrieren können.",
        subtitle:
          "Schluss mit überlasteten Leitungen und Stress am Empfang. Sparen Sie jede Woche wertvolle Stunden.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d96e9675-aff3-4aea-be8a-9b6508d555ad.png",
        list: [
          {
            title: "KI-Telefon-Assistent & Rezept-Hotline",
            description:
              "(Nimmt Anrufe rund um die Uhr an und filtert Anliegen vor)",
          },
          {
            title: "Automatisierte Terminbuchung & SMS-Erinnerungen",
            description: "(Reduziert No-Shows um bis zu 90%)",
          },
          {
            title: "Zentrales Patienten-Management (CRM)",
            description:
              "(Alle Anfragen aus Web, Telefon und Mail in einer sicheren App)",
          },
          {
            title: "Digitaler Anruf-Rückbeantwortung (Missed Call Text Back)",
            description:
              "(Schickt sofort eine SMS, wenn die Praxis besetzt ist)",
          },
        ],
      },
      testimonials: [
        {
          title: "Facharztpraxis (Dortmund)",
          description:
            "Ergebnis: 65 Termine vollautomatisch gebucht im ersten Monat.\n\nWie: Die KI qualifiziert Anfragen vorab und bucht sie direkt in den Kalender. Ihr Team wird entlastet und kann sich voll auf die Patienten vor Ort konzentrieren.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/e672104f-6d1a-43fa-aa15-f711ac4aa99a.png",
        },
        {
          title: "Physiotherapie Rossa Dortmund",
          description:
            "Ergebnis: Senkung der Terminausfälle (No-Shows) um 85% & 24/7 digitale Terminvergabe.\n\nWie: Automatisierte Bestätigungen, smarte SMS-Terminerinnerungen und digitale Vorab-Anamnese. Therapeuten sparen über 10 Stunden Organisationszeit pro Woche.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/attachments/aea7ca54-708c-4a41-b5e0-160020f1bcad.png",
        },
        {
          title: "Zahnarztpraxis / Kieferorthopädie (Berlin)",
          description:
            'Ergebnis: 100% Erreichbarkeit durch "Missed Call Text Back"\n\nWie: Jeder verpasste Anruf erhält innerhalb von 30 Sekunden eine SMS mit Buchungslink. Ergebnis: 12 neue Patienten pro Woche – ohne einen einzigen Rückruf.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/861d9bbc-a913-4778-a29d-31f14d9b8e78.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/DQ9XO4OQsEM?rel=0",
        title: "Unsere Lösung im Einsatz",
        description:
          "Wie Sie durch unseren KI-Assistenten Ihre Anfragen verdoppeln.",
      },
      faqs: [
        {
          question: "Wie entlastet die Termin-Automation mein Praxis-Team?",
          answer:
            "Durch die digitale Patientenaufnahme und Online-Terminbuchung fallen zeitfressende Telefonate weg. Ihr Team am Empfang wird massiv entlastet und kann sich voll auf die Patientenbetreuung vor Ort in Dortmund konzentrieren, während das System die Terminplanung vollautomatisch im Hintergrund erledigt.",
        },
        {
          question: "Ist die Online-Terminvergabe sicher und DSGVO-konform?",
          answer:
            "Absolut. Im Gesundheitswesen hat der Schutz sensibler Patientendaten oberste Priorität. Unsere Lösung nutzt verschlüsselte Datenübertragung (SSL) und speichert Informationen nach strengsten deutschen Datenschutzrichtlinien. So bleibt die ärztliche Schweigepflicht auch im digitalen Prozess zu 100% gewahrt.",
        },
        {
          question:
            "Verhindert das System aktiv Terminausfälle in meiner Praxis?",
          answer:
            "Ja. Durch automatisierte Terminerinnerungen via SMS oder E-Mail werden sogenannte No-Shows drastisch reduziert. Patienten können Termine zudem frühzeitig online verschieben oder absagen, sodass der frei gewordene Slot sofort wieder für andere Patienten in der Warteliste verfügbar ist.",
        },
        {
          question:
            "Kann das System zwischen verschiedenen Behandlungsarten unterscheiden?",
          answer:
            "Definitiv. Sie können für jede Behandlungsart (z.B. Erstuntersuchung, Vorsorge oder Akut-Termin) individuelle Zeitfenster und Pufferzeiten definieren. Die KI stellt sicher, dass nur Termine gebucht werden, die in Ihren Praxis-Workflow passen, und vermeidet so ein überfülltes Wartezimmer.",
        },
      ],
    },
    en: {
      seo: {
        title:
          "PS Professional Solutions | Digital Practice & AI Automation Dortmund",
        description:
          "Revolutionize your daily practice in Dortmund. AI telephone assistant, automated appointment booking & SEO for doctors. Regain 10 hours of patient time per week. Book a free check now!",
        keywords:
          "AI telephone assistant practice, digitization healthcare Dortmund, patients, Physiotherapy Dortmund, Physiotherapie Rossa",
      },
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1778931020193405557/attachments/aea7ca54-708c-4a41-b5e0-160020f1bcad.png",
      ],
      customPartnerTitle:
        "Featured Healthcare Partner: Physiotherapie Rossa Dortmund",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title:
          "Patients in focus, phone under control – we rescue your missed calls.",
        subtitle:
          "While you treat, our AI books your next appointments. Available 24/7 so no inquiry is lost.",
        buttonText: "More time for patients - Start now.",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Phone missed in treatment stress? Every unanswered ring is an unsupplied patient.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Quitting time means maintaining patient records for you? End the administrative stress after consultation hours.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Patient can't reach you? They frustratedly look for the next available consultation at the competition.",
        },
      ],
      leadMagnet: {
        title:
          "From paper chaos to autopilot: Secure your free automation plan.",
        description:
          "Imagine 3 annoying office tasks disappearing tomorrow – because AI does them. We take a look at your business and show you turnkey solutions where you can immediately gain time. No technical knowledge required.",
        buttonText: "Request Free AI Check",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title:
          "Patients on the phone, hands at work – We manage your appointments.",
        description:
          "Stop wasting valuable time with appointment cancellations and callbacks. Our system takes over patient management fully automatically. While you concentrate fully on your patients in the treatment room, your calendar is coordinated in the background. Every patient receives immediate confirmation – no busy signal, no long waiting, no forgotten appointments.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d423db02-a69d-46fa-90e9-1ca12f8b0adb.png",
      },
      checkmarksSection: {
        title:
          "Are you losing valuable time at reception? We automate your patient management with AI so you can focus on medicine again.",
        subtitle:
          "No more overloaded lines and stress at reception. Save valuable hours every week.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d96e9675-aff3-4aea-be8a-9b6508d555ad.png",
        list: [
          {
            title: "AI Telephone Assistant & Prescription Hotline",
            description:
              "(Takes calls around the clock and pre-filters concerns)",
          },
          {
            title: "Automated Appointment Booking & SMS Reminders",
            description: "(Reduces no-shows by up to 90%)",
          },
          {
            title: "Central Patient Management (CRM)",
            description:
              "(All inquiries from web, phone and mail in one secure app)",
          },
          {
            title: "Digital Missed Call Text Back",
            description: "(Immediately sends an SMS when the practice is busy)",
          },
        ],
      },
      testimonials: [
        {
          title: "Specialist Practice (Dortmund)",
          description:
            "Result: 65 appointments fully automatically booked in the first month.\n\nHow: The AI pre-qualifies inquiries and books them directly into the calendar. Your team is relieved and can focus entirely on the patients on site.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/e672104f-6d1a-43fa-aa15-f711ac4aa99a.png",
        },
        {
          title: "Physiotherapie Rossa Dortmund",
          description:
            "Result: 85% drop in missed appointments (no-shows) & 24/7 digital booking.\n\nHow: Automated reminders, digital patient intake and SMS confirmations save therapists over 10 hours of administrative work each week.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/attachments/aea7ca54-708c-4a41-b5e0-160020f1bcad.png",
        },
        {
          title: "Dental Practice / Orthodontics (Berlin)",
          description:
            'Result: 100% availability through "Missed Call Text Back"\n\nHow: Every missed call receives an SMS with a booking link within 30 seconds. Result: 12 new patients per week – without a single callback.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/861d9bbc-a913-4778-a29d-31f14d9b8e78.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/DQ9XO4OQsEM?rel=0",
        title: "Our Solution in Action",
        description: "How our AI assistant can double your inquiries.",
      },
      faqs: [
        {
          question: "How does appointment automation relieve my practice team?",
          answer:
            "Digital patient admission and online appointment booking eliminate time-consuming phone calls. Your reception team is massively relieved and can fully concentrate on patient care on site in Dortmund, while the system handles scheduling fully automatically in the background.",
        },
        {
          question:
            "Is online appointment scheduling secure and GDPR-compliant?",
          answer:
            "Absolutely. In healthcare, the protection of sensitive patient data has top priority. Our solution uses encrypted data transmission (SSL) and stores information according to the strictest German data protection guidelines. Medical confidentiality is thus 100% maintained even in the digital process.",
        },
        {
          question:
            "Does the system actively prevent appointment cancellations in my practice?",
          answer:
            "Yes. Automated appointment reminders via SMS or email drastically reduce so-called no-shows. Patients can also postpone or cancel appointments early online, so the freed-up slot is immediately available again for other patients on the waiting list.",
        },
        {
          question:
            "Can the system distinguish between different types of treatment?",
          answer:
            "Definitely. You can define individual time windows and buffer times for each type of treatment (e.g., initial examination, preventive care, or acute appointment). The AI ensures that only appointments are booked that fit into your practice workflow, avoiding an overcrowded waiting room.",
        },
      ],
    },
    tr: {
      seo: {
        title:
          "PS Professional Solutions | Dijital Pratik & Yapay Zeka Otomasyonu Dortmund",
        description:
          "Dortmund'daki pratik gününüzü devrimleştirin. Yapay zeka telefon asistanı, otomatik randevu ve doktorlar için SEO. Haftada 10 saat hasta zamanı kazanın. Şimdi ücretsiz kontrol ayırın!",
        keywords:
          "Pratik yapay zeka telefon asistanı, Sağlık dijitalleşmesi Dortmund, Hastalar, Fizyoterapi Dortmund, Physiotherapie Rossa",
      },
      customPartnerLogos: [
        "/media/vibe.filesafe.space/1778931020193405557/attachments/aea7ca54-708c-4a41-b5e0-160020f1bcad.png",
      ],
      customPartnerTitle:
        "Öne Çıkan Sağlık Ortağı: Physiotherapie Rossa Dortmund",
      hero: {
        videoSrc:
          "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4",
        title:
          "Hastalar odakta, telefon kontrol altında – kaçırılan aramalarınızı kurtarıyoruz.",
        subtitle:
          "Siz tedavi ederken yapay zekamız sonraki randevuları ayarlar. 7/24 ulaşılabilir, hiçbir talep kaybolmaz.",
        buttonText: "Hastalar için daha fazla zaman - Şimdi başla.",
      },
      painPoints: [
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
          title:
            "Tedavi stresinde telefonu kaçırdınız mı? Cevapsız her zil bakımsız bir hasta demek.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
          title:
            "Kapanma saati sizin için hasta dosyası bakımı mı demek? Konsültasyon sonrası idari strese son verin.",
        },
        {
          icon: "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
          title:
            "Hasta size ulaşamıyor mu? Rakipte bir sonraki müsait konsültasyonu hayal kırıklığıyla arıyor.",
        },
      ],
      leadMagnet: {
        title:
          "Kağıt kaosundan otomatik pilota: Ücretsiz otomasyon planınızı garantileyin.",
        description:
          "Hayatınızdan 3 sinir bozucu ofis görevinin yarından itibaren kaybolmasını hayal edin – yapay zeka yapıyor. İşletmenize bakıyor ve nerede hemen zaman kazanacağınızı anahtar teslim gösteriyoruz. Teknik bilgi gerekmez.",
        buttonText: "Ücretsiz Yapay Zeka Kontrolü İste",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png",
      },
      workflow: {
        title: "Telefonda hastalar, eller işte – Randevularınızı yönetiyoruz.",
        description:
          "Randevu iptalleri ve geri aramalarla değerli zaman kaybetmeyi bırakın. Sistemimiz hasta yönetimini tam otomatik üstlenir. Siz tedavi odasında hastalarınıza tam odaklanırken, arka planda takviminiz koordine edilir. Her hasta anında onay alır – meşgul sinyali yok, uzun bekleme yok, unutulan randevu yok.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d423db02-a69d-46fa-90e9-1ca12f8b0adb.png",
      },
      checkmarksSection: {
        title:
          "Resepsiyonda değerli zaman mı kaybediyorsunuz? Hasta yönetiminizi yapay zeka ile otomatikleştiriyoruz, böylece tekrar tıbba odaklanabilirsiniz.",
        subtitle:
          "Aşırı yüklenmiş hatlara ve resepsiyonda strese son. Her hafta değerli saatler kazanın.",
        image:
          "/media/vibe.filesafe.space/1778931020193405557/assets/d96e9675-aff3-4aea-be8a-9b6508d555ad.png",
        list: [
          {
            title: "Yapay Zeka Telefon Asistanı & Reçete Hattı",
            description:
              "(Günün her saatinde aramaları yanıtlar ve talepleri önceden filtreler)",
          },
          {
            title: "Otomatik Randevu & SMS Hatırlatmalar",
            description: "(Gelmeyenleri %90'a kadar azaltır)",
          },
          {
            title: "Merkezi Hasta Yönetimi (CRM)",
            description:
              "(Web, telefon ve e-posta talepleri tek güvenli uygulamada)",
          },
          {
            title: "Dijital Cevapsız Arama Geri Dönüşü",
            description: "(Pratik meşgulken anında SMS gönderir)",
          },
        ],
      },
      testimonials: [
        {
          title: "Uzman Pratiği (Dortmund)",
          description:
            "Sonuç: İlk ayda 65 randevu tam otomatik ayarlandı.\n\nNasıl: Yapay zeka talepleri ön nitelendirir ve doğrudan takvime kaydeder. Ekibiniz rahatlar ve yerdeki hastalara tam odaklanabilir.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/e672104f-6d1a-43fa-aa15-f711ac4aa99a.png",
        },
        {
          title: "Physiotherapie Rossa Dortmund",
          description:
            "Sonuç: Randevu iptallerinde (gelmemeler) %85 azalma & 7/24 dijital randevu.\n\nNasıl: Otomatik hatırlatmalar, dijital hasta kaydı ve SMS onayları terapistlere haftada 10 saatten fazla idari zaman kazandırır.",
          image:
            "/media/vibe.filesafe.space/1778931020193405557/attachments/aea7ca54-708c-4a41-b5e0-160020f1bcad.png",
        },
        {
          title: "Diş Pratiği / Ortodonti (Berlin)",
          description:
            'Sonuç: "Cevapsız Arama Geri Dönüşü" ile %100 ulaşılabilirlik\n\nNasıl: Her kaçırılan arama 30 saniye içinde randevu linki içeren SMS alır. Sonuç: Haftada 12 yeni hasta – tek bir geri arama olmadan.',
          image:
            "/media/vibe.filesafe.space/1778931020193405557/assets/861d9bbc-a913-4778-a29d-31f14d9b8e78.png",
        },
      ],
      videoTestimonial: {
        url: "https://www.youtube.com/embed/DQ9XO4OQsEM?rel=0",
        title: "Çözümümüz Aksiyonda",
        description:
          "Yapay zeka asistanımız taleplerinizi nasıl ikiye katlayabilir.",
      },
      faqs: [
        {
          question: "Randevu otomasyonu pratik ekibimi nasıl rahatlatır?",
          answer:
            "Dijital hasta kabul ve online randevu, zaman tüketen telefon görüşmelerini ortadan kaldırır. Resepsiyon ekibiniz büyük ölçüde rahatlar ve sistem arka planda zamanlamayı tam otomatik yürütürken Dortmund'da yerdeki hasta bakımına tam odaklanabilir.",
        },
        {
          question: "Online randevu güvenli ve KVKK/GDPR uyumlu mu?",
          answer:
            "Kesinlikle. Sağlıkta hassas hasta verilerinin korunması en yüksek önceliğe sahiptir. Çözümümüz şifreli veri aktarımı (SSL) kullanır ve bilgileri en katı Alman veri koruma yönergelerine göre saklar. Tıbbi sır dijital süreçte de %100 korunur.",
        },
        {
          question:
            "Sistem pratikte randevu iptallerini aktif olarak önler mi?",
          answer:
            "Evet. SMS veya e-posta ile otomatik randevu hatırlatmaları gelmeme oranını büyük ölçüde azaltır. Hastalar randevuları erken online erteleyebilir veya iptal edebilir, böylece boşalan slot hemen bekleme listesindeki diğer hastalar için yeniden müsait olur.",
        },
        {
          question: "Sistem farklı tedavi türleri arasında ayrım yapabilir mi?",
          answer:
            "Kesinlikle. Her tedavi türü (örn. ilk muayene, koruyucu bakım veya akut randevu) için bireysel zaman penceresi ve tampon süre tanımlayabilirsiniz. Yapay zeka, yalnızca pratik iş akışınıza uyan randevuların ayarlanmasını sağlar ve böylece kalabalık bir bekleme odası önlenir.",
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
        ogImage="/media/vibe.filesafe.space/1778931020193405557/attachments/bcc34588-a3fc-45fa-8078-9646b445d833.png"
        faqs={currentData.faqs}
      />
      <IndustryPage data={currentData} />
    </>
  );
}
