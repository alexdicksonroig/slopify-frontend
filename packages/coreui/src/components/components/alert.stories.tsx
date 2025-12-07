import { Alert } from "@components";
import type { Meta } from "@storybook/react";
import { Terminal } from "lucide-react";

import { alertStyles } from "./alert";

export function Component({ ...props }) {
  return (
    <Alert {...props}>
      <Terminal className="h-4 w-4" />
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>
        You can add components to your app using the cli.
      </Alert.Description>
    </Alert>
  );
}

const meta = {
  title: "Components/Alert",
  component: Component,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: Object.keys(alertStyles.variants.variant),
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
