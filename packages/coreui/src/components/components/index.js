"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = exports.Skeleton = exports.Separator = exports.Label = exports.Input = exports.Card = exports.Button = exports.Alert = exports.Accordion = void 0;
const helpers_1 = require("@/lib/helpers");
const accordion_1 = require("./accordion");
const alert_1 = require("./alert");
const button_1 = require("./button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_1.Button; } });
const card_1 = require("./card");
const input_1 = require("./input");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return input_1.Input; } });
const label_1 = require("./label");
Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return label_1.Label; } });
const popover_1 = require("./popover");
Object.defineProperty(exports, "Popover", { enumerable: true, get: function () { return popover_1.Popover; } });
const separator_1 = require("./separator");
Object.defineProperty(exports, "Separator", { enumerable: true, get: function () { return separator_1.Separator; } });
const skeleton_1 = require("./skeleton");
Object.defineProperty(exports, "Skeleton", { enumerable: true, get: function () { return skeleton_1.Skeleton; } });
const table_1 = require("./table");
const AccordionHOC = (0, helpers_1.createNameSpacedComponent)(accordion_1.Accordion, {
    Item: accordion_1.AccordionItem,
    Trigger: accordion_1.AccordionTrigger,
    Content: accordion_1.AccordionContent,
});
exports.Accordion = AccordionHOC;
const AlertHOC = (0, helpers_1.createNameSpacedComponent)(alert_1.Alert, {
    Title: alert_1.AlertTitle,
    Description: alert_1.AlertDescription,
});
exports.Alert = AlertHOC;
const CardHOC = (0, helpers_1.createNameSpacedComponent)(card_1.Card, {
    Header: card_1.CardHeader,
    Footer: card_1.CardFooter,
    Title: card_1.CardTitle,
    Description: card_1.CardDescription,
    Content: card_1.CardContent,
});
exports.Card = CardHOC;
const TableHOC = (0, helpers_1.createNameSpacedComponent)(table_1.Table, {
    Header: table_1.TableHeader,
    Body: table_1.TableBody,
    Footer: table_1.TableFooter,
    Head: table_1.TableHead,
    Row: table_1.TableRow,
    Cell: table_1.TableCell,
    Caption: table_1.TableCaption,
});
//# sourceMappingURL=index.js.map