import { cn } from "../../lib/cn";

const sizes = {
  default: "h-9 px-3.5 text-base",
  lg: "h-12 px-4 text-base",
};

export type InputProps = {
  size?: keyof typeof sizes;
} & Omit<React.ComponentProps<"input">, "size">;

const Input = ({ className, type, size = "default", ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-ringaria-invalid:border-destructivedisabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
};

export { Input };
