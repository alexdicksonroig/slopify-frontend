import type { Language } from "@app/i18n";

export type LocalizedText = Record<string, string>;

export function localize(text: LocalizedText, language: Language): string {
  return text[language] ?? text.en ?? Object.values(text)[0] ?? "";
}
