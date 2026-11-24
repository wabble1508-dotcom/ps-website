import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Globe, Smartphone, Users, Wrench, Sparkles, Plug } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";
import { WebsiteNovaSection } from "@/components/WebsiteNovaSection";

// Leistungsseite App-Entwicklung. Texte auf Deutsch, Englisch und Türkisch;
// die übrigen Sprachen kommen aus den Übersetzungs-Wörterbüchern (src/lib/i18n/dict).
type L = { de: string; en: string; tr: string };

const HERO = {
  kicker: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
  title: {
    de: "Ihre eigene App – programmiert statt zusammengeklickt.",
    en: "Your own app – coded, not clicked together.",
    tr: "Kendi uygulamanız – sürükle-bırak değil, gerçek kod.",
  },
  subtitle: {
    de: "Web-Apps und mobile Apps nach Maß für Ihr Unternehmen: von der Idee über den klickbaren Prototyp bis zum Livegang – alles aus einer Hand in Dortmund.",
    en: "Custom web and mobile apps for your business: from the idea and a clickable prototype to launch – all from one source in Dortmund.",
    tr: "İşletmeniz için özel web ve mobil uygulamalar: fikirden tıklanabilir prototipe ve yayına kadar – Dortmund'dan tek elden.",
  },
  cta: { de: "Projekt anfragen", en: "Request a project", tr: "Proje talep et" },
};

const SERVICES: { icon: typeof Globe; title: L; text: L }[] = [
  {
    icon: Globe,
    title: { de: "Web-Apps & PWAs", en: "Web apps & PWAs", tr: "Web uygulamaları ve PWA'lar" },
    text: {
      de: "Laufen direkt im Browser und lassen sich wie eine App auf dem Handy installieren – ohne App-Store.",
      en: "Run directly in the browser and can be installed on a phone like an app – no app store needed.",
      tr: "Doğrudan tarayıcıda çalışır ve uygulama mağazası olmadan telefona uygulama gibi kurulabilir.",
    },
  },
  {
    icon: Smartphone,
    title: { de: "iOS- & Android-Apps", en: "iOS & Android apps", tr: "iOS ve Android uygulamaları" },
    text: {
      de: "Mobile Apps für iPhone und Android – inklusive Veröffentlichung im App Store und bei Google Play.",
      en: "Mobile apps for iPhone and Android – including publishing on the App Store and Google Play.",
      tr: "iPhone ve Android için mobil uygulamalar – App Store ve Google Play'de yayın dahil.",
    },
  },
  {
    icon: Users,
    title: { de: "Kundenportale & Bonus-Apps", en: "Customer portals & loyalty apps", tr: "Müşteri portalları ve sadakat uygulamaları" },
    text: {
      de: "Buchungen, Bestellungen, Stempelkarten oder ein Login-Bereich für Ihre Kunden.",
      en: "Bookings, orders, stamp cards or a login area for your customers.",
      tr: "Randevular, siparişler, damga kartları veya müşterileriniz için giriş alanı.",
    },
  },
  {
    icon: Wrench,
    title: { de: "Interne Tools", en: "Internal tools", tr: "Dahili araçlar" },
    text: {
      de: "Dienstpläne, Auftragsverwaltung, Checklisten – Software, die genau zu Ihren Abläufen passt.",
      en: "Shift plans, order management, checklists – software that fits your processes exactly.",
      tr: "Vardiya planları, sipariş yönetimi, kontrol listeleri – süreçlerinize tam uyan yazılım.",
    },
  },
  {
    icon: Sparkles,
    title: { de: "KI-Funktionen", en: "AI features", tr: "AI özellikleri" },
    text: {
      de: "Chat-Assistenten, automatische Texte oder Auswertungen – direkt in Ihrer App.",
      en: "Chat assistants, automatic texts or analyses – built right into your app.",
      tr: "Sohbet asistanları, otomatik metinler veya analizler – doğrudan uygulamanızda.",
    },
  },
  {
    icon: Plug,
    title: { de: "Schnittstellen", en: "Integrations", tr: "Entegrasyonlar" },
    text: {
      de: "Anbindung an Kasse, CRM, Kalender, Zahlungsanbieter oder Ihre bestehende Software.",
      en: "Connections to your POS, CRM, calendar, payment provider or existing software.",
      tr: "Kasa, CRM, takvim, ödeme sağlayıcı veya mevcut yazılımınızla bağlantı.",
    },
  },
];

