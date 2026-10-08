import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../components";
import { type ButtonProps, sizes, variants } from "../components/button";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  showSelectedValue?: boolean;
  icon?: IconName;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size">;

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  showSelectedValue = true,
  icon,
  variant = "default",
  size = "default",
  className,
  disabled,
  ...rest
}) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={cn(
        "relative inline-flex min-w-0 items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
        variant === "default"
          ? "border border-input bg-background text-foreground hover:bg-accent"
          : variants[variant],
        sizes[size],
        // Text-only selects (no fill, no border) sit flush so their text
        // lines up with surrounding content.
        (variant === "ghost" || variant === "link") &&
          "px-0 hover:bg-transparent",
        disabled && "opacity-50",
        !selectedOption &&
          (variant === "default" || variant === "outline") &&
          "text-muted-foreground",
        className,
      )}
    >
      {icon && <Icon icon={icon} size="xs" />}
      <span className="min-w-0 truncate">
        {(showSelectedValue && selectedOption?.label) || placeholder}
      </span>
      <Icon icon="chevron-down" size="sm" />
      <select
        {...rest}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      >
        {!selectedOption && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
