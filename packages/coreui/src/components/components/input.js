"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const Input = ({ className, type, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("input", { type: type, className: (0, clsx_1.default)(`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base
        shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
        file:font-medium file:text-foreground placeholder:text-muted-foreground
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`, className), ...props }));
};
exports.Input = Input;
//# sourceMappingURL=input.js.map