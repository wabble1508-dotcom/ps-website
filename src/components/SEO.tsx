import { SEOHead } from "./SEOHead";

// Firmendaten für Google (Name, Adresse, Telefon müssen überall gleich sein)
export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ps-professional-solutions.de/#business",
  name: "PS Professional Solutions",
  description:
    "Webdesign Agentur Dortmund — Professionell programmierte Webseiten, KI Automatisierung, KI Telefonassistent und KI Live-Chat.",
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
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/ps_professional_solutions/",
    "https://www.tiktok.com/@psprofessional.solutions",
    "https://www.youtube.com/@psprofessionalsolutions",
  ],
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
