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
    <fieldset className="shrink-0">
      <legend className="sr-only">{t("product.quantity")}</legend>
      <div className="flex h-14 w-28 items-center justify-between border border-neutral-300 px-1 sm:w-32">
        <Button
          type="button"
          variant="ghost"
          aria-label="Decrease quantity"
          disabled={value <= MIN_QUANTITY}
          onClick={() => onChange(value - 1)}
          className="size-10 rounded-none p-0! disabled:opacity-30"
        >
          <Icon
            icon="minus"
            size="lg"
            className="pointer-events-none select-none brightness-0"
          />
        </Button>

        <output className="min-w-5 text-center text-sm font-medium text-neutral-900">
          {value}
        </output>

        <Button
          type="button"
          variant="ghost"
          aria-label="Increase quantity"
          disabled={value >= MAX_QUANTITY}
          onClick={() => onChange(value + 1)}
          className="size-10 rounded-none p-0! disabled:opacity-30"
        >
          <Icon
            icon="plus"
            size="lg"
            className="pointer-events-none select-none brightness-0"
          />
        </Button>
      </div>
    </fieldset>
  );
}
