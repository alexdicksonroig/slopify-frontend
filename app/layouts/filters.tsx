import { Outlet } from "react-router";

export default function Filters() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pt-16 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              >
                <path
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>

            <div
              anchor="bottom end"
              popover="true"
              className="w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden"
                >
                  Most Popular
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 focus:bg-gray-100 focus:outline-hidden"
                >
                  Best Rating
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 focus:bg-gray-100 focus:outline-hidden"
                >
                  Newest
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 focus:bg-gray-100 focus:outline-hidden"
                >
                  Price: Low to High
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 focus:bg-gray-100 focus:outline-hidden"
                >
                  Price: High to Low
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span className="sr-only">View grid</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="size-5"
            >
              <path
                d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            command="show-modal"
            commandfor="mobile-filters"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            <span className="sr-only">Filters</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="size-5"
            >
              <path
                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
