import clsx from "clsx";
import type { IconProps, IconSize } from "./icon.types";

const RAW_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? "/";
export const PUBLIC_PATH = RAW_PUBLIC_PATH.endsWith("/")
  ? RAW_PUBLIC_PATH.slice(0, -1)
  : RAW_PUBLIC_PATH;

const ICON_HEIGHT: Record<IconSize, string> = {
  xxxxs: "h-[8px]",
  xxxs: "h-[10px]",
  xxs: "h-[12px]",
  xs: "h-[14px]",
  sm: "h-[16px]",
  md: "h-[18px]",
  lg: "h-[24px]",
  xl: "h-[28px]",
  xxl: "h-[32px]",
  xxxl: "h-[40px]",
  xxxxl: "h-[64px]",
  xxxxxl: "h-[80px]",
};

export const Icon = ({
  icon,
  size = "lg",
  className,
  rotate,
  label,
}: IconProps) => (
  <img
    aria-hidden={label ? undefined : true}
    aria-label={label}
    alt={label ?? ""}
    src={`${PUBLIC_PATH}/assets/icons/${icon}.svg`}
    className={clsx(
      "block aspect-square shrink-0 transition-all duration-150 ease-linear",
      ICON_HEIGHT[size],
      className,
    )}
    style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
  />
);
