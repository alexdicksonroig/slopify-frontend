export type ProductOption = {
  id: number;
  label: string;
  possibleValues: string[];
};

interface ProductOptionsProps {
  options: ProductOption[];
  onChange?: (optionId: number, value: string) => void;
}

export function ProductOptions({ options, onChange }: ProductOptionsProps) {
  return (
    <div className="space-y-10">
      {options.map((option) => (
        <fieldset key={option.id}>
          <legend className="text-sm font-medium text-gray-900">
            {option.label}
          </legend>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {option.possibleValues.map((value) => (
              <label
                key={value}
                className="group relative flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-3 has-checked:border-primary has-checked:bg-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary"
              >
                <input
                  type="radio"
                  name={`product-option-${option.id}`}
                  value={value}
                  onChange={() => onChange?.(option.id, value)}
                  className="absolute inset-0 appearance-none focus:outline-none"
                />
                <span className="text-center text-sm font-medium text-gray-900 group-has-checked:text-white">
                  {value}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
