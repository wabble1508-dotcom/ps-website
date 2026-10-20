import { de } from "./translations/de";
import { en } from "./translations/en";
import { es } from "./translations/es";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { tr } from "./translations/tr";
import { ro } from "./translations/ro";
import { ru } from "./translations/ru";
import { bg } from "./translations/bg";
import { ar } from "./translations/ar";
import { zh } from "./translations/zh";
import { fa } from "./translations/fa";
import { ps } from "./translations/ps";

export type Language =
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
  | "zh"
  | "fa"
  | "ps";

export const translations = {
  de,
  en,
  es,
  fr,
  it,
  tr,
  ro,
  ru,
  bg,
  ar,
  zh,
  fa,
  ps,
};
