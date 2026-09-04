import { useEffect } from "react";
import { cn } from "../../lib/cn";
import { Overlay } from "../components";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
  overlayOpacity?: "light" | "medium" | "dark";
} & React.HTMLAttributes<HTMLDivElement>;

const overlayClasses = {
  light: "bg-black/15 md:bg-black/15",
  medium: "bg-black/35 md:bg-black/35",
  dark: "bg-black/60 md:bg-black/60",
};

const classes = {
  desktop: {
    base: "md:absolute md:transform md:bottom-auto",
    placementTop: "md:top-0 md:-translate-y-full",
    placementBottom: "md:top-full md:translate-y-0",
  },
  mobile: {
    base: "fixed bottom-0",
  },
};

export const Popover: React.FC<PopoverProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  placement = "top",
  overlayOpacity,
  ...rest
}) => {
  const desktopPlacementClasses =
    placement === "bottom"
      ? classes.desktop.placementBottom
      : classes.desktop.placementTop;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <Overlay
        active={open}
        onClick={() => onOpenChange(false)}
        className={overlayOpacity ? overlayClasses[overlayOpacity] : undefined}
      />
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
