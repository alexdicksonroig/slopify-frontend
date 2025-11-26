"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
function Skeleton({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("animate-pulse rounded-md bg-primary/10", className), ...props }));
}
//# sourceMappingURL=skeleton.js.map