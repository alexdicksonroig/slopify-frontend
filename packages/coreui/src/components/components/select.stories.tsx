import { Select } from "@components";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export function Component({ ...props }) {
  const [value, setValue] = useState<string>("");

  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ];

  return (
    <div className="w-64">
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select a fruit"
        {...props}
      />
    </div>
  );
}

const meta = {
  title: "Components/Select",
  component: Component,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
