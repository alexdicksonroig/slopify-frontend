import { Overlay } from "@components";
import type { Meta } from "@storybook/react";

export function Component({ ...props }) {
  return <Overlay {...props} />;
}

const meta = {
  title: "Components/Overlay",
  component: Component,
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
