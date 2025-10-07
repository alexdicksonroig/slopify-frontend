import type {Meta} from '@storybook/react'

import {Separator} from '@/components/components/separator'
import {Button} from './button'
import {Popover} from './popover'
import React from 'react'

export function Component() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className='relative'>
      <Popover open={open} onOpenChange={setOpen}>
        <div className='p-3'>
          <div className='space-y-1'>
            <h4 className='text-sm font-medium leading-none'>Separator example</h4>
            <p className='text-sm text-muted-foreground'>
              Horizontal and vertical separators
            </p>
          </div>
          <Separator className='my-4' />
          <div className='flex h-5 items-center space-x-4 text-sm'>
            <div>Blog</div>
            <Separator orientation='vertical' />
            <div>Docs</div>
            <Separator orientation='vertical' />
            <div>Source</div>
          </div>
        </div>
      </Popover>
      <Button
        title='open popover'
        variant='outline'
        onClick={() => setOpen((open) => !open)}
      >
        Open Popover
      </Button>
    </div>
  )
}

const meta = {
  title: 'Components/Popover',
  component: Component,
} satisfies Meta<typeof Separator>

export default meta
