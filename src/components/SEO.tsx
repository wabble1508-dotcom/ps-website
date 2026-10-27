import { useLocation } from "react-router-dom";
import { SEOHead } from "./SEOHead";
import { useLanguage } from "./LanguageContext";
import { SEO_DE } from "@/lib/seoOverrides";
import OG_PAGES from "@/lib/ogImages.json";

// Monatliches Angebot „ab … €“ für die strukturierten Daten
const monthlyOffer = (name: string, price: number, path: string) => ({
  "@type": "Offer",
  url: `https://ps-professional-solutions.de${path}`,
  itemOffered: { "@type": "Service", name },
  priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", unitText: "Monat" },
});

// Firmendaten für Google (Name, Adresse, Telefon müssen überall gleich sein)
export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ps-professional-solutions.de/#business",
  name: "PS Professional Solutions",
  description:
    "Webdesign, App- und Software-Entwicklung aus Dortmund: programmierte Websites ab 49 € im Monat ohne Einrichtungskosten, Apps, individuelle Software, KI-Live-Chat und KI-Telefonassistent.",
  url: "https://ps-professional-solutions.de",
  logo: "https://ps-professional-solutions.de/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png",
  image: "https://ps-professional-solutions.de/og-image.jpg",
  telephone: "+4915207595260",
  email: "info@ps-professional-solutions.de",
  founder: { "@type": "Person", name: "Pankaj Mondjal" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lindenhorster Str. 185",
    postalCode: "44339",
    addressLocality: "Dortmund",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.5381, longitude: 7.4378 },
  areaServed: [{ "@type": "City", name: "Dortmund" }, { "@type": "Country", name: "Deutschland" }],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "ab 49 €",
  sameAs: [
    "https://www.instagram.com/ps_professional_solutions/",
    "https://www.tiktok.com/@psprofessional.solutions",
    "https://www.youtube.com/@psprofessionalsolutions",
  ],
  knowsAbout: ["Webdesign", "Website-Erstellung", "App-Entwicklung", "Software-Entwicklung", "Suchmaschinenoptimierung", "KI-Automatisierung"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen",
    itemListElement: [
      monthlyOffer("Website Start (0 € Einrichtung)", 49, "/guenstige-website"),
      monthlyOffer("Website Business mit KI-Chat und Terminbuchung", 129, "/preise"),
      monthlyOffer("Website mit KI-Telefonassistent", 249, "/preise"),
      {
        "@type": "Offer",
        url: "https://ps-professional-solutions.de/app-entwicklung",
        itemOffered: { "@type": "Service", name: "App- und Software-Entwicklung" },
        priceSpecification: { "@type": "PriceSpecification", minPrice: 4900, priceCurrency: "EUR" },
      },
    ],
  },
};

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  faqs?: { question: string; answer: string }[];
  localBusiness?: boolean;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  noIndex,
  faqs,
  localBusiness,
  schemaJson,
}: SEOProps) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const override = language === "de" ? SEO_DE[pathname] : undefined;
  if (override) {
    title = override.title;
    description = override.description;
  }
  // eigenes Vorschaubild je Seite (erzeugt von tools/og-images.mjs)
  if (OG_PAGES.includes(pathname)) {
    ogImage = `/og/${pathname === "/" ? "startseite" : pathname.slice(1)}.jpg`;
  }
  const schemas: Array<Record<string, unknown>> = [];

  if (schemaJson) {
    if (Array.isArray(schemaJson)) {
      schemas.push(...schemaJson);
    } else {
      schemas.push(schemaJson);
    }
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (localBusiness) {
    schemas.push(LOCAL_BUSINESS);
  }

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      ogImage={ogImage}
      canonical={canonical}
      noIndex={noIndex}
      schemaJson={
        schemas.length === 1
          ? schemas[0]
          : schemas.length > 1
            ? schemas
            : undefined
      }
    />
  );
};
