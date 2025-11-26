"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const _components_1 = require("@components");
const react_1 = require("react");
async function increment(previousState) {
    return previousState + 1;
}
function App() {
    const [state, formAction] = (0, react_1.useActionState)(increment, 0);
    return ((0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)(_components_1.Button, { variant: "link", formAction: formAction, children: ["count is ", state] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Edit ", (0, jsx_runtime_1.jsx)("code", { children: "src/App.tsx" }), " and save to test HMR"] })] }), (0, jsx_runtime_1.jsx)("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })] }));
}
exports.default = App;
//# sourceMappingURL=App.js.map