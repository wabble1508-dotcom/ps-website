import { Helmet } from "react-helmet-async";

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
  keywords?: string;
}

const DEFAULT_DOMAIN = "https://ps-professional-solutions.de";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schemaJson,
  keywords,
}: SEOHeadProps) => {
  // Normalize canonical URL to absolute with ps-professional-solutions.de
  const fullCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${DEFAULT_DOMAIN}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : typeof window !== "undefined"
      ? `${DEFAULT_DOMAIN}${window.location.pathname}`
      : DEFAULT_DOMAIN;

  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${DEFAULT_DOMAIN}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="PS Professional Solutions" />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Schema JSON-LD */}
      {schemaJson && (
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      )}
    </Helmet>
  );
};
