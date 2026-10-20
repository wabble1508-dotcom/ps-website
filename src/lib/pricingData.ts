import { Star, Zap, Crown } from "lucide-react";

export type Feature = {
  text: string;
  bonus?: boolean;
};

export type Pkg = {
  id: string;
  billingType: "monthly-setup" | "monthly";
  nameDe: string;
  nameEn: string;
  nameTr: string;
  tagDe: string;
  tagEn: string;
  tagTr: string;
  originalSetupPriceDe?: string;
  originalSetupPriceEn?: string;
  setupPriceDe?: string;
  setupPriceEn?: string;
  originalPriceDe?: string;
  originalPriceEn?: string;
  priceDe: string;
  priceEn: string;
  priceSubDe: string;
  priceSubEn: string;
  priceSubTr: string;
  dailyPriceDe?: string;
  dailyPriceEn?: string;
  dailyPriceTr?: string;
  setupPeriodDe?: string;
  setupPeriodEn?: string;
  setupPeriodTr?: string;
  badgeDe: string;
  badgeEn: string;
  badgeTr: string;
  saveDe: string;
  saveEn: string;
  saveTr: string;
  urgencyDe?: string;
  urgencyEn?: string;
  urgencyTr?: string;
  descDe: string;
  descEn: string;
  descTr: string;
  icon: typeof Star;
  featuresDe: Feature[];
  featuresEn: Feature[];
  featuresTr: Feature[];
  popular: boolean;
  limited?: boolean;
};

