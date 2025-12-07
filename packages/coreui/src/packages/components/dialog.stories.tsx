import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "./dialog";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";

export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <CardHeader>
          <CardTitle>Dialog Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Dialog content goes here. You can add any content you want.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Close
          </Button>
        </CardFooter>
      </Dialog>
    </>
  );
}

const meta = {
  title: "Components/Dialog",
  component: Component,
} satisfies Meta<typeof Dialog>;

export default meta;
