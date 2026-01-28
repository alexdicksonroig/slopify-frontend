import { useState } from "react";
import { cn } from "src/lib/cn";
import { Popover } from "./index";
import { Button, type ButtonProps } from "../components";
import { X } from "lucide-react";

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
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  variant = "outline",
  size = "default",
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
    <div id={id} className="relative" {...rest}>
      <Button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        variant={variant}
        size={size}
        className={cn(
          "justify-between w-full hover:no-underline",
          !selectedOption && "text-muted-foreground",
          className,
        )}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          className={cn(
            "h-4 w-4",
            isOpen && "rotate-180",
          )}
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
      </Button>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom"
        className="right-0 z-50 mt-1 min-w-fit w-full rounded-xl md:rounded-lg border border-input bg-popover text-popover-foreground shadow-md p-2"
      >
        <div className="max-h-60 overflow-auto">
          <div className="w-full flex md:hidden justify-end">
            <X className="text-gray-400 size-5 m-2" onClick={() => setIsOpen(false)} />
          </div>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm p-2.5 text-sm outline-none transition-colors whitespace-nowrap",
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
