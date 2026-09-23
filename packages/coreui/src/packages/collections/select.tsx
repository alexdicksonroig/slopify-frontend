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
        "relative inline-flex min-w-0 items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm lg:text-lg font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30",
        variant === "default"
          ? "border border-neutral-300 bg-white text-neutral-900 shadow-sm hover:border-neutral-400 hover:bg-neutral-50 focus-within:border-neutral-500"
          : variants[variant],
        sizes[size],
        disabled && "opacity-50",
        !selectedOption &&
          (variant === "default" || variant === "outline") &&
          "text-muted-foreground",
        className,
      )}
    >
      {icon && <Icon icon={icon} size="sm" />}
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
