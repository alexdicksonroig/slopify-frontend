import { cn } from "../../lib/cn";
import { Overlay } from "../components";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
  desktopFrom?: "md" | "lg";
  overlayOpacity?: "light" | "medium" | "dark";
} & React.HTMLAttributes<HTMLDivElement>;

const overlayClasses = {
  light: "bg-black/15 md:bg-black/15",
  medium: "bg-black/35 md:bg-black/35",
  dark: "bg-black/60 md:bg-black/60",
};

const classes = {
  desktop: {
    md: {
      base: "md:absolute md:transform md:bottom-auto",
      placementTop: "md:top-0 md:-translate-y-full",
      placementBottom: "md:top-full md:translate-y-0",
    },
    lg: {
      base: "lg:absolute lg:transform lg:bottom-auto",
      placementTop: "lg:top-0 lg:-translate-y-full",
      placementBottom: "lg:top-full lg:translate-y-0",
    },
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
  desktopFrom = "md",
  overlayOpacity,
  ...rest
}) => {
  const desktopClasses = classes.desktop[desktopFrom];
  const desktopPlacementClasses =
    placement === "bottom"
      ? desktopClasses.placementBottom
      : desktopClasses.placementTop;

  return (
    <>
      <Overlay
        active={open}
        onClick={() => onOpenChange(false)}
        className={overlayOpacity ? overlayClasses[overlayOpacity] : undefined}
      />
      <div
        {...rest}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "z-4",
          classes.mobile.base,
          desktopClasses.base,
          desktopPlacementClasses,
          className,
          open
            ? "visible translate-y-0"
            : "invisible translate-y-full pointer-events-none",
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Popover;
