"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
const jsx_runtime_1 = require("react/jsx-runtime");
const carousel_1 = require("@/components/collections/carousel");
const card_1 = require("@/components/components/card");
function Component() {
    return ((0, jsx_runtime_1.jsxs)(carousel_1.Carousel, { className: "w-full max-w-sm", children: [(0, jsx_runtime_1.jsx)(carousel_1.CarouselContent, { className: "-ml-1", children: Array.from({ length: 5 }).map((_, index) => ((0, jsx_runtime_1.jsx)(carousel_1.CarouselItem, { className: "pl-1 md:basis-1/2 lg:basis-1/3", children: (0, jsx_runtime_1.jsx)("div", { className: "p-1", children: (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "flex aspect-square items-center justify-center p-6", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-semibold", children: index + 1 }) }) }) }) }, index))) }), (0, jsx_runtime_1.jsx)(carousel_1.CarouselPrevious, {}), (0, jsx_runtime_1.jsx)(carousel_1.CarouselNext, {})] }));
}
const meta = {
    title: "Collections/Carousel",
    component: carousel_1.Carousel,
};
exports.default = meta;
//# sourceMappingURL=carousel.stories.js.map