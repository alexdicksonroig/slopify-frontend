"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("@/components/components/skeleton");
function Component() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-12 w-12 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[250px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[200px]" })] })] }));
}
const meta = {
    title: "Components/Skeleton",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=skeleton.stories.js.map