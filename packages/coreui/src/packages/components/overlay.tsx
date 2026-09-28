import { cn } from "../../lib/cn";

const opacities = {
  light: "bg-black/15",
  medium: "bg-black/35",
  dark: "bg-black/60",
};

export type OverlayOpacity = keyof typeof opacities;

export type OverlayProps = {
  onClick?: () => void;
  className?: string;
  transparent?: boolean;
  active?: boolean;
  // Without it the overlay is light on mobile and invisible from md up.
  opacity?: OverlayOpacity;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Overlay: React.FC<OverlayProps> = ({
  onClick,
  className = "",
  transparent = false,
  active = false,
  opacity,
  ...rest
}) => {
  if (!active) return null;

  return (
    <button
      type="button"
      aria-label="Close overlay"
      className={cn(
        "fixed inset-0 z-3",
        opacity ? opacities[opacity] : "bg-black/15 md:bg-transparent",
        className,
      )}
      onClick={onClick}
      onKeyDown={onClick}
      {...rest}
    />
  );
};

export default Overlay;
