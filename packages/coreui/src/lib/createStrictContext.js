"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStrictContext = createStrictContext;
const react_1 = require("react");
function createStrictContext() {
    const Context = (0, react_1.createContext)(undefined);
    function useStrictContext() {
        const context = (0, react_1.useContext)(Context);
        if (context === undefined) {
            throw new Error("useStrictContext must be used within a Provider");
        }
        return context;
    }
    return [useStrictContext, Context];
}
//# sourceMappingURL=createStrictContext.js.map