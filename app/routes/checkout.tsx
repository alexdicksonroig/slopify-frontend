import { CheckoutPayment } from "@app/components/checkout-payment";
import { PageTitle } from "@app/components/page-title";
import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { buttonVariants } from "@library";
import { Link } from "react-router";

export default function Checkout() {
  const t = useTranslate();
  const { cart } = useCart();

  return (
    <div className="mx-auto w-full max-w-xl px-page-gap pt-page-top pb-page-bottom lg:max-w-6xl">
      <PageTitle className="mb-10">{t("cart.checkout")}</PageTitle>
      {!cart ? null : !cart.isEmpty ? (
        <CheckoutPayment cart={cart} />
      ) : (
        <>
          <p className="text-base text-neutral-500">{t("cart.empty")}</p>
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
