import {Fragment, useState} from 'react'
import {Menu, ShoppingBag, X} from 'lucide-react'
import {Outlet} from 'react-router'
import {useOutsideClick} from '@lib'

const MobileMenu = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const ref = useOutsideClick<HTMLDivElement>(() => setOpen(false))
  if (!open) return null
  return (
    <div
      ref={ref}
      className='z-5 data-closed:-translate-x-full fixed h-full w-full max-w-sm overflow-y-auto bg-white p-4 shadow-xl transition duration-300 ease-in-out'
    >
      <X onClick={() => setOpen(false)} />
      Hola
    </div>
  )
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MobileMenu open={open} setOpen={setOpen} />
      {/* Mobile menu */}
      <header className='relative bg-white'>
        <p className='flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Get free delivery on orders over $100
        </p>

        <nav aria-label='Top' className='border-b border-gray-200 px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center'>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
            >
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open menu</span>
              <Menu className='h-5 w-5 text-gray-700 hover:text-gray-800' />
            </button>

            {/* Logo */}
            <div className='ml-4 flex lg:ml-0'>
              <a href='#'>
                <span className='sr-only'>Your Company</span>
                <img
                  alt=''
                  src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                  className='h-8 w-auto'
                />
              </a>
            </div>
            <div className='ml-auto flex items-center'>
              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                <a
                  href='#'
                  className='text-sm font-medium text-gray-700 hover:text-gray-800'
                >
                  Sign in
                </a>
                <a
                  href='#'
                  className='text-sm font-medium text-gray-700 hover:text-gray-800'
                >
                  Create account
                </a>
              </div>

              <div className='hidden lg:ml-8 lg:flex'>
                <a
                  href='#'
                  className='flex items-center text-gray-700 hover:text-gray-800'
                >
                  <img
                    alt=''
                    src='https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg'
                    className='block h-auto w-5 shrink-0'
                  />
                  <span className='ml-3 block text-sm font-medium'>CAD</span>
                  <span className='sr-only'>, change currency</span>
                </a>
              </div>

              {/* Cart */}
              <div className='ml-4 flow-root lg:ml-6'>
                <a href='#' className='group -m-2 flex items-center p-2'>
                  <span className='ml-2'>
                    <ShoppingBag className='h-5 w-5 text-gray-700 hover:text-gray-800' />
                  </span>
                  <span className='sr-only'>items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  )
}
