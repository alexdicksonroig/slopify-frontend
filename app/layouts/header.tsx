import { ArrowRight, Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Button, Drawer, Label, Select } from "@library";
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

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/cart") {
      navigate(-1);
    } else {
      navigate("/cart");
    }
  };

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
      <header className="relative bg-white">
        <title>Slopify</title>
        <p
          className="flex h-10 items-center justify-center bg-primary px-4 text-sm
            font-medium text-white sm:px-6 lg:px-8"
        >
          Get free delivery on orders over 30€
        </p>

        <nav
          aria-label="Top"
          className="border-b border-gray-200 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative rounded-md bg-white p-2 text-gray-500 lg:hidden flex items-center gap-2"
            >
              <span className="absolute -inset-0.5" />
              <Menu className="h-5 w-5" stroke="currentColor" />
              <span className="sr-only">Menu</span>
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <a href="/">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=black&shade=600"
                  className="h-8 w-auto"
                />
              </a>
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
              <div className="ml-4 flow-root lg:ml-6">
                <Button onClick={handleCartClick} variant="ghost" size="icon">
                  <ShoppingBag className="h-5 w-5 text-gray-700 hover:text-gray-800" />
                  <span className="sr-only">items in cart, view bag</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
