import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "./index";
import { Card, Button } from "../components";

export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Card.Header>
          <Card.Title>Dialog Title</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Dialog content goes here. You can add any content you want.</p>
        </Card.Content>
        <Card.Footer className="justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Card.Footer>
      </Dialog>
    </>
  );
}

const meta = {
  component: Component,
} satisfies Meta<typeof Dialog>;

export default meta;
