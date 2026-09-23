import { useLanguage } from "@app/i18n";
import { localize } from "@app/lib/localized-text";
import type { Variant } from "@app/lib/variant";
import { Select } from "@library";
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
  const { language } = useLanguage();
  const selectId = useId();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={selectId}
        className="text-sm lg:text-lg font-semibold tracking-[0.08em] text-neutral-900 uppercase"
      >
        {variant.selections
          .map(({ option }) => localize(option.label, language))
          .join(" / ") || productName}
      </label>
      <Select
        id={selectId}
        value={String(variant.id)}
        onChange={(value) => onChange(Number(value))}
        options={variants.map((item) => ({
          value: String(item.id),
          label:
            item.selections
              .map(({ value }) => localize(value.label, language))
              .join(" / ") || productName,
        }))}
        className="h-12 w-full"
      />
    </div>
  );
}
