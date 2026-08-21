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
  return (
    <div className="space-y-6">
      {options.map((option) => (
        <fieldset key={option.id}>
          <legend className="text-sm font-medium text-gray-900">
            {option.label}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.possibleValues.map((value) => (
              <label
                key={value.id}
                className="group relative flex min-h-10 min-w-20 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-3 has-checked:border-primary has-checked:bg-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary"
              >
                <input
                  type="radio"
                  name={`product-option-${option.id}`}
                  value={value.id}
                  checked={selections[option.id] === value.id}
                  onChange={() => onChange(option.id, value.id)}
                  className="absolute inset-0 cursor-pointer appearance-none focus:outline-none"
                />
                <span className="text-center text-sm font-medium text-gray-900 group-has-checked:text-white">
                  {value.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