const STEPS: { title: L; text: L }[] = [
  {
    title: { de: "Erstgespräch & Konzept", en: "Consultation & concept", tr: "İlk görüşme ve konsept" },
    text: {
      de: "Wir klären Ziel, Funktionen und Budget. Sie erhalten ein verbindliches Angebot.",
      en: "We clarify goals, features and budget. You receive a binding quote.",
      tr: "Hedefi, özellikleri ve bütçeyi netleştiririz. Bağlayıcı bir teklif alırsınız.",
    },
  },
  {
    title: { de: "Klickbarer Prototyp", en: "Clickable prototype", tr: "Tıklanabilir prototip" },
    text: {
      de: "Sie sehen und testen Ihre App, bevor programmiert wird.",
      en: "You see and test your app before any code is written.",
      tr: "Kodlama başlamadan önce uygulamanızı görür ve test edersiniz.",
    },
  },
  {
    title: { de: "Entwicklung in Etappen", en: "Development in stages", tr: "Aşamalı geliştirme" },
    text: {
      de: "Regelmäßige Zwischenstände – Sie behalten jederzeit den Überblick.",
      en: "Regular progress updates – you always keep the overview.",
      tr: "Düzenli ara sonuçlar – her zaman genel bakışa sahipsiniz.",
    },
  },
  {
    title: { de: "Livegang & Betreuung", en: "Launch & support", tr: "Yayın ve destek" },
    text: {
      de: "Veröffentlichung, Hosting und Weiterentwicklung – auf Wunsch mit Wartungsvertrag.",
      en: "Publishing, hosting and further development – with a maintenance plan if you wish.",
      tr: "Yayın, hosting ve geliştirme – isterseniz bakım sözleşmesiyle.",
    },
  },
];

const PRICE = {
  title: { de: "Was kostet eine App?", en: "How much does an app cost?", tr: "Bir uygulama ne kadar?" },
  value: { de: "Projekte ab 4.900 €", en: "Projects from €4,900", tr: "Projeler 4.900 €'dan" },
  text: {
    de: "Jede App ist anders – deshalb erhalten Sie nach dem kostenlosen Erstgespräch ein individuelles, verbindliches Angebot. Wartung und Hosting ab 149 € im Monat.",
    en: "Every app is different – so after a free initial consultation you receive an individual, binding quote. Maintenance and hosting from €149 a month.",
    tr: "Her uygulama farklıdır – bu yüzden ücretsiz ilk görüşmeden sonra bireysel, bağlayıcı bir teklif alırsınız. Bakım ve hosting aylık 149 €'dan.",
  },
  points: [
    { de: "Fester Preis nach Angebot – keine Überraschungen", en: "Fixed price per quote – no surprises", tr: "Teklife göre sabit fiyat – sürpriz yok" },
    { de: "Sie erhalten die Rechte an Ihrer App", en: "You receive the rights to your app", tr: "Uygulamanızın haklarını alırsınız" },
    { de: "Persönlicher Ansprechpartner statt Callcenter", en: "A personal contact instead of a call centre", tr: "Çağrı merkezi yerine kişisel muhatap" },
  ] as L[],
  vat: {
    de: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    en: "In accordance with Section 19 UStG, no VAT is charged.",
    tr: "§ 19 UStG uyarınca KDV alınmaz.",
  },
};

