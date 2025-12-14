import clsx from "clsx";
import { X } from "lucide-react";

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
        className={clsx(
          `z-5 fixed inset-0 h-screen w-full overflow-y-auto
        transition duration-200 ease-in-out lg:hidden`,
        fromRight && !open ? "translate-x-full" : "-translate-x-full",
        {"translate-x-0": open},
          className,
        )}
      >
        <div className="bg-white p-4 shadow-xl h-full">
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2
            text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <X className="text-gray-400" />
            </button>
          </div>
          {children}
        </div>
      </div>
  );
};
