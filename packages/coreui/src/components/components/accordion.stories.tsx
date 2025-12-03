import type { Meta } from "@storybook/react";

import { Accordion } from "@components";

export function Component() {
  return (
    <Accordion className="w-full">
      <Accordion.Item itemId="item-1" headerText="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </Accordion.Item>
      <Accordion.Item itemId="item-2" headerText="Is it styleable?">
        Yes. It comes with default styles that matches the other
        components&apos; aesthetic.
      </Accordion.Item>
      <Accordion.Item itemId="item-3" headerText="Is it animated?">
        Yes. It's animated by default, but you can disable it if you prefer.
      </Accordion.Item>
    </Accordion>
  );
}

const meta = {
  title: "Components/Accordion",
  component: Component,
} satisfies Meta<typeof Accordion>;

export default meta;
