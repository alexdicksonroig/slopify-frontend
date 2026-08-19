import { ca } from "./ca";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

export const languageOptions = [
  { label: "English", value: "en" as const },
  { label: "Español", value: "es" as const },
  { label: "Français", value: "fr" as const },
  { label: "Deutsch", value: "de" as const },
  { label: "Català", value: "ca" as const },
];

export type Language = (typeof languageOptions)[number]["value"];
export const languages: readonly Language[] = languageOptions.map(
  ({ value }) => value,
);

export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export const translations = {
  en,
  es,
  fr,
  de,
  ca,
} satisfies Record<Language, TranslationDictionary>;
