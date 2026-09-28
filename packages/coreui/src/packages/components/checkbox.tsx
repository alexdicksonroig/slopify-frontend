import { cn } from "../../lib/cn";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    className={cn(
      "size-4 shrink-0 cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
