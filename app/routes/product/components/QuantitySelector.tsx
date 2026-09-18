import { useTranslate } from "@app/i18n";
import { Button, cn, Icon } from "@library";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 8;

type QuantitySelectorProps = {
  value: number;
  onChange: (quantity: number) => void;
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  className,
}: QuantitySelectorProps) {
  const t = useTranslate();

  return (
    <fieldset className={cn("h-10 w-28 shrink-0 sm:w-32", className)}>
      <legend className="sr-only">{t("product.quantity")}</legend>
      <div className="flex size-full items-center justify-between border border-neutral-300 px-1">
        <Button
          type="button"
          variant="ghost"
          aria-label="Decrease quantity"
          disabled={value <= MIN_QUANTITY}
          onClick={() => onChange(value - 1)}
          className="aspect-square h-[calc(100%-0.5rem)] w-auto rounded-none p-0! disabled:opacity-30"
        >
          <Icon
            icon="minus"
            size="sm"
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
          className="aspect-square h-[calc(100%-0.5rem)] w-auto rounded-none p-0! disabled:opacity-30"
        >
          <Icon
            icon="plus"
            size="sm"
            className="pointer-events-none select-none brightness-0"
          />
        </Button>
      </div>
    </fieldset>
  );
}
