import { cn } from "../../lib/cn";

const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

export type BadgeProps = {
  variant?: keyof typeof variants;
} & React.HTMLAttributes<HTMLSpanElement>;

// Small rounded counter, e.g. the number of items in the cart.
export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold leading-none tabular-nums",
      variants[variant],
      className,
    )}
    {...props}
  />
);
