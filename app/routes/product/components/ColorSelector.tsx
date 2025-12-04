interface ColorOption {
  value: string;
  label: string;
  bgClass: string;
  outlineClass: string;
  checked?: boolean;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  onChange?: (color: string) => void;
}

export function ColorSelector({ colors, onChange }: ColorSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">Color</h3>
      <fieldset aria-label="Choose a color" className="mt-4">
        <div className="flex items-center gap-x-3">
          {colors.map((color) => (
            <div
              key={color.value}
              className="flex rounded-full outline -outline-offset-1 outline-black/10"
            >
              <input
                type="radio"
                name="color"
                value={color.value}
                defaultChecked={color.checked}
                aria-label={color.label}
                onChange={() => onChange?.(color.value)}
                className={`size-8 appearance-none rounded-full ${color.bgClass} forced-color-adjust-none checked:outline-2 checked:outline-offset-2 ${color.outlineClass} focus-visible:outline-3 focus-visible:outline-offset-3`}
              />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