// Einleitung (wichtig für Google: „App entwickeln lassen“, „App-Entwicklung Dortmund“, „App Agentur“)
const INTRO = {
  title: { de: "App entwickeln lassen in Dortmund", en: "Get your app developed in Dortmund", tr: "Dortmund'da uygulama geliştirtin" },
  paragraphs: [
    {
      de: "Sie möchten eine App entwickeln lassen, wissen aber nicht, wo Sie anfangen sollen? Wir sind eine kleine App-Agentur aus Dortmund und begleiten Sie von der ersten Idee bis zur fertigen App im App Store, bei Google Play oder im Browser. Sie haben dabei einen festen Ansprechpartner, der Ihre Branche versteht und Ihnen jede Entscheidung verständlich erklärt.",
      en: "You want to have an app developed but don't know where to start? We are a small app agency from Dortmund and guide you from the first idea to the finished app on the App Store, Google Play or in the browser. You have one fixed contact person who understands your industry and explains every decision clearly.",
      tr: "Bir uygulama geliştirtmek istiyorsunuz ama nereden başlayacağınızı bilmiyor musunuz? Dortmund'dan küçük bir uygulama ajansıyız ve ilk fikirden App Store'da, Google Play'de veya tarayıcıda yayındaki uygulamaya kadar size eşlik ediyoruz. Sektörünüzü anlayan ve her kararı anlaşılır şekilde açıklayan sabit bir muhatabınız olur.",
    },
    {
      de: "Wir entwickeln Apps für kleine und mittlere Unternehmen, Selbstständige und Start-ups: Buchungs- und Bestell-Apps, Bonus- und Stempelkarten-Apps, Kundenportale, Mitarbeiter-Apps für Dienstpläne und Aufträge sowie komplette SaaS-Plattformen. Programmiert wird mit modernen Technologien wie React und TypeScript – sauber, schnell und so, dass Ihre App später problemlos erweitert werden kann.",
      en: "We develop apps for small and medium-sized businesses, freelancers and start-ups: booking and ordering apps, loyalty and stamp card apps, customer portals, staff apps for shift plans and jobs, and complete SaaS platforms. We build with modern technologies such as React and TypeScript – clean, fast and ready to be extended later.",
      tr: "Küçük ve orta ölçekli işletmeler, serbest çalışanlar ve girişimler için uygulamalar geliştiriyoruz: randevu ve sipariş uygulamaları, sadakat ve damga kartı uygulamaları, müşteri portalları, vardiya ve iş takibi için çalışan uygulamaları ve eksiksiz SaaS platformları. React ve TypeScript gibi modern teknolojilerle geliştiriyoruz – temiz, hızlı ve sonradan kolayca genişletilebilir.",
    },
    {
      de: "Unsere Kunden kommen aus Dortmund, dem Ruhrgebiet und ganz Deutschland. Gespräche führen wir persönlich in Dortmund oder per Video. Zu unseren eigenen Projekten gehören die mobile App SkyJoin und die SaaS-Plattform WebsiteNova.",
      en: "Our clients come from Dortmund, the Ruhr area and all over Germany. We meet in person in Dortmund or by video. Our own projects include the mobile app SkyJoin and the SaaS platform WebsiteNova.",
      tr: "Müşterilerimiz Dortmund'dan, Ruhr bölgesinden ve tüm Almanya'dan geliyor. Görüşmeleri Dortmund'da yüz yüze veya görüntülü yapıyoruz. Kendi projelerimiz arasında mobil uygulama SkyJoin ve SaaS platformu WebsiteNova bulunuyor.",
    },
  ] as L[],
};

