"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const hooks_1 = require("@lib/hooks");
const Popover = ({ id, open, onOpenChange, className = "", children, placement = "top", ...rest }) => {
    const popoverRef = (0, hooks_1.useOutsideClick)(() => onOpenChange(false));
    const placementClasses = placement === "bottom"
        ? ["top-full", "left-0", "translate-y-0"]
        : ["top-0", "left-0", "-translate-y-full"];
    return ((0, jsx_runtime_1.jsx)("div", { id: id, ref: popoverRef, ...rest, className: (0, clsx_1.default)("absolute", "transform", placementClasses, className, open ? "block" : "hidden"), children: children }));
};
exports.Popover = Popover;
exports.default = exports.Popover;
//# sourceMappingURL=popover.js.map