import { CheckoutPayment } from "@app/components/checkout-payment";
import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { buttonVariants } from "@library";
import { Link } from "react-router";

export default function Checkout() {
  const t = useTranslate();
  const { cart } = useCart();

  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-6xl">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-gray-900">
        {t("cart.checkout")}
      </h1>
      {!cart ? null : !cart.isEmpty ? (
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
  );
}