// Welche Art von App passt? (Vergleich für Suchanfragen wie „Web-App oder native App“)
const APP_TYPES: { title: L; text: L; best: L }[] = [
  {
    title: { de: "Web-App / PWA", en: "Web app / PWA", tr: "Web uygulaması / PWA" },
    text: {
      de: "Läuft im Browser auf jedem Gerät und lässt sich aufs Handy legen. Kein App-Store nötig, Updates sind sofort bei allen Nutzern.",
      en: "Runs in the browser on any device and can be added to the home screen. No app store needed, updates reach all users instantly.",
      tr: "Her cihazda tarayıcıda çalışır ve ana ekrana eklenebilir. Uygulama mağazası gerekmez, güncellemeler herkese anında ulaşır.",
    },
    best: { de: "Ideal für Kundenportale, Buchungen und interne Tools – meist die günstigste Lösung.", en: "Ideal for customer portals, bookings and internal tools – usually the most affordable option.", tr: "Müşteri portalları, randevular ve dahili araçlar için ideal – genellikle en uygun fiyatlı çözüm." },
  },
  {
    title: { de: "App für iOS & Android", en: "App for iOS & Android", tr: "iOS ve Android uygulaması" },
    text: {
      de: "Eine gemeinsame Codebasis für iPhone und Android, veröffentlicht im App Store und bei Google Play – mit Push-Nachrichten und Zugriff auf Kamera oder Standort.",
      en: "One shared codebase for iPhone and Android, published on the App Store and Google Play – with push notifications and access to camera or location.",
      tr: "iPhone ve Android için ortak bir kod tabanı, App Store ve Google Play'de yayında – anlık bildirimler, kamera veya konum erişimiyle.",
    },
    best: { de: "Ideal, wenn Kunden Ihre App im Store finden und täglich nutzen sollen.", en: "Ideal if customers should find your app in the store and use it daily.", tr: "Müşterilerin uygulamanızı mağazada bulup her gün kullanması gerekiyorsa ideal." },
  },
  {
    title: { de: "Plattform / SaaS", en: "Platform / SaaS", tr: "Platform / SaaS" },
    text: {
      de: "Eine komplette Software mit Benutzerkonten, Rollen, Abos und Bezahlung – wie unsere eigene Plattform WebsiteNova.",
      en: "Complete software with user accounts, roles, subscriptions and payments – like our own platform WebsiteNova.",
      tr: "Kullanıcı hesapları, roller, abonelikler ve ödemeyle eksiksiz bir yazılım – kendi platformumuz WebsiteNova gibi.",
    },
    best: { de: "Ideal für Geschäftsideen, bei denen die App selbst das Produkt ist.", en: "Ideal for business ideas where the app itself is the product.", tr: "Uygulamanın kendisinin ürün olduğu iş fikirleri için ideal." },
  },
];

