import { createNameSpacedComponent } from '@/lib/helpers'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'
import { Alert, AlertTitle, AlertDescription } from './alert'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Separator } from './separator'
import { Skeleton } from './skeleton'
import { Popover } from './popover'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './table'

const AccordionHOC = createNameSpacedComponent(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

const AlertHOC = createNameSpacedComponent(Alert, {
  Title: AlertTitle,
  Description: AlertDescription,
})

const CardHOC = createNameSpacedComponent(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
})

const TableHOC = createNameSpacedComponent(Table, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
})

export { AccordionHOC as Accordion, AlertHOC as Alert, Button, CardHOC as Card, Input, Label, Separator, Skeleton, Popover }
