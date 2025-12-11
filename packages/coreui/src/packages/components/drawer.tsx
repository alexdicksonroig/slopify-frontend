import clsx from "clsx";
import { X } from "lucide-react";
import { Overlay } from "./overlay";

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  className = "",
}) => {
  return (
    <>
      <Overlay active={open} onClick={onClose} />
      <div
        className={clsx(
          `z-5 fixed inset-0 h-screen w-4/5 overflow-y-auto
        transition duration-200 ease-in-out lg:hidden p-1`,
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="bg-white p-4 shadow-xl rounded-md h-full">
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
    </>
  );
};
