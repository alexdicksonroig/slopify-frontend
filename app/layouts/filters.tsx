import { type TranslationKey, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { Accordion, Button, Drawer, Icon, Select } from "@library";
import { useState } from "react";
import { Outlet, useLoaderData, useSearchParams } from "react-router";

type ProductOptionValue = {
  id: number;
  label: string;
};

type ProductOption = {
  id: number;
  label: string;
  possibleValues: ProductOptionValue[];
};

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SORT_OPTION_KEYS: Partial<Record<string, TranslationKey>> = {
  newest: "filters.sort-newest",
  "price-asc": "filters.sort-price-ascending",
  "price-desc": "filters.sort-price-descending",
};

const OPTION_LABEL_KEYS: Partial<Record<string, TranslationKey>> = {
  color: "filters.color",
  size: "filters.size",
};

type FilterContentProps = {
  options: ProductOption[];
  searchParams: URLSearchParams;
  onFilterChange: (optionId: number, valueId: number, checked: boolean) => void;
  onResetFilters: () => void;
};

const FilterContent = ({
  options,
  searchParams,
  onFilterChange,
  onResetFilters,
}: FilterContentProps) => {
  const t = useTranslate();
  const hasActiveFilters = options.some((option) =>
    searchParams.has(String(option.id)),
  );

  return (
    <div>
      <Accordion>
        {options.map((option) => {
          const translationKey = OPTION_LABEL_KEYS[option.label.toLowerCase()];
          const headerText = translationKey ? t(translationKey) : option.label;

          return (
            <Accordion.Item
              key={option.id}
              itemId={`option-${option.id}`}
              headerText={headerText}
            >
              <div className="space-y-4">
                {option.possibleValues.map((value) => {
                  const inputId = `option-${option.id}-value-${value.id}`;

                  return (
                    <div key={value.id} className="flex items-center">
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={
                          searchParams.get(String(option.id)) ===
                          String(value.id)
                        }
                        onChange={(event) =>
                          onFilterChange(
                            option.id,
                            value.id,
                            event.currentTarget.checked,
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                      />
                      <label
                        htmlFor={inputId}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {value.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <div className="mt-4 flex justify-start">
        <Button
          type="button"
          variant="link"
          className="text-sm font-normal text-muted-foreground"
          disabled={!hasActiveFilters}
          onClick={onResetFilters}
        >
          {t("filters.reset")}
        </Button>
      </div>
    </div>
  );
};

export async function loader() {
  const options = (await get("product-options")) as ProductOption[];
  return { options };
}

export default function Filters() {
  const t = useTranslate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { options } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (sort: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("sort", sort);
      return nextParams;
    });
  };

  const handleFilterChange = (
    optionId: number,
    valueId: number,
    checked: boolean,
  ) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const optionKey = String(optionId);

      if (checked) {
        nextParams.set(optionKey, String(valueId));
      } else if (nextParams.get(optionKey) === String(valueId)) {
        nextParams.delete(optionKey);
      }

      return nextParams;
    });
  };

  const handleResetFilters = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      options.forEach((option) => {
        nextParams.delete(String(option.id));
      });
      return nextParams;
    });
  };

  const translatedSortOptions = SORT_OPTIONS.map((option) => {
    const translationKey = SORT_OPTION_KEYS[option.value];
    return {
      ...option,
      label: translationKey ? t(translationKey) : option.label,
    };
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        fromRight
        hiddenFrom="lg"
      >
        <div className="px-4 py-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t("filters.title")}
          </h2>
          <FilterContent
            options={options}
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Drawer>

      <div className="flex items-center justify-between border-b border-gray-200 pt-8 pb-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          {t("filters.new-arrivals")}
        </h1>
        <div className="flex items-center gap-4">
          <Select
            value={searchParams.get("sort") ?? undefined}
            onChange={handleSortChange}
            options={translatedSortOptions}
            placeholder={t("filters.sort")}
            showSelectedValue={false}
            variant="link"
            className="px-2"
          />
          <Button
            variant="link"
            className="text-muted-foreground px-2 lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <span>{t("filters.add-filter")}</span>
            <Icon icon="plus" size="sm" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters sidebar - Desktop */}
        <aside className="hidden lg:block">
          <FilterContent
            options={options}
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
