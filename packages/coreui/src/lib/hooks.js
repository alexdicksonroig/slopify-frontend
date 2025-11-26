"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOutsideClick = useOutsideClick;
const react_1 = require("react");
function useOutsideClick(callback) {
    const elementRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        function handleDocumentMouseDown(event) {
            const element = elementRef.current;
            if (element &&
                event.target instanceof Node &&
                !element.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleDocumentMouseDown);
        return () => document.removeEventListener("mousedown", handleDocumentMouseDown);
    }, [callback]);
    return elementRef;
}
//# sourceMappingURL=hooks.js.map