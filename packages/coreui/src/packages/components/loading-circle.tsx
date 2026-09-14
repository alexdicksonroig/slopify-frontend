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
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-10"
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="0.75"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      pathLength="100"
      stroke="currentColor"
      strokeDasharray="68 32"
      strokeLinecap="round"
      strokeWidth="0.75"
    />
  </svg>
);
