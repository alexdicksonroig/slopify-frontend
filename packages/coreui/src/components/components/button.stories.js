"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const test_1 = require("@storybook/test");
const button_1 = require("@/components/components/button");
const helpers_1 = require("@/lib/helpers");
function Component({ ...props }) {
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { ...props, children: (0, jsx_runtime_1.jsx)("p", { children: "Button" }) }));
}
const meta = {
    title: "Components/Button",
    component: Component,
    argTypes: {
        variant: {
            control: { type: "select" },
            options: Object.keys(button_1.buttonStyles.variants.variant),
        },
        size: {
            control: { type: "select" },
            options: Object.keys(button_1.buttonStyles.variants.size),
        },
        ...(0, helpers_1.hideArgs)(["onClick"]),
    },
    args: { onClick: (0, test_1.fn)() },
};
exports.default = meta;
//# sourceMappingURL=button.stories.js.map