import clsx from "clsx";
import type React from "react";

type LabelProps = {
	children: React.ReactNode;
	className?: string;
	htmlFor?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({
	children,
	className,
	htmlFor,
	...props
}) => {
	return (
		<label
			htmlFor={htmlFor}
			className={clsx(
				`text-sm font-medium leading-none peer-disabled:cursor-not-allowed
        peer-disabled:opacity-70`,
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
};
