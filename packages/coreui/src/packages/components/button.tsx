import { cn } from "../../lib/cn";

export const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary:
    "border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline p-0!",
  success:
    "bg-success text-success-foreground uppercase hover:bg-success/90 disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100",
  surface: "bg-background text-foreground hover:bg-background/90",
};

export const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-8",
  xl: "h-12 px-5",
  icon: "size-9",
  "icon-sm": "size-7",
};

export type ButtonVariantProps = {
  className?: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export type ButtonProps = {
  children: React.ReactNode;
} & ButtonVariantProps &
  React.ComponentProps<"button">;

// Button classes for elements that must look like a button but aren't one,
// e.g. router links.
const buttonVariants = ({
  className,
  variant = "default",
  size = "default",
}: ButtonVariantProps = {}) =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
    variants[variant],
    sizes[size],
    className,
  );

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ className, variant, size })}
      {...props}
    />
  );
};

export { Button, buttonVariants };