const FAQ: { q: L; a: L }[] = [
  {
    q: { de: "Was kostet es, eine App entwickeln zu lassen?", en: "How much does it cost to have an app developed?", tr: "Bir uygulama geliştirtmek ne kadara mal olur?" },
    a: {
      de: "Das hängt vom Umfang ab. Einfache Web-Apps und Kundenportale beginnen bei uns ab 4.900 €, Apps für iOS und Android mit Benutzerkonten, Push-Nachrichten oder Bezahlung liegen entsprechend höher. Nach dem kostenlosen Erstgespräch erhalten Sie ein verbindliches Festpreis-Angebot. Hosting und Wartung gibt es ab 149 € im Monat.",
      en: "It depends on the scope. Simple web apps and customer portals start at €4,900 with us; iOS and Android apps with user accounts, push notifications or payments cost more accordingly. After the free initial consultation you receive a binding fixed-price quote. Hosting and maintenance start at €149 a month.",
      tr: "Kapsama bağlıdır. Basit web uygulamaları ve müşteri portalları bizde 4.900 €'dan başlar; kullanıcı hesapları, anlık bildirimler veya ödeme içeren iOS ve Android uygulamaları buna göre daha pahalıdır. Ücretsiz ilk görüşmeden sonra bağlayıcı sabit fiyatlı bir teklif alırsınız. Hosting ve bakım aylık 149 €'dan başlar.",
    },
  },
  {
    q: { de: "Wie lange dauert die Entwicklung einer App?", en: "How long does it take to develop an app?", tr: "Bir uygulamanın geliştirilmesi ne kadar sürer?" },
    a: {
      de: "Einen klickbaren Prototyp sehen Sie meist schon nach wenigen Tagen. Eine überschaubare Web-App ist je nach Umfang oft in einigen Wochen fertig, größere Apps mit vielen Funktionen brauchen entsprechend länger. Den genauen Zeitplan legen wir im Angebot fest.",
      en: "You usually see a clickable prototype within a few days. A manageable web app is often finished within a few weeks depending on scope; larger apps with many features take longer. We set the exact timeline in the quote.",
      tr: "Tıklanabilir bir prototipi genellikle birkaç gün içinde görürsünüz. Kapsamına göre makul bir web uygulaması çoğu zaman birkaç haftada hazır olur; çok özellikli büyük uygulamalar daha uzun sürer. Kesin zaman planını teklifte belirleriz.",
    },
  },
  {
    q: { de: "Web-App oder App im App Store – was ist besser?", en: "Web app or app store app – which is better?", tr: "Web uygulaması mı, mağaza uygulaması mı – hangisi daha iyi?" },
    a: {
      de: "Für Kundenportale, Buchungen und interne Tools reicht oft eine Web-App: Sie ist günstiger, sofort für alle nutzbar und braucht keine Freigabe durch Apple oder Google. Sollen Kunden Ihre App im Store finden, Push-Nachrichten erhalten oder Kamera und Standort nutzen, ist eine App für iOS und Android sinnvoll. Wir beraten Sie ehrlich, was zu Ihrem Ziel und Budget passt.",
      en: "For customer portals, bookings and internal tools a web app is often enough: it is more affordable, instantly usable by everyone and needs no approval from Apple or Google. If customers should find your app in the store, receive push notifications or use camera and location, an iOS and Android app makes sense. We give you honest advice on what fits your goal and budget.",
      tr: "Müşteri portalları, randevular ve dahili araçlar için çoğu zaman bir web uygulaması yeterlidir: daha uygun fiyatlıdır, herkes hemen kullanabilir ve Apple ya da Google onayı gerektirmez. Müşteriler uygulamanızı mağazada bulmalı, bildirim almalı veya kamera ve konum kullanmalıysa iOS ve Android uygulaması mantıklıdır. Hedefinize ve bütçenize neyin uyduğu konusunda dürüstçe danışmanlık veriyoruz.",
    },
  },
  {
    q: { de: "Gehört mir die App danach?", en: "Do I own the app afterwards?", tr: "Uygulama sonra bana mı ait olur?" },
    a: {
      de: "Ja. Sie erhalten die Nutzungsrechte an Ihrer App. Die Veröffentlichung erfolgt auf Wunsch über Ihr eigenes Entwicklerkonto bei Apple und Google, damit die App auch in den Stores unter Ihrem Namen erscheint.",
      en: "Yes. You receive the rights of use to your app. On request it is published via your own developer account with Apple and Google, so the app appears in the stores under your name.",
      tr: "Evet. Uygulamanızın kullanım haklarını alırsınız. İsterseniz yayın, Apple ve Google'daki kendi geliştirici hesabınız üzerinden yapılır; böylece uygulama mağazalarda sizin adınızla görünür.",
    },
  },
  {
    q: { de: "Betreuen Sie die App auch nach dem Livegang?", en: "Do you look after the app after launch?", tr: "Yayından sonra da uygulamayla ilgileniyor musunuz?" },
    a: {
      de: "Ja. Auf Wunsch übernehmen wir Hosting, Updates für neue iOS- und Android-Versionen, Fehlerbehebung und Weiterentwicklung – ab 149 € im Monat, monatlich kündbar.",
      en: "Yes. On request we take care of hosting, updates for new iOS and Android versions, bug fixes and further development – from €149 a month, cancellable monthly.",
      tr: "Evet. İsterseniz hosting, yeni iOS ve Android sürümleri için güncellemeler, hata giderme ve geliştirmeyi üstleniyoruz – aylık 149 €'dan, aylık iptal edilebilir.",
    },
  },
  {
    q: { de: "Arbeiten Sie nur mit Kunden aus Dortmund?", en: "Do you only work with clients from Dortmund?", tr: "Sadece Dortmund'daki müşterilerle mi çalışıyorsunuz?" },
    a: {
      de: "Nein. Unser Sitz ist in Dortmund, wir entwickeln Apps aber für Unternehmen im ganzen Ruhrgebiet – etwa in Bochum, Essen, Unna oder Lünen – und online für Kunden in ganz Deutschland.",
      en: "No. We are based in Dortmund, but we develop apps for businesses across the Ruhr area – for example in Bochum, Essen, Unna or Lünen – and online for clients all over Germany.",
      tr: "Hayır. Merkezimiz Dortmund'da, ancak tüm Ruhr bölgesindeki işletmeler için – örneğin Bochum, Essen, Unna veya Lünen'de – ve online olarak tüm Almanya'daki müşteriler için uygulama geliştiriyoruz.",
    },
  },
];

