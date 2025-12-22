import { cn } from "src/lib/cn";
import { Overlay, Card } from "../components";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  isModal?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  isModal = true,
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
          "fixed left-1/2 top-auto sm:top-1/2 bottom-0 sm:bottom-auto -translate-x-1/2 sm:-translate-y-1/2 z-4 w-full sm:w-[350px] h-fit",
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
