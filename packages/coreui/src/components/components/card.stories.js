"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/components/button");
const card_1 = require("@/components/components/card");
const input_1 = require("@/components/components/input");
function Component({ ...props }) {
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-[350px]", ...props, children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Create project" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Deploy your new project in one-click." })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid w-full items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-1.5", children: (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", placeholder: "Name of your project" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-1.5" })] }) }) }), (0, jsx_runtime_1.jsxs)(card_1.CardFooter, { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { children: "Deploy" })] })] }));
}
const meta = {
    title: "Components/Card",
    component: Component,
    parameters: {
        layout: "centered",
    },
};
exports.default = meta;
//# sourceMappingURL=card.stories.js.map