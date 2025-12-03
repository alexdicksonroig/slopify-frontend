import type { Meta } from "@storybook/react";

import { Button, Card } from "@components";
import { Input } from "@components";

export function Component({ ...props }) {
  return (
    <Card className="w-[350px]" {...props}>
      <Card.Header>
        <Card.Title>Create project</Card.Title>
        <Card.Description>
          Deploy your new project in one-click.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </form>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </Card.Footer>
    </Card>
  );
}
const meta = {
  title: "Components/Card",
  component: Component,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;
