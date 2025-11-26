"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const separator_1 = require("@/components/components/separator");
const button_1 = require("./button");
const popover_1 = require("./popover");
function Component() {
    const [open, setOpen] = react_1.default.useState(false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(popover_1.Popover, { open: open, onOpenChange: setOpen, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium leading-none", children: "Separator example" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "Horizontal and vertical separators" })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-4" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex h-5 items-center space-x-4 text-sm", children: [(0, jsx_runtime_1.jsx)("div", { children: "Blog" }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical" }), (0, jsx_runtime_1.jsx)("div", { children: "Docs" }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical" }), (0, jsx_runtime_1.jsx)("div", { children: "Source" })] })] }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { title: "open popover", variant: "outline", onClick: () => setOpen((open) => !open), children: "Open Popover" })] }));
}
const meta = {
    title: "Components/Popover",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=popover.stories.js.map