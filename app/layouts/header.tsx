import { CartProductList } from "@app/components/cart-product-list";
import { type Language, useLanguage, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { deleteProductFromCartUseCase } from "@app/lib/cart/application/delete-product-from-cart.use-case";
import { updateCartItemQuantityUseCase } from "@app/lib/cart/application/update-cart-item-quantity.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { Button, cn, Drawer, Icon, Select } from "@library";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./footer";

type SettingsData = {
  languageOptions: { label: string; value: string }[];
  currencyOptions: { label: string; value: string }[];
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Example() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const [settings, setSettings] = useState<SettingsData>({
    languageOptions: [],
    currencyOptions: [],
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [showFirstText, setShowFirstText] = useState(true);

  useEffect(() => {
    get("settings").then(setSettings);
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/cart") {
      navigate(-1);
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cartItems = cart?.items ?? [];
  const cartTotalInCents = cart?.cartTotalInCents ?? 0;

  const handleQuantityChange = async (productId: number, quantity: number) => {
    const updatedCart = await updateCartItemQuantityUseCase.execute(
      productId,
      quantity,
    );
    if (updatedCart) setCart(updatedCart);
  };

  const handleRemove = async (productId: number) => {
    const updatedCart = await deleteProductFromCartUseCase.execute(productId);
    if (updatedCart) setCart(updatedCart);
  };

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Drawer open={open} onClose={() => setOpen(false)} hiddenFrom="md">
        {/* <div className="px-4 py-6 space-y-6"> */}
        {/*   <div className="-m-2 p-2"> */}
        {/*     <a */}
        {/*       href="/" */}
        {/*       className="flex items-center gap-1 text-sm font-medium text-gray-900" */}
        {/*     > */}
        {/*       Sign in */}
        {/*       <Icon icon="arrow-right" size="sm" /> */}
        {/*     </a> */}
        {/*   </div> */}
        {/*   <div className="-m-2 p-2"> */}
        {/*     <a href="/" className="text-sm font-medium text-gray-900"> */}
        {/*       Create account */}
        {/*     </a> */}
        {/*   </div> */}
        {/* </div> */}

        <div className="flex h-[calc(100%-3rem)] flex-col px-4 py-6">
          <div className="-m-2 p-2">
            {/* <Select */}
            {/*   value={currency} */}
            {/*   onChange={setCurrency} */}
            {/*   options={currencyOptions} */}
            {/*   placeholder="Select currency" */}
            {/*   variant="link" */}
            {/*   size="sm" */}
            {/*   className="w-24" */}
            {/* /> */}
          </div>
          <div className="-m-2 p-2">
            <h2 className="mb-1 text-[10px] font-normal uppercase text-gray-400">
              {t("header.language")}
            </h2>
            <Select
              value={language}
              onChange={(value) => setLanguage(value as Language)}
              options={settings.languageOptions}
              placeholder={t("header.language")}
              variant="link"
              size="lg"
              className="w-24"
            />
          </div>

          <section className="mt-auto pt-6">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              {t("cart.order-summary")}
            </h2>
            {cartItems.length > 0 ? (
              <>
                <CartProductList
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
                <Button onClick={handleCheckout} className="mt-6 h-12 w-full">
                  {t("cart.checkout")}
                </Button>
              </>
            ) : (
              <p className="text-sm text-gray-500">{t("cart.empty")}</p>
            )}
          </section>
        </div>
      </Drawer>
      <header className="bg-white ">
        <title>Store</title>
        <div
          className="relative flex h-10 items-center justify-between bg-indigo-700 text-sm
            font-medium text-white"
        >
          <div
            className={cn(
              "absolute flex w-full items-center justify-center duration-100 ease-linear lg:justify-center transition-all visible opacity-100",
              { "invisible opacity-0": !showFirstText },
            )}
          >
            <p className="normal-case body-3">{t("header.delivery")}</p>
          </div>
          <div
            className={cn(
              "absolute flex w-full items-center justify-center duration-100 ease-linear lg:justify-center transition-all visible opacity-100",
              { "invisible opacity-0": showFirstText },
            )}
          >
            <p className="normal-case body-3">{t("header.tax")}</p>
          </div>
          <div />
        </div>
        <nav
          aria-label={t("header.top")}
          className="border-b border-gray-200 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-12 items-center">
            {location.pathname !== "/" && location.pathname !== "/products" && (
              <Button onClick={() => navigate(-1)} size="icon" variant="ghost">
                <Icon icon="arrow-left" size="lg" />
                <span className="sr-only">{t("header.back")}</span>
              </Button>
            )}

            <Button
              onClick={handleMenuOpen}
              size="icon"
              variant="ghost"
              className="md:hidden"
            >
              <Icon icon="menu" size="lg" />
              <span className="sr-only">{t("header.menu")}</span>
            </Button>

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
              <Select
                value={language}
                onChange={(value) => setLanguage(value as Language)}
                options={settings.languageOptions}
                placeholder={t("header.language")}
                variant="link"
                size="default"
                className="min-w-32 hidden md:flex"
              />
              {/* Cart */}
              <div className="flex items-center md:ml-4">
                <span className="flex h-6 min-w-12 items-center justify-center bg-gray-200 px-1.5 text-xs font-medium text-black">
                  {priceFormatter.format(cartTotalInCents / 100)}
                </span>
                <Button
                  onClick={handleCartClick}
                  variant="ghost"
                  size="icon"
                  className="ml-1"
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
