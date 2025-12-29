import { ArrowLeft, ArrowRight, Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import {  Outlet, useLocation, useNavigate } from "react-router";
import { Button, cn, Drawer,  Select } from "@library";
import Footer from "./footer";

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
];

const CURRENCY_OPTIONS = [
  { label: "CAD", value: "cad" },
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("cad");
  const location = useLocation();
  const navigate = useNavigate();
  const [showFirstText, setShowFirstText] = useState(true);

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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="px-4 py-6 space-y-6">
          <div className="-m-2 p-2">
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-medium text-gray-900"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="-m-2 p-2">
            <a href="#" className="text-sm font-medium text-gray-900">
              Create account
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 space-y-6">
          <div className="-m-2 p-2">
            <Select
              id="currency"
              value={currency}
              onChange={setCurrency}
              options={CURRENCY_OPTIONS}
              placeholder="Select currency"
              variant="link"
              size="sm"
              className="w-24"
            />
          </div>
          <div className="-m-2 p-2">
            <Select
              id="language"
              value={language}
              onChange={setLanguage}
              options={LANGUAGE_OPTIONS}
              placeholder="Select language"
              variant="link"
              size="sm"
              className="w-24"
            />
          </div>
        </div>
      </Drawer>
      <header className="bg-white ">
        <title>Slopify</title>
        <div
          className="relative flex h-10 items-center justify-between bg-primary text-sm
            font-medium text-white"
        >
          {/* Logo */}
          <Button onClick={() => navigate("/")} size="icon" variant="ghost" className="z-4 ml-4 hidden lg:flex hover:bg-transparent">
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
              className="h-4 w-auto"
            />
          </Button>
          <div className={cn("absolute flex w-full items-center justify-center duration-300 ease-linear lg:justify-center transition-all visible opacity-100", { "invisible opacity-0": !showFirstText })}>
            <p className="normal-case body-3">
              Get free delivery on orders over 30€
            </p>
          </div>
          <div className={cn("absolute flex w-full items-center justify-center duration-300 ease-linear lg:justify-center transition-all visible opacity-100", { "invisible opacity-0": showFirstText })}>
            <p className="normal-case body-3">
              All prices include IVA where applicable
            </p>
          </div>
          <div />
        </div>
        <nav
          aria-label="Top"
          className="border-b border-gray-200 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-12 items-center">
            {location.pathname !== "/" && location.pathname !== "/products" && (
              <Button
                onClick={() => navigate(-1)}
                size="icon"
                variant="ghost"
              >
                <ArrowLeft className="h-5 w-5" stroke="currentColor" />
                <span className="sr-only">Back</span>
              </Button>
            )}

            <Button
              onClick={() => setOpen(true)}
              size="icon"
              variant="ghost"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" stroke="currentColor" />
              <span className="sr-only">Menu</span>
            </Button>

            {/* Logo */}
            <div className="flex lg:hidden">
              <Button onClick={() => navigate("/")} size="icon" variant="ghost">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=black"
                  className="h-5 w-auto"
                />
              </Button>
            </div>

            <div className="ml-auto flex items-center">
              <div
                className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end
                  lg:space-x-6"
              >
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800 flex items-center gap-1"
                >
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
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

              {/* Cart */}
              <div className="flow-root lg:ml-6">
                <Button onClick={handleCartClick} variant="ghost" size="icon">
                  <ShoppingBag className="h-5 w-5 text-gray-700 hover:text-gray-800" />
                  <span className="sr-only">items in cart, view bag</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header >
      <Outlet />
      <Footer />
    </div >
  );
}
