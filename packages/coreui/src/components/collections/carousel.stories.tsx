import { Card, Carousel } from "@components";
import type { Meta } from "@storybook/react";

export function Component() {
  return (
    <Carousel className="w-full max-w-sm">
      <Carousel.Content className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Carousel.Item key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <Card.Content className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </Card.Content>
              </Card>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  );
}

const meta = {
  title: "Collections/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
