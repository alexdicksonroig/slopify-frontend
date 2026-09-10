// needs review
import { useTranslate } from "@app/i18n";
import { Button, cn, Icon } from "@library";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 8;

type QuantitySelectorProps = {
  value: number;
  onChange: (quantity: number) => void;
  className?: string;
  min?: number;
  max?: number;
  appearance?: "outlined" | "subtle";
};

export function QuantitySelector({
  value,
  onChange,
  className,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
  appearance = "outlined",
}: QuantitySelectorProps) {
  const t = useTranslate();
  const buttonClassName = cn(
    "aspect-square w-auto p-0! disabled:opacity-30",
    appearance === "subtle"
      ? "h-full rounded-xl hover:bg-neutral-100"
      : "h-[calc(100%-0.5rem)] rounded-none",
  );

  return (
    <fieldset
      className={cn(
        "h-10 shrink-0",
        appearance === "subtle" ? "w-40" : "w-28 sm:w-32",
        className,
      )}
    >
      <legend className="sr-only">{t("product.quantity")}</legend>
      <div
        className={cn(
          "flex size-full items-center justify-between",
          appearance === "subtle" ? "gap-2" : "border border-neutral-300 px-1",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          aria-label="Decrease quantity"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className={buttonClassName}
        >
          <Icon
            icon="minus"
            size="sm"
            className="pointer-events-none select-none brightness-0"
          />
        </Button>

        <output
          className={cn(
            "text-center font-medium text-neutral-900 tabular-nums",
            appearance === "subtle"
              ? "flex h-full min-w-14 items-center justify-center rounded-xl bg-neutral-100 text-xl"
              : "min-w-5 text-sm",
          )}
        >
          {value}
        </output>

        <Button
          type="button"
          variant="ghost"
          aria-label="Increase quantity"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className={buttonClassName}
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
