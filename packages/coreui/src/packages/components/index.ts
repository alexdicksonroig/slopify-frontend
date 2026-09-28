import { createNameSpacedComponent } from "../../lib/helpers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Badge } from "./badge";
import { Button, buttonVariants } from "./button";

export type { BadgeProps } from "./badge";
export type { ButtonProps, ButtonVariantProps } from "./button";
export type { ChipProps } from "./chip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Chip } from "./chip";
import { Drawer } from "./drawer";
import { Icon } from "./icon";
import { Input } from "./input";
import { Label } from "./label";
import { LoadingCircle } from "./loading-circle";
import { Overlay } from "./overlay";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const AccordionHOC = createNameSpacedComponent(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

const CardHOC = createNameSpacedComponent(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

const TableHOC = createNameSpacedComponent(Table, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
});

export {
  AccordionHOC as Accordion,
  Badge,
  Button,
  buttonVariants,
  CardHOC as Card,
  Chip,
  Drawer,
  TableHOC as Table,
  Input,
  Icon,
  Label,
  LoadingCircle,
  Overlay,
  Separator,
  Skeleton,
};

export type { DrawerBreakpoint, DrawerProps } from "./drawer";
export type {
  IconName,
  IconProps,
  IconRotation,
  IconSize,
} from "./icon.types";
export type { LoadingCircleProps } from "./loading-circle";
