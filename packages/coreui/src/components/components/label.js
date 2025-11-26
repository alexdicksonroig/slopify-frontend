"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const Label = ({ children, className, htmlFor, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("label", { htmlFor: htmlFor, className: (0, clsx_1.default)(`text-sm font-medium leading-none peer-disabled:cursor-not-allowed
        peer-disabled:opacity-70`, className), ...props, children: children }));
};
exports.Label = Label;
//# sourceMappingURL=label.js.map