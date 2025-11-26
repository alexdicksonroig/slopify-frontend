"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNameSpacedComponent = void 0;
exports.hideArgs = hideArgs;
exports.StoryConfig = StoryConfig;
function hideArgs(properties) {
    return properties.reduce((acc, property) => {
        acc[property] = { table: { disable: true } };
        return acc;
    }, {});
}
function StoryConfig() { }
const createNameSpacedComponent = (mainComponent, composedComponents) => {
    const composedComponent = { ...mainComponent };
    Object.keys(composedComponents).forEach((key) => {
        composedComponent[key] = composedComponents[key];
    });
    return composedComponent;
};
exports.createNameSpacedComponent = createNameSpacedComponent;
//# sourceMappingURL=helpers.js.map