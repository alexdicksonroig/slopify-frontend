"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const helpers_1 = require("@lib/helpers");
const carousel_1 = require("./carousel");
const CarouselHOC = (0, helpers_1.createNameSpacedComponent)(carousel_1.Carousel, {
    Content: carousel_1.CarouselContent,
    Item: carousel_1.CarouselItem,
    Previous: carousel_1.CarouselPrevious,
    Next: carousel_1.CarouselNext,
});
exports.Carousel = CarouselHOC;
//# sourceMappingURL=index.js.map