"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselNext = exports.CarouselPrevious = exports.CarouselItem = exports.CarouselContent = exports.Carousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const embla_carousel_react_1 = __importDefault(require("embla-carousel-react"));
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const _components_1 = require("@components");
const createStrictContext_1 = require("@lib/createStrictContext");
const [useCarouselContext, CarouselProvider] = (0, createStrictContext_1.createStrictContext)();
const Carousel = ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) => {
    const [carouselRef, api] = (0, embla_carousel_react_1.default)({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api) => {
        if (!api) {
            return;
        }
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    React.useEffect(() => {
        if (!api || !setApi) {
            return;
        }
        setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
        if (!api) {
            return;
        }
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);
    return ((0, jsx_runtime_1.jsx)(CarouselProvider, { value: {
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
        }, children: (0, jsx_runtime_1.jsx)("div", { onKeyDownCapture: handleKeyDown, className: `relative ${className}`, role: "region", "aria-roledescription": "carousel", ...props, children: children }) }));
};
exports.Carousel = Carousel;
const CarouselContent = ({ className, ...props }) => {
    const { carouselRef, orientation } = useCarouselContext();
    return ((0, jsx_runtime_1.jsx)("div", { ref: carouselRef, className: "overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: `flex ${orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col"}
          ${className}`, ...props }) }));
};
exports.CarouselContent = CarouselContent;
const CarouselItem = ({ className, ...props }) => {
    const { orientation } = useCarouselContext();
    return ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-roledescription": "slide", className: `min-w-0 shrink-0 grow-0 basis-full
        ${orientation === "horizontal" ? "pl-4" : "pt-4"} ${className}`, ...props }));
};
exports.CarouselItem = CarouselItem;
const CarouselPrevious = ({ className, variant = "outline", size = "icon", ...props }) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarouselContext();
    return ((0, jsx_runtime_1.jsxs)(_components_1.Button, { variant: variant, size: size, className: `absolute h-8 w-8 rounded-full ${orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90"} ${className}`, disabled: !canScrollPrev, onClick: scrollPrev, ...props, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Previous slide" })] }));
};
exports.CarouselPrevious = CarouselPrevious;
const CarouselNext = ({ className, variant = "outline", size = "icon", ...props }) => {
    const { orientation, scrollNext, canScrollNext } = useCarouselContext();
    return ((0, jsx_runtime_1.jsxs)(_components_1.Button, { variant: variant, size: size, className: `absolute h-8 w-8 rounded-full ${orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"} ${className}`, disabled: !canScrollNext, onClick: scrollNext, ...props, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Next slide" })] }));
};
exports.CarouselNext = CarouselNext;
//# sourceMappingURL=carousel.js.map