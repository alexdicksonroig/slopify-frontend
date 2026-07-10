import { createContext, useContext, useState } from "react";
import { cn } from "../../lib/cn";

type AccordionContext = {
  openItem: string | undefined;
  setOpenItem: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AccordionContext = createContext<AccordionContext>({
  openItem: undefined,
  setOpenItem: () => {},
});

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
  defaultOpenItem,
  ...props
}) => {
  const [openItem, setOpenItem] = useState<string | undefined>(defaultOpenItem);

  return (
    <AccordionContext value={{ openItem, setOpenItem }}>
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
  const { openItem, setOpenItem } = useContext(AccordionContext);
  const isOpen = openItem === itemId;

  const handleToggle = () => {
    setOpenItem(isOpen ? undefined : itemId);
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
