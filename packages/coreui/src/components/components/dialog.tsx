import { createStrictContext } from "@lib/createStrictContext";
import clsx from "clsx";
import { useState } from "react";
import { Overlay } from "./overlay";
import { Popover } from "./popover";

type DialogContext = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const [useDialogContext, DialogProvider] =
	createStrictContext<DialogContext>();

type DialogProps = {
	children: React.ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

type DialogTriggerProps = {
	children: React.ReactNode;
	asChild?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

type DialogContentProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type DialogHeaderProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type DialogFooterProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type DialogTitleProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

type DialogDescriptionProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

const Dialog: React.FC<DialogProps> = ({
	children,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange,
	...props
}) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
	const setOpen = onOpenChange || setUncontrolledOpen;

	return (
		<DialogProvider value={{ open, setOpen }}>
			<div {...props}>{children}</div>
		</DialogProvider>
	);
};

const DialogTrigger: React.FC<DialogTriggerProps> = ({
	children,
	asChild,
	...props
}) => {
	const { setOpen } = useDialogContext();

	const handleClick = () => {
		setOpen(true);
	};

	if (asChild && typeof children === "object" && children !== null) {
		return (
			<span onClick={handleClick} onKeyDown={handleClick}>
				{children}
			</span>
		);
	}

	return (
		<button type="button" onClick={handleClick} {...props}>
			{children}
		</button>
	);
};

const DialogContent: React.FC<DialogContentProps> = ({
	children,
	className = "",
	...props
}) => {
	const { open, setOpen } = useDialogContext();

	if (!open) return null;

	return (
		<>
			<Overlay
				active={open}
				onClick={() => setOpen(false)}
				opacity="dark"
				blur={true}
				className={clsx("z-50", "animate-in fade-in-0")}
			/>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<Popover
					open={open}
					onOpenChange={setOpen}
					placement="bottom"
					overlay={false}
					className={clsx(
						"relative",
						"z-50",
						"grid",
						"w-full",
						"max-w-lg",
						"gap-4",
						"border",
						"bg-background",
						"p-6",
						"shadow-lg",
						"duration-200",
						"animate-in",
						"fade-in-0",
						"zoom-in-95",
						"rounded-lg",
						className,
					)}
					{...props}
				>
					{children}
				</Popover>
			</div>
		</>
	);
};

const DialogHeader: React.FC<DialogHeaderProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div
			className={clsx("flex flex-col space-y-1.5 text-center", className)}
			{...props}
		>
			{children}
		</div>
	);
};

const DialogFooter: React.FC<DialogFooterProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div
			className={clsx(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const DialogTitle: React.FC<DialogTitleProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<h2
			className={clsx(
				"text-lg font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
};

const DialogDescription: React.FC<DialogDescriptionProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<p className={clsx("text-sm text-muted-foreground", className)} {...props}>
			{children}
		</p>
	);
};

export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
