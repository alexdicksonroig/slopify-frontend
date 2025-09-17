import * as React from 'react';
import clsx from 'clsx'

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) => {
  return (
    <hr
      aria-hidden={decorative}
      className={clsx('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
      {...props}
    />
  );
};

export { Separator };
