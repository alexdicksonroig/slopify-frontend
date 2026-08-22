import {
  type Language,
  languageOptions,
  useLanguage,
  useTranslate,
} from "@app/i18n";
import { Icon, Select } from "@library";

export default function Footer() {
  const t = useTranslate();
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-white mt-auto border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 xs:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-8 flex-col md:flex-row">
            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                {t("footer.contact")}
              </h3>
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  {t("footer.email", { email: "info@example.com" })}
                </p>
                <p className="text-xs text-gray-600">
                  {t("footer.phone", { phone: "+34 91 123 4567" })}
                </p>
                <p className="text-xs text-gray-600">
                  {t("footer.address", {
                    address: "Calle Gran Vía 28, 28013 Madrid, Spain",
                  })}
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                {t("footer.follow")}
              </h3>
              <div className="space-y-2">
                <a
                  href="https://www.facebook.com"
                  className="block text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com"
                  className="block text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://www.instagram.com"
                  className="block text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-end gap-1 md:shrink-0">
          <Icon icon="globe" size="sm" />
          <Select
            value={language}
            onChange={(value) => setLanguage(value as Language)}
            options={languageOptions}
            placeholder={t("header.language")}
            variant="link"
            size="sm"
            className="min-w-32"
          />
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-600 text-center">
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