export const packages: Pkg[] = [
  {
    id: "starter",
    billingType: "monthly-setup",
    nameDe: "Essential",
    nameEn: "Essential",
    nameTr: "Essential",
    tagDe: "Ihre digitale Basis",
    tagEn: "Your Digital Foundation",
    tagTr: "Dijital temeliniz",
    originalSetupPriceDe: "3.980 €",
    originalSetupPriceEn: "€3,980",
    setupPriceDe: "1.990€",
    setupPriceEn: "€1,990",
    originalPriceDe: "250 €",
    originalPriceEn: "€250",
    priceDe: "99€",
    priceEn: "€99",
    priceSubDe: "PRO MONAT",
    priceSubEn: "PER MONTH",
    priceSubTr: "AYLIK",
    dailyPriceDe: "nur 3,30 €/Tag",
    dailyPriceEn: "only €3.30/day",
    dailyPriceTr: "sadece 3,30 €/gün",
    setupPeriodDe: "(EINMALIG)",
    setupPeriodEn: "(ONE-TIME)",
    setupPeriodTr: "(TEK SEFERLİK)",
    badgeDe: "−50% Ersteinrichtung",
    badgeEn: "−50% Setup",
    badgeTr: "−50% Kurulum",
    saveDe: "Sie sparen 1.990 €",
    saveEn: "You save €1,990",
    saveTr: "1.990 € tasarruf edersiniz",
    urgencyDe: "Beliebter Einstieg",
    urgencyEn: "Popular Entry",
    urgencyTr: "Popüler başlangıç",
    descDe:
      "Ihre Investition in eine professionelle digitale Präsenz, die rund um die Uhr für Sie arbeitet.",
    descEn:
      "Your investment in a professional digital presence that works for you 24/7.",
    descTr:
      "Günün her saati sizin için çalışan profesyonel bir dijital varlığa yatırımınız.",
    icon: Star,
    featuresDe: [
      { text: "Moderne, responsive Website" },
      { text: "Optimiert für Smartphone & Tablet" },
      { text: "Google Maps Integration" },
      { text: "Kontaktformular mit E-Mail-Weiterleitung" },
      { text: "SSL-Zertifikat inklusive", bonus: true },
      { text: "Hosting inklusive", bonus: true },
      { text: "30 Tage Einarbeitungs-Support", bonus: true },
      { text: "Monatlich kündbar" },
    ],
    featuresEn: [
      { text: "Modern, responsive website" },
      { text: "Optimized for smartphone & tablet" },
      { text: "Google Maps integration" },
      { text: "Contact form with email forwarding" },
      { text: "SSL certificate included", bonus: true },
      { text: "Hosting included", bonus: true },
      { text: "30 days onboarding support", bonus: true },
      { text: "Monthly cancellable" },
    ],
    featuresTr: [
      { text: "Modern, responsive web sitesi" },
      { text: "Akıllı telefon & tablet için optimize" },
      { text: "Google Maps entegrasyonu" },
      { text: "E-posta yönlendirmeli iletişim formu" },
      { text: "SSL sertifikası dahil", bonus: true },
      { text: "Hosting dahil", bonus: true },
      { text: "30 gün onboarding desteği", bonus: true },
      { text: "Aylık iptal edilebilir" },
    ],
    popular: false,
    limited: false,
  },
  {
    id: "volle-bude",
    billingType: "monthly-setup",
    nameDe: "Elite",
    nameEn: "Elite",
    nameTr: "Elite",
    tagDe: "Empfehlung der Experten",
    tagEn: "Experts' Choice",
    tagTr: "Uzmanların tercihi",
    originalSetupPriceDe: "4.980 €",
    originalSetupPriceEn: "€4,980",
    setupPriceDe: "2.490€",
    setupPriceEn: "€2,490",
    priceDe: "149€",
    priceEn: "€149",
    priceSubDe: "PRO MONAT",
    priceSubEn: "PER MONTH",
    priceSubTr: "AYLIK",
    dailyPriceDe: "nur 4,97 €/Tag",
    dailyPriceEn: "only €4.97/day",
    dailyPriceTr: "sadece 4,97 €/gün",
    setupPeriodDe: "(EINMALIG)",
    setupPeriodEn: "(ONE-TIME)",
    setupPeriodTr: "(TEK SEFERLİK)",
    badgeDe: "−50% Ersteinrichtung",
    badgeEn: "−50% Setup",
    badgeTr: "−50% Kurulum",
    saveDe: "Sie sparen 2.490 €",
    saveEn: "You save €2,490",
    saveTr: "2.490 € tasarruf edersiniz",
    urgencyDe: "⚡ Nur noch 3 Plätze diesen Monat",
    urgencyEn: "⚡ Only 3 spots left this month",
    urgencyTr: "⚡ Bu ay yalnızca 3 yer kaldı",
    descDe:
      "Ihre Investition in die komplette Kunden-Maschine — Website, Automatisierung & Wartung aus einer Hand.",
    descEn:
      "Your investment in the complete customer machine — website, automation & maintenance from one source.",
    descTr:
      "Tam müşteri makinesine yatırımınız — web sitesi, otomasyon ve bakım tek elden.",
    icon: Zap,
    featuresDe: [
      { text: "Alles aus Essential", bonus: true },
      {
        text: "Premium Care Wartung inklusive (Wert: 150€/Monat)",
        bonus: true,
      },
      { text: "Termine & Anfragen direkt aufs Handy" },
      { text: "SMS-Erinnerungen gegen No-Shows" },
      { text: "Google-Bewertungen automatisch sammeln", bonus: true },
      { text: "KI-Telefonassistent & Live-Chat", bonus: true },
      { text: "Persönlicher Ansprechpartner", bonus: true },
      { text: "Laufende Updates & Backups inklusive", bonus: true },
      { text: "Monatlich kündbar" },
    ],
    featuresEn: [
      { text: "Everything from Essential", bonus: true },
      {
        text: "Premium Care maintenance included (Value: €150/mo)",
        bonus: true,
      },
      { text: "Appointments & inquiries to your phone" },
      { text: "SMS reminders against no-shows" },
      { text: "Automatic Google review collection", bonus: true },
      { text: "AI phone assistant & live chat", bonus: true },
      { text: "Personal contact", bonus: true },
      { text: "Ongoing updates & backups included", bonus: true },
      { text: "Monthly cancellable" },
    ],
    featuresTr: [
      { text: "Essential'deki her şey", bonus: true },
      {
        text: "Premium Care bakım dahil (Değer: 150€/ay)",
        bonus: true,
      },
      { text: "Randevular ve talepler doğrudan telefonunuza" },
      { text: "Gelmeyenlere karşı SMS hatırlatmaları" },
      { text: "Otomatik Google değerlendirme toplama", bonus: true },
      { text: "Yapay zeka telefon asistanı ve canlı sohbet", bonus: true },
      { text: "Kişisel iletişim kişisi", bonus: true },
      { text: "Sürekli güncellemeler ve yedekler dahil", bonus: true },
      { text: "Aylık iptal edilebilir" },
    ],
    popular: true,
    limited: true,
  },
  {
    id: "wartung",
    billingType: "monthly",
    nameDe: "Premium Care",
    nameEn: "Premium Care",
    nameTr: "Premium Care",
    tagDe: "Für bestehende Websites",
    tagEn: "For existing websites",
    tagTr: "Mevcut web siteleri için",
    originalPriceDe: "390 €",
    originalPriceEn: "€390",
    priceDe: "150€",
    priceEn: "€150",
    priceSubDe: "PRO MONAT",
    priceSubEn: "PER MONTH",
    priceSubTr: "AYLIK",
    dailyPriceDe: "nur 5,00 €/Tag",
    dailyPriceEn: "only €5.00/day",
    dailyPriceTr: "sadece 5,00 €/gün",
    badgeDe: "−62%",
    badgeEn: "−62%",
    badgeTr: "−62%",
    saveDe: "Sie sparen 2.880 €/Jahr",
    saveEn: "You save €2,880/year",
    saveTr: "Yılda 2.880 € tasarruf edersiniz",
    urgencyDe: "Tipp: Elite bietet mehr für weniger",
    urgencyEn: "Tip: Elite offers more for less",
    urgencyTr: "İpucu: Elite daha fazlasını daha ucuza sunar",
    descDe:
      "Ihre Investition in Sicherheit & Ruhe — wir pflegen Ihre bestehende Website professionell. Nur für bestehende Websites ohne Automatisierung. Bei Elite bereits inklusive — nicht zusätzlich nötig.",
    descEn:
      "Your investment in security & peace of mind — we professionally maintain your existing website. Only for existing websites without automation. Already included in Elite — not required additionally.",
    descTr:
      "Güvenlik ve huzura yatırımınız — mevcut web sitenizi profesyonelce bakımını yapıyoruz. Yalnızca otomasyonsuz mevcut web siteleri için. Elite'te zaten dahil — ek olarak gerekmez.",
    icon: Crown,
    featuresDe: [
      { text: "Sicherheitskopien (Backups)" },
      { text: "Software-Updates im Hintergrund" },
      { text: "Schutz vor Hackern & Malware" },
      { text: "Kleine Textänderungen auf Anfrage", bonus: true },
      { text: "SSL-Zertifikat inklusive", bonus: true },
      { text: "Monatlich kündbar" },
    ],
    featuresEn: [
      { text: "Security backups" },
      { text: "Background software updates" },
      { text: "Protection against hackers & malware" },
      { text: "Small text changes on request", bonus: true },
      { text: "SSL certificate included", bonus: true },
      { text: "Monthly cancellable" },
    ],
    featuresTr: [
      { text: "Güvenlik yedeklemeleri (Backups)" },
      { text: "Arka planda yazılım güncellemeleri" },
      { text: "Hacker ve kötü amaçlı yazılımlara karşı koruma" },
      { text: "İstek üzerine küçük metin değişiklikleri", bonus: true },
      { text: "SSL sertifikası dahil", bonus: true },
      { text: "Aylık iptal edilebilir" },
    ],
    popular: false,
    limited: false,
  },
];
