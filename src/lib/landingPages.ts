import {
  BadgeEuro,
  Ban,
  Code2,
  Globe,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Plug,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
  CalendarCheck,
} from "lucide-react";

// Inhalte der SEO-Landingpages (günstige Website, kostenlose Website, Webdesign Dortmund,
// Software-Entwicklung). Texte auf Deutsch, Englisch und Türkisch; die übrigen Sprachen
// kommen aus den Übersetzungs-Wörterbüchern (src/lib/i18n/dict).
// Wichtig für Werbeaussagen: keine Ranking-Garantien, „kostenlos“ nur ehrlich als 0 € Einrichtung.

export type L = { de: string; en: string; tr: string };

export type LandingData = {
  path: string;
  seo: { title: L; description: L; keywords: string; service: string };
  hero: { kicker: L; title: L; subtitle: L; badges: L[]; cta: L };
  intro: { title: L; paragraphs: L[] };
  features: { title: L; items: { icon: typeof Globe; title: L; text: L }[] };
  comparison?: boolean;
  steps: { title: L; items: { title: L; text: L }[] };
  references?: boolean;
  price: { title: L; value: L; text: L };
  faq: { q: L; a: L }[];
  related: string[];
  final: { title: L; text: L };
  localBusiness?: boolean;
};

export const UI = {
  faqTitle: { de: "Häufige Fragen", en: "Frequently asked questions", tr: "Sık sorulan sorular" },
  relatedTitle: { de: "Das könnte Sie auch interessieren", en: "You might also be interested in", tr: "Bunlar da ilginizi çekebilir" },
  referencesTitle: { de: "Apps & Plattformen, die wir entwickelt haben", en: "Apps & platforms we have built", tr: "Geliştirdiğimiz uygulamalar ve platformlar" },
  prices: { de: "Alle Preise ansehen", en: "See all prices", tr: "Tüm fiyatları gör" },
  freeCall: { de: "Kostenloses Erstgespräch", en: "Free initial consultation", tr: "Ücretsiz ilk görüşme" },
  vat: {
    de: "Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    en: "All prices are final prices. In accordance with Section 19 of the German VAT Act (UStG), no VAT is charged.",
    tr: "Tüm fiyatlar nihai fiyatlardır. Alman KDV Kanunu § 19 UStG uyarınca KDV alınmaz.",
  },
};

