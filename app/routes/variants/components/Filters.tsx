import { type TranslationKey, useLanguage, useTranslate } from "@app/i18n";
import { localize } from "@app/lib/localized-text";
import type { ProductOption } from "@app/lib/variant";
import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Chip,
  Icon,
  Label,
  Popover,
  Select,
} from "@library";
import { type ReactNode, useState } from "react";
import { useSearchParams } from "react-router";

export type { ProductOption } from "@app/lib/variant";

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

type FilterContentProps = {
  options: ProductOption[];
  searchParams: URLSearchParams;
  onFilterChange: (optionId: string, valueId: number, checked: boolean) => void;
  size?: "default" | "sm";
  itemClassName?: string;
};

const FilterContent = ({
  options,
  searchParams,
  onFilterChange,
  size = "default",
  itemClassName,
}: FilterContentProps) => {
  const { language } = useLanguage();

  return (
    <Accordion defaultOpenItems size={size}>
      {options.map((option) => {
        return (
          <Accordion.Item
            key={option.id}
            itemId={`option-${option.id}`}
            headerText={localize(option.label, language)}
            className={itemClassName}
          >
            <div className={size === "sm" ? "space-y-3" : "space-y-4"}>
              {option.possibleValues.map((value) => {
                const inputId = `${size}-option-${option.id}-value-${value.id}`;

                return (
                  <div key={value.id} className="flex items-center gap-3">
                    <Checkbox
                      id={inputId}
                      checked={
                        searchParams.get(option.optionId) === String(value.id)
                      }
                      onChange={(event) =>
                        onFilterChange(
                          option.optionId,
                          value.id,
                          event.currentTarget.checked,
                        )
                      }
                    />
                    <Label
                      htmlFor={inputId}
                      className={size === "sm" ? "text-sm" : undefined}
                    >
                      {localize(value.label, language)}
                    </Label>
                  </div>
                );
              })}
            </div>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

type FiltersProps = {
  children: ReactNode;
  options: ProductOption[];
  resultCount: number;
};

export function Filters({ children, options, resultCount }: FiltersProps) {
  const t = useTranslate();
  const { language } = useLanguage();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilters = options.flatMap((option) => {
    const selectedValueId = searchParams.get(option.optionId);
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
    optionId: string,
    valueId: number,
    checked: boolean,
  ) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const optionKey = optionId;

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
        nextParams.delete(option.optionId);
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
    <>
      <Popover
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        desktopFrom="lg"
        overlayOpacity="light"
        role="dialog"
        aria-label={t("filters.title")}
        className="z-50 max-h-[calc(100svh-1rem)] overflow-y-auto lg:hidden"
      >
        <div>
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            {t("filters.title")}
          </h2>
          <FilterContent
            options={options}
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
          />
          <div className="mt-4 flex justify-start">
            <Button
              type="button"
              variant="link"
              disabled={activeFilters.length === 0}
              onClick={handleResetFilters}
            >
              {t("filters.reset")}
            </Button>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={() => setFiltersOpen(false)}
            >
              {t("filters.view-results", { count: resultCount })}
            </Button>
          </div>
        </div>
      </Popover>
      <div>
        <div className="contents">
          <div className="flex min-h-10 items-center justify-between gap-3 bg-white lg:hidden">
            <p className="text-xs text-gray-600 lg:hidden">
              {t("filters.result-count", { count: resultCount })}
            </p>
            <div className="ml-auto flex items-center gap-1 lg:block lg:min-w-56">
              <Select
                value={searchParams.get("sort") ?? "newest"}
                onChange={handleSortChange}
                options={translatedSortOptions}
                placeholder={t("filters.sort-by")}
                showSelectedValue={false}
                variant="ghost"
                size="sm"
                className="text-gray-600"
                aria-label={t("filters.sort")}
              />
              <Button
                variant="ghost"
                size="sm"
                className="pl-1.5 text-gray-600 lg:hidden"
                aria-haspopup="dialog"
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen(true)}
              >
                <Icon icon="list-filter" size="sm" />
                <span>{t("filters.title")}</span>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary">{activeFilters.length}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 lg:pt-0">
          {/* Filters sidebar - Desktop */}
          <aside className="hidden lg:flex lg:flex-col lg:gap-3 lg:self-start">
            <Select
              value={searchParams.get("sort") ?? "newest"}
              onChange={handleSortChange}
              options={translatedSortOptions}
              placeholder={t("filters.sort-by")}
              className="w-full"
              aria-label={t("filters.sort")}
            />
            <div className="rounded-md border border-input bg-background">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("filters.title")}
                </h2>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary">{activeFilters.length}</Badge>
                )}
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="ml-auto"
                  disabled={activeFilters.length === 0}
                  onClick={handleResetFilters}
                >
                  {t("filters.reset")}
                </Button>
              </div>
              <FilterContent
                options={options}
                searchParams={searchParams}
                onFilterChange={handleFilterChange}
                size="sm"
                itemClassName="px-4"
              />
              <p className="border-t px-4 py-3 text-sm text-muted-foreground">
                {t("filters.product-count", { count: resultCount })}
              </p>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pb-4">
                {activeFilters.map(({ option, value }) => (
                  <Chip
                    key={option.id}
                    removable
                    onClick={() =>
                      handleFilterChange(option.optionId, value.id, false)
                    }
                  >
                    {localize(value.label, language)}
                  </Chip>
                ))}
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="ml-1"
                  onClick={handleResetFilters}
                >
                  {t("filters.clear-all")}
                </Button>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
