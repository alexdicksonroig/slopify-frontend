import { useLanguage, useTranslate } from "@app/i18n";
import { Select } from "@library";

export function LanguageSelect({ className }: { className?: string }) {
  const t = useTranslate();
  const { language, setLanguage, languageOptions } = useLanguage();

  if (languageOptions.length === 0) return null;

  return (
    <Select
      value={language}
      onChange={setLanguage}
      options={languageOptions}
      placeholder={t("header.language")}
      icon="globe"
      variant="ghost"
      size="sm"
      className={className}
      aria-label={t("header.language")}
    />
  );
}
