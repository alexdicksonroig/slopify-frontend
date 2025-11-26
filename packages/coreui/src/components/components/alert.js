"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDescription = exports.AlertTitle = exports.Alert = exports.alertStyles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_variants_1 = require("tailwind-variants");
exports.alertStyles = (0, tailwind_variants_1.tv)({
    base: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    variants: {
        variant: {
            default: "bg-background text-foreground",
            destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const Alert = ({ className = "", variant, ...props }) => {
    const classes = `${(0, exports.alertStyles)({ variant })} ${className}`;
    return (0, jsx_runtime_1.jsx)("div", { role: "alert", className: classes, ...props });
};
exports.Alert = Alert;
const AlertTitle = ({ className = "", ...props }) => {
    const classes = `mb-1 font-medium leading-none tracking-tight ${className}`;
    return (0, jsx_runtime_1.jsx)("h5", { className: classes, ...props });
};
exports.AlertTitle = AlertTitle;
const AlertDescription = ({ className = "", ...props }) => {
    const classes = `text-sm [&_p]:leading-relaxed ${className}`;
    return (0, jsx_runtime_1.jsx)("div", { className: classes, ...props });
};
exports.AlertDescription = AlertDescription;
//# sourceMappingURL=alert.js.map