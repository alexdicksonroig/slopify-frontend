import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "src/lib/cn";

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  fromRight?: boolean;
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  className = "",
  fromRight = false,
}) => {

  return (
    <div
      className={cn(
        `z-5 fixed inset-0 h-screen w-full overflow-y-auto
        transition duration-200 ease-in-out lg:hidden -translate-x-full`,
        { "translate-x-full": fromRight },
        { "translate-x-0": open },
        className,
      )}
    >
      <div className="bg-white p-4 shadow-xl h-full">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className={cn("w-full flex justify-start", { "justify-end": fromRight })}
        >
          <X className="text-gray-400 h-6 w-6 mx-3" />
        </Button>
        {children}
      </div>
    </div >
  );
};
