import { useTranslate } from "@app/i18n";
import { cn, Icon } from "@library";
import { Fragment } from "react";
import { Link } from "react-router";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslate();

  return (
    <nav
      aria-label={t("breadcrumb.label")}
      className={cn("min-w-0 py-page-gap", className)}
    >
      <ol className="flex min-w-0 items-center gap-1.5 text-sm text-neutral-500">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <li aria-hidden className="flex shrink-0">
                  <Icon
                    icon="chevron-down"
                    size="xxs"
                    rotate={270}
                    className="opacity-40 rtl:-scale-x-100"
                  />
                </li>
              )}
              <li className={cn("flex", isCurrent ? "min-w-0" : "shrink-0")}>
                {item.to && !isCurrent ? (
                  <Link
                    to={item.to}
                    className="rounded-sm transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isCurrent ? "page" : undefined}
                    className="truncate font-medium text-neutral-950"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
