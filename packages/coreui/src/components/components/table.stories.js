"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const table_1 = require("@/components/components/table");
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];
function Component({ ...props }) {
    return ((0, jsx_runtime_1.jsxs)(table_1.Table, { ...props, children: [(0, jsx_runtime_1.jsx)(table_1.TableCaption, { children: "A list of your recent invoices." }), (0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "w-[100px]", children: "Invoice" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Method" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "Amount" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: invoices.map((invoice) => ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-medium", children: invoice.invoice }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: invoice.paymentStatus }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: invoice.paymentMethod }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "text-right", children: invoice.totalAmount })] }, invoice.invoice))) }), (0, jsx_runtime_1.jsx)(table_1.TableFooter, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { colSpan: 3, children: "Total" }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "text-right", children: "$2,500.00" })] }) })] }));
}
const meta = {
    title: "Components/Table",
    component: Component,
};
exports.default = meta;
//# sourceMappingURL=table.stories.js.map