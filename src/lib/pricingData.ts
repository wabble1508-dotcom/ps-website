import { Star, Zap, Rocket, Smartphone, Building2, Wrench } from "lucide-react";

// Preise und Pakete der Preisseite. Texte auf Deutsch, Englisch und Türkisch;
// die übrigen Sprachen kommen aus den Übersetzungs-Wörterbüchern (src/lib/i18n/dict).
// Kleinunternehmer nach § 19 UStG: alle Preise sind Endpreise ohne Umsatzsteuer.

export type L = { de: string; en: string; tr: string };

export type Feature = { text: L; highlight?: boolean };

export type Pkg = {
  id: string;
  icon: typeof Star;
  name: L;
  tag: L;
  desc: L;
  /** Einrichtung „ab …“ (0 = keine Einrichtungsgebühr) */
  setupFrom: number;
  /** Monatsbeitrag „ab …“ */
  monthlyFrom: number;
  extra?: L;
  features: Feature[];
  popular?: boolean;
};

export type Offer = {
  id: string;
  icon: typeof Star;
  name: L;
  price: L;
  desc: L;
  points: L[];
  cta: L;
};

export const packages: Pkg[] = [
  {
    id: "start",
    icon: Star,
    name: { de: "Start", en: "Start", tr: "Start" },
    tag: {
      de: "Für Friseure, Cafés & kleine Betriebe",
      en: "For salons, cafés & small businesses",
      tr: "Kuaförler, kafeler ve küçük işletmeler için",
    },
    desc: {
      de: "Ihre eigene, professionell programmierte Website – ohne Einrichtungskosten und monatlich kündbar.",
      en: "Your own professionally coded website – no setup fee and cancellable monthly.",
      tr: "Profesyonelce kodlanmış kendi web siteniz – kurulum ücreti yok, aylık iptal edilebilir.",
    },
    setupFrom: 0,
    monthlyFrom: 49,
    features: [
      { text: { de: "Onepager oder bis zu 4 Seiten", en: "One-pager or up to 4 pages", tr: "Tek sayfa veya 4 sayfaya kadar" } },
      { text: { de: "Programmiert & für Smartphone optimiert", en: "Hand-coded & optimised for smartphones", tr: "Kodlanmış ve akıllı telefona uygun" } },
      { text: { de: "Google Maps, Anruf- & WhatsApp-Knopf", en: "Google Maps, call & WhatsApp button", tr: "Google Maps, arama ve WhatsApp butonu" } },
      { text: { de: "Google-Unternehmensprofil einrichten", en: "Google Business Profile setup", tr: "Google İşletme Profili kurulumu" } },
      { text: { de: "Hosting, SSL & Updates inklusive", en: "Hosting, SSL & updates included", tr: "Hosting, SSL ve güncellemeler dahil" } },
      { text: { de: "1 kleine Änderung pro Monat", en: "1 small change per month", tr: "Ayda 1 küçük değişiklik" } },
    ],
  },
  {
    id: "business",
    icon: Zap,
    name: { de: "Business", en: "Business", tr: "Business" },
    tag: {
      de: "Mehr Anfragen, weniger Telefon",
      en: "More enquiries, fewer calls",
      tr: "Daha çok talep, daha az telefon",
    },
    desc: {
      de: "Individuelle Website mit KI-Live-Chat und Online-Terminbuchung, die rund um die Uhr für Sie arbeitet.",
      en: "A custom website with AI live chat and online booking that works for you around the clock.",
      tr: "Sizin için 7/24 çalışan, AI canlı sohbet ve online randevu sistemli özel web sitesi.",
    },
    setupFrom: 990,
    monthlyFrom: 129,
    popular: true,
    features: [
      { text: { de: "Alles aus Start", en: "Everything in Start", tr: "Start'taki her şey" } },
      { text: { de: "Individuelles Design, bis zu 8 Seiten", en: "Custom design, up to 8 pages", tr: "Özel tasarım, 8 sayfaya kadar" } },
      { text: { de: "KI-Live-Chat für Ihre Kundenfragen", en: "AI live chat for customer questions", tr: "Müşteri soruları için AI canlı sohbet" }, highlight: true },
      { text: { de: "Online-Terminbuchung mit Bestätigung", en: "Online booking with confirmation", tr: "Onaylı online randevu" }, highlight: true },
      { text: { de: "Lokales SEO für Google", en: "Local SEO for Google", tr: "Google için yerel SEO" } },
      { text: { de: "Admin-Bereich für Anfragen & Termine", en: "Admin area for enquiries & bookings", tr: "Talepler ve randevular için yönetim paneli" } },
      { text: { de: "30 Min. Änderungen pro Monat", en: "30 min of changes per month", tr: "Ayda 30 dk değişiklik" } },
    ],
  },
  {
    id: "business-telefon",
    icon: Rocket,
    name: { de: "Business + KI-Telefon", en: "Business + AI Phone", tr: "Business + AI Telefon" },
    tag: {
      de: "Kein Anruf geht mehr verloren",
      en: "Never miss a call again",
      tr: "Hiçbir arama kaçmasın",
    },
    desc: {
      de: "Ihr KI-Telefonassistent nimmt Anrufe an, beantwortet Fragen und vereinbart Termine – auch nach Feierabend.",
      en: "Your AI phone assistant answers calls, handles questions and books appointments – even after hours.",
      tr: "AI telefon asistanınız aramaları yanıtlar, soruları cevaplar ve randevu ayarlar – mesai sonrasında bile.",
    },
    setupFrom: 1490,
    monthlyFrom: 249,
    extra: {
      de: "inkl. 300 Telefonminuten, danach 0,15 €/Min.",
      en: "incl. 300 call minutes, then €0.15/min",
      tr: "300 dakika dahil, sonrası 0,15 €/dk",
    },
    features: [
      { text: { de: "Alles aus Business", en: "Everything in Business", tr: "Business'taki her şey" } },
      { text: { de: "KI-Telefonassistent rund um die Uhr", en: "24/7 AI phone assistant", tr: "7/24 AI telefon asistanı" }, highlight: true },
      { text: { de: "Termine direkt am Telefon buchen", en: "Book appointments right on the phone", tr: "Randevuları doğrudan telefonda alma" }, highlight: true },
      { text: { de: "Zusammenfassung jedes Anrufs", en: "Summary of every call", tr: "Her aramanın özeti" } },
      { text: { de: "60 Min. Änderungen pro Monat", en: "60 min of changes per month", tr: "Ayda 60 dk değişiklik" } },
      { text: { de: "Bevorzugter Support", en: "Priority support", tr: "Öncelikli destek" } },
    ],
  },
];

