import { cn } from "../../lib/cn";
import { Card, Overlay } from "../components";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  isModal?: boolean;
  bottomOnMobile?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  isModal = true,
  bottomOnMobile = true,
  ...rest
}) => {
  return (
    <>
      <Overlay
        active={open}
        onClick={isModal ? undefined : () => onOpenChange(false)}
      />
      <Card
        {...rest}
        className={cn(
          "fixed left-1/2 z-4 h-fit w-full -translate-x-1/2 sm:w-[350px]",
          bottomOnMobile
            ? "top-auto bottom-0 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
            : "top-1/2 bottom-auto -translate-y-1/2",
          `${open ? "flex" : "hidden"}`,
          className,
        )}
      >
        {children}
      </Card>
    </>
  );
};

export default Dialog;
