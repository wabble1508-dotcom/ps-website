export interface FeatureTextContent {
  seo: {
    title: string;
    description: string;
    keywords?: string;
    localBusiness?: boolean;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
  };
  problem: {
    items: { title: string; description: string }[];
    buttonText: string;
  };
  solution: {
    title: string;
    checkmarks: { text: string }[];
    cards: { title: string; description: string }[];
  };
  einsatzgebiete: { title: string }[];
  videoTestimonial?: { title: string; description: string };
  faqs: { question: string; answer: string }[];
}

export type LanguageCode =
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "tr"
  | "ro"
  | "ru"
  | "bg"
  | "ar"
  | "hi"
  | "zh"
  | "fa"
  | "ps";
