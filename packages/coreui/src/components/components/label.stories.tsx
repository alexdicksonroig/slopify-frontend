import type { Meta } from "@storybook/react";
import { Input, Label } from "@components";

export function Component() {
  return (
    <div className="flex items-center space-x-2">
      <Input id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
          peer-disabled:opacity-70"
      >
        Label for this input
      </Label>
    </div>
  );
}

const meta = {
  title: "Components/Label",
  component: Component,
} satisfies Meta<typeof Label>;

export default meta;
