import { Drawer } from "./index";
import type { Meta } from "@storybook/react";

export function Component({ ...props }) {
  return (
    <Drawer {...props} className="lg:block">
      <div className="space-y-6 px-4 py-6">
        <div className="flow-root">
          <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
            Sign in
          </a>
        </div>
        <div className="flow-root">
          <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
            Create account
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6">
        <a href="#" className="-m-2 flex items-center p-2">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
            className="block h-auto w-5 shrink-0"
          />
          <span className="ml-3 block text-base font-medium text-gray-900">
            CAD
          </span>
          <span className="sr-only">, change currency</span>
        </a>
      </div>
    </Drawer>
  );
}

const meta = {
  title: "Components/Drawer",
  component: Component,
  args: {
    open: true,
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
