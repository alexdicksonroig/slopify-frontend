import { useLanguage } from "@app/i18n";
import { localize } from "@app/lib/localized-text";
import type { ProductOption } from "@app/lib/variant";

export type { ProductOption } from "@app/lib/variant";

interface ProductOptionsProps {
  options: ProductOption[];
  selections: Record<number, number>;
  onChange: (optionId: number, valueId: number) => void;
}

export function ProductOptions({
  options,
  selections,
  onChange,
}: ProductOptionsProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <label key={option.id} className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-neutral-900 uppercase">
            {localize(option.label, language)}
          </span>
          <div className="relative">
            <select
              value={selections[option.id]}
              onChange={(event) =>
                onChange(option.id, Number(event.target.value))
              }
              className="h-12 w-full appearance-none border-0 border-b border-neutral-300 bg-white px-0 pr-9 text-sm font-medium text-neutral-950 outline-none transition-colors focus:border-neutral-950 focus:ring-0"
            >
              {option.possibleValues.map((value) => (
                <option key={value.id} value={value.id}>
                  {localize(value.label, language)}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-0 size-5 -translate-y-1/2"
            >
              <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </label>
      ))}
    </div>
  );
}
