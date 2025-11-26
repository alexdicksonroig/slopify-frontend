"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCaption = exports.TableCell = exports.TableRow = exports.TableHead = exports.TableFooter = exports.TableBody = exports.TableHeader = exports.Table = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const Table = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full overflow-auto", children: (0, jsx_runtime_1.jsx)("table", { className: (0, clsx_1.default)("w-full caption-bottom text-sm", className), ...props }) }));
exports.Table = Table;
const TableHeader = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("thead", { className: (0, clsx_1.default)("[&_tr]:border-b", className), ...props }));
exports.TableHeader = TableHeader;
const TableBody = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("tbody", { className: (0, clsx_1.default)("[&_tr:last-child]:border-0", className), ...props }));
exports.TableBody = TableBody;
const TableFooter = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("tfoot", { className: (0, clsx_1.default)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props }));
exports.TableFooter = TableFooter;
const TableRow = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("tr", { className: (0, clsx_1.default)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className), ...props }));
exports.TableRow = TableRow;
const TableHead = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("th", { className: (0, clsx_1.default)(`h-10 px-2 text-left align-middle font-medium text-muted-foreground
      [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]`, className), ...props }));
exports.TableHead = TableHead;
const TableCell = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("td", { className: (0, clsx_1.default)(`p-2 align-middle [&:has([role=checkbox])]:pr-0
      [&>[role=checkbox]]:translate-y-[2px]`, className), ...props }));
exports.TableCell = TableCell;
const TableCaption = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("caption", { className: (0, clsx_1.default)("mt-4 text-sm text-muted-foreground", className), ...props }));
exports.TableCaption = TableCaption;
//# sourceMappingURL=table.js.map