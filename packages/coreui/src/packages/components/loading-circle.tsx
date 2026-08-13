import clsx from "clsx";
import type { ComponentProps } from "react";

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-12",
} as const;

export type LoadingCircleProps = Omit<ComponentProps<"svg">, "children"> & {
  label?: string;
  size?: keyof typeof sizes;
};

export const LoadingCircle = ({
  className,
  label,
  size = "md",
  ...props
}: LoadingCircleProps) => (
  <svg
    {...props}
    aria-hidden={label ? undefined : true}
    aria-label={label}
    className={clsx("block shrink-0 animate-spin", sizes[size], className)}
    fill="none"
    role={label ? "status" : undefined}
    viewBox="0 0 48 48"
  >
    <circle
      className="opacity-15"
      cx="24"
      cy="24"
      r="19"
      stroke="currentColor"
      strokeWidth="3"
    />
    <circle
      cx="24"
      cy="24"
      r="19"
      pathLength="100"
      stroke="currentColor"
      strokeDasharray="42 58"
      strokeLinecap="round"
      strokeWidth="3"
    />
  </svg>
);