// Ziel-Seiten für „Das könnte Sie auch interessieren“
export const RELATED: Record<string, L> = {
  "/guenstige-website": { de: "Günstige Website ab 49 €", en: "Affordable website from €49", tr: "49 €'dan uygun fiyatlı web sitesi" },
  "/kostenlose-website": { de: "Kostenlose Website – die Alternative", en: "Free website – the alternative", tr: "Ücretsiz web sitesi – alternatif" },
  "/webdesign-dortmund": { de: "Webdesign Dortmund", en: "Web design Dortmund", tr: "Web tasarım Dortmund" },
  "/webseiten": { de: "Website erstellen lassen", en: "Get a website built", tr: "Web sitesi yaptırın" },
  "/app-entwicklung": { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
  "/software-entwicklung": { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" },
  "/preise": { de: "Preise & Pakete", en: "Prices & packages", tr: "Fiyatlar ve paketler" },
  "/ki-live-chat": { de: "KI-Live-Chat", en: "AI live chat", tr: "AI canlı sohbet" },
  "/google-business-optimierung": { de: "Google-Unternehmensprofil", en: "Google Business Profile", tr: "Google İşletme Profili" },
};

// Vergleich der Möglichkeiten (günstige und kostenlose Website)
export const COMPARISON = {
  title: {
    de: "Website für wenig Geld: die Möglichkeiten im Vergleich",
    en: "A website on a small budget: the options compared",
    tr: "Az parayla web sitesi: seçeneklerin karşılaştırması",
  },
  columns: [
    { de: "Baukasten kostenlos", en: "Free website builder", tr: "Ücretsiz site oluşturucu" },
    { de: "Baukasten Premium", en: "Premium website builder", tr: "Premium site oluşturucu" },
    { de: "Klassische Agentur", en: "Traditional agency", tr: "Klasik ajans" },
    { de: "PS Professional Solutions", en: "PS Professional Solutions", tr: "PS Professional Solutions" },
  ] as L[],
  rows: [
    {
      label: { de: "Startkosten", en: "Upfront cost", tr: "Başlangıç maliyeti" },
      values: [
        { de: "0 €", en: "€0", tr: "0 €" },
        { de: "0 €", en: "€0", tr: "0 €" },
        { de: "oft mehrere tausend Euro", en: "often several thousand euros", tr: "çoğu zaman birkaç bin euro" },
        { de: "0 €", en: "€0", tr: "0 €" },
      ],
    },
    {
      label: { de: "Laufende Kosten", en: "Running costs", tr: "Sürekli maliyet" },
      values: [
        { de: "0 €", en: "€0", tr: "0 €" },
        { de: "monatliches Abo", en: "monthly subscription", tr: "aylık abonelik" },
        { de: "Hosting & Änderungen extra", en: "hosting & changes extra", tr: "hosting ve değişiklikler ekstra" },
        { de: "ab 49 €/Monat, alles inklusive", en: "from €49/month, all inclusive", tr: "aylık 49 €'dan, her şey dahil" },
      ],
    },
    {
      label: { de: "Eigene Adresse (Domain)", en: "Your own domain", tr: "Kendi alan adınız" },
      values: [
        { de: "nein, Adresse des Anbieters", en: "no, the provider's address", tr: "hayır, sağlayıcının adresi" },
        { de: "ja", en: "yes", tr: "evet" },
        { de: "ja", en: "yes", tr: "evet" },
        { de: "ja", en: "yes", tr: "evet" },
      ],
    },
    {
      label: { de: "Werbung des Anbieters", en: "Provider advertising", tr: "Sağlayıcı reklamı" },
      values: [
        { de: "ja", en: "yes", tr: "evet" },
        { de: "nein", en: "no", tr: "hayır" },
        { de: "nein", en: "no", tr: "hayır" },
        { de: "nein", en: "no", tr: "hayır" },
      ],
    },
    {
      label: { de: "Wer baut die Website?", en: "Who builds the website?", tr: "Siteyi kim yapıyor?" },
      values: [
        { de: "Sie selbst", en: "you", tr: "siz" },
        { de: "Sie selbst", en: "you", tr: "siz" },
        { de: "die Agentur", en: "the agency", tr: "ajans" },
        { de: "wir – komplett für Sie", en: "we do – everything for you", tr: "biz – tamamen sizin için" },
      ],
    },
    {
      label: { de: "Änderungen", en: "Changes", tr: "Değişiklikler" },
      values: [
        { de: "selbst machen", en: "do it yourself", tr: "kendiniz yaparsınız" },
        { de: "selbst machen", en: "do it yourself", tr: "kendiniz yaparsınız" },
        { de: "meist kostenpflichtig", en: "usually charged", tr: "genellikle ücretli" },
        { de: "1 pro Monat inklusive", en: "1 per month included", tr: "ayda 1 dahil" },
      ],
    },
    {
      label: { de: "Programmiert & schnell", en: "Hand-coded & fast", tr: "Kodlanmış ve hızlı" },
      values: [
        { de: "nein", en: "no", tr: "hayır" },
        { de: "nein", en: "no", tr: "hayır" },
        { de: "je nach Agentur", en: "depends on the agency", tr: "ajansa göre değişir" },
        { de: "ja", en: "yes", tr: "evet" },
      ],
    },
  ],
  note: {
    de: "Allgemeine Richtwerte zur Orientierung. Konditionen einzelner Anbieter können abweichen.",
    en: "General guide values for orientation. Individual providers' terms may differ.",
    tr: "Yönlendirme amaçlı genel değerlerdir. Sağlayıcıların koşulları farklı olabilir.",
  },
};

const WEBSITE_STEPS = {
  title: { de: "In 4 Schritten zu Ihrer Website", en: "Your website in 4 steps", tr: "4 adımda web siteniz" },
  items: [
    {
      title: { de: "Kostenloses Gespräch", en: "Free consultation", tr: "Ücretsiz görüşme" },
      text: {
        de: "Wir besprechen kurz, was Ihr Betrieb braucht. Sie erhalten ein verbindliches Angebot.",
        en: "We briefly discuss what your business needs. You receive a binding quote.",
        tr: "İşletmenizin neye ihtiyacı olduğunu kısaca konuşuruz. Bağlayıcı bir teklif alırsınız.",
      },
    },
    {
      title: { de: "Wir bauen Ihre Website", en: "We build your website", tr: "Sitenizi biz yaparız" },
      text: {
        de: "Sie schicken uns Texte, Fotos und Ihr Logo – den Rest programmieren wir.",
        en: "You send us texts, photos and your logo – we code the rest.",
        tr: "Metinleri, fotoğrafları ve logonuzu gönderirsiniz – gerisini biz kodlarız.",
      },
    },
    {
      title: { de: "Prüfen & freigeben", en: "Review & approve", tr: "Kontrol ve onay" },
      text: {
        de: "Sie sehen die fertige Seite vorab und sagen uns, was noch angepasst werden soll.",
        en: "You preview the finished site and tell us what should still be adjusted.",
        tr: "Hazır sayfayı önceden görür, nelerin değişmesi gerektiğini söylersiniz.",
      },
    },
    {
      title: { de: "Online & bei Google", en: "Online & on Google", tr: "Yayında ve Google'da" },
      text: {
        de: "Ihre Website geht live, und wir richten Ihr Google-Unternehmensprofil ein.",
        en: "Your website goes live and we set up your Google Business Profile.",
        tr: "Siteniz yayına girer ve Google İşletme Profilinizi kurarız.",
      },
    },
  ],
};

const START_FEATURES = {
  title: {
    de: "Website für unter 50 € im Monat – das ist drin",
    en: "A website for under €50 a month – what's included",
    tr: "Ayda 50 €'nun altında web sitesi – neler dahil",
  },
  items: [
    {
      icon: Code2,
      title: { de: "Programmiert statt Baukasten", en: "Coded, not a site builder", tr: "Site oluşturucu değil, kodlanmış" },
      text: {
        de: "Schnelle Ladezeiten, saubere Technik für Google und ein Design, das zu Ihrem Betrieb passt.",
        en: "Fast loading times, clean code for Google and a design that suits your business.",
        tr: "Hızlı yükleme, Google için temiz teknik ve işletmenize uyan bir tasarım.",
      },
    },
    {
      icon: Smartphone,
      title: { de: "Perfekt auf dem Smartphone", en: "Perfect on smartphones", tr: "Akıllı telefonda kusursuz" },
      text: {
        de: "Die meisten Kunden suchen mit dem Handy – Ihre Seite sieht dort genauso gut aus.",
        en: "Most customers search on their phone – your site looks just as good there.",
        tr: "Müşterilerin çoğu telefondan arar – siteniz orada da aynı derecede iyi görünür.",
      },
    },
    {
      icon: MapPin,
      title: { de: "Google Maps, Anruf & WhatsApp", en: "Google Maps, call & WhatsApp", tr: "Google Maps, arama ve WhatsApp" },
      text: {
        de: "Kunden finden Sie, rufen mit einem Fingertipp an oder schreiben Ihnen direkt.",
        en: "Customers find you, call with one tap or message you directly.",
        tr: "Müşteriler sizi bulur, tek dokunuşla arar veya doğrudan yazar.",
      },
    },
    {
      icon: Search,
      title: { de: "Google-Unternehmensprofil", en: "Google Business Profile", tr: "Google İşletme Profili" },
      text: {
        de: "Wir richten Ihren Eintrag bei Google ein, damit Sie in der lokalen Suche erscheinen.",
        en: "We set up your Google listing so you appear in local search.",
        tr: "Yerel aramada görünmeniz için Google kaydınızı kurarız.",
      },
    },
    {
      icon: ShieldCheck,
      title: { de: "Hosting, SSL & Updates", en: "Hosting, SSL & updates", tr: "Hosting, SSL ve güncellemeler" },
      text: {
        de: "Sicher verschlüsselt, schnell gehostet und technisch immer aktuell – ohne Aufwand für Sie.",
        en: "Securely encrypted, fast hosting and always up to date – no effort for you.",
        tr: "Güvenli şifreleme, hızlı hosting ve her zaman güncel teknik – size iş yok.",
      },
    },
    {
      icon: Wrench,
      title: { de: "1 Änderung pro Monat", en: "1 change per month", tr: "Ayda 1 değişiklik" },
      text: {
        de: "Neue Öffnungszeiten, Preise oder Fotos? Schicken Sie uns eine Nachricht, wir passen es an.",
        en: "New opening hours, prices or photos? Send us a message and we'll update it.",
        tr: "Yeni çalışma saatleri, fiyatlar veya fotoğraflar mı? Mesaj atın, güncelleyelim.",
      },
    },
  ],
};

const START_PRICE = {
  title: { de: "Ihr Preis", en: "Your price", tr: "Fiyatınız" },
  value: { de: "ab 49 € / Monat", en: "from €49 / month", tr: "aylık 49 €'dan" },
  text: {
    de: "0 € Einrichtung, monatlich kündbar. Mehr Funktionen wie KI-Live-Chat oder Online-Terminbuchung gibt es im Business-Paket ab 129 € im Monat.",
    en: "€0 setup, cancellable monthly. More features such as AI live chat or online booking are available in the Business package from €129 a month.",
    tr: "0 € kurulum, aylık iptal edilebilir. AI canlı sohbet veya online randevu gibi daha fazla özellik Business paketinde aylık 129 €'dan.",
  },
};

export const LANDING_PAGES: Record<string, LandingData> = {
  "/guenstige-website": {
    path: "/guenstige-website",
    seo: {
      title: {
        de: "Günstige Website erstellen lassen ab 49 €/Monat | 0 € Einrichtung",
        en: "Affordable website from €49/month | €0 setup | PS Professional Solutions",
        tr: "Uygun fiyatlı web sitesi aylık 49 €'dan | 0 € kurulum",
      },
      description: {
        de: "Professionelle Website für wenig Geld: ab 49 € im Monat, 0 € Einrichtung, monatlich kündbar. Programmiert statt Baukasten – inkl. Hosting, SSL und Google-Profil.",
        en: "A professional website on a small budget: from €49 a month, €0 setup, cancellable monthly. Hand-coded, including hosting, SSL and Google profile.",
        tr: "Az parayla profesyonel web sitesi: aylık 49 €'dan, 0 € kurulum, aylık iptal. Kodlanmış; hosting, SSL ve Google profili dahil.",
      },
      keywords:
        "günstige Website, Website günstig erstellen lassen, Website für wenig Geld, Website 50 Euro, billige Website, Website ohne Einrichtungsgebühr, Website monatlich zahlen, Homepage günstig",
      service: "Günstige Website ab 49 € pro Monat",
    },
    hero: {
      kicker: { de: "Günstige Website", en: "Affordable website", tr: "Uygun fiyatlı web sitesi" },
      title: {
        de: "Günstige Website erstellen lassen – ab 49 € im Monat",
        en: "Get an affordable website – from €49 a month",
        tr: "Uygun fiyatlı web sitesi yaptırın – aylık 49 €'dan",
      },
      subtitle: {
        de: "Professionell programmiert, ohne Einrichtungskosten und monatlich kündbar. Für Friseure, Cafés, Handwerker und alle kleinen Betriebe, die eine gute Website für wenig Geld wollen.",
        en: "Professionally coded, no setup fee and cancellable monthly. For salons, cafés, tradespeople and every small business that wants a good website on a small budget.",
        tr: "Profesyonelce kodlanmış, kurulum ücreti yok ve aylık iptal edilebilir. Az parayla iyi bir web sitesi isteyen kuaförler, kafeler, ustalar ve tüm küçük işletmeler için.",
      },
      badges: [
        { de: "0 € Einrichtung", en: "€0 setup", tr: "0 € kurulum" },
        { de: "ab 49 €/Monat", en: "from €49/month", tr: "aylık 49 €'dan" },
        { de: "Monatlich kündbar", en: "Cancellable monthly", tr: "Aylık iptal edilebilir" },
        { de: "Hosting & SSL inklusive", en: "Hosting & SSL included", tr: "Hosting ve SSL dahil" },
      ],
      cta: { de: "Jetzt Website anfragen", en: "Request your website", tr: "Web sitesi talep et" },
    },
    intro: {
      title: { de: "Eine gute Website muss nicht teuer sein", en: "A good website doesn't have to be expensive", tr: "İyi bir web sitesi pahalı olmak zorunda değil" },
      paragraphs: [
        {
          de: "Für eine Firmen-Website verlangen viele Agenturen auf einen Schlag mehrere tausend Euro. Für einen Friseursalon, ein Café oder einen kleinen Handwerksbetrieb ist das oft zu viel. Bei uns zahlen Sie keine Einrichtungsgebühr, sondern einen kleinen Monatsbeitrag ab 49 € – und darin ist alles enthalten: Design, Programmierung, Hosting, SSL-Zertifikat, Updates und eine Änderung pro Monat.",
          en: "Many agencies charge several thousand euros up front for a business website. For a hair salon, a café or a small trade business, that is often too much. With us you pay no setup fee, just a small monthly fee from €49 – and everything is included: design, coding, hosting, SSL certificate, updates and one change per month.",
          tr: "Birçok ajans bir firma sitesi için tek seferde birkaç bin euro ister. Bir kuaför, kafe veya küçük bir usta işletmesi için bu çoğu zaman fazladır. Bizde kurulum ücreti ödemezsiniz, sadece aylık 49 €'dan başlayan küçük bir ücret ödersiniz – ve her şey dahildir: tasarım, kodlama, hosting, SSL sertifikası, güncellemeler ve ayda bir değişiklik.",
        },
        {
          de: "Anders als bei einem Baukasten klicken wir Ihre Seite nicht aus Vorlagen zusammen, sondern programmieren sie. Das bringt schnelle Ladezeiten, saubere Technik für Google und einen Auftritt, der nach Ihrem Betrieb aussieht – nicht nach Vorlage. Sie müssen sich um nichts kümmern: Wir bauen, pflegen und sichern Ihre Website.",
          en: "Unlike a website builder, we don't click your site together from templates – we code it. That means fast loading times, clean code for Google and a look that matches your business, not a template. You don't have to worry about anything: we build, maintain and secure your website.",
          tr: "Site oluşturuculardan farklı olarak sayfanızı şablonlardan tıklayarak oluşturmuyor, kodluyoruz. Bu da hızlı yükleme, Google için temiz teknik ve şablona değil işletmenize benzeyen bir görünüm demek. Hiçbir şeyle uğraşmanız gerekmez: sitenizi biz yapar, bakımını yapar ve güvenliğini sağlarız.",
        },
      ],
    },
    features: START_FEATURES,
    comparison: true,
    steps: WEBSITE_STEPS,
    price: START_PRICE,
    faq: [
      {
        q: { de: "Was kostet eine einfache Website bei Ihnen?", en: "How much does a simple website cost with you?", tr: "Sizde basit bir web sitesi ne kadar?" },
        a: {
          de: "Unser Start-Paket kostet ab 49 € im Monat bei 0 € Einrichtung. Enthalten sind ein Onepager oder bis zu 4 Seiten, Hosting, SSL, Updates, die Einrichtung Ihres Google-Unternehmensprofils und eine kleine Änderung pro Monat. Alle Preise sind Endpreise, da wir als Kleinunternehmer keine Umsatzsteuer berechnen.",
          en: "Our Start package costs from €49 a month with €0 setup. It includes a one-pager or up to 4 pages, hosting, SSL, updates, setting up your Google Business Profile and one small change per month. All prices are final, as we charge no VAT as a small business.",
          tr: "Start paketimiz 0 € kurulumla aylık 49 €'dan başlar. Tek sayfa veya 4 sayfaya kadar site, hosting, SSL, güncellemeler, Google İşletme Profilinizin kurulumu ve ayda bir küçük değişiklik dahildir. Küçük işletme olarak KDV almadığımız için tüm fiyatlar nihaidir.",
        },
      },
      {
        q: { de: "Warum ist Ihre Website so günstig?", en: "Why is your website so affordable?", tr: "Siteniz neden bu kadar uygun?" },
        a: {
          de: "Wir sind ein kleines Team ohne teuren Agentur-Apparat, programmieren effizient mit modernen Werkzeugen und verteilen die Kosten auf kleine Monatsbeiträge. So bekommen Sie eine professionelle Website, ohne vorab viel Geld auszugeben.",
          en: "We are a small team without an expensive agency overhead, we code efficiently with modern tools and spread the cost over small monthly fees. That way you get a professional website without spending a lot of money up front.",
          tr: "Pahalı bir ajans yapısı olmayan küçük bir ekibiz, modern araçlarla verimli kodluyoruz ve maliyeti küçük aylık ücretlere yayıyoruz. Böylece önceden çok para harcamadan profesyonel bir siteye sahip olursunuz.",
        },
      },
      {
        q: { de: "Gibt es versteckte Kosten?", en: "Are there hidden costs?", tr: "Gizli maliyet var mı?" },
        a: {
          de: "Nein. Vor dem Start erhalten Sie ein verbindliches Angebot, in dem alle Kosten stehen. Hosting, SSL-Zertifikat und Updates sind im Monatsbeitrag enthalten.",
          en: "No. Before we start you receive a binding quote listing all costs. Hosting, SSL certificate and updates are included in the monthly fee.",
          tr: "Hayır. Başlamadan önce tüm maliyetlerin yazdığı bağlayıcı bir teklif alırsınız. Hosting, SSL sertifikası ve güncellemeler aylık ücrete dahildir.",
        },
      },
      {
        q: { de: "Ist das Paket wirklich monatlich kündbar?", en: "Is the package really cancellable monthly?", tr: "Paket gerçekten aylık iptal edilebilir mi?" },
        a: {
          de: "Ja. Alle unsere Website-Pakete sind monatlich kündbar – ohne lange Vertragslaufzeit. Wer jährlich zahlt, bekommt zwei Monatsbeiträge geschenkt.",
          en: "Yes. All our website packages can be cancelled monthly – no long contract term. If you pay annually, you get two monthly fees free.",
          tr: "Evet. Tüm web sitesi paketlerimiz aylık iptal edilebilir – uzun sözleşme süresi yok. Yıllık ödeyenlere iki aylık ücret bizden.",
        },
      },
      {
        q: { de: "Wie schnell ist meine Website online?", en: "How quickly will my website be online?", tr: "Sitem ne kadar sürede yayında olur?" },
        a: {
          de: "Sobald Texte, Fotos und Logo vorliegen, geht es schnell: Eine einfache Website ist in der Regel nach wenigen Tagen fertig. Den genauen Termin nennen wir Ihnen im Angebot.",
          en: "Once we have your texts, photos and logo, things move quickly: a simple website is usually ready within a few days. We give you the exact date in the quote.",
          tr: "Metinler, fotoğraflar ve logo elimize ulaştığında iş hızlı ilerler: basit bir site genellikle birkaç gün içinde hazır olur. Kesin tarihi teklifte belirtiriz.",
        },
      },
      {
        q: { de: "Werde ich mit der Website bei Google gefunden?", en: "Will my website be found on Google?", tr: "Sitemle Google'da bulunur muyum?" },
        a: {
          de: "Wir bauen jede Website technisch sauber für Google, mit passenden Titeln, Beschreibungen und strukturierten Daten, und richten Ihr Google-Unternehmensprofil ein. Feste Platzierungen kann seriös niemand garantieren – aber Sie haben damit die besten Voraussetzungen.",
          en: "We build every website technically clean for Google, with suitable titles, descriptions and structured data, and set up your Google Business Profile. Nobody can honestly guarantee fixed rankings – but you'll have the best foundation.",
          tr: "Her siteyi Google için teknik olarak temiz; uygun başlıklar, açıklamalar ve yapılandırılmış verilerle kurar, Google İşletme Profilinizi oluştururuz. Kimse dürüstçe sabit sıralama garanti edemez – ama en iyi temele sahip olursunuz.",
        },
      },
      {
        q: { de: "Kann ich später mehr Funktionen dazubuchen?", en: "Can I add more features later?", tr: "Sonradan daha fazla özellik ekleyebilir miyim?" },
        a: {
          de: "Ja, jederzeit. Sie können zum Business-Paket mit KI-Live-Chat und Online-Terminbuchung wechseln oder einen KI-Telefonassistenten dazunehmen. Auch eigene Apps und Software entwickeln wir für Sie.",
          en: "Yes, any time. You can switch to the Business package with AI live chat and online booking or add an AI phone assistant. We also develop custom apps and software for you.",
          tr: "Evet, istediğiniz zaman. AI canlı sohbet ve online randevulu Business paketine geçebilir veya AI telefon asistanı ekleyebilirsiniz. Size özel uygulama ve yazılım da geliştiriyoruz.",
        },
      },
      {
        q: { de: "Für wen eignet sich die günstige Website?", en: "Who is the affordable website for?", tr: "Uygun fiyatlı site kimler için uygun?" },
        a: {
          de: "Für Selbstständige und kleine Betriebe wie Friseure, Kosmetikstudios, Cafés, Restaurants, Handwerker, Schneidereien, Vereine und Dienstleister, die professionell auftreten wollen, ohne viel Geld vorab zu investieren.",
          en: "For freelancers and small businesses such as hair salons, beauty studios, cafés, restaurants, tradespeople, tailors, clubs and service providers who want to look professional without investing a lot up front.",
          tr: "Önceden çok para yatırmadan profesyonel görünmek isteyen serbest çalışanlar ve kuaför, güzellik salonu, kafe, restoran, usta, terzi, dernek ve hizmet sağlayıcı gibi küçük işletmeler için.",
        },
      },
    ],
    related: ["/kostenlose-website", "/webdesign-dortmund", "/preise", "/webseiten", "/app-entwicklung", "/software-entwicklung"],
    final: {
      title: { de: "Ihre professionelle Website ab 49 € im Monat", en: "Your professional website from €49 a month", tr: "Aylık 49 €'dan profesyonel web siteniz" },
      text: {
        de: "Schreiben Sie uns kurz, was Sie brauchen – Sie erhalten schnell ein unverbindliches Angebot.",
        en: "Tell us briefly what you need – you'll quickly receive a non-binding quote.",
        tr: "Neye ihtiyacınız olduğunu kısaca yazın – hızlıca bağlayıcı olmayan bir teklif alın.",
      },
    },
  },

  "/kostenlose-website": {
    path: "/kostenlose-website",
    seo: {
      title: {
        de: "Kostenlose Website? Die bessere Alternative mit 0 € Einrichtung",
        en: "Free website? The better alternative with €0 setup",
        tr: "Ücretsiz web sitesi mi? 0 € kurulumla daha iyi alternatif",
      },
      description: {
        de: "Kostenlose Website gesucht? Baukästen sind gratis, kosten aber Zeit und zeigen Werbung. Unsere Alternative: 0 € Einrichtung, ab 49 €/Monat, wir bauen alles für Sie.",
        en: "Looking for a free website? Builders are free but cost time and show ads. Our alternative: €0 setup, from €49/month, and we build everything for you.",
        tr: "Ücretsiz site mi arıyorsunuz? Oluşturucular ücretsiz ama zaman alır ve reklam gösterir. Alternatifimiz: 0 € kurulum, aylık 49 €'dan, her şeyi biz yaparız.",
      },
      keywords:
        "kostenlose Website, Website kostenlos erstellen, kostenlose Homepage für Firmen, gratis Website, Website ohne Startkosten, Website 0 Euro Einrichtung, Homepage Baukasten Alternative",
      service: "Website ohne Einrichtungskosten",
    },
    hero: {
      kicker: { de: "Kostenlose Website?", en: "Free website?", tr: "Ücretsiz web sitesi mi?" },
      title: {
        de: "Website ohne Startkosten – die ehrliche Alternative zur kostenlosen Website",
        en: "A website with no upfront cost – the honest alternative to a free website",
        tr: "Başlangıç maliyeti olmayan web sitesi – ücretsiz siteye dürüst alternatif",
      },
      subtitle: {
        de: "Wir bauen Ihre Website für 0 € Einrichtung. Sie zahlen nur einen kleinen Monatsbeitrag ab 49 € – ohne Baukasten, ohne fremde Werbung, mit Ihrer eigenen Adresse.",
        en: "We build your website for €0 setup. You only pay a small monthly fee from €49 – no site builder, no third-party ads, with your own domain.",
        tr: "Sitenizi 0 € kurulumla yapıyoruz. Sadece aylık 49 €'dan başlayan küçük bir ücret ödersiniz – site oluşturucu yok, yabancı reklam yok, kendi alan adınızla.",
      },
      badges: [
        { de: "0 € Einrichtung", en: "€0 setup", tr: "0 € kurulum" },
        { de: "Keine Werbung", en: "No ads", tr: "Reklam yok" },
        { de: "Eigene Domain", en: "Your own domain", tr: "Kendi alan adınız" },
        { de: "Monatlich kündbar", en: "Cancellable monthly", tr: "Aylık iptal edilebilir" },
      ],
      cta: { de: "Jetzt Website anfragen", en: "Request your website", tr: "Web sitesi talep et" },
    },
    intro: {
      title: { de: "Was steckt hinter einer „kostenlosen“ Website?", en: "What's behind a \"free\" website?", tr: "\"Ücretsiz\" bir web sitesinin arkasında ne var?" },
      paragraphs: [
        {
          de: "Kostenlose Websites gibt es bei vielen Homepage-Baukästen. Bezahlt wird dort meist anders: mit Werbung des Anbieters auf Ihrer Seite, mit einer Adresse wie ihr-name.anbieter.de statt einer eigenen Domain und mit Ihrer Zeit – denn Texte, Bilder, Aufbau und Technik müssen Sie selbst erledigen. Für ein Hobby reicht das. Für ein Unternehmen wirkt es schnell unprofessionell.",
          en: "Many website builders offer free websites. You usually pay in other ways: with the provider's ads on your site, an address like your-name.provider.com instead of your own domain, and with your time – because you have to handle texts, images, layout and technology yourself. That's fine for a hobby. For a business it quickly looks unprofessional.",
          tr: "Birçok site oluşturucu ücretsiz web sitesi sunar. Bedeli genellikle başka türlü ödenir: sitenizde sağlayıcının reklamları, kendi alan adınız yerine adiniz.saglayici.com gibi bir adres ve zamanınız – çünkü metin, görsel, düzen ve tekniği kendiniz halletmeniz gerekir. Hobi için yeterli. Bir işletme için hızla profesyonellikten uzak görünür.",
        },
        {
          de: "Unsere Lösung: Sie zahlen keine Einrichtungsgebühr – also keine Startkosten wie bei einer kostenlosen Website –, bekommen aber eine professionell programmierte Seite mit eigener Domain, ohne Werbung und ohne Arbeit für Sie. Dafür zahlen Sie einen kleinen Monatsbeitrag ab 49 €, der Hosting, Updates und Änderungen abdeckt.",
          en: "Our solution: you pay no setup fee – so no upfront cost, just like a free website – but you get a professionally coded site with your own domain, no ads and no work for you. In return you pay a small monthly fee from €49 that covers hosting, updates and changes.",
          tr: "Çözümümüz: kurulum ücreti ödemezsiniz – yani ücretsiz bir sitedeki gibi başlangıç maliyeti yok – ama kendi alan adınızla, reklamsız ve sizin için hiç iş çıkarmayan, profesyonelce kodlanmış bir site alırsınız. Karşılığında hosting, güncellemeler ve değişiklikleri kapsayan aylık 49 €'dan başlayan küçük bir ücret ödersiniz.",
        },
      ],
    },
    features: {
      title: { de: "0 € Einrichtung statt Baukasten-Stress", en: "€0 setup instead of site-builder stress", tr: "Site oluşturucu stresi yerine 0 € kurulum" },
      items: [
        {
          icon: BadgeEuro,
          title: { de: "Keine Startkosten", en: "No upfront cost", tr: "Başlangıç maliyeti yok" },
          text: {
            de: "Wie bei einer kostenlosen Website zahlen Sie zum Start nichts – nur den kleinen Monatsbeitrag.",
            en: "Just like a free website you pay nothing to start – only the small monthly fee.",
            tr: "Ücretsiz bir sitedeki gibi başlarken hiçbir şey ödemezsiniz – sadece küçük aylık ücret.",
          },
        },
        {
          icon: Globe,
          title: { de: "Ihre eigene Adresse", en: "Your own address", tr: "Kendi adresiniz" },
          text: {
            de: "Ihre-firma.de statt einer Unteradresse des Baukasten-Anbieters.",
            en: "your-company.com instead of a sub-address of the site builder.",
            tr: "Site oluşturucunun alt adresi yerine firmaniz.com.",
          },
        },
        {
          icon: Ban,
          title: { de: "Keine fremde Werbung", en: "No third-party ads", tr: "Yabancı reklam yok" },
          text: {
            de: "Auf Ihrer Website erscheint nur Ihr Betrieb – keine Banner anderer Anbieter.",
            en: "Only your business appears on your website – no banners from other providers.",
            tr: "Sitenizde sadece işletmeniz görünür – başka sağlayıcıların bannerları yok.",
          },
        },
        {
          icon: Users,
          title: { de: "Wir machen die Arbeit", en: "We do the work", tr: "İşi biz yaparız" },
          text: {
            de: "Kein Basteln am Wochenende: Wir gestalten, programmieren und pflegen Ihre Seite.",
            en: "No weekend tinkering: we design, code and maintain your site.",
            tr: "Hafta sonu uğraşmak yok: sayfanızı biz tasarlar, kodlar ve bakımını yaparız.",
          },
        },
        {
          icon: Search,
          title: { de: "Für Google vorbereitet", en: "Ready for Google", tr: "Google'a hazır" },
          text: {
            de: "Saubere Technik, passende Titel und Ihr Google-Unternehmensprofil inklusive.",
            en: "Clean code, suitable titles and your Google Business Profile included.",
            tr: "Temiz teknik, uygun başlıklar ve Google İşletme Profiliniz dahil.",
          },
        },
        {
          icon: ShieldCheck,
          title: { de: "Impressum & Datenschutz", en: "Legal notice & privacy", tr: "Künye ve gizlilik" },
          text: {
            de: "Auch eine Firmen-Website braucht Pflichtseiten – wir binden sie sauber ein.",
            en: "A business website also needs mandatory pages – we integrate them properly.",
            tr: "Bir firma sitesinin de zorunlu sayfalara ihtiyacı var – bunları düzgünce ekleriz.",
          },
        },
      ],
    },
    comparison: true,
    steps: WEBSITE_STEPS,
    price: START_PRICE,
    faq: [
      {
        q: { de: "Ist die Website bei Ihnen wirklich kostenlos?", en: "Is the website really free with you?", tr: "Sizde site gerçekten ücretsiz mi?" },
        a: {
          de: "Nein, und das sagen wir ehrlich: Die Einrichtung kostet 0 €, danach zahlen Sie einen Monatsbeitrag ab 49 €. Dafür bekommen Sie eine professionell programmierte Website mit eigener Domain, ohne Werbung, inklusive Hosting, Updates und einer Änderung pro Monat.",
          en: "No, and we say so honestly: setup costs €0, after that you pay a monthly fee from €49. In return you get a professionally coded website with your own domain, no ads, including hosting, updates and one change per month.",
          tr: "Hayır, bunu dürüstçe söylüyoruz: kurulum 0 €, sonrasında aylık 49 €'dan başlayan bir ücret ödersiniz. Karşılığında kendi alan adınızla, reklamsız, hosting, güncellemeler ve ayda bir değişiklik dahil profesyonelce kodlanmış bir site alırsınız.",
        },
      },
      {
        q: { de: "Reicht eine kostenlose Website für mein Unternehmen?", en: "Is a free website enough for my business?", tr: "Ücretsiz bir site işletmem için yeterli mi?" },
        a: {
          de: "Für den Anfang kann sie reichen. Meist fehlen aber eine eigene Domain, ein werbefreier Auftritt und die Zeit, alles selbst zu bauen und aktuell zu halten. Kunden achten auf einen professionellen Eindruck – genau dort lohnt sich eine richtige Website.",
          en: "It can be enough to start with. But usually your own domain, an ad-free presence and the time to build and update everything yourself are missing. Customers notice a professional impression – that's exactly where a proper website pays off.",
          tr: "Başlangıç için yeterli olabilir. Ama genellikle kendi alan adınız, reklamsız bir görünüm ve her şeyi kendiniz yapıp güncel tutacak zaman eksiktir. Müşteriler profesyonel izlenime dikkat eder – işte tam orada gerçek bir site değerini gösterir.",
        },
      },
      {
        q: { de: "Brauche ich auf einer kostenlosen Website ein Impressum?", en: "Do I need a legal notice on a free website?", tr: "Ücretsiz bir sitede künyeye ihtiyacım var mı?" },
        a: {
          de: "Ja. Wer in Deutschland geschäftsmäßig eine Website betreibt, braucht in der Regel ein Impressum und eine Datenschutzerklärung – egal ob die Seite kostenlos ist oder nicht. Bei uns werden beide Seiten sauber eingebunden.",
          en: "Yes. Anyone running a website for business purposes in Germany generally needs a legal notice (Impressum) and a privacy policy – whether the site is free or not. With us, both pages are properly integrated.",
          tr: "Evet. Almanya'da ticari amaçla site işleten herkesin genellikle bir künyeye (Impressum) ve gizlilik politikasına ihtiyacı vardır – site ücretsiz olsun ya da olmasın. Bizde her iki sayfa da düzgünce eklenir.",
        },
      },
      {
        q: { de: "Was passiert, wenn ich später mehr brauche?", en: "What if I need more later?", tr: "Sonradan daha fazlasına ihtiyacım olursa?" },
        a: {
          de: "Sie können jederzeit wechseln: zum Business-Paket mit KI-Live-Chat und Online-Terminbuchung, mit KI-Telefonassistent oder zu einer individuell entwickelten App oder Software.",
          en: "You can switch any time: to the Business package with AI live chat and online booking, add an AI phone assistant, or move to a custom-built app or software.",
          tr: "İstediğiniz zaman geçebilirsiniz: AI canlı sohbet ve online randevulu Business paketine, AI telefon asistanına veya size özel geliştirilmiş bir uygulama ya da yazılıma.",
        },
      },
      {
        q: { de: "Ist der Monatsbeitrag kündbar?", en: "Can the monthly fee be cancelled?", tr: "Aylık ücret iptal edilebilir mi?" },
        a: {
          de: "Ja, alle Website-Pakete sind monatlich kündbar. Sie gehen also kein langfristiges Risiko ein.",
          en: "Yes, all website packages are cancellable monthly. So you take no long-term risk.",
          tr: "Evet, tüm web sitesi paketleri aylık iptal edilebilir. Yani uzun vadeli bir risk almazsınız.",
        },
      },
    ],
    related: ["/guenstige-website", "/webdesign-dortmund", "/preise", "/webseiten", "/google-business-optimierung"],
    final: {
      title: { de: "Ohne Startkosten zur eigenen Website", en: "Your own website with no upfront cost", tr: "Başlangıç maliyeti olmadan kendi siteniz" },
      text: {
        de: "0 € Einrichtung, ab 49 € im Monat, monatlich kündbar. Fragen Sie jetzt unverbindlich an.",
        en: "€0 setup, from €49 a month, cancellable monthly. Enquire now without obligation.",
        tr: "0 € kurulum, aylık 49 €'dan, aylık iptal edilebilir. Şimdi bağlayıcı olmadan talep edin.",
      },
    },
  },

  "/webdesign-dortmund": {
    path: "/webdesign-dortmund",
    seo: {
      title: {
        de: "Webdesign Dortmund | Website erstellen lassen ab 49 €/Monat",
        en: "Web design Dortmund | Websites from €49/month",
        tr: "Web tasarım Dortmund | Aylık 49 €'dan web sitesi",
      },
      description: {
        de: "Webdesigner aus Dortmund: programmierte Websites, Apps und Software für Betriebe in Dortmund und im Ruhrgebiet. Persönlich, ab 49 €/Monat, 0 € Einrichtung.",
        en: "Web designer from Dortmund: coded websites, apps and software for businesses in Dortmund and the Ruhr area. Personal service, from €49/month, €0 setup.",
        tr: "Dortmund'dan web tasarımcı: Dortmund ve Ruhr bölgesindeki işletmeler için kodlanmış siteler, uygulamalar ve yazılımlar. Kişisel, aylık 49 €'dan, 0 € kurulum.",
      },
      keywords:
        "Webdesign Dortmund, Webdesigner Dortmund, Website erstellen lassen Dortmund, Homepage Dortmund, Webagentur Dortmund, App Entwicklung Dortmund, Software Entwicklung Dortmund, Webdesign Ruhrgebiet",
      service: "Webdesign Dortmund",
    },
    hero: {
      kicker: { de: "Webdesign Dortmund", en: "Web design Dortmund", tr: "Web tasarım Dortmund" },
      title: {
        de: "Webdesign aus Dortmund – persönlich, programmiert und bezahlbar",
        en: "Web design from Dortmund – personal, hand-coded and affordable",
        tr: "Dortmund'dan web tasarım – kişisel, kodlanmış ve uygun fiyatlı",
      },
      subtitle: {
        de: "Wir erstellen Websites, Apps und Software für Unternehmen in Dortmund und im ganzen Ruhrgebiet. Ein fester Ansprechpartner, kurze Wege und Preise, die auch für kleine Betriebe passen.",
        en: "We build websites, apps and software for businesses in Dortmund and across the Ruhr area. One fixed contact person, short distances and prices that suit small businesses too.",
        tr: "Dortmund'daki ve tüm Ruhr bölgesindeki işletmeler için web siteleri, uygulamalar ve yazılımlar geliştiriyoruz. Tek bir muhatap, kısa yollar ve küçük işletmelere de uygun fiyatlar.",
      },
      badges: [
        { de: "Sitz in Dortmund", en: "Based in Dortmund", tr: "Dortmund merkezli" },
        { de: "ab 49 €/Monat", en: "from €49/month", tr: "aylık 49 €'dan" },
        { de: "Persönlicher Ansprechpartner", en: "Personal contact person", tr: "Kişisel muhatap" },
        { de: "Websites, Apps & Software", en: "Websites, apps & software", tr: "Web siteleri, uygulamalar ve yazılım" },
      ],
      cta: { de: "Kostenloses Erstgespräch", en: "Free initial consultation", tr: "Ücretsiz ilk görüşme" },
    },
    intro: {
      title: { de: "Ihre Webdesign-Agentur in Dortmund", en: "Your web design agency in Dortmund", tr: "Dortmund'daki web tasarım ajansınız" },
      paragraphs: [
        {
          de: "PS Professional Solutions sitzt an der Lindenhorster Straße in Dortmund. Wir programmieren Websites für Friseure, Restaurants, Handwerker, Praxen, Vereine und Dienstleister – in Dortmund, Lünen, Castrop-Rauxel, Bochum, Unna, Herne, Schwerte und auf Wunsch bundesweit. Gespräche führen wir persönlich vor Ort, per Telefon oder per Video, ganz wie es Ihnen passt.",
          en: "PS Professional Solutions is based on Lindenhorster Straße in Dortmund. We code websites for hair salons, restaurants, tradespeople, medical practices, clubs and service providers – in Dortmund, Lünen, Castrop-Rauxel, Bochum, Unna, Herne, Schwerte and nationwide on request. We meet in person, by phone or by video, whatever suits you.",
          tr: "PS Professional Solutions, Dortmund'da Lindenhorster Straße'de bulunmaktadır. Kuaförler, restoranlar, ustalar, muayenehaneler, dernekler ve hizmet sağlayıcılar için web siteleri kodluyoruz – Dortmund, Lünen, Castrop-Rauxel, Bochum, Unna, Herne, Schwerte'de ve istek üzerine tüm Almanya'da. Görüşmeleri size nasıl uygunsa yüz yüze, telefonla veya görüntülü yaparız.",
        },
        {
          de: "Wir sind nicht nur Webdesigner, sondern auch App- und Software-Entwickler. Neben klassischen Firmen-Websites entwickeln wir Web-Apps, Kundenportale, interne Tools und KI-Lösungen wie einen Live-Chat oder einen Telefonassistenten. So bekommen Sie alles aus einer Hand – von der ersten Website bis zur eigenen Software.",
          en: "We are not only web designers but also app and software developers. Besides classic business websites, we develop web apps, customer portals, internal tools and AI solutions such as a live chat or a phone assistant. That way you get everything from one source – from your first website to your own software.",
          tr: "Sadece web tasarımcı değil, aynı zamanda uygulama ve yazılım geliştiricisiyiz. Klasik firma sitelerinin yanı sıra web uygulamaları, müşteri portalları, dahili araçlar ve canlı sohbet veya telefon asistanı gibi AI çözümleri geliştiriyoruz. Böylece ilk sitenizden kendi yazılımınıza kadar her şeyi tek elden alırsınız.",
        },
      ],
    },
    features: {
      title: { de: "Was wir in Dortmund für Sie umsetzen", en: "What we deliver for you in Dortmund", tr: "Dortmund'da sizin için neler yapıyoruz" },
      items: [
        {
          icon: Globe,
          title: { de: "Websites & Landingpages", en: "Websites & landing pages", tr: "Web siteleri ve açılış sayfaları" },
          text: {
            de: "Programmiert, schnell und für Smartphones gemacht – ab 49 € im Monat.",
            en: "Hand-coded, fast and made for smartphones – from €49 a month.",
            tr: "Kodlanmış, hızlı ve akıllı telefonlar için yapılmış – aylık 49 €'dan.",
          },
        },
        {
          icon: MapPin,
          title: { de: "Lokales SEO für Dortmund", en: "Local SEO for Dortmund", tr: "Dortmund için yerel SEO" },
          text: {
            de: "Damit Kunden aus Ihrer Nachbarschaft Sie bei Google und Google Maps finden.",
            en: "So that customers in your neighbourhood find you on Google and Google Maps.",
            tr: "Böylece mahallenizdeki müşteriler sizi Google ve Google Maps'te bulur.",
          },
        },
        {
          icon: MessageSquare,
          title: { de: "KI-Live-Chat & Terminbuchung", en: "AI live chat & booking", tr: "AI canlı sohbet ve randevu" },
          text: {
            de: "Ihre Website beantwortet Fragen und nimmt Termine an – rund um die Uhr.",
            en: "Your website answers questions and takes bookings – around the clock.",
            tr: "Siteniz soruları yanıtlar ve randevu alır – 7/24.",
          },
        },
        {
          icon: Smartphone,
          title: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
          text: {
            de: "Web-Apps sowie iOS- und Android-Apps für Ihre Kunden oder Ihr Team.",
            en: "Web apps as well as iOS and Android apps for your customers or your team.",
            tr: "Müşterileriniz veya ekibiniz için web uygulamaları ile iOS ve Android uygulamaları.",
          },
        },
        {
          icon: ServerCog,
          title: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" },
          text: {
            de: "Individuelle Software, Schnittstellen und Automatisierungen für Ihre Abläufe.",
            en: "Custom software, integrations and automations for your processes.",
            tr: "Süreçleriniz için özel yazılım, entegrasyonlar ve otomasyonlar.",
          },
        },
        {
          icon: Users,
          title: { de: "Persönlich vor Ort", en: "In person, locally", tr: "Yerinde ve kişisel" },
          text: {
            de: "Ein fester Ansprechpartner aus Dortmund statt anonymer Hotline.",
            en: "One fixed contact person from Dortmund instead of an anonymous hotline.",
            tr: "Anonim bir çağrı hattı yerine Dortmund'dan sabit bir muhatap.",
          },
        },
      ],
    },
    steps: WEBSITE_STEPS,
    references: true,
    price: START_PRICE,
    faq: [
      {
        q: { de: "Wo sitzt Ihre Webdesign-Agentur in Dortmund?", en: "Where is your web design agency in Dortmund?", tr: "Dortmund'daki web tasarım ajansınız nerede?" },
        a: {
          de: "Unser Sitz ist die Lindenhorster Str. 185 in 44339 Dortmund. Wir sind montags bis freitags von 9 bis 18 Uhr erreichbar, telefonisch unter +49 1520 7595260 oder per E-Mail an info@ps-professional-solutions.de.",
          en: "We are located at Lindenhorster Str. 185, 44339 Dortmund. You can reach us Monday to Friday from 9 am to 6 pm by phone at +49 1520 7595260 or by email at info@ps-professional-solutions.de.",
          tr: "Adresimiz Lindenhorster Str. 185, 44339 Dortmund. Pazartesiden cumaya 9:00–18:00 arası +49 1520 7595260 numaralı telefondan veya info@ps-professional-solutions.de adresinden bize ulaşabilirsiniz.",
        },
      },
      {
        q: { de: "Was kostet Webdesign in Dortmund bei Ihnen?", en: "How much does web design in Dortmund cost with you?", tr: "Sizde Dortmund'da web tasarım ne kadar?" },
        a: {
          de: "Eine programmierte Website gibt es ab 49 € im Monat ohne Einrichtungsgebühr. Das Business-Paket mit KI-Live-Chat und Online-Terminbuchung startet bei 129 € im Monat. Apps und individuelle Software bieten wir ab 4.900 € an.",
          en: "A hand-coded website is available from €49 a month with no setup fee. The Business package with AI live chat and online booking starts at €129 a month. We offer apps and custom software from €4,900.",
          tr: "Kodlanmış bir site kurulum ücreti olmadan aylık 49 €'dan başlar. AI canlı sohbet ve online randevulu Business paketi aylık 129 €'dan başlar. Uygulama ve özel yazılımı 4.900 €'dan sunuyoruz.",
        },
      },
      {
        q: { de: "Arbeiten Sie auch außerhalb von Dortmund?", en: "Do you also work outside Dortmund?", tr: "Dortmund dışında da çalışıyor musunuz?" },
        a: {
          de: "Ja. Wir betreuen Kunden im gesamten Ruhrgebiet, zum Beispiel in Lünen, Bochum, Unna, Castrop-Rauxel und Herne, und arbeiten online mit Unternehmen in ganz Deutschland.",
          en: "Yes. We serve customers throughout the Ruhr area, for example in Lünen, Bochum, Unna, Castrop-Rauxel and Herne, and work online with businesses all over Germany.",
          tr: "Evet. Tüm Ruhr bölgesindeki müşterilere, örneğin Lünen, Bochum, Unna, Castrop-Rauxel ve Herne'de hizmet veriyor, Almanya genelindeki işletmelerle online çalışıyoruz.",
        },
      },
      {
        q: { de: "Wie werde ich in Dortmund bei Google gefunden?", en: "How do I get found on Google in Dortmund?", tr: "Dortmund'da Google'da nasıl bulunurum?" },
        a: {
          de: "Wichtig sind eine technisch saubere Website mit lokalen Inhalten, ein vollständiges Google-Unternehmensprofil und echte Kundenbewertungen. Genau das richten wir für Sie ein – inklusive NFC-Bewertungskarten, wenn Sie möchten.",
          en: "What matters is a technically clean website with local content, a complete Google Business Profile and genuine customer reviews. That's exactly what we set up for you – including NFC review cards if you like.",
          tr: "Önemli olan yerel içerikli, teknik olarak temiz bir site, eksiksiz bir Google İşletme Profili ve gerçek müşteri yorumlarıdır. Tam olarak bunları sizin için kuruyoruz – isterseniz NFC değerlendirme kartlarıyla birlikte.",
        },
      },
      {
        q: { de: "Entwickeln Sie auch Apps und Software?", en: "Do you also develop apps and software?", tr: "Uygulama ve yazılım da geliştiriyor musunuz?" },
        a: {
          de: "Ja. Neben Websites entwickeln wir Web-Apps, mobile Apps, Kundenportale, interne Tools und Schnittstellen. Beispiele sind die App SkyJoin und die SaaS-Plattform WebsiteNova.",
          en: "Yes. Besides websites, we develop web apps, mobile apps, customer portals, internal tools and integrations. Examples include the SkyJoin app and the WebsiteNova SaaS platform.",
          tr: "Evet. Web sitelerinin yanı sıra web uygulamaları, mobil uygulamalar, müşteri portalları, dahili araçlar ve entegrasyonlar geliştiriyoruz. Örnekler arasında SkyJoin uygulaması ve WebsiteNova SaaS platformu var.",
        },
      },
    ],
    related: ["/guenstige-website", "/webseiten", "/app-entwicklung", "/software-entwicklung", "/google-business-optimierung", "/preise"],
    final: {
      title: { de: "Lernen wir uns kennen – in Dortmund oder online", en: "Let's get to know each other – in Dortmund or online", tr: "Tanışalım – Dortmund'da veya online" },
      text: {
        de: "Erzählen Sie uns von Ihrem Betrieb. Das Erstgespräch ist kostenlos und unverbindlich.",
        en: "Tell us about your business. The initial consultation is free and non-binding.",
        tr: "Bize işletmenizden bahsedin. İlk görüşme ücretsiz ve bağlayıcı değildir.",
      },
    },
    localBusiness: true,
  },

  "/software-entwicklung": {
    path: "/software-entwicklung",
    seo: {
      title: {
        de: "Software-Entwicklung Dortmund | Individuelle Software & Web-Apps",
        en: "Software development Dortmund | Custom software & web apps",
        tr: "Yazılım geliştirme Dortmund | Özel yazılım ve web uygulamaları",
      },
      description: {
        de: "Individuelle Software aus Dortmund: Web-Apps, Kundenportale, interne Tools, Schnittstellen und KI-Automatisierung für kleine und mittlere Unternehmen.",
        en: "Custom software from Dortmund: web apps, customer portals, internal tools, integrations and AI automation for small and medium-sized businesses.",
        tr: "Dortmund'dan özel yazılım: küçük ve orta ölçekli işletmeler için web uygulamaları, müşteri portalları, dahili araçlar, entegrasyonlar ve AI otomasyonu.",
      },
      keywords:
        "Software Entwicklung Dortmund, Individualsoftware, Software entwickeln lassen, Softwareentwickler Dortmund, Web-App entwickeln lassen, Kundenportal, Schnittstellen API, KI Automatisierung, SaaS Entwicklung",
      service: "Individuelle Software-Entwicklung",
    },
    hero: {
      kicker: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" },
      title: {
        de: "Software-Entwicklung nach Maß – für Abläufe, die wirklich passen",
        en: "Custom software development – for processes that truly fit",
        tr: "Size özel yazılım geliştirme – gerçekten uyan süreçler için",
      },
      subtitle: {
        de: "Wir entwickeln individuelle Software, Web-Apps und Schnittstellen für kleine und mittlere Unternehmen. Programmiert in Dortmund, mit modernen Technologien und einem festen Ansprechpartner.",
        en: "We develop custom software, web apps and integrations for small and medium-sized businesses. Coded in Dortmund with modern technologies and one fixed contact person.",
        tr: "Küçük ve orta ölçekli işletmeler için özel yazılım, web uygulamaları ve entegrasyonlar geliştiriyoruz. Dortmund'da, modern teknolojilerle ve tek bir muhatapla kodlanır.",
      },
      badges: [
        { de: "Individuell programmiert", en: "Custom coded", tr: "Özel kodlanmış" },
        { de: "Rechte bei Ihnen", en: "Rights stay with you", tr: "Haklar sizde" },
        { de: "Hosting in der EU", en: "Hosting in the EU", tr: "AB'de hosting" },
        { de: "KI-Integration", en: "AI integration", tr: "AI entegrasyonu" },
      ],
      cta: { de: "Projekt anfragen", en: "Request a project", tr: "Proje talep et" },
    },
    intro: {
      title: { de: "Wenn Standard-Software nicht mehr reicht", en: "When off-the-shelf software is no longer enough", tr: "Hazır yazılım artık yetmediğinde" },
      paragraphs: [
        {
          de: "Viele Betriebe arbeiten mit Excel-Listen, Zetteln und fünf verschiedenen Programmen, die nicht miteinander sprechen. Standard-Software deckt oft nur einen Teil der Abläufe ab – den Rest erledigt man von Hand. Individuelle Software schließt genau diese Lücke: Sie wird für Ihre Prozesse gebaut, nicht umgekehrt.",
          en: "Many businesses work with Excel lists, notes and five different programs that don't talk to each other. Off-the-shelf software often covers only part of the workflow – the rest is done by hand. Custom software closes exactly this gap: it is built for your processes, not the other way round.",
          tr: "Birçok işletme Excel listeleri, notlar ve birbiriyle konuşmayan beş farklı programla çalışır. Hazır yazılım genellikle süreçlerin sadece bir kısmını kapsar – geri kalanı elle yapılır. Özel yazılım tam olarak bu boşluğu kapatır: süreçlerinize göre yapılır, tersi değil.",
        },
        {
          de: "Wir entwickeln mit modernen Web-Technologien wie React und TypeScript, betreiben Anwendungen auf schneller Cloud-Infrastruktur mit Datenspeicherung in der EU und binden auf Wunsch KI-Funktionen ein. Von der kleinen Automatisierung bis zur eigenen SaaS-Plattform – wie WebsiteNova – begleiten wir Ihr Projekt von der Idee bis zum Betrieb.",
          en: "We develop with modern web technologies such as React and TypeScript, run applications on fast cloud infrastructure with data storage in the EU and integrate AI features on request. From a small automation to your own SaaS platform – like WebsiteNova – we accompany your project from idea to operation.",
          tr: "React ve TypeScript gibi modern web teknolojileriyle geliştiriyor, uygulamaları AB'de veri depolamalı hızlı bulut altyapısında çalıştırıyor ve istek üzerine AI özellikleri ekliyoruz. Küçük bir otomasyondan kendi SaaS platformunuza kadar – WebsiteNova gibi – projenize fikirden işletmeye kadar eşlik ediyoruz.",
        },
      ],
    },
    features: {
      title: { de: "Welche Software wir entwickeln", en: "What software we develop", tr: "Hangi yazılımları geliştiriyoruz" },
      items: [
        {
          icon: Globe,
          title: { de: "Web-Anwendungen & SaaS", en: "Web applications & SaaS", tr: "Web uygulamaları ve SaaS" },
          text: {
            de: "Software, die im Browser läuft – für Ihr Team, Ihre Kunden oder als eigenes Produkt.",
            en: "Software that runs in the browser – for your team, your customers or as your own product.",
            tr: "Tarayıcıda çalışan yazılım – ekibiniz, müşterileriniz veya kendi ürününüz olarak.",
          },
        },
        {
          icon: Users,
          title: { de: "Kundenportale", en: "Customer portals", tr: "Müşteri portalları" },
          text: {
            de: "Login-Bereiche für Aufträge, Dokumente, Rechnungen oder Buchungen.",
            en: "Login areas for orders, documents, invoices or bookings.",
            tr: "Siparişler, belgeler, faturalar veya randevular için giriş alanları.",
          },
        },
        {
          icon: LayoutDashboard,
          title: { de: "Interne Tools & Dashboards", en: "Internal tools & dashboards", tr: "Dahili araçlar ve paneller" },
          text: {
            de: "Auftragsverwaltung, Dienstpläne, Checklisten und Auswertungen auf einen Blick.",
            en: "Order management, shift plans, checklists and reports at a glance.",
            tr: "Sipariş yönetimi, vardiya planları, kontrol listeleri ve raporlar tek bakışta.",
          },
        },
        {
          icon: Plug,
          title: { de: "Schnittstellen & APIs", en: "Integrations & APIs", tr: "Entegrasyonlar ve API'ler" },
          text: {
            de: "Wir verbinden Website, CRM, Kasse, Kalender, Buchhaltung und Zahlungsanbieter.",
            en: "We connect website, CRM, POS, calendar, accounting and payment providers.",
            tr: "Web sitesi, CRM, kasa, takvim, muhasebe ve ödeme sağlayıcılarını birbirine bağlıyoruz.",
          },
        },
        {
          icon: Sparkles,
          title: { de: "KI-Automatisierung", en: "AI automation", tr: "AI otomasyonu" },
          text: {
            de: "Anfragen sortieren, Texte erstellen, Dokumente auslesen – KI übernimmt Routinearbeit.",
            en: "Sorting enquiries, writing texts, reading documents – AI takes over routine work.",
            tr: "Talepleri sıralama, metin yazma, belge okuma – rutin işleri AI üstlenir.",
          },
        },
        {
          icon: CalendarCheck,
          title: { de: "Wartung & Weiterentwicklung", en: "Maintenance & further development", tr: "Bakım ve geliştirme" },
          text: {
            de: "Hosting, Updates, Backups und neue Funktionen – auf Wunsch mit Wartungsvertrag.",
            en: "Hosting, updates, backups and new features – with a maintenance plan if you wish.",
            tr: "Hosting, güncellemeler, yedekler ve yeni özellikler – isterseniz bakım sözleşmesiyle.",
          },
        },
      ],
    },
    steps: {
      title: { de: "So läuft Ihr Software-Projekt ab", en: "How your software project works", tr: "Yazılım projeniz nasıl ilerler" },
      items: [
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
            de: "Sie sehen und testen Ihre Software, bevor programmiert wird.",
            en: "You see and test your software before any code is written.",
            tr: "Kodlama başlamadan önce yazılımınızı görür ve test edersiniz.",
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
      ],
    },
    references: true,
    price: {
      title: { de: "Was kostet individuelle Software?", en: "How much does custom software cost?", tr: "Özel yazılım ne kadar?" },
      value: { de: "Projekte ab 4.900 €", en: "Projects from €4,900", tr: "Projeler 4.900 €'dan" },
      text: {
        de: "Kleine Automatisierungen und Schnittstellen bieten wir nach Aufwand an, individuelle Software-Projekte ab 4.900 €. Nach dem kostenlosen Erstgespräch erhalten Sie ein verbindliches Festpreis-Angebot.",
        en: "We offer small automations and integrations based on effort, custom software projects from €4,900. After the free initial consultation you receive a binding fixed-price quote.",
        tr: "Küçük otomasyonları ve entegrasyonları emeğe göre, özel yazılım projelerini 4.900 €'dan sunuyoruz. Ücretsiz ilk görüşmeden sonra bağlayıcı sabit fiyat teklifi alırsınız.",
      },
    },
    faq: [
      {
        q: { de: "Was kostet es, Software entwickeln zu lassen?", en: "How much does it cost to have software developed?", tr: "Yazılım geliştirtmek ne kadar tutar?" },
        a: {
          de: "Das hängt vom Umfang ab. Kleine Automatisierungen und Schnittstellen sind oft schon mit wenigen Tagen Aufwand umgesetzt, individuelle Software-Projekte beginnen bei 4.900 €. Sie erhalten vorab ein verbindliches Festpreis-Angebot.",
          en: "It depends on the scope. Small automations and integrations often take just a few days of work; custom software projects start at €4,900. You receive a binding fixed-price quote in advance.",
          tr: "Kapsama bağlıdır. Küçük otomasyonlar ve entegrasyonlar çoğu zaman birkaç günlük işle tamamlanır; özel yazılım projeleri 4.900 €'dan başlar. Önceden bağlayıcı sabit fiyat teklifi alırsınız.",
        },
      },
      {
        q: { de: "Wem gehört die Software am Ende?", en: "Who owns the software in the end?", tr: "Yazılım sonunda kime ait olur?" },
        a: {
          de: "Sie erhalten die Nutzungsrechte an Ihrer individuell entwickelten Software. Die Details halten wir transparent im Angebot fest.",
          en: "You receive the usage rights to your custom-developed software. We set out the details transparently in the quote.",
          tr: "Size özel geliştirilen yazılımın kullanım haklarını alırsınız. Ayrıntıları teklifte şeffaf şekilde belirtiriz.",
        },
      },
      {
        q: { de: "Mit welchen Technologien arbeiten Sie?", en: "Which technologies do you work with?", tr: "Hangi teknolojilerle çalışıyorsunuz?" },
        a: {
          de: "Wir setzen auf bewährte, moderne Web-Technologien wie React, TypeScript und Node.js, Cloud-Hosting mit Datenspeicherung in der EU sowie KI-Modelle für Automatisierung, Chat und Textverarbeitung.",
          en: "We rely on proven, modern web technologies such as React, TypeScript and Node.js, cloud hosting with data storage in the EU, and AI models for automation, chat and text processing.",
          tr: "React, TypeScript ve Node.js gibi kanıtlanmış modern web teknolojilerine, AB'de veri depolamalı bulut hostinge ve otomasyon, sohbet ve metin işleme için AI modellerine güveniyoruz.",
        },
      },
      {
        q: { de: "Können Sie meine bestehende Software anbinden?", en: "Can you connect my existing software?", tr: "Mevcut yazılımımı bağlayabilir misiniz?" },
        a: {
          de: "In den meisten Fällen ja. Sobald ein Programm eine Schnittstelle (API) oder einen Export anbietet, können wir Daten automatisch austauschen – etwa zwischen Website, CRM, Kalender und Buchhaltung.",
          en: "In most cases, yes. As soon as a program offers an interface (API) or an export, we can exchange data automatically – for example between website, CRM, calendar and accounting.",
          tr: "Çoğu durumda evet. Bir program bir arayüz (API) veya dışa aktarma sunduğu anda verileri otomatik olarak aktarabiliriz – örneğin web sitesi, CRM, takvim ve muhasebe arasında.",
        },
      },
      {
        q: { de: "Ist die Software DSGVO-konform?", en: "Is the software GDPR-compliant?", tr: "Yazılım GDPR'a uygun mu?" },
        a: {
          de: "Wir entwickeln nach dem Prinzip „Datenschutz durch Technik“: so wenige Daten wie nötig, verschlüsselte Übertragung, Speicherung auf Wunsch in der EU und automatische Löschfristen.",
          en: "We develop according to the principle of \"privacy by design\": as little data as necessary, encrypted transmission, storage in the EU on request and automatic deletion periods.",
          tr: "\"Tasarımla gizlilik\" ilkesine göre geliştiriyoruz: gerektiği kadar az veri, şifreli aktarım, istek üzerine AB'de depolama ve otomatik silme süreleri.",
        },
      },
      {
        q: { de: "Betreuen Sie die Software nach dem Livegang?", en: "Do you support the software after launch?", tr: "Yayından sonra yazılıma destek veriyor musunuz?" },
        a: {
          de: "Ja. Auf Wunsch übernehmen wir Hosting, Updates, Backups und die Weiterentwicklung mit einem Wartungsvertrag – Sie haben einen festen Ansprechpartner.",
          en: "Yes. On request we take care of hosting, updates, backups and further development with a maintenance plan – you have one fixed contact person.",
          tr: "Evet. İsterseniz bir bakım sözleşmesiyle hosting, güncellemeler, yedekler ve geliştirmeyi üstleniriz – sabit bir muhatabınız olur.",
        },
      },
    ],
    related: ["/app-entwicklung", "/webdesign-dortmund", "/ki-live-chat", "/preise", "/webseiten"],
    final: {
      title: { de: "Sie haben eine Software-Idee? Lassen Sie uns darüber sprechen.", en: "Have a software idea? Let's talk about it.", tr: "Bir yazılım fikriniz mi var? Konuşalım." },
      text: {
        de: "Beschreiben Sie kurz Ihr Vorhaben – das Erstgespräch ist kostenlos und unverbindlich.",
        en: "Briefly describe your project – the initial consultation is free and non-binding.",
        tr: "Projenizi kısaca anlatın – ilk görüşme ücretsiz ve bağlayıcı değildir.",
      },
    },
  },
};
