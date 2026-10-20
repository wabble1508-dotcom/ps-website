import {
  CreditCard,
  FileText,
  Megaphone,
  Sticker,
  BookOpen,
  Nfc,
  Palette,
  Printer,
  Truck,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export interface PrintCategory {
  id: string;
  icon: typeof CreditCard;
  tDe: string;
  tEn: string;
  tTr: string;
  dDe: string;
  dEn: string;
  dTr: string;
  priceDe: string;
  priceEn: string;
  priceTr: string;
  stock: number;
}

export const printCategories: PrintCategory[] = [
  {
    id: "cards",
    icon: CreditCard,
    tDe: "Visitenkarten",
    tEn: "Business Cards",
    tTr: "Kartvizitler",
    dDe: "Edle Matt-Finish, Prägung oder Folienveredelung.",
    dEn: "Premium matte, embossed or foil-finish cards.",
    dTr: "Premium mat, kabartma veya folyo kaplama kartlar.",
    priceDe: "ab 39 €",
    priceEn: "from €39",
    priceTr: "39 €'dan",
    stock: 8,
  },
  {
    id: "flyer",
    icon: FileText,
    tDe: "Flyer & Prospekte",
    tEn: "Flyers & Brochures",
    tTr: "El İlanları & Broşürler",
    dDe: "Hochwertiger 4/4 Farbdruck auf Premium-Papier.",
    dEn: "Premium 4/4 color print on quality paper.",
    dTr: "Kaliteli kağıda premium 4/4 renkli baskı.",
    priceDe: "ab 59 €",
    priceEn: "from €59",
    priceTr: "59 €'dan",
    stock: 5,
  },
  {
    id: "banner",
    icon: Megaphone,
    tDe: "Banner & Plakate",
    tEn: "Banners & Posters",
    tTr: "Afişler & Posterler",
    dDe: "Wetterfest, großformatig, attention-grabbing.",
    dEn: "Weatherproof, large-format, eye-catching.",
    dTr: "Hava dayanıklı, büyük format, dikkat çekici.",
    priceDe: "ab 79 €",
    priceEn: "from €79",
    priceTr: "79 €'dan",
    stock: 3,
  },
  {
    id: "sticker",
    icon: Sticker,
    tDe: "Aufkleber & Etiketten",
    tEn: "Stickers & Labels",
    tTr: "Çıkartmalar & Etiketler",
    dDe: "Wasserfest, indiv. geschnitten, UV-beständig.",
    dEn: "Waterproof, custom-cut, UV-resistant.",
    dTr: "Su geçirmez, özel kesim, UV dayanıklı.",
    priceDe: "ab 29 €",
    priceEn: "from €29",
    priceTr: "29 €'dan",
    stock: 12,
  },
  {
    id: "menu",
    icon: BookOpen,
    tDe: "Speise- & Menükarten",
    tEn: "Menus & Cards",
    tTr: "Menü & Yiyecek Kartları",
    dDe: "Gebundene Premium-Speisekarten für Gastro.",
    dEn: "Bound premium menus for hospitality.",
    dTr: "Gastronomi için ciltli premium menüler.",
    priceDe: "ab 89 €",
    priceEn: "from €89",
    priceTr: "89 €'dan",
    stock: 4,
  },
  {
    id: "nfc",
    icon: Nfc,
    tDe: "NFC Bewertungs-Karten",
    tEn: "NFC Review Cards",
    tTr: "NFC Değerlendirme Kartları",
    dDe: "Programmierte NFC-Karten für Google & Co.",
    dEn: "Programmed NFC cards for Google & more.",
    dTr: "Google ve diğerleri için programlanmış NFC kartlar.",
    priceDe: "ab 24,90 €",
    priceEn: "from €24.90",
    priceTr: "24,90 €'dan",
    stock: 6,
  },
];

export const printBenefits = [
  {
    icon: Palette,
    tDe: "Professionelles Design",
    tEn: "Professional Design",
    tTr: "Profesyonel Tasarım",
    dDe: "Wir gestalten Ihr Material — kein Template-Look, sondern markenstark.",
    dEn: "We design your material — no template look, real brand power.",
    dTr: "Malzemenizi biz tasarlıyoruz — şablon görünüm değil, gerçek marka gücü.",
  },
  {
    icon: Printer,
    tDe: "Höchste Druckqualität",
    tEn: "Top Print Quality",
    tTr: "En Yüksek Baskı Kalitesi",
    dDe: "Premium-Papiersorten, Farbbrillanz & Veredelungen.",
    dEn: "Premium paper stocks, vivid color & finishes.",
    dTr: "Premium kağıt türleri, canlı renk & kaplamalar.",
  },
  {
    icon: Truck,
    tDe: "Versandkostenfrei",
    tEn: "Free Shipping",
    tTr: "Ücretsiz Kargo",
    dDe: "Lieferung innerhalb Deutschlands direkt zu Ihnen.",
    dEn: "Delivery within Germany straight to your door.",
    dTr: "Almanya içinde kapınıza kadar teslimat.",
  },
  {
    icon: ShieldCheck,
    tDe: "Zufriedenheitsgarantie",
    tEn: "Satisfaction Guarantee",
    tTr: "Memnuniyet Garantisi",
    dDe: "Nicht zufrieden? Wir drucken nach — ohne Wenn und Aber.",
    dEn: "Not happy? We reprint — no questions asked.",
    dTr: "Memnun değil misiniz? Soru sormadan yeniden basıyoruz.",
  },
];

export const printSteps = [
  {
    icon: MessageCircle,
    step: "1",
    tDe: "Anfrage per WhatsApp",
    tEn: "Request via WhatsApp",
    tTr: "WhatsApp ile Talep",
    dDe: "Sie schreiben uns, was Sie brauchen — wir beraten kostenlos.",
    dEn: "Tell us what you need — free consultation included.",
    dTr: "İhtiyacınızı yazın — ücretsiz danışmanlık dahil.",
  },
  {
    icon: Palette,
    step: "2",
    tDe: "Design & Freigabe",
    tEn: "Design & Approval",
    tTr: "Tasarım & Onay",
    dDe: "Wir liefern einen Entwurf, den Sie freigeben — bis es passt.",
    dEn: "We deliver a draft you approve — until it's perfect.",
    dTr: "Onaylayacağınız bir taslak sunuyoruz — mükemmel olana kadar.",
  },
  {
    icon: Truck,
    step: "3",
    tDe: "Druck & Lieferung",
    tEn: "Print & Delivery",
    tTr: "Baskı & Teslimat",
    dDe: "Druck, Veredelung und versandkostenfreie Lieferung.",
    dEn: "Printing, finishing and free delivery to you.",
    dTr: "Baskı, kaplama ve ücretsiz teslimat.",
  },
];
