// Index for pricing page translations — aggregates all 18 languages
import { pricingDe } from "./pricingDe";
import { pricingEn } from "./pricingDe";
import { pricingEs, pricingFr, pricingIt, pricingPt } from "./pricingRomance";
import {
  pricingPl,
  pricingTr,
  pricingRo,
  pricingRu,
  pricingBg,
} from "./pricingSlavic";
import {
  pricingAr,
  pricingFa,
  pricingPs,
  pricingHi,
  pricingZh,
  pricingJa,
  pricingVi,
} from "./pricingAsian";

export type PricingT = typeof pricingDe;

export const pricingTranslations: Record<string, PricingT> = {
  de: pricingDe,
  en: pricingEn,
  es: pricingEs,
  fr: pricingFr,
  it: pricingIt,
  pt: pricingPt,
  pl: pricingPl,
  tr: pricingTr,
  ro: pricingRo,
  ru: pricingRu,
  bg: pricingBg,
  ar: pricingAr,
  fa: pricingFa,
  ps: pricingPs,
  hi: pricingHi,
  zh: pricingZh,
  ja: pricingJa,
  vi: pricingVi,
};

export const getPricingT = (lang: string): PricingT =>
  pricingTranslations[lang] || pricingDe;
