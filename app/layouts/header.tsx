import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { Button, cn, Icon } from "@library";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./footer";

export default function Example() {
  const t = useTranslate();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showFirstText, setShowFirstText] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleCartClick = () => {
    if (location.pathname !== "/cart") {
      navigate("/cart");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cartTotalInCents = cart?.cartTotalInCents ?? 0;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white ">
        <title>Store</title>
        {showAnnouncement && (
          <div className="relative flex min-h-[42px] items-center bg-black text-[13px] font-semibold text-white sm:text-sm">
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center px-12 text-center transition-all duration-100 ease-linear visible opacity-100",
                { "invisible opacity-0": !showFirstText },
              )}
            >
              <p className="max-w-full normal-case leading-tight">
                {t("header.delivery")}
              </p>
            </div>
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center px-12 text-center transition-all duration-100 ease-linear visible opacity-100",
                { "invisible opacity-0": showFirstText },
              )}
            >
              <p className="max-w-full normal-case leading-tight">
                {t("header.tax")}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              variant="ghost"
              size="icon"
              className="absolute right-1 h-10 w-10 text-white hover:bg-white/10 hover:text-white"
            >
              <Icon icon="x" size="sm" />
              <span className="sr-only">{t("header.close-announcement")}</span>
            </Button>
          </div>
        )}
        <nav
          aria-label={t("header.top")}
          className="border-b border-gray-200 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-[62px] items-center">
            {location.pathname !== "/" && location.pathname !== "/variants" && (
              <Button onClick={() => navigate(-1)} size="icon" variant="ghost">
                <Icon icon="arrow-left" size="lg" />
                <span className="sr-only">{t("header.back")}</span>
              </Button>
            )}

            {/* Logo */}
            <div className="flex">
              <Button onClick={() => navigate("/")} size="icon" variant="ghost">
                <span className="sr-only">{t("header.company")}</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=black"
                  className="h-5 w-auto"
                />
              </Button>
            </div>

            <div className="ml-auto flex items-center">
              {/* Disabled for now
              <div
                className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end
                  lg:space-x-6"
              >
                <a
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
                <a
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800 flex items-center gap-1"
                >
                  Sign in
                  <Icon icon="arrow-right" size="sm" />
                </a>
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="/"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                    className="block h-auto w-5 shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
              */}
              {/* Cart */}
              <div className="flex items-center gap-2 md:ml-4">
                <span className="flex flex-col items-end leading-none">
                  <span className="text-[11px] text-gray-500">
                    {t("header.basket-total")}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-gray-900">
                    {formatMoney(cartTotalInCents, cart?.currency ?? "EUR")}
                  </span>
                </span>
                <Button
                  onClick={handleCartClick}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-gray-300 shadow-none"
                >
                  <Icon icon="shopping-bag" size="lg" />
                  <span className="sr-only">{t("header.cart")}</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
