import { LanguageSelect } from "@app/components/language-select";
import { storeConfig } from "@app/config/store";
import { useTranslate } from "@app/i18n";

export default function Footer() {
  const t = useTranslate();

  return (
    <footer className="bg-white mt-auto border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-8 flex-col md:flex-row">
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
        <div className="my-4 flex justify-end md:shrink-0">
          <LanguageSelect />
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs lg:text-base text-gray-600 text-center">
            {t("footer.rights", {
              year: new Date().getFullYear(),
              name: storeConfig.name,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
