import { Input } from "./index";
import type { Meta } from "@storybook/react";

export function Component({ ...props }) {
  return <Input type="date" placeholder="Write something..." {...props} />;
}

const meta = {
  title: "Components/Input",
  component: Component,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "text",
        "email",
        "password",
        "date",
        "number",
        "search",
        "file",
      ],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
