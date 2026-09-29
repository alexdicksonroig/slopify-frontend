import { CartDrawer } from "@app/components/cart-drawer";
import { useTranslate } from "@app/i18n";
import { getCartItemCountUseCase } from "@app/lib/cart/application/get-cart-item-count.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { Badge, Button, cn, Icon, LoadingCircle } from "@library";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigation } from "react-router";
import Footer from "./footer";

export default function Example() {
  const t = useTranslate();
  const { cart, isCartOpen: cartOpen, openCart, closeCart } = useCart();
  const navigation = useNavigation();
  const [showFirstText, setShowFirstText] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleCartClick = openCart;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cartItemCount = getCartItemCountUseCase.execute(cart);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={cn(
          "relative",
          showAnnouncement ? "bg-indigo-600" : "bg-white",
        )}
      >
        <title>Store</title>
        {showAnnouncement && (
          <div className="relative flex min-h-[42px] items-center text-sm lg:text-lg font-semibold text-white">
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center px-6 text-center transition-all duration-100 ease-linear visible opacity-100",
                { "invisible opacity-0": !showFirstText },
              )}
            >
              <p className="max-w-full normal-case leading-tight">
                {t("header.delivery")}
              </p>
            </div>
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center px-6 text-center transition-all duration-100 ease-linear visible opacity-100",
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
              className="absolute right-1 text-white"
            >
              <Icon icon="x" size="sm" />
              <span className="sr-only">{t("header.close-announcement")}</span>
            </Button>
          </div>
        )}
        <nav
          aria-label={t("header.top")}
          className={cn("border-b border-gray-200 bg-white px-3 sm:px-4", {
            "rounded-t-[1.25rem]": showAnnouncement,
          })}
        >
          <div className="flex h-14 items-center">
            <div className="flex items-center">
              {/* Logo */}
              <Link
                to="/"
                className="inline-flex h-12 w-auto items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <span className="sr-only">{t("header.company")}</span>
                <img
                  alt=""
                  src="/assets/roig-parals-logo-dark.png"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              {/* Disabled for now
              <div
                className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end
                  lg:space-x-6"
              >
                <a
                  href="/"
                  className="text-sm lg:text-lg font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
                <a
                  href="/"
                  className="text-sm lg:text-lg font-medium text-gray-700 hover:text-gray-800 flex items-center gap-1"
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
                  <span className="ml-3 block text-sm lg:text-lg font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
              */}
              {/* Cart */}
              <div className="flex items-center md:ml-4">
                <Button
                  onClick={handleCartClick}
                  aria-haspopup="dialog"
                  aria-expanded={cartOpen}
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Icon icon="shopping-bag" size="lg" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -bottom-0.5 -left-0.5 bg-indigo-600">
                      {cartItemCount}
                    </Badge>
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
      <CartDrawer open={cartOpen} onClose={closeCart} />
      {navigation.state !== "idle" && (
        <output
          aria-label={t("app.loading")}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        >
          <LoadingCircle size="lg" className="text-gray-900 dark:text-white" />
        </output>
      )}
    </div>
  );
}
