"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const accordion_1 = require("@/components/components/accordion");
function Component() {
    return ((0, jsx_runtime_1.jsxs)(accordion_1.Accordion, { className: "w-full", children: [(0, jsx_runtime_1.jsx)(accordion_1.AccordionItem, { itemId: "item-1", headerText: "Is it accessible?", children: "Yes. It adheres to the WAI-ARIA design pattern." }), (0, jsx_runtime_1.jsx)(accordion_1.AccordionItem, { itemId: "item-2", headerText: "Is it styleable?", children: "Yes. It comes with default styles that matches the other components' aesthetic." }), (0, jsx_runtime_1.jsx)(accordion_1.AccordionItem, { itemId: "item-3", headerText: "Is it animated?", children: "Yes. It's animated by default, but you can disable it if you prefer." })] }));
}
const meta = {
    title: "Components/Accordion",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=accordion.stories.js.map