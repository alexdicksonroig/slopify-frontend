import { LanguageSelect } from "@app/components/language-select";
import { storeConfig } from "@app/config/store";
import { useTranslate } from "@app/i18n";

export default function Footer() {
  const t = useTranslate();

  return (
    <footer className="bg-white mt-auto border-t border-gray-200">
      {/* Columns match the variants grid: filter + first item column, then one per item column */}
      <div className="mx-auto w-full max-w-7xl px-3 pt-12 pb-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[50%_1fr_1fr] lg:gap-x-2">
          {/* Contact */}
          <div>
            <h3 className="text-xs lg:text-base font-semibold text-gray-900 uppercase tracking-wider mb-3">
              {t("footer.contact")}
            </h3>
            <div className="space-y-2">
              <p className="text-xs lg:text-base text-gray-600">
                {t("footer.email", { email: storeConfig.contact.email })}
              </p>
              <p className="text-xs lg:text-base text-gray-600">
                {t("footer.phone", { phone: storeConfig.contact.phone })}
              </p>
              <p className="text-xs lg:text-base text-gray-600">
                {t("footer.address", {
                  address: storeConfig.contact.address,
                })}
              </p>
            </div>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-xs lg:text-base font-semibold text-gray-900 uppercase tracking-wider mb-3">
              {t("footer.follow")}
            </h3>
            <div className="space-y-2">
              {storeConfig.socialLinks.map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  className="block text-xs lg:text-base text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        {/* Empty first cell keeps the copyright centered with the select on the right */}
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-3 pt-8 pb-12 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6">
          <div className="hidden sm:block" />
          <p className="text-xs lg:text-base text-gray-600 text-center">
            {t("footer.rights", {
              year: new Date().getFullYear(),
              name: storeConfig.name,
            })}
          </p>
          <div className="sm:justify-self-end">
            <LanguageSelect />
          </div>
        </div>
      </div>
    </footer>
  );
}
