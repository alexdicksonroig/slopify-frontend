import { Meta } from '@storybook/react'

import { Accordion, AccordionItem } from '@/components/components/accordion'

export function Component() {
  return (
    <Accordion className="w-full">
      <AccordionItem itemId="item-1" headerText="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionItem>
      <AccordionItem itemId="item-2" headerText="Is it styleable?">
        Yes. It comes with default styles that matches the other components&apos; aesthetic.
      </AccordionItem>
      <AccordionItem itemId="item-3" headerText="Is it animated?">
        Yes. It's animated by default, but you can disable it if you prefer.
      </AccordionItem>
    </Accordion>
  )
}

const meta = {
  title: 'Components/Accordion',
  component: Component,
} satisfies Meta<typeof Accordion>

export default meta
