import { useLanguage } from "@app/i18n";
import { localize } from "@app/lib/localized-text";
import type { Variant } from "@app/lib/variant";

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

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm lg:text-lg font-semibold tracking-[0.08em] text-neutral-900 uppercase">
        {variant.selections
          .map(({ option }) => localize(option.label, language))
          .join(" / ") || productName}
      </span>
      <div className="relative">
        <select
          value={variant.id}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-12 w-full appearance-none border-0 border-b border-neutral-300 bg-white px-0 pr-9 text-sm lg:text-lg font-medium text-neutral-950 outline-none transition-colors focus:border-neutral-950 focus:ring-0"
        >
          {variants.map((item) => (
            <option key={item.id} value={item.id}>
              {item.selections
                .map(({ value }) => localize(value.label, language))
                .join(" / ") || productName}
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
  );
}
