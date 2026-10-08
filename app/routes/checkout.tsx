import { CheckoutPayment } from "@app/components/checkout-payment";
import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { buttonVariants } from "@library";
import { Link } from "react-router";

export default function Checkout() {
  const t = useTranslate();
  const { cart } = useCart();

  return (
    <main className="min-h-[calc(100svh-5.5rem)] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-10 text-4xl font-bold tracking-tight text-gray-900">
          {t("cart.checkout")}
        </h1>
        {cart && !cart.isEmpty ? (
          <CheckoutPayment cart={cart} />
        ) : (
          <>
            <p className="text-base text-gray-500">{t("cart.empty")}</p>
            <Link
              to="/"
              className={buttonVariants({ variant: "link", className: "mt-6" })}
            >
              {t("return.continue")}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
