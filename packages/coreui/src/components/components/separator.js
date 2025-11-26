"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const Separator = ({ className, orientation = "horizontal", decorative = true, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("hr", { "aria-hidden": decorative, className: (0, clsx_1.default)("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className), ...props }));
};
exports.Separator = Separator;
//# sourceMappingURL=separator.js.map