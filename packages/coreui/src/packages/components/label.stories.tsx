import type { Meta } from "@storybook/react";
import { Input, Label } from "./index";

export function Component() {
  return (
    <div>
      <Label>Label for this input</Label>
      <Input />
    </div>
  );
}

const meta = {
  component: Component,
} satisfies Meta<typeof Label>;

export default meta;
