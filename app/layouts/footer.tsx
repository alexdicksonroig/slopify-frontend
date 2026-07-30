import { useTranslate } from "@app/i18n";

export default function Footer() {
  const t = useTranslate();

  return (
    <footer className="bg-white mt-auto border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 xs:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-600 text-center">
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
