import { cn } from "src/lib/cn";
import { Overlay } from "../components";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
  overlayOpacity?: "light" | "medium" | "dark";
} & React.HTMLAttributes<HTMLDivElement>;

const classes = {
  desktop: {
    base: "md:absolute md:transform md:bottom-auto",
    placementTop: "md:top-0 md:-translate-y-full",
    placementBottom: "md:top-full md:translate-y-0",
  },
  mobile: {
    base: "fixed top-auto bottom-0",
  },
};

export const Popover: React.FC<PopoverProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  placement = "top",
  ...rest
}) => {
  const desktopPlacementClasses =
    placement === "bottom"
      ? classes.desktop.placementBottom
      : classes.desktop.placementTop;

  return (
    <>
      <Overlay active={open} onClick={() => onOpenChange(false)} />
      <div
        {...rest}
        className={cn(
          "z-4",
          classes.mobile.base,
          classes.desktop.base,
          desktopPlacementClasses,
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
