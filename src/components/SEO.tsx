import { SEOHead } from "./SEOHead";

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
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "PS Professional Solutions",
      description:
        "Webdesign Agentur Dortmund — Professionell programmierte Webseiten, KI Automatisierung, KI Telefonassistent und KI Live-Chat.",
      url: "https://ps-professional-solutions.de",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dortmund",
        addressRegion: "NRW",
        addressCountry: "DE",
      },
      areaServed: "Dortmund und bundesweit",
      openingHours: "Mo-Fr 09:00-18:00",
    });
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