export const offers: Offer[] = [
  {
    id: "app",
    icon: Smartphone,
    name: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
    price: { de: "Individuelles Angebot", en: "Individual quote", tr: "Bireysel teklif" },
    desc: {
      de: "Web-Apps und mobile Apps nach Maß – von der Idee bis zum Livegang. Projekte ab 4.900 €.",
      en: "Custom web and mobile apps – from idea to launch. Projects from €4,900.",
      tr: "Size özel web ve mobil uygulamalar – fikirden yayına. Projeler 4.900 €'dan başlar.",
    },
    points: [
      { de: "Web-Apps & Kundenportale", en: "Web apps & customer portals", tr: "Web uygulamaları ve müşteri portalları" },
      { de: "Buchungs-, Bestell- & Bonus-Apps", en: "Booking, ordering & loyalty apps", tr: "Randevu, sipariş ve sadakat uygulamaları" },
      { de: "Interne Tools für Ihr Team", en: "Internal tools for your team", tr: "Ekibiniz için dahili araçlar" },
    ],
    cta: { de: "Projekt anfragen", en: "Request a project", tr: "Proje talep et" },
  },
  {
    id: "unternehmen",
    icon: Building2,
    name: { de: "Unternehmen & Individuell", en: "Enterprise & custom", tr: "Kurumsal ve özel" },
    price: { de: "Auf Anfrage", en: "On request", tr: "Talep üzerine" },
    desc: {
      de: "Automatisierung Ihrer Abläufe, Schnittstellen zu CRM, Kasse oder Warenwirtschaft und mehrere Standorte.",
      en: "Automation of your processes, integrations with CRM, POS or ERP, and multiple locations.",
      tr: "Süreçlerinizin otomasyonu, CRM, kasa veya ERP entegrasyonları ve birden fazla şube.",
    },
    points: [
      { de: "KI- & Digital-Check (490 €, wird angerechnet)", en: "AI & digital check (€490, credited)", tr: "AI ve dijital kontrol (490 €, mahsup edilir)" },
      { de: "Individuelle KI-Automatisierung", en: "Custom AI automation", tr: "Özel AI otomasyonu" },
      { de: "Persönlicher Ansprechpartner", en: "Personal contact person", tr: "Kişisel muhatap" },
    ],
    cta: { de: "Beratung vereinbaren", en: "Book a consultation", tr: "Danışmanlık ayarla" },
  },
  {
    id: "wartung",
    icon: Wrench,
    name: { de: "Wartung für bestehende Websites", en: "Maintenance for existing websites", tr: "Mevcut siteler için bakım" },
    price: { de: "ab 39 € / Monat", en: "from €39 / month", tr: "aylık 39 €'dan" },
    desc: {
      de: "Sie haben schon eine Website? Wir halten sie sicher, aktuell und erreichbar.",
      en: "Already have a website? We keep it secure, up to date and online.",
      tr: "Zaten bir web siteniz mi var? Güvenli, güncel ve erişilebilir tutuyoruz.",
    },
    points: [
      { de: "Updates, Backups & Überwachung", en: "Updates, backups & monitoring", tr: "Güncellemeler, yedekler ve izleme" },
      { de: "Mit Änderungs-Kontingent ab 79 €", en: "With change allowance from €79", tr: "Değişiklik kotasıyla 79 €'dan" },
      { de: "Monatlich kündbar", en: "Cancellable monthly", tr: "Aylık iptal edilebilir" },
    ],
    cta: { de: "Anfragen", en: "Enquire", tr: "Talep et" },
  },
];

/** Euro-Betrag im Format der Sprache, z. B. 1.490 € bzw. €1,490 */
export const formatEuro = (value: number, language: string) =>
  language === "en" ? `€${value.toLocaleString("en-GB")}` : `${value.toLocaleString("de-DE")} €`;
