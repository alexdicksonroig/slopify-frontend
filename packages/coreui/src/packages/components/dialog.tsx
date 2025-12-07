import clsx from "clsx";
import { Overlay } from "./overlay";
import { Card } from "./card";

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
      <Overlay active={open} onClick={() => onOpenChange(false)} />
      <Card
        {...rest}
        className={clsx(
          "fixed inset-0 z-4 max-w-lg w-full hidden",
          { flex: open },
          className,
        )}
      >
        {children}
      </Card>
    </>
  );
};

export default Dialog;
