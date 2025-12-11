import clsx from "clsx";
import { useState } from "react";
import { Popover } from "./index";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      id={id}
      className={clsx(
        "relative border border-input rounded-md shadow-xs",
        className,
      )}
      {...rest}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          "flex h-9 items-center justify-between bg-transparent px-3 py-1 text-sm  transition-colors gap-1 w-full",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selectedOption && "text-muted-foreground",
        )}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          className={clsx("h-4 w-4", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom"
        className="right-0 z-50 mt-1 min-w-fit w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md"
      >
        <div className="max-h-60 overflow-auto p-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={clsx(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors whitespace-nowrap",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
              )}
            >
              {option.label}
              {option.value === value && (
                <svg
                  className="ml-auto h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default Select;
