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
        className="z-40 md:bg-black/15"
      />
      <Card
        {...rest}
        className={cn(
          "fixed z-50 h-fit w-full sm:w-[350px]",
          bottomOnMobile
            ? "inset-x-0 bottom-0 mx-auto sm:inset-x-auto sm:top-1/2 sm:left-1/2 sm:mx-0 sm:-translate-x-1/2 sm:-translate-y-1/2"
            : "inset-0 m-auto",
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
