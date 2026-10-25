// Texte der Preisseite: Deutsch, Englisch und Türkisch direkt, alle anderen Sprachen
// zeigen die deutschen Texte, die über src/lib/i18n/dict übersetzt werden.
import { pricingDe, pricingEn, pricingTr } from "./pricingDe";

export type PricingT = typeof pricingDe;

export const pricingTranslations: Record<string, PricingT> = {
  de: pricingDe,
  en: pricingEn,
  tr: pricingTr,
};

export const getPricingT = (lang: string): PricingT => pricingTranslations[lang] || pricingDe;
