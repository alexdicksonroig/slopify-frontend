import { cn } from "src/lib/cn";

export type OverlayProps = {
  onClick?: () => void;
  className?: string;
  transparent?: boolean;
  active?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Overlay: React.FC<OverlayProps> = ({
  onClick,
  className = "",
  transparent = false,
  active = false,
  ...rest
}) => {
  if (!active) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-3",
        "bg-black/15 md:bg-transparent",
        className,
      )}
      onClick={onClick}
      onKeyDown={onClick}
      {...rest}
    />
  );
};

export default Overlay;
