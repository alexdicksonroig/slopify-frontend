"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const alert_1 = require("@/components/components/alert");
function Component({ ...props }) {
    return ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { ...props, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Terminal, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { children: "Heads up!" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "You can add components to your app using the cli." })] }));
}
const meta = {
    title: "Components/Alert",
    component: Component,
    argTypes: {
        variant: {
            control: { type: "select" },
            options: Object.keys(alert_1.alertStyles.variants.variant),
        },
    },
};
exports.default = meta;
//# sourceMappingURL=alert.stories.js.map