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
  languages,
  type TranslationKey,
  translations,
} from "./translations";

export type { Language, TranslationKey } from "./translations";
export { languages } from "./translations";

type Replacements = Record<string, string | number>;
type Translate = (key: TranslationKey, replacements?: Replacements) => string;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "language";

function interpolate(text: string, replacements?: Replacements): string {
  return text.replaceAll(/\$\{([^${}]*)\}/g, (placeholder, key: string) =>
    replacements?.[key] === undefined ? placeholder : String(replacements[key]),
  );
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    ) as Language;
    if (languages.includes(savedLanguage)) setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
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
      interpolate(translations[language][key], replacements),
    [language],
  );
}
