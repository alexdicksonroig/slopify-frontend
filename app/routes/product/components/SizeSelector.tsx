interface SizeOption {
  value: string;
  label: string;
  disabled?: boolean;
  checked?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  onSizeGuideClick?: () => void;
  onChange?: (size: string) => void;
}

export function SizeSelector({
  sizes,
  onSizeGuideClick,
  onChange,
}: SizeSelectorProps) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSizeGuideClick?.();
          }}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <fieldset aria-label="Choose a size" className="mt-4">
        <div className="grid grid-cols-4 gap-3">
          {sizes.map((size) => (
            <label
              key={size.value}
              aria-label={size.label}
              className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
            >
              <input
                type="radio"
                name="size"
                value={size.value}
                disabled={size.disabled}
                defaultChecked={size.checked}
                onChange={() => onChange?.(size.value)}
                className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
              />
              <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                {size.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
