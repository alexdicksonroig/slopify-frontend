type AccordionProps = {
    children: React.ReactNode;
    className?: string;
    defaultOpenItem?: string;
} & React.HTMLAttributes<HTMLDivElement>;
type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    itemId: string;
    headerText: string;
} & React.HTMLAttributes<HTMLButtonElement>;
type AccordionTriggerProps = {
    isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
type AccordionContentProps = {
    isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
declare const Accordion: React.FC<AccordionProps>;
declare const AccordionItem: React.FC<AccordionItemProps>;
declare const AccordionTrigger: React.FC<AccordionTriggerProps>;
declare const AccordionContent: React.FC<AccordionContentProps>;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
