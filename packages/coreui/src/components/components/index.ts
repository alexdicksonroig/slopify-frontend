import { createNameSpacedComponent } from "@/lib/helpers";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./accordion";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Popover } from "./popover";
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

const AlertHOC = createNameSpacedComponent(Alert, {
	Title: AlertTitle,
	Description: AlertDescription,
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
	AlertHOC as Alert,
	Button,
	CardHOC as Card,
	Input,
	Label,
	Separator,
	Skeleton,
	Popover,
};
