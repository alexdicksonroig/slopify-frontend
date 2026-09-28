import { useTranslate } from "@app/i18n";
import { Button, cn, Icon } from "@library";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 8;

type QuantitySelectorProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
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
          aria-label={t("product.decrease-quantity")}
          disabled={value <= min}
          size="icon-sm"
          onClick={() => onChange(value - 1)}
        >
          <Icon icon="minus" size="sm" />
        </Button>

        <output className="min-w-5 text-center text-sm lg:text-lg font-medium text-neutral-900">
          {value}
        </output>

        <Button
          type="button"
          variant="ghost"
          aria-label={t("product.increase-quantity")}
          disabled={value >= max}
          size="icon-sm"
          onClick={() => onChange(value + 1)}
        >
          <Icon icon="plus" size="sm" />
        </Button>
      </div>
    </fieldset>
  );
}
