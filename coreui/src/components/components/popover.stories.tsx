import type { Meta } from '@storybook/react'

import { Separator } from '@/components/components/separator'
import { Button } from './button'
import { Popover } from './popover'
import React from 'react'

export function Component({ ...props }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <Popover id="my-popover" placement="bottom" open={open} onOpenChange={setOpen}>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Separator example</h4>
          <p className="text-sm text-muted-foreground">Horizontal and vertical separators</p>
        </div>
        <Separator className="my-4" {...props} />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" {...props} />
          <div>Docs</div>
          <Separator orientation="vertical" {...props} />
          <div>Source</div>
        </div>
      </Popover>
      <Button title="open popover" variant="outline" onClick={() => setOpen(open => !open)}>
        Open Popover
      </Button>
    </div>
  )
}

export function Component2({}) {
  return (
    <div className="relative bg-gray-500 p-7">
      Parent
      <div className="absolute top-0 left-0 bg-gray-300 transform -translate-y-full p-9">Child</div>
    </div>
  )
}

const meta = {
  title: 'Components/Popover',
  component: Component2,
} satisfies Meta<typeof Separator>

export default meta
