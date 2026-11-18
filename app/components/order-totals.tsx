import { useTranslate } from "@app/i18n";
import { cn } from "@library";

type OrderTotalsProps = {
  subtotal: string;
  shipping: string;
  total: string;
  className?: string;
};

export function OrderTotals({
  subtotal,
  shipping,
  total,
  className,
}: OrderTotalsProps) {
  const t = useTranslate();

  return (
    <dl className={cn("space-y-3 text-sm", className)}>
      <div className="flex justify-between gap-4">
        <dt className="text-neutral-600">{t("cart.subtotal")}</dt>
        <dd className="text-neutral-950">{subtotal}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-neutral-600">{t("cart.shipping-estimate")}</dt>
        <dd className="text-neutral-950">{shipping}</dd>
      </div>
      <div className="flex justify-between gap-4 border-t pt-3 text-base font-semibold text-neutral-950">
        <dt>{t("cart.order-total")}</dt>
        <dd>{total}</dd>
      </div>
    </dl>
  );
}
