import { BackButton } from "@app/components/back-button";
import { useTranslate } from "@app/i18n";
import { getCartItemCountUseCase } from "@app/lib/cart/application/get-cart-item-count.use-case";
import { useCart } from "@app/lib/context/cart.context";
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

  const cartItemCount = getCartItemCountUseCase.execute(cart);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white ">
        <title>Store</title>
        {showAnnouncement && (
          <div className="relative flex min-h-[42px] items-center bg-indigo-600 text-[13px] font-semibold text-white sm:text-sm">
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
          <div className="flex h-14 items-center">
            <div className="flex items-center">
              <BackButton />

              {/* Logo */}
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
              <div className="flex items-center md:ml-4">
                <Button
                  onClick={handleCartClick}
                  variant="ghost"
                  size="icon"
                  className="relative h-11 w-11 overflow-visible rounded-full shadow-none"
                >
                  <Icon icon="shopping-bag" size="lg" />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center bg-indigo-600 px-1 text-[10px] font-semibold leading-none text-white [border-radius:9999px]">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">{t("header.cart")}</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
