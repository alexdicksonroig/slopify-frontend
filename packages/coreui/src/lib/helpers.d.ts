export declare function hideArgs(properties: string[]): Record<string, {
    table: {
        disable: boolean;
    };
}>;
export declare function StoryConfig(): void;
export declare const createNameSpacedComponent: <T extends React.ElementType, U extends Record<string, React.ElementType | Record<string, React.ElementType>>>(mainComponent: T, composedComponents: U) => T & U;
