"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const Card = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("rounded-xl border bg-card text-card-foreground shadow", className), ...props }));
exports.Card = Card;
const CardHeader = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("flex flex-col space-y-1.5 p-6", className), ...props }));
exports.CardHeader = CardHeader;
const CardTitle = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("font-semibold leading-none tracking-tight", className), ...props }));
exports.CardTitle = CardTitle;
const CardDescription = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("text-sm text-muted-foreground", className), ...props }));
exports.CardDescription = CardDescription;
const CardContent = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("p-6 pt-0", className), ...props }));
exports.CardContent = CardContent;
const CardFooter = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("flex items-center p-6 pt-0", className), ...props }));
exports.CardFooter = CardFooter;
//# sourceMappingURL=card.js.map