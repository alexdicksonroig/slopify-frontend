import { Button, Select } from "@library";
import { Outlet } from "react-router";

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Best Rating", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function Filters() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 pt-16 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center">
          <Select
            options={SORT_OPTIONS}
            placeholder="Sort"
            variant="link"
            className="px-2"
          />
          <Button variant="link" className="text-muted-foreground px-2">
            <span>Filter</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="size-3"
            >
              <path
                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
