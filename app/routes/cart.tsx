import { CartItemList } from "@app/components/cart-item-list";
import { CheckoutPayment } from "@app/components/checkout-payment";
import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";

export default function Cart() {
  const t = useTranslate();
  const { cart, setCart } = useCart();

  if (!cart || cart.isEmpty) {
    return (
      <main className="min-h-[calc(100svh-5.5rem)] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t("cart.shopping-cart")}
          </h1>
          <p className="mt-8 text-sm text-gray-500">{t("cart.empty")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-5.5rem)] bg-white">
      <div className="grid min-h-[calc(100svh-5.5rem)] lg:grid-cols-12">
        <section className="bg-gray-50 px-6 py-12 sm:px-10 lg:col-span-7 lg:px-12 lg:py-14">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("cart.shopping-cart")}
            </h1>
            <CartItemList cart={cart.items} setCart={setCart} />
            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>{t("cart.subtotal")}</dt>
                <dd className="font-medium text-gray-900">
                  {formatMoney(cart.cartTotalInCents, cart.currency)}
                </dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>{t("cart.shipping-estimate")}</dt>
                <dd className="font-medium text-gray-900">
                  {formatMoney(cart.shippingPriceInCents, cart.currency)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                <dt>{t("cart.order-total")}</dt>
                <dd>{formatMoney(cart.orderTotalInCents, cart.currency)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-10 lg:col-span-5 lg:px-12 lg:py-14">
          <div className="mx-auto w-full max-w-xl">
            <CheckoutPayment cart={cart} />
          </div>
        </section>
      </div>
    </main>
  );
}
