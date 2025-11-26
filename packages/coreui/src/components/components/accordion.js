"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionContent = exports.AccordionTrigger = exports.AccordionItem = exports.Accordion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const createStrictContext_1 = require("@lib/createStrictContext");
const [useAccordionContext, AccordionProvider] = (0, createStrictContext_1.createStrictContext)();
const Accordion = ({ children, className, defaultOpenItem, ...props }) => {
    const [openItem, setOpenItem] = (0, react_1.useState)(defaultOpenItem);
    return ((0, jsx_runtime_1.jsx)(AccordionProvider, { value: { openItem, setOpenItem }, children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("flex flex-col", className), ...props, children: children }) }));
};
exports.Accordion = Accordion;
const AccordionItem = ({ className, children, itemId, headerText, ...props }) => {
    const { openItem, setOpenItem } = useAccordionContext();
    const isOpen = openItem === itemId;
    const handleClick = () => {
        setOpenItem(isOpen ? undefined : itemId);
    };
    return ((0, jsx_runtime_1.jsxs)("button", { className: (0, clsx_1.default)("border-b", className), onClick: handleClick, ...props, children: [(0, jsx_runtime_1.jsx)(AccordionTrigger, { isOpen: isOpen, children: headerText }), (0, jsx_runtime_1.jsx)(AccordionContent, { isOpen: isOpen, children: children })] }));
};
exports.AccordionItem = AccordionItem;
const AccordionTrigger = ({ isOpen, children, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)("flex flex-1 items-center justify-between py-4 text-sm font-medium text-left"), children: [children, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: (0, clsx_1.default)("h-4 w-4 shrink-0 text-muted-foreground", isOpen ? "rotate-180" : undefined) })] }) }));
};
exports.AccordionTrigger = AccordionTrigger;
const AccordionContent = ({ isOpen, children, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)("grid text-sm text-left transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"), children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "pb-4", children: children }) }) }));
};
exports.AccordionContent = AccordionContent;
//# sourceMappingURL=accordion.js.map