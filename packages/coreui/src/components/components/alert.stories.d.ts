export declare function Component({ ...props }: {
    [x: string]: any;
}): import("react/jsx-runtime").JSX.Element;
declare const meta: {
    title: string;
    component: typeof Component;
    argTypes: {
        variant: {
            control: {
                type: string;
            };
            options: string[];
        };
    };
};
export default meta;
