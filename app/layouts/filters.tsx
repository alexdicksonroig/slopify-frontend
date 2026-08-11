import { type TranslationKey, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { Accordion, Button, Drawer, Icon, Select } from "@library";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

type ProductOption = {
  id: number;
  label: string;
  possibleValues: string[];
};

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Best Rating", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SORT_OPTION_KEYS: Partial<Record<string, TranslationKey>> = {
  popular: "filters.sort-most-popular",
  rating: "filters.sort-best-rating",
  newest: "filters.sort-newest",
  "price-asc": "filters.sort-price-ascending",
  "price-desc": "filters.sort-price-descending",
};

const OPTION_LABEL_KEYS: Partial<Record<string, TranslationKey>> = {
  color: "filters.color",
  size: "filters.size",
};

const FilterContent = ({ options }: { options: ProductOption[] }) => {
  const t = useTranslate();

  return (
    <div className="space-y-6">
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
                {option.possibleValues.map((value, index) => {
                  const inputId = `option-${option.id}-value-${index}`;

                  return (
                    <div key={value} className="flex items-center">
                      <input
                        id={inputId}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                      />
                      <label
                        htmlFor={inputId}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default function Filters() {
  const t = useTranslate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [options, setOptions] = useState<ProductOption[] | null>(null);

  useEffect(() => {
    get("product-options").then(setOptions);
  }, []);

  if (!options) return null;

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
          <FilterContent options={options} />
        </div>
      </Drawer>

      <div className="flex items-center justify-between border-b border-gray-200 pt-8 pb-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          {t("filters.new-arrivals")}
        </h1>
        <div className="flex items-center gap-4">
          <Select
            options={translatedSortOptions}
            placeholder={t("filters.sort")}
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
          <FilterContent options={options} />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
