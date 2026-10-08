import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { cn } from "../../lib/cn";
import { Icon } from "./icon";
import type { IconName } from "./icon.types";

type AccordionSize = "default" | "sm";

type AccordionContext = {
  size: AccordionSize;
  openItems: Record<string, boolean>;
  setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const AccordionContext = createContext<AccordionContext>({
  size: "default",
  openItems: {},
  setOpenItems: () => {},
});

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  defaultOpenItems?: boolean;
  size?: AccordionSize;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  itemId: string;
  headerText: string;
  icon?: IconName;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionTriggerProps = {
  isOpen: boolean;
  size?: AccordionSize;
  icon?: IconName;
} & React.HTMLAttributes<HTMLDivElement>;

type AccordionContentProps = {
  isOpen: boolean;
  size?: AccordionSize;
} & React.HTMLAttributes<HTMLDivElement>;

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  defaultOpenItems = false,
  size = "default",
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
    <AccordionContext value={{ size, openItems, setOpenItems }}>
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
  icon,
  ...props
}) => {
  const { size, openItems, setOpenItems } = useContext(AccordionContext);
  const isOpen = openItems[itemId] ?? false;

  const handleToggle = () => {
    setOpenItems((current) => ({
      ...current,
      [itemId]: !current[itemId],
    }));
  };

  return (
    <div className={cn("border-b last:border-b-0", className)} {...props}>
      <button className="w-full" onClick={handleToggle} type="button">
        <AccordionTrigger isOpen={isOpen} icon={icon} size={size}>
          {headerText}
        </AccordionTrigger>
      </button>
      <div>
        <AccordionContent isOpen={isOpen} size={size}>
          {children}
        </AccordionContent>
      </div>
    </div>
  );
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  isOpen,
  icon,
  size = "default",
  children,
}) => {
  return (
    <div className="flex">
      <div
        className={cn(
          "flex flex-1 items-center justify-between text-foreground text-left cursor-pointer",
          size === "sm"
            ? "py-3.5 text-sm font-medium"
            : "py-4 text-base font-normal",
        )}
      >
        <span className="flex items-center gap-3">
          {icon && <Icon icon={icon} size="md" />}
          {children}
        </span>
        {size === "sm" ? (
          <Icon
            icon="chevron-down"
            size="sm"
            rotate={isOpen ? 180 : undefined}
            className="text-muted-foreground"
          />
        ) : (
          <Icon icon={isOpen ? "minus" : "plus"} size="sm" />
        )}
      </div>
    </div>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  isOpen,
  size = "default",
  children,
}) => {
  return (
    <div
      className={cn(
        "grid text-left text-foreground/70",
        "text-sm",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <div className={size === "sm" ? "pb-3.5" : "pb-4"}>{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
