import { ca } from "./ca-ES";
import { de } from "./de-DE";
import { en } from "./en-US";
import { es } from "./es-ES";
import { fr } from "./fr-FR";

export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export const translations = {
  "en-US": en,
  "es-ES": es,
  "fr-FR": fr,
  "de-DE": de,
  "ca-ES": ca,
} satisfies Record<string, TranslationDictionary>;

export type Language = string;
