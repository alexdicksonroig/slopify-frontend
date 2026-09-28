import { cn } from "../../lib/cn";
import { Overlay, type OverlayOpacity } from "../components";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  // "inside" overlaps the bottom edge of the anchor instead of sitting
  // outside it.
  placement?: "top" | "bottom" | "inside";
  desktopFrom?: "md" | "lg";
  overlayOpacity?: OverlayOpacity;
} & React.HTMLAttributes<HTMLDivElement>;

const classes = {
  desktop: {
    md: {
      base: "md:absolute md:transform md:bottom-auto",
      top: "md:top-0 md:-translate-y-full",
      bottom: "md:top-full md:translate-y-0",
      inside: "md:bottom-0 md:translate-y-0",
    },
    lg: {
      base: "lg:absolute lg:transform lg:bottom-auto",
      top: "lg:top-0 lg:-translate-y-full",
      bottom: "lg:top-full lg:translate-y-0",
      inside: "lg:bottom-0 lg:translate-y-0",
    },
  },
  mobile: {
    base: "fixed inset-x-0 bottom-0",
  },
  surface: "rounded-md border bg-popover p-4 text-popover-foreground",
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

  return (
    <>
      <Overlay
        active={open}
        onClick={() => onOpenChange(false)}
        opacity={overlayOpacity}
      />
      <div
        {...rest}
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "z-4",
          classes.surface,
          classes.mobile.base,
          desktopClasses.base,
          desktopClasses[placement],
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
