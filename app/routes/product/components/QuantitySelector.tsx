import { useTranslate } from "@app/i18n";
import { Select } from "@library";

const QUANTITY_OPTIONS = Array.from({ length: 8 }, (_, index) => {
  const quantity = String(index + 1);
  return { label: quantity, value: quantity };
});

type QuantitySelectorProps = {
  value: number;
  onChange: (quantity: number) => void;
};

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const t = useTranslate();

  return (
    <fieldset className="mt-10">
      <legend className="text-sm font-medium text-gray-900">
        {t("product.quantity")}
      </legend>
      <Select
        value={String(value)}
        onChange={(nextValue) => onChange(Number(nextValue))}
        options={QUANTITY_OPTIONS}
        className="mt-4 w-24"
      />
    </fieldset>
  );
}
