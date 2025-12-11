import { Input, Label } from "./index";
import type { Meta } from "@storybook/react";

export function Component() {
  return (
    <div>
      <Label htmlFor="terms">Label for this input</Label>
      <Input id="terms" />
    </div>
  );
}

const meta = {
  component: Component,
} satisfies Meta<typeof Label>;

export default meta;
