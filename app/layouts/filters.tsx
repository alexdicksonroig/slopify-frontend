import { Accordion, Button, Drawer, Select } from "@library";
import { useState } from "react";
import { Outlet } from "react-router";

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Best Rating", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const CATEGORIES = [
  "Totes",
  "Backpacks",
  "Travel Bags",
  "Hip Bags",
  "Laptop Sleeves",
];

const COLORS = ["White", "Beige", "Blue", "Brown", "Green", "Purple"];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

const FilterContent = () => (
  <>
    {/* Categories */}
    <div className="space-y-4 pb-6 border-b border-gray-200">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className="block text-sm text-gray-900 hover:text-gray-700"
        >
          {category}
        </button>
      ))}
    </div>

    {/* Filter Accordions */}
    <div className="space-y-6">
      <Accordion closeOnContentClick={false}>
        <Accordion.Item itemId="color" headerText="Color">
          <div className="space-y-4">
            {COLORS.map((color) => (
              <div key={color} className="flex items-center">
                <input
                  id={`color-${color}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`color-${color}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </Accordion.Item>

        <Accordion.Item itemId="category" headerText="Category">
          <div className="space-y-4">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`filter-${category}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`filter-${category}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </Accordion.Item>

        <Accordion.Item itemId="size" headerText="Size">
          <div className="space-y-4">
            {SIZES.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  id={`size-${size}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`size-${size}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  </>
);

export default function Filters() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} fromRight>
        <div className="px-4 py-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Filters</h2>
          <FilterContent />
        </div>
      </Drawer>

      <div className="flex items-center justify-between border-b border-gray-200 pt-8 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center gap-2">
          <Select
            options={SORT_OPTIONS}
            placeholder="Sort"
            variant="link"
            className="px-2"
          />
          <Button
            variant="link"
            className="text-muted-foreground px-2 lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
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

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters sidebar - Desktop */}
        <aside className="hidden lg:block">
          <FilterContent />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
