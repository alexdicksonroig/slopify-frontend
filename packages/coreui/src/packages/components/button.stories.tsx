import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { hideArgs } from "../../lib/helpers";
import { sizes, variants } from "./button";
import { Button } from "./index";

export function Component({ ...props }) {
  return (
    <Button {...props}>
      <p>Button</p>
    </Button>
  );
}

const meta = {
  component: Component,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.keys(variants),
    },
    size: {
      control: { type: "select" },
      options: Object.keys(sizes),
    },
    ...hideArgs(["onClick"]),
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
