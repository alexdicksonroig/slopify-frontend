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
  hiddenFrom?: DrawerBreakpoint;
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
}) => {
  return (
    <div
      className={cn(
        `z-5 fixed inset-0 h-svh w-full overflow-y-auto
        transition duration-200 ease-in-out -translate-x-full`,
        HIDDEN_FROM[hiddenFrom],
        { "translate-x-full": fromRight },
        { "drawer-open translate-x-0": open },
        className,
      )}
    >
      <div className="bg-white p-1 shadow-xl h-full">
        <div
          className={cn("w-full flex justify-start", {
            "justify-end": fromRight,
          })}
        >
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon icon="x" className="mx-3" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
