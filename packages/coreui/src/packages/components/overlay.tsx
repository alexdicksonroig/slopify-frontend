import { cn } from "../../lib/cn";

export type OverlayProps = {
  onClick?: () => void;
  className?: string;
  transparent?: boolean;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Overlay: React.FC<OverlayProps> = ({
  onClick,
  className = "",
  transparent = false,
  active = false,
  ...rest
}) => {
  if (!active) return null;

  return (
    <button
      type="button"
      aria-label="Close overlay"
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
