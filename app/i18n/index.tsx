import * as Api from "@app/lib/api";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Language,
  type TranslationKey,
  translations,
} from "./translations";

export type { Language, TranslationKey } from "./translations";

type Replacements = Record<string, string | number>;
type Translate = (key: TranslationKey, replacements?: Replacements) => string;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { label: string; value: Language }[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "language";

function interpolate(text: string, replacements?: Replacements): string {
  return text.replaceAll(/\$\{([^${}]*)\}/g, (placeholder, key: string) =>
    replacements?.[key] === undefined ? placeholder : String(replacements[key]),
  );
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>("ca-ES");
  const [languageOptions, setLanguageOptions] = useState<
    { label: string; value: Language }[]
  >([]);

  useEffect(() => {
    Api.get<{ supportedLanguages: { code: string; label: string }[] }>(
      "site-settings",
    )
      .then(({ supportedLanguages }) => {
        const options = supportedLanguages.map(({ code, label }) => ({
          label,
          value: code,
        }));
        setLanguageOptions(options);
      })
      .catch(() => {
        setLanguageOptions([]);
      });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, languageOptions }),
    [language, setLanguage, languageOptions],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useTranslate(): Translate {
  const { language } = useLanguage();

  return useCallback(
    (key, replacements) =>
      interpolate(
        (translations[language as keyof typeof translations] ??
          translations["en-US"])[key],
        replacements,
      ),
    [language],
  );
}
