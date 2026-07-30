import { useTranslate } from "@app/i18n";
import { Button, Icon } from "@library";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
};

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}: OrderSummaryProps) {
  const t = useTranslate();

  return (
    <section className="rounded-lg border border-gray-200 bg-white px-6 py-6">
      <h2 className="text-lg font-medium text-gray-900">
        {t("cart.order-summary")}
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">{t("cart.subtotal")}</dt>
          <dd className="text-sm font-medium text-gray-900">
            {priceFormatter.format(subtotal)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            {t("cart.shipping-estimate")}
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <Icon icon="info" size="xxs" />
            </button>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {priceFormatter.format(shipping)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="flex items-center text-sm text-gray-600">
            {t("cart.tax-estimate")}
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <Icon icon="info" size="xxs" />
            </button>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {priceFormatter.format(tax)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            {t("cart.order-total")}
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {priceFormatter.format(total)}
          </dd>
        </div>
      </dl>

      <Button onClick={onCheckout} className="mt-6 h-12 w-full">
        {t("cart.checkout")}
      </Button>
    </section>
  );
}
