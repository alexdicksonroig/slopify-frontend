import { ca } from "./ca";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

export const languages = ["en", "es", "fr", "de", "ca"] as const;

export type Language = (typeof languages)[number];
export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export const translations = {
  en,
  es,
  fr,
  de,
  ca,
} satisfies Record<Language, TranslationDictionary>;
