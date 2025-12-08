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
      <Overlay active={open} onClick={() => onOpenChange(false)} />
      <Card
        {...rest}
        className={clsx(
          "fixed inset-0 z-4 w-[350px] h-fit",
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
