import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import CreateContext from '../../lib/createContext'

// Accordion Context for managing open/closed state
const [useAccordion, AccordionContext] = CreateContext()

// Accordion Item Context for providing item ID to children
const [useAccordionItem, AccordionItemContext] = CreateContext()

type AccordionProps = {
  children: React.ReactNode
  className?: string
  defaultOpenItem?: string
} & React.HTMLAttributes<HTMLDivElement>

type AccordionItemProps = {
  children: React.ReactNode
  className?: string
  id: string
} & React.HTMLAttributes<HTMLDivElement>

type AccordionTriggerProps = {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type AccordionContentProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Accordion: React.FC<AccordionProps> = ({ children, className, defaultOpenItem, ...props }) => {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpenItem || null)

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={`accordion ${className || ''}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem: React.FC<AccordionItemProps> = ({ className, children, id, ...props }) => {
  return (
    <AccordionItemContext.Provider value={{ itemId: id }}>
      <div className={`border-b ${className || ''}`} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ className, children, ...props }) => {
  const { openItem, setOpenItem } = useAccordion()
  const { itemId } = useAccordionItem()
  
  const isOpen = openItem === itemId
  
  const handleClick = () => {
    setOpenItem(isOpen ? null : itemId)
  }

  return (
    <div className="flex">
      <button
        className={`flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left ${isOpen ? '[&>svg]:rotate-180' : ''} ${className || ''}`}
        onClick={handleClick}
        {...props}>
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </button>
    </div>
  )
}

const AccordionContent: React.FC<AccordionContentProps> = ({ className, children, ...props }) => {
  const { openItem } = useAccordion()
  const { itemId } = useAccordionItem()
  
  const isOpen = openItem === itemId

  return (
    <div className={`overflow-hidden text-sm transition-[max-height] duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'} ${className || ''}`} {...props}>
      <div className={`pb-4 pt-0 ${className || ''}`}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
