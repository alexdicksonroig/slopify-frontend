import { cn } from "../../lib/cn";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    className={cn(
      "grid size-4 shrink-0 cursor-pointer appearance-none place-content-center rounded-[4px] border border-ring/60 bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      // Hand-drawn tick so the box stays flat and matches the theme colors.
      "checked:border-primary checked:bg-primary checked:after:h-2 checked:after:w-1 checked:after:-translate-y-px checked:after:rotate-45 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-primary-foreground checked:after:content-['']",
      className,
    )}
    {...props}
  />
);
