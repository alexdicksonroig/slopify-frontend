"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("@/components/components/input");
function Component({ ...props }) {
    return (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Write something...", ...props });
}
const meta = {
    title: "Components/Input",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=input.stories.js.map