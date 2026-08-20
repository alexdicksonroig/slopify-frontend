import { useTranslate } from "@app/i18n";
import { formatMoney } from "@app/lib/currency";
import { Button, Icon } from "@library";

export type OrderSummaryProps = {
  subtotalInCents: number;
  shippingInCents: number;
  taxInCents?: number;
  totalInCents: number;
  currency: string;
  onCheckout: () => void;
};

export function OrderSummary({
  subtotalInCents,
  shippingInCents,
  taxInCents = 0,
  totalInCents,
  currency,
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
            {formatMoney(subtotalInCents, currency)}
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
            {formatMoney(shippingInCents, currency)}
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
            {formatMoney(taxInCents, currency)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            {t("cart.order-total")}
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatMoney(totalInCents, currency)}
          </dd>
        </div>
      </dl>

      <Button onClick={onCheckout} className="mt-6 h-12 w-full">
        {t("cart.checkout")}
      </Button>
    </section>
  );
}
