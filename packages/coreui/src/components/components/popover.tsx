import clsx from "clsx";
import { useOutsideClick } from "@lib/hooks";

export type PopoverProps = {
	id?: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	className?: string;
	children: React.ReactNode;
	placement?: "top" | "bottom";
} & React.HTMLAttributes<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
	id,
	open,
	onOpenChange,
	className = "",
	children,
	placement = "top",
	...rest
}) => {
	const popoverRef = useOutsideClick<HTMLDivElement>(() => onOpenChange(false));
	const placementClasses =
		placement === "bottom"
			? ["top-full", "left-0", "translate-y-0"]
			: ["top-0", "left-0", "-translate-y-full"];

	return (
		<div
			id={id}
			ref={popoverRef}
			{...rest}
			className={clsx(
				"absolute",
				"transform",
				placementClasses,
				className,
				open ? "block" : "hidden",
			)}
		>
			{children}
		</div>
	);
};

export default Popover;
