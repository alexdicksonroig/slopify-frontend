import { Select } from "./index";
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
    <div>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select a fruit"
        className="w-48"
        {...props}
      />
    </div>
  );
}

const meta = {
  component: Component,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