const RELATED_LINKS: { to: string; label: L }[] = [
  { to: "/software-entwicklung", label: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" } },
  { to: "/webdesign-dortmund", label: { de: "Webdesign Dortmund", en: "Web design Dortmund", tr: "Web tasarım Dortmund" } },
  { to: "/webdesign-ruhrgebiet", label: { de: "Webdesign Ruhrgebiet", en: "Web design Ruhr area", tr: "Web tasarım Ruhr bölgesi" } },
  { to: "/preise", label: { de: "Preise & Pakete", en: "Prices & packages", tr: "Fiyatlar ve paketler" } },
  { to: "/magazin", label: { de: "Magazin", en: "Magazine", tr: "Dergi" } },
];

// Kunden-Projekte, die auf der App-Seite als Referenz gezeigt werden
const REFERENCES: { name: string; logo: string; text: L }[] = [
  {
    name: "SkyJoin",
    logo: "/media/kunden/skyjoin.jpg",
    text: { de: "Mobile App", en: "Mobile app", tr: "Mobil uygulama" },
  },
  {
    name: "WebsiteNova",
    logo: "/media/kunden/websitenova.jpg",
    text: { de: "SaaS-Plattform", en: "SaaS platform", tr: "SaaS platformu" },
  },
];

const SECTION_TITLES = {
  references: { de: "Apps & Plattformen, die wir entwickelt haben", en: "Apps & platforms we have built", tr: "Geliştirdiğimiz uygulamalar ve platformlar" },
  services: { de: "Was wir für Sie entwickeln", en: "What we build for you", tr: "Sizin için neler geliştiriyoruz" },
  steps: { de: "So läuft Ihr App-Projekt ab", en: "How your app project works", tr: "Uygulama projeniz nasıl ilerler" },
  types: { de: "Welche App passt zu Ihnen?", en: "Which app suits you?", tr: "Size hangi uygulama uygun?" },
  faq: { de: "Häufige Fragen zur App-Entwicklung", en: "FAQ on app development", tr: "Uygulama geliştirme hakkında sık sorulanlar" },
  related: { de: "Das könnte Sie auch interessieren", en: "You might also be interested in", tr: "Bunlar da ilginizi çekebilir" },
  final: {
    de: "Sie haben eine App-Idee? Lassen Sie uns darüber sprechen.",
    en: "Have an app idea? Let's talk about it.",
    tr: "Bir uygulama fikriniz mi var? Konuşalım.",
  },
  finalBtn: { de: "Kostenloses Erstgespräch", en: "Free initial consultation", tr: "Ücretsiz ilk görüşme" },
};

export default function AppEntwicklungPage() {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const enquire = () => openForm("contact", "App-Entwicklung");

  return (
    <div className="w-full bg-background">
      <SEO
        title="App-Entwicklung Dortmund | Web-Apps & mobile Apps | PS Professional Solutions"
        description="App-Entwicklung aus Dortmund: Web-Apps, iOS- und Android-Apps, Kundenportale und interne Tools nach Maß. Vom Prototyp bis zum Livegang – Projekte ab 4.900 €."
        canonical="/app-entwicklung"
        keywords="App Entwicklung Dortmund, App entwickeln lassen, App Agentur Dortmund, App Entwickler Dortmund, iOS App entwickeln lassen, Android App entwickeln lassen, Web-App entwickeln lassen, App programmieren lassen, App Entwicklung Kosten, App Entwicklung Ruhrgebiet"
        localBusiness
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "App-Entwicklung",
          serviceType: "App-Entwicklung (Web-Apps, iOS- und Android-Apps)",
          description: "App entwickeln lassen in Dortmund: Web-Apps, iOS- und Android-Apps, Kundenportale und interne Tools nach Maß. Projekte ab 4.900 €.",
          url: "https://ps-professional-solutions.de/app-entwicklung",
          provider: { "@id": "https://ps-professional-solutions.de/#business" },
          areaServed: [{ "@type": "City", name: "Dortmund" }, { "@type": "AdministrativeArea", name: "Ruhrgebiet" }, { "@type": "Country", name: "Deutschland" }],
          offers: { "@type": "Offer", priceCurrency: "EUR", price: "4900", description: "Projekte ab 4.900 €" },
        }}
        faqs={FAQ.map((f) => ({ question: pick(f.q), answer: pick(f.a) }))}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 text-center text-white lg:py-28">
        <FadeIn className="container relative z-10 mx-auto max-w-3xl px-4">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {pick(HERO.kicker)}
          </span>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">{pick(HERO.title)}</h1>
          <p className="mb-8 text-lg text-white/85 md:text-xl">{pick(HERO.subtitle)}</p>
          <Button size="lg" className="rounded-full" onClick={enquire}>
            {pick(HERO.cta)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </FadeIn>
      </section>

      <section className="py-16 md:py-20">
        <FadeIn className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">{pick(INTRO.title)}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {INTRO.paragraphs.map((p) => (
              <p key={p.de}>{pick(p)}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.services)}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <FadeIn key={title.de} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{pick(title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(text)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.references)}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {REFERENCES.map((ref) => (
              <FadeIn key={ref.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img src={ref.logo} alt={ref.name} className="aspect-[1000/560] w-full object-cover" loading="lazy" />
                <div className="p-4 text-center">
                  <p className="font-bold text-foreground">{ref.name}</p>
                  <p className="text-sm text-muted-foreground">{pick(ref.text)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.types)}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {APP_TYPES.map((t) => (
              <FadeIn key={t.title.de} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">{pick(t.title)}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{pick(t.text)}</p>
                <p className="flex items-start gap-2 text-sm font-semibold text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {pick(t.best)}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <WebsiteNovaSection />

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.steps)}</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title.de} className="rounded-2xl bg-card p-6 shadow-sm">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-bold text-foreground">{pick(step.title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(step.text)}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <FadeIn className="container mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-primary bg-card p-8 text-center shadow-xl shadow-primary/10">
            <h2 className="mb-2 text-2xl font-bold text-foreground">{pick(PRICE.title)}</h2>
            <p className="mb-4 text-4xl font-black text-primary">{pick(PRICE.value)}</p>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">{pick(PRICE.text)}</p>
            <ul className="mx-auto mb-8 max-w-md space-y-2 text-left">
              {PRICE.points.map((p) => (
                <li key={p.de} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {pick(p)}
                </li>
              ))}
            </ul>
            <Button size="lg" className="rounded-full" onClick={enquire}>
              {pick(HERO.cta)} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">{pick(PRICE.vat)}</p>
          </div>
        </FadeIn>
      </section>

      {/* Häufige Fragen: <details>, damit die Antworten im HTML stehen (Google & KI-Suchen) */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.faq)}</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q.de} className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{pick(f.q)}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{pick(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold text-foreground">{pick(SECTION_TITLES.related)}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {RELATED_LINKS.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {pick(r.label)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark bg-secondary py-16 text-center text-white">
        <FadeIn className="container mx-auto max-w-2xl px-4">
          <h2 className="mb-6 text-3xl font-bold">{pick(SECTION_TITLES.final)}</h2>
          <Button size="lg" variant="secondary" className="rounded-full" onClick={enquire}>
            {pick(SECTION_TITLES.finalBtn)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
