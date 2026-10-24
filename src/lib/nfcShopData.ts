export interface NfcProduct {
  id: string;
  nameDe: string;
  nameEn: string;
  priceDe: string;
  priceEn: string;
  oldPriceDe: string;
  oldPriceEn: string;
  pricePerUnitDe: string;
  pricePerUnitEn: string;
  saveBadgeDe: string;
  saveBadgeEn: string;
  badgeDe: string;
  badgeEn: string;
  descDe: string;
  descEn: string;
  featuresDe: string[];
  featuresEn: string[];
  popular: boolean;
  image: string;
}

// Format 1: Tischaufsteller / Stand (Einkauf ~7,69 €, Verkauf 34,90 €)
export const standProducts: NfcProduct[] = [
  {
    id: "stand-single",
    nameDe: "1x Premium NFC Tischaufsteller",
    nameEn: "1x Premium NFC Table Stand",
    priceDe: "34,90 €",
    priceEn: "€34.90",
    oldPriceDe: "69,00 €",
    oldPriceEn: "€69.00",
    pricePerUnitDe: "34,90 € / Aufsteller",
    pricePerUnitEn: "€34.90 / stand",
    saveBadgeDe: "Aktionspreis (-49%)",
    saveBadgeEn: "Special Price (-49%)",
    badgeDe: "Perfekt für Theke & Empfang",
    badgeEn: "Perfect for Counter & Reception",
    descDe:
      "Hochwertiger Acryl L-Tischaufsteller (128 x 76 mm) mit original NTAG215-Chip. Wasserfest, kratzfest, bruchsicher & ohne Mindestbestellmenge.",
    descEn:
      "High-quality acrylic L-table stand (128 x 76 mm) with authentic NTAG215 chip. Waterproof, scratch-resistant, durable & no minimum order.",
    featuresDe: [
      "1x NFC L-Tischaufsteller (76 x 128 mm)",
      "Echter NTAG215 High-Speed NFC-Chip",
      "Individuell programmiert (Google, IG oder WA)",
      "Wasserfestes & robustes Premium PVC/Acryl",
      "Kompakt & leicht (ideal für Versand & Theke)",
      "Keine App & keine monatlichen Abo-Kosten",
      "Gratis Versand innerhalb Deutschlands",
    ],
    featuresEn: [
      "1x NFC L-Table Stand (76 x 128 mm)",
      "Authentic NTAG215 high-speed NFC chip",
      "Custom programmed (Google, IG or WA)",
      "Waterproof & durable premium PVC/Acrylic",
      "Compact & lightweight design",
      "No app or subscription required",
      "Free shipping within Germany",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/5bf63474-2030-4a26-92b8-81400b6a8a5b.png",
  },
  {
    id: "stand-double",
    nameDe: "2x Doppel-Paket (Theke & Gastro)",
    nameEn: "2x Double Pack (Counter & Venue)",
    priceDe: "59,90 €",
    priceEn: "€59.90",
    oldPriceDe: "129,00 €",
    oldPriceEn: "€129.00",
    pricePerUnitDe: "nur 29,95 € / Aufsteller",
    pricePerUnitEn: "only €29.95 / stand",
    saveBadgeDe: "Sie sparen 54%",
    saveBadgeEn: "Save 54%",
    badgeDe: "Bestseller für Lokale",
    badgeEn: "Bestseller for Venues",
    descDe:
      "Zwei Tischaufsteller für Eingang, Kasse oder verschiedene Tische. Kombinieren Sie Google & Instagram frei.",
    descEn:
      "Two table stands for entrance, register or multiple tables. Combine Google & Instagram freely.",
    featuresDe: [
      "2x NFC L-Tischaufsteller (76 x 128 mm)",
      "Freie Wahl der Plattformen (z.B. 1x Google + 1x Instagram)",
      "NTAG215 Chip mit sofortiger Smartphone-Erkennung",
      "Langlebiges, abwischbares PVC-Material",
      "Gratis Premium-Versand mit Sendungsverfolgung",
      "Keine monatlichen Gebühren — 100% Einmalpreis",
    ],
    featuresEn: [
      "2x NFC L-Table Stands (76 x 128 mm)",
      "Free platform mix (e.g. 1x Google + 1x Instagram)",
      "NTAG215 chip with instant phone recognition",
      "Durable, wipeable PVC material",
      "Free tracked express shipping",
      "No monthly fees — 100% one-time price",
    ],
    popular: true,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/c63ba50b-7667-4b4d-8304-e694dce5bbff.png",
  },
  {
    id: "stand-business",
    nameDe: "4x Business Aufsteller Set",
    nameEn: "4x Business Stand Set",
    priceDe: "99,90 €",
    priceEn: "€99.90",
    oldPriceDe: "249,00 €",
    oldPriceEn: "€249.00",
    pricePerUnitDe: "nur 24,98 € / Aufsteller",
    pricePerUnitEn: "only €24.98 / stand",
    saveBadgeDe: "Mengenrabatt (-60%)",
    saveBadgeEn: "Volume Discount (-60%)",
    badgeDe: "Bester Preis pro Stück",
    badgeEn: "Best Value per Stand",
    descDe:
      "Vier NFC-Tischaufsteller für Filialen, Salons, Praxen oder Event-Tische. Höchste Sichtbarkeit & maximale Bewertungen.",
    descEn:
      "Four NFC table stands for multi-branch stores, salons, practices or event tables. Maximum visibility.",
    featuresDe: [
      "4x NFC L-Tischaufsteller (76 x 128 mm)",
      "Plattformen frei kombinierbar (Google, Instagram, WhatsApp)",
      "Höchster Ersparnis-Vorteil (nur 24,98 € / Stück)",
      "Robuster NTAG215 High-Speed NFC-Chip",
      "Gratis Express-Versand & Bevorzugter Support",
      "Rechnung mit ausgewiesener MwSt.",
    ],
    featuresEn: [
      "4x NFC L-Table Stands (76 x 128 mm)",
      "Mix & match platforms (Google, Instagram, WhatsApp)",
      "Highest volume savings (only €24.98 / piece)",
      "Durable NTAG215 high-speed NFC chip",
      "Free express shipping & priority support",
      "Official tax invoice included",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/5bf63474-2030-4a26-92b8-81400b6a8a5b.png",
  },
];

// Format 2: Scheckkarten (Einkauf ~2,19 €, Verkauf 24,90 €)
export const cardProducts: NfcProduct[] = [
  {
    id: "card-single",
    nameDe: "1x Starter NFC-Scheckkarte",
    nameEn: "1x Starter NFC Card",
    priceDe: "24,90 €",
    priceEn: "€24.90",
    oldPriceDe: "49,00 €",
    oldPriceEn: "€49.00",
    pricePerUnitDe: "24,90 € / Karte",
    pricePerUnitEn: "€24.90 / card",
    saveBadgeDe: "Aktionspreis (-49%)",
    saveBadgeEn: "Special Price (-49%)",
    badgeDe: "Ideal für die Hosentasche",
    badgeEn: "Pocket Size",
    descDe:
      "Edle NFC-Karte im Visitenkartenformat mit edlem Matt-Finish. Passt perfekt in jeden Geldbeutel.",
    descEn:
      "Premium credit-card sized NFC card with matte finish. Fits perfectly in any wallet.",
    featuresDe: [
      "1x Echte NFC-Karte (Matt-Finish PVC)",
      "Individuell programmiert (Google, IG oder WA)",
      "Direkt-Weiterleitung mit einem Tippen",
      "Funktioniert mit jedem modernen Smartphone",
      "Keine App erforderlich & keine Abos",
      "Gratis Versand innerhalb Deutschlands",
    ],
    featuresEn: [
      "1x Authentic NFC Card (Matte PVC)",
      "Custom programmed (Google, IG or WA)",
      "Instant one-tap redirect",
      "Works with every modern smartphone",
      "No app needed & zero subscription fees",
      "Free shipping in Germany",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/6601edfc-c1fc-46f9-812e-8900054adb77.png",
  },
  {
    id: "card-team",
    nameDe: "3x Team-Paket (Bestseller)",
    nameEn: "3x Team Pack (Bestseller)",
    priceDe: "59,90 €",
    priceEn: "€59.90",
    oldPriceDe: "119,00 €",
    oldPriceEn: "€119.00",
    pricePerUnitDe: "nur 19,96 € / Karte",
    pricePerUnitEn: "only €19.96 / card",
    saveBadgeDe: "Sie sparen 50%",
    saveBadgeEn: "Save 50%",
    badgeDe: "Beliebteste Wahl",
    badgeEn: "Most Popular",
    descDe:
      "Drei NFC-Karten für Ihr Team — ideal für Außendienst, Handwerker, Berater oder Service-Kräfte.",
    descEn:
      "Three NFC cards for your team — ideal for field workers, consultants or service staff.",
    featuresDe: [
      "3x Echte NFC-Scheckkarten",
      "Alle individuell programmiert auf Ihre Wunsch-Links",
      "Gratis Premium-Versand mit Sendungsverfolgung",
      "Robuster NTAG215 High-Speed Chip",
      "Datenschutzfreundlich & sicher",
      "Einmalzahlung ohne Folgekosten",
    ],
    featuresEn: [
      "3x Authentic NFC credit cards",
      "All custom programmed to your target links",
      "Free premium tracked shipping",
      "Durable NTAG215 high-speed chip",
      "100% GDPR compliant & secure",
      "One-time payment with zero hidden fees",
    ],
    popular: true,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/6601edfc-c1fc-46f9-812e-8900054adb77.png",
  },
  {
    id: "card-business",
    nameDe: "5x Business-Paket (Maximaler Wert)",
    nameEn: "5x Business Pack (Max Value)",
    priceDe: "89,90 €",
    priceEn: "€89.90",
    oldPriceDe: "199,00 €",
    oldPriceEn: "€199.00",
    pricePerUnitDe: "nur 17,98 € / Karte",
    pricePerUnitEn: "only €17.98 / card",
    saveBadgeDe: "Mengenrabatt (-55%)",
    saveBadgeEn: "Volume Discount (-55%)",
    badgeDe: "Bester Preis pro Karte",
    badgeEn: "Best Price per Card",
    descDe:
      "Fünf NFC-Karten für maximale Flexibilität — für Ihr gesamtes Team, Außendienst & Messen.",
    descEn:
      "Five NFC cards for maximum flexibility — for your whole team, sales reps & events.",
    featuresDe: [
      "5x Echte NFC-Scheckkarten",
      "Kombinieren Sie Google, Instagram & WhatsApp frei",
      "Höchster Rabatt (nur 17,98 € / Karte)",
      "Gratis Express-Versand",
      "Zentrale Ansprechpartner-Betreuung",
      "Lebenslanger technischer Support",
    ],
    featuresEn: [
      "5x Authentic NFC credit cards",
      "Combine Google, Instagram & WhatsApp freely",
      "Highest discount (only €17.98 / card)",
      "Free express shipping",
      "Dedicated account representative",
      "Lifetime technical support",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/6601edfc-c1fc-46f9-812e-8900054adb77.png",
  },
];

// Format 3: NFC Aufkleber / Plate-Sticker (Einkauf ~1,50 €, Verkauf 14,90 € / 3er 34,90 €)
export const stickerProducts: NfcProduct[] = [
  {
    id: "sticker-single",
    nameDe: "1x NFC Plate-Sticker",
    nameEn: "1x NFC Plate Sticker",
    priceDe: "14,90 €",
    priceEn: "€14.90",
    oldPriceDe: "29,00 €",
    oldPriceEn: "€29.00",
    pricePerUnitDe: "14,90 € / Aufkleber",
    pricePerUnitEn: "€14.90 / sticker",
    saveBadgeDe: "Aktionspreis (-48%)",
    saveBadgeEn: "Special Price (-48%)",
    badgeDe: "Flexibel klebbar",
    badgeEn: "Self-Adhesive",
    descDe:
      "Selbstklebender, wasserfester NFC-Aufkleber. Ideal für Spiegel, Schaufenster, Kassen oder Autos.",
    descEn:
      "Self-adhesive, waterproof NFC sticker. Ideal for mirrors, shop windows, registers or cars.",
    featuresDe: [
      "1x NFC Plate Sticker (wasserfest & UV-beständig)",
      "Starker 3M-Kleber für festen Halt auf Glas & Holz",
      "Individuell programmiert auf Ihre Wunschebene",
      "NTAG215 Chip integriert",
      "Keine App nötig",
      "Inkl. Gratis-Versand",
    ],
    featuresEn: [
      "1x NFC Plate Sticker (waterproof & UV-resistant)",
      "Strong 3M adhesive for glass, metal & wood",
      "Custom programmed to your destination link",
      "Integrated NTAG215 chip",
      "No app required",
      "Free shipping included",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/2a2aeb89-d72d-4bdf-a4b2-1ca8911cfd4c.png",
  },
  {
    id: "sticker-trio",
    nameDe: "3x Sticker-Set (Bestseller)",
    nameEn: "3x Sticker Set (Bestseller)",
    priceDe: "34,90 €",
    priceEn: "€34.90",
    oldPriceDe: "69,00 €",
    oldPriceEn: "€69.00",
    pricePerUnitDe: "nur 11,63 € / Aufkleber",
    pricePerUnitEn: "only €11.63 / sticker",
    saveBadgeDe: "Sie sparen 50%",
    saveBadgeEn: "Save 50%",
    badgeDe: "Für den ganzen Laden",
    badgeEn: "For Whole Store",
    descDe:
      "Drei NFC-Sticker für Eingangstür, Kasse und Spiegel. Kunden können überall bequem interagieren.",
    descEn:
      "Three NFC stickers for entrance door, cash register and mirror. Customers engage everywhere.",
    featuresDe: [
      "3x NFC Plate Sticker Set",
      "Freie Wahl: Google, Instagram oder WhatsApp Design",
      "Wasserfest, abwischbar & kratzfest",
      "Gratis Versand mit Tracking",
      "Sofort einsatzbereit geliefert",
      "Einmalige Investition",
    ],
    featuresEn: [
      "3x NFC Plate Sticker Set",
      "Choice of Google, Instagram or WhatsApp design",
      "Waterproof, wipeable & scratch-resistant",
      "Free tracked shipping",
      "Delivered pre-programmed",
      "One-time investment",
    ],
    popular: true,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/2a2aeb89-d72d-4bdf-a4b2-1ca8911cfd4c.png",
  },
  {
    id: "sticker-bundle",
    nameDe: "5x Mega Sticker Pack",
    nameEn: "5x Mega Sticker Pack",
    priceDe: "49,90 €",
    priceEn: "€49.90",
    oldPriceDe: "99,00 €",
    oldPriceEn: "€99.00",
    pricePerUnitDe: "nur 9,98 € / Aufkleber",
    pricePerUnitEn: "only €9.98 / sticker",
    saveBadgeDe: "Mengenrabatt (-50%)",
    saveBadgeEn: "Volume Discount (-50%)",
    badgeDe: "Unter 10€ pro Stück",
    badgeEn: "Under €10 per Piece",
    descDe:
      "Fünf NFC-Sticker zum Sparpreis. Statten Sie mehrere Standorte oder Räume lückenlos aus.",
    descEn:
      "Five NFC stickers at discount price. Equip multiple locations or rooms effortlessly.",
    featuresDe: [
      "5x NFC Plate Sticker Set",
      "Bester Stückpreis (nur 9,98 € / Sticker)",
      "Freie Plattform-Kombination möglich",
      "Gratis Express-Versand",
      "Voller Kundenservice von PS Professional Solutions",
      "100% Zufriedenheitsgarantie",
    ],
    featuresEn: [
      "5x NFC Plate Sticker Set",
      "Best unit price (only €9.98 / sticker)",
      "Free platform combination possible",
      "Free express shipping",
      "Full support from PS Professional Solutions",
      "100% satisfaction guarantee",
    ],
    popular: false,
    image:
      "/media/vibe.filesafe.space/1778931020193405557/attachments/2a2aeb89-d72d-4bdf-a4b2-1ca8911cfd4c.png",
  },
];
