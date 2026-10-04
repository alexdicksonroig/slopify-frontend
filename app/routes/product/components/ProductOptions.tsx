import { useLanguage, useTranslate } from "@app/i18n";
import { localize } from "@app/lib/localized-text";
import type { Variant } from "@app/lib/variant";
import { Label, Select } from "@library";
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
  const selectId = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={selectId} className="uppercase">
        {variant.selections
          .map(({ option }) => localize(option.label, language))
          .join(" / ") || productName}
      </Label>
      <Select
        id={selectId}
        value={String(variant.id)}
        onChange={(value) => onChange(Number(value))}
        options={variants.map((item) => ({
          value: String(item.id),
          label: `${
            item.selections
              .map(({ value }) => localize(value.label, language))
              .join(" / ") || productName
          } · ${item.stock > 0 ? t("product.in-stock") : t("product.not-available")}`,
        }))}
        size="xl"
        className="w-full"
      />
    </div>
  );
}
