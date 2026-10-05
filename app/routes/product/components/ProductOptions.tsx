import { useLanguage, useTranslate } from "@app/i18n";
import { formatMoney } from "@app/lib/currency";
import { localize } from "@app/lib/localized-text";
import type { Variant } from "@app/lib/variant";
import { cn } from "@library";
import { useId } from "react";

interface ProductOptionsProps {
  variants: Variant[];
  variant: Variant;
  productName: string;
  onChange: (variantId: number) => void;
}

export function ProductOptions({
  variants,
  variant,
  productName,
  onChange,
}: ProductOptionsProps) {
  const t = useTranslate();
  const { language } = useLanguage();
  const labelId = useId();

  const valueLabel = (item: Variant) =>
    item.selections
      .map(({ value }) => localize(value.label, language))
      .join(" / ") || productName;

  return (
    <div className="flex flex-col gap-3">
      <p
        id={labelId}
        className="text-xs font-medium tracking-[0.06em] text-neutral-600 uppercase lg:text-sm"
      >
        {variant.selections
          .map(({ option }) => localize(option.label, language))
          .join(" / ") || productName}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {variants.map((item) => {
          const isInStock = item.stock > 0;
          return (
            <label
              key={item.id}
              className={cn(
                "flex cursor-pointer flex-col gap-0.5 rounded-lg border border-input p-3 transition-colors hover:border-neutral-400",
                "has-checked:border-primary has-checked:outline has-checked:outline-primary",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
              )}
            >
              <input
                type="radio"
                name="variant"
                value={item.id}
                checked={item.id === variant.id}
                onChange={() => onChange(item.id)}
                className="sr-only"
              />
              <span className="text-sm font-semibold text-neutral-950">
                {valueLabel(item)}
              </span>
              <span className="text-base tabular-nums text-neutral-950">
                {item.unitAmount !== null && item.currency !== null
                  ? formatMoney(item.unitAmount, item.currency)
                  : t("product.unavailable")}
              </span>
              <span
                className={cn(
                  "text-xs",
                  isInStock ? "text-emerald-700" : "text-neutral-500",
                )}
              >
                {isInStock ? t("product.in-stock") : t("product.not-available")}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
