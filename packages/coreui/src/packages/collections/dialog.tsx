import clsx from "clsx";
import { Overlay, Card } from "../components";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  className = "",
  children,
  ...rest
}) => {
  return (
    <>
      <Overlay active={open} onClick={() => onOpenChange(false)} transparent />
      <Card
        {...rest}
        className={clsx(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-4 w-[350px] h-fit",
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
