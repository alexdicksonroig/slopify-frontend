import { cn } from "../../lib/cn";
import { Button } from "./button";
import { Icon } from "./icon";

export type DrawerBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  fromRight?: boolean;
  hiddenFrom?: DrawerBreakpoint | false;
  showCloseButton?: boolean;
  // Accessible name of the close button; the library has no translations.
  closeLabel?: string;
  // Rendered in a header row next to the close button.
  title?: React.ReactNode;
  contentClassName?: string;
};

const HIDDEN_FROM: Record<DrawerBreakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  className = "",
  fromRight = false,
  hiddenFrom = "md",
  showCloseButton = true,
  closeLabel = "Close",
  title,
  contentClassName,
}) => {
  const closeButton = showCloseButton && (
    <Button
      onClick={onClose}
      variant="ghost"
      size="icon"
      aria-label={closeLabel}
    >
      <Icon icon="x" />
    </Button>
  );

  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={cn(
        "z-5 fixed inset-y-0 w-full overflow-y-auto",
        fromRight ? "right-0 translate-x-full" : "left-0 -translate-x-full",
        hiddenFrom && HIDDEN_FROM[hiddenFrom],
        { "translate-x-0": open },
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col bg-background text-foreground",
          fromRight ? "border-l" : "border-r",
          contentClassName,
        )}
      >
        {title ? (
          <div className="flex shrink-0 items-center justify-between gap-4 px-6 py-4">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {closeButton}
          </div>
        ) : (
          closeButton && (
            <div
              className={cn("flex shrink-0 justify-start p-1", {
                "justify-end": fromRight,
              })}
            >
              {closeButton}
            </div>
          )
        )}
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
};
