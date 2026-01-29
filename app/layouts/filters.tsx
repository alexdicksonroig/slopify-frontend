import { Accordion, Button, Drawer, Select } from "@library";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { get } from "@app/lib/api";

type FiltersData = {
  sortOptions: { label: string; value: string }[];
  categories: string[];
  colors: string[];
  sizes: string[];
};

const FilterContent = ({ categories, colors, sizes }: { categories: string[]; colors: string[]; sizes: string[] }) => (
  <>
    {/* Categories */}
    <div className="space-y-4 pb-6 border-b border-gray-200">
      {categories.map((category) => (
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
            {colors.map((color) => (
              <div key={color} className="flex items-center">
                <input
                  id={`color-${color}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary"
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
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`filter-${category}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary"
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
            {sizes.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  id={`size-${size}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary"
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
  const [filters, setFilters] = useState<FiltersData | null>(null);

  useEffect(() => {
    get("filters").then(setFilters);
  }, []);

  if (!filters) return null;

  const { sortOptions, categories, colors, sizes } = filters;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} fromRight>
        <div className="px-4 py-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Filters</h2>
          <FilterContent categories={categories} colors={colors} sizes={sizes} />
        </div>
      </Drawer>

      <div className="flex items-center justify-between border-b border-gray-200 pt-8 pb-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>
        <div className="flex items-center gap-4">
          <Select
            options={sortOptions}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter-icon lucide-list-filter"><path d="M2 5h20" /><path d="M6 12h12" /><path d="M9 19h6" /></svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters sidebar - Desktop */}
        <aside className="hidden lg:block">
          <FilterContent categories={categories} colors={colors} sizes={sizes} />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
