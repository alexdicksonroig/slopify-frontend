import { Separator, Button } from "../components";
import { Popover } from "./index";
import type { Meta } from "@storybook/react";
import React from "react";

export function Component() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="mb-2 p-3 border rounded-md">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none whitespace-nowrap">
              This is an example
            </h4>
            <p className="text-sm text-muted-foreground">Of a popover</p>
          </div>
        </div>
      </Popover>
      <Button title="open popover" onClick={() => setOpen((open) => !open)}>
        Open Popover
      </Button>
    </div>
  );
}

const meta = {
  component: Component,
} satisfies Meta<typeof Separator>;

export default meta;
