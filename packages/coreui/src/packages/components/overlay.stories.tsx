import type { Meta } from "@storybook/react";
import { Overlay } from "./index";

export function Component({ ...props }) {
  return <Overlay {...props} />;
}

const meta = {
  component: Component,
  args: {
    active: true,
  },
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
    transparent: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Overlay>;

export default meta;
