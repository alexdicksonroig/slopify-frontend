import { type VariantProps } from "tailwind-variants";
export declare const alertStyles: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", import("tailwind-variants/dist/config").TVConfig<{
    variant: {
        default: string;
        destructive: string;
    };
}, {
    variant: {
        default: string;
        destructive: string;
    };
}>, {
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        destructive: string;
    };
}, undefined, "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", import("tailwind-variants/dist/config").TVConfig<{
    variant: {
        default: string;
        destructive: string;
    };
}, {
    variant: {
        default: string;
        destructive: string;
    };
}>, unknown, unknown, undefined>>;
type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertStyles>;
declare const Alert: React.FC<AlertProps>;
type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
declare const AlertTitle: React.FC<AlertTitleProps>;
type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
declare const AlertDescription: React.FC<AlertDescriptionProps>;
export { Alert, AlertTitle, AlertDescription };
