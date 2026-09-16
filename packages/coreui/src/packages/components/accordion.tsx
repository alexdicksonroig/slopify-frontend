import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { cn } from "../../lib/cn";

type AccordionContext = {
  openItems: Record<string, boolean>;
  setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const AccordionContext = createContext<AccordionContext>({
  openItems: {},
  setOpenItems: () => {},
});

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  defaultOpenItems?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  itemId: string;
  headerText: string;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionTriggerProps = {
  isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionContentProps = {
  isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  defaultOpenItems = false,
  ...props
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const items: Record<string, boolean> = {};
    Children.forEach(children, (child) => {
      if (
        isValidElement<AccordionItemProps>(child) &&
        child.type === AccordionItem
      ) {
        items[child.props.itemId] = defaultOpenItems;
      }
    });
    return items;
  });

  return (
    <AccordionContext value={{ openItems, setOpenItems }}>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </AccordionContext>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  className,
  children,
  itemId,
  headerText,
  ...props
}) => {
  const { openItems, setOpenItems } = useContext(AccordionContext);
  const isOpen = openItems[itemId] ?? false;

  const handleToggle = () => {
    setOpenItems((current) => ({
      ...current,
      [itemId]: !current[itemId],
    }));
  };

  return (
    <div className={cn("border-b", className)} {...props}>
      <button className="w-full" onClick={handleToggle} type="button">
        <AccordionTrigger isOpen={isOpen}>{headerText}</AccordionTrigger>
      </button>
      <div>
        <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
      </div>
    </div>
  );
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  isOpen,
  children,
}) => {
  return (
    <div className="flex">
      <div
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium text-left cursor-pointer",
        )}
      >
        {children}
        <div>{isOpen ? "-" : "+"}</div>
      </div>
    </div>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  isOpen,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid text-sm text-left",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
