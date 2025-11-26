export type PopoverProps = {
    id?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    className?: string;
    children: React.ReactNode;
    placement?: "top" | "bottom";
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Popover: React.FC<PopoverProps>;
export default Popover;
