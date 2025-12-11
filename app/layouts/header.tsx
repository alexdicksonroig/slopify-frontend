import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import { Drawer } from "@library";
import Footer from "./footer";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="space-y-6 px-4 py-6">
          <div className="flow-root">
            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
              Sign in
            </a>
          </div>
          <div className="flow-root">
            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
              Create account
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6">
          <a href="#" className="-m-2 flex items-center p-2">
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
              className="block h-auto w-5 shrink-0"
            />
            <span className="ml-3 block text-base font-medium text-gray-900">
              CAD
            </span>
            <span className="sr-only">, change currency</span>
          </a>
        </div>
      </Drawer>
      <header className="relative bg-white">
        <title>Slopify</title>
        <p
          className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm
            font-medium text-white sm:px-6 lg:px-8"
        >
          Get free delivery on orders over $100
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
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
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
                  Sign in
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
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
                <a href="#" className="group -m-2 flex items-center p-2">
                  <Link className="ml-2" to="/cart">
                    <ShoppingBag className="h-5 w-5 text-gray-700 hover:text-gray-800" />
                  </Link>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
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
