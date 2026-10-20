import type { LanguageCode } from "./types";

export interface IndustryTextContent {
  seo: {
    title: string;
    description: string;
    keywords?: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  painPoints: { title: string }[];
  leadMagnet: {
    title: string;
    description: string;
    buttonText: string;
  };
  workflow: {
    title: string;
    description: string;
  };
  benefits?: {
    title: string;
    description: string;
  };
  checkmarksSection: {
    title: string;
    subtitle: string;
    list: { title: string; description: string }[];
  };
  testimonials: { title: string; description: string }[];
  videoTestimonial?: {
    title: string;
    description: string;
  };
  websitePreview?: {
    title: string;
    description: string;
  };
  faqs: { question: string; answer: string }[];
}

export type { LanguageCode };
