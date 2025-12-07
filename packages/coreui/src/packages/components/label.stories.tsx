import { Input, Label } from "@components";
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
  title: "Components/Label",
  component: Component,
} satisfies Meta<typeof Label>;

export default meta;
