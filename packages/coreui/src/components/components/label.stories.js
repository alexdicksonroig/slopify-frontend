"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("@/components/components/input");
const label_1 = require("@/components/components/label");
function Component() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { id: "terms" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "terms", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed\n          peer-disabled:opacity-70", children: "Label for this input" })] }));
}
const meta = {
    title: "Components/Label",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=label.stories.js.map