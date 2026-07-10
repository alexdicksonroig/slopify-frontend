export const ICON_NAMES = [
  "arrow-left",
  "arrow-right",
  "check",
  "chevron-down",
  "info",
  "list-filter",
  "loader",
  "menu",
  "shopping-bag",
  "x",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
export type IconRotation = 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
export type IconSize =
  | "xxxxs"
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "xxxxl"
  | "xxxxxl";

export type IconProps = {
  icon: IconName;
  size?: IconSize;
  className?: string;
  rotate?: IconRotation;
  label?: string;
};
