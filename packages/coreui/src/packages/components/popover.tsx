import clsx from "clsx";
import { Overlay } from "./overlay";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
  overlayOpacity?: "light" | "medium" | "dark";
} & React.HTMLAttributes<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  placement = "top",
  ...rest
}) => {
  const placementClasses =
    placement === "bottom"
      ? ["top-full", "left-0", "translate-y-0"]
      : ["top-0", "left-0", "-translate-y-full"];

  return (
    <>
      <Overlay active={open} onClick={() => onOpenChange(false)} transparent />
      <div
        {...rest}
        className={clsx(
          "z-4",
          "absolute",
          "transform",
          placementClasses,
          className,
          open ? "block" : "hidden",
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Popover;
