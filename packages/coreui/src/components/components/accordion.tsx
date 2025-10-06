import React, { useState } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import CreateContext from '../../lib/createContext'

// Accordion Context for managing open/closed state
const [useAccordionContext, AccordionContext] = CreateContext()

type AccordionProps = {
  children: React.ReactNode
  className?: string
  defaultOpenItem?: string
} & React.HTMLAttributes<HTMLDivElement>

type AccordionItemProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  headerText: string
} & React.HTMLAttributes<HTMLButtonElement>

type AccordionTriggerProps = {
  isOpen: boolean
} & React.HTMLAttributes<HTMLDivElement>

type AccordionContentProps = {
  isOpen: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Accordion: React.FC<AccordionProps> = ({ children, className, defaultOpenItem, ...props }) => {
  const [openItem, setOpenItem] = useState<string | undefined>(defaultOpenItem)

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={clsx('flex flex-col', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem: React.FC<AccordionItemProps> = ({ className, children, itemId, headerText, ...props }) => {
  const { openItem, setOpenItem } = useAccordionContext()
  const isOpen = openItem === itemId

  const handleClick = () => {
    setOpenItem(isOpen ? null : itemId)
  }

  return (
    <button className={clsx('border-b', className)} onClick={handleClick} {...props}>
      <AccordionTrigger isOpen={isOpen}>{headerText}</AccordionTrigger>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </button>
  )
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ isOpen, children }) => {
  return (
    <div className="flex">
      <div className={clsx('flex flex-1 items-center justify-between py-4 text-sm font-medium text-left')}>
        {children}
        <ChevronDown className={clsx('h-4 w-4 shrink-0 text-muted-foreground', isOpen ? 'rotate-180' : undefined)} />
      </div>
    </div>
  )
}

const AccordionContent: React.FC<AccordionContentProps> = ({ isOpen, children }) => {
  return (
    <div className={clsx('grid text-sm text-left transition-[grid-template-rows] duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
      <div className="overflow-hidden">
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
