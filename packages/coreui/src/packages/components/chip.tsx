import { cn } from "../../lib/cn";
import { Icon } from "./icon";

export type ChipProps = {
  removable?: boolean;
} & React.ComponentProps<"button">;

// Pill-shaped button, e.g. an active filter. `removable` adds a trailing ×.
export const Chip = ({
  className,
  removable = false,
  children,
  ...props
}: ChipProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-input bg-muted px-3 text-xs lg:text-base font-medium text-foreground transition-colors hover:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    {removable && <Icon icon="x" size="xs" />}
  </button>
);
