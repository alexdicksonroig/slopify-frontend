import { type TranslationKey, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { Accordion, Button, Drawer, Icon, Select } from "@library";
import { useState } from "react";
import {
  Outlet,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";

type ProductOptionValue = {
  id: number;
  label: string;
};

type ProductOption = {
  id: number;
  label: string;
  possibleValues: ProductOptionValue[];
};

type VariantsLoaderData = {
  cards: unknown[];
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
      <Accordion
        defaultOpenItem={options[0] ? `option-${options[0].id}` : undefined}
      >
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
  const variantsData =
    useRouteLoaderData<VariantsLoaderData>("routes/variants");
  const [searchParams, setSearchParams] = useSearchParams();
  const resultCount = variantsData?.cards.length ?? 0;
  const activeFilters = options.flatMap((option) => {
    const selectedValueId = searchParams.get(String(option.id));
    const selectedValue = option.possibleValues.find(
      (value) => String(value.id) === selectedValueId,
    );

    return selectedValue ? [{ option, value: selectedValue }] : [];
  });

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
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        fromRight
        hiddenFrom="lg"
      >
        <div className="flex min-h-[calc(100svh-4.25rem)] flex-col px-4 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t("filters.title")}
          </h2>
          <FilterContent
            options={options}
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
          <div className="sticky bottom-0 mt-auto bg-white">
            <Button
              type="button"
              size="lg"
              className="w-full uppercase"
              onClick={() => setDrawerOpen(false)}
            >
              {t("filters.view-results", { count: resultCount })}
            </Button>
          </div>
        </div>
      </Drawer>

      <div className="contents lg:flex lg:items-end lg:justify-between lg:border-b lg:border-gray-200 lg:pt-6 lg:pb-3">
        <div className="pt-6 lg:pt-0">
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-[1.7rem] font-bold tracking-tight text-gray-900 md:text-3xl">
              {t("filters.new-arrivals")}
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500 lg:hidden">
            {t("filters.subtitle")}
          </p>
        </div>

        <div className="sticky top-0 z-2 mt-4 flex min-h-10 items-center justify-between gap-4 border-b border-gray-200 bg-white lg:static lg:mt-0 lg:min-h-0 lg:justify-end lg:border-0">
          <p className="text-xs text-gray-600 lg:hidden">
            {t("filters.result-count", { count: resultCount })}
          </p>
          <div className="ml-auto flex items-center gap-1 lg:block lg:min-w-56">
            <div className="min-w-0">
              <Select
                value={searchParams.get("sort") ?? "newest"}
                onChange={handleSortChange}
                options={translatedSortOptions}
                placeholder={t("filters.sort-by")}
                showSelectedValue={false}
                variant="ghost"
                placement="bottom"
                className="h-8 gap-1 rounded-md px-1.5 text-xs font-normal text-gray-700 shadow-none hover:bg-gray-50 lg:h-10 lg:px-3 lg:text-sm [&_svg]:size-3.5 lg:[&_svg]:size-4"
                aria-label={t("filters.sort")}
              />
            </div>
            <Button
              variant="ghost"
              className="h-8 gap-1 rounded-md px-1.5 text-xs font-normal text-gray-700 shadow-none hover:bg-gray-50 lg:hidden [&_svg]:size-3.5"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon icon="list-filter" size="sm" />
              <span>{t("filters.title")}</span>
              {activeFilters.length > 0 && (
                <span className="flex size-3.5 items-center justify-center rounded-full bg-gray-100 text-[9px] font-medium text-gray-700">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>
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
        <div className="pt-4 lg:col-span-3">
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pb-3 lg:pt-2">
              {activeFilters.map(({ option, value }) => (
                <Button
                  key={option.id}
                  type="button"
                  variant="outline"
                  className="h-[34px] gap-1.5 border-gray-300 bg-gray-100 px-3 text-xs font-medium text-gray-700 shadow-none"
                  style={{ borderRadius: 9999 }}
                  onClick={() => handleFilterChange(option.id, value.id, false)}
                >
                  {value.label}
                  <Icon icon="x" size="xs" className="brightness-50" />
                </Button>
              ))}
              <Button
                type="button"
                variant="link"
                className="ml-1 text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={handleResetFilters}
              >
                {t("filters.clear-all")}
              </Button>
            </div>
          )}
          <p className="mb-1 hidden text-xs text-gray-500 lg:block">
            {t("filters.product-count", { count: resultCount })}
          </p>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
