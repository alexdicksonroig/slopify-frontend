import type { Meta } from "@storybook/react";
import React from "react";
import { Button } from "./button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

export function Component() {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function ControlledDialog() {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button variant="outline">Open Controlled Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Controlled Dialog</DialogTitle>
					<DialogDescription>
						This dialog's open state is controlled externally.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Close
					</Button>
					<Button onClick={() => setOpen(false)}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

const meta = {
	title: "Components/Dialog",
	component: Component,
} satisfies Meta<typeof Dialog>;

export default meta;
