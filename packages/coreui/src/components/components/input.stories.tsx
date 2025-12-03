import type { Meta } from "@storybook/react";

import { Input } from "@components";

export function Component({ ...props }) {
  return <Input placeholder="Write something..." {...props} />;
}

const meta = {
  title: "Components/Input",
  component: Component,
} satisfies Meta<typeof Input>;

export default meta;
