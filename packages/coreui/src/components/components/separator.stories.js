"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const separator_1 = require("@/components/components/separator");
function Component({ ...props }) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium leading-none", children: "Separator example" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "Horizontal and vertical separators" })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-4", ...props }), (0, jsx_runtime_1.jsxs)("div", { className: "flex h-5 items-center space-x-4 text-sm", children: [(0, jsx_runtime_1.jsx)("div", { children: "Blog" }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical", ...props }), (0, jsx_runtime_1.jsx)("div", { children: "Docs" }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical", ...props }), (0, jsx_runtime_1.jsx)("div", { children: "Source" })] })] }));
}
const meta = {
    title: "Components/Separator",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=separator.stories.js.map