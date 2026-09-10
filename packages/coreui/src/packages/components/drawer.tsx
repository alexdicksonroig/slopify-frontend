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
  contentClassName,
}) => (
  <div
    inert={!open}
    aria-hidden={!open}
    className={cn(
      "z-5 fixed inset-0 h-svh w-full overflow-y-auto transition duration-200 ease-in-out motion-reduce:transition-none",
      fromRight ? "translate-x-full" : "-translate-x-full",
      hiddenFrom && HIDDEN_FROM[hiddenFrom],
      { "drawer-open translate-x-0": open },
      className,
    )}
  >
    <div className={cn("bg-white p-1 shadow-xl h-full", contentClassName)}>
      {showCloseButton && (
        <div
          className={cn("w-full flex justify-start", {
            "justify-end": fromRight,
          })}
        >
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon icon="x" className="mx-3" />
          </Button>
        </div>
      )}
      {children}
    </div>
  </div>
);
