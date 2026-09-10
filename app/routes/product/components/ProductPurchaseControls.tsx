import { useTranslate } from "@app/i18n";
import { QuantitySelector } from "./QuantitySelector";

type ProductPurchaseControlsProps = {
  productName: string;
  unitPrice: string;
  total: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export function ProductPurchaseControls({
  productName,
  unitPrice,
  total,
  quantity,
  onQuantityChange,
}: ProductPurchaseControlsProps) {
  const t = useTranslate();

  return (
    <div className="mt-5 flex flex-col gap-y-6 rounded-xl bg-neutral-100 p-4 text-neutral-900">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-base leading-tight font-semibold">
          {productName}
        </p>
        <p className="shrink-0 text-base font-semibold tabular-nums">
          {unitPrice}
        </p>
      </div>

      <div className="flex justify-end">
        <QuantitySelector
          value={quantity}
          min={0}
          max={Number.POSITIVE_INFINITY}
          onChange={onQuantityChange}
          appearance="subtle"
          className="h-6 w-18 [&>div]:gap-0.5 [&_button]:h-5 [&_output]:min-w-6 [&_output]:bg-neutral-200/50 [&_output]:text-xs"
        />
      </div>

      <div className="relative flex items-center justify-between gap-3 before:absolute before:inset-x-0 before:-top-3 before:border-t before:border-dashed before:border-neutral-200">
        <p className="text-lg font-bold">{t("product.total")}</p>
        <p className="text-xl font-bold tracking-tight tabular-nums">
          {total}
        </p>
      </div>
    </div>
  );
}
