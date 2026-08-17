import { useState } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps, Icon } from "../components";
import { Popover } from "./popover";

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
  showSelectedValue?: boolean;
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
  showSelectedValue = true,
  className,
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
        <span>{(showSelectedValue && selectedOption?.label) || placeholder}</span>
        <Icon icon="chevron-down" size="sm" rotate={isOpen ? 180 : 0} />
      </Button>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom"
        className="right-0 z-50 mt-1 min-w-fit w-full rounded-xl md:min-w-64 md:rounded-lg md:border md:border-input bg-popover text-popover-foreground md:shadow-md p-1 pb-4 md:pb-1"
      >
        <div className="max-h-60 overflow-auto">
          <div className="w-full flex md:hidden justify-end">
            <button
              type="button"
              aria-label="Close options"
              className="m-2"
              onClick={() => setIsOpen(false)}
            >
              <Icon icon="x" size="lg" />
            </button>
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
                <Icon icon="check" size="sm" className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default Select;
