import { useTranslate } from "@app/i18n";
import { Button, Icon } from "@library";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 8;

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
      <div className="mt-4 flex h-12 w-full items-center justify-between rounded-full border border-gray-300 px-1">
        <Button
          type="button"
          variant="ghost"
          aria-label="Decrease quantity"
          disabled={value <= MIN_QUANTITY}
          onClick={() => onChange(value - 1)}
          className="size-10 rounded-full p-0! disabled:opacity-30"
        >
          <Icon icon="minus" size="lg" />
        </Button>

        <output className="min-w-8 text-center text-sm font-medium text-gray-900">
          {value}
        </output>

        <Button
          type="button"
          variant="ghost"
          aria-label="Increase quantity"
          disabled={value >= MAX_QUANTITY}
          onClick={() => onChange(value + 1)}
          className="size-10 rounded-full p-0! disabled:opacity-30"
        >
          <Icon icon="plus" size="lg" />
        </Button>
      </div>
    </fieldset>
  );
}
