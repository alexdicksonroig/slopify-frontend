import { useLanguage, useTranslate } from "@app/i18n";
import { formatMoney } from "@app/lib/currency";
import { localize } from "@app/lib/localized-text";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { VariantCartAction } from "@app/routes/variants/components/VariantCartAction";
import { cn } from "@library";
import { Link } from "react-router";

type VariantCardProps = {
  product: Product;
  variant: Variant;
  className?: string;
};

export function VariantCard({ product, variant, className }: VariantCardProps) {
  const t = useTranslate();
  const { language } = useLanguage();
  const { unitAmount, currency } = variant;
  const isAvailable = unitAmount !== null && currency !== null;

  return (
    <article className={cn("group min-w-0", className)}>
      <div className="relative">
        <Link
          className="block overflow-hidden rounded"
          to={`/product/${product.id}/${variant.id}`}
        >
          {variant.thumbnailUrl ? (
            <img
              alt={product.name}
              src={variant.thumbnailUrl}
              className="aspect-[4/5] w-full bg-gray-50 object-contain transition-transform duration-500 ease-out lg:hover:scale-105 motion-reduce:transition-none"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded bg-gray-100 px-4 text-sm text-gray-500">
              {t("product.no-thumbnail")}
            </div>
          )}
        </Link>
        <VariantCartAction product={product} variant={variant} />
      </div>
      <Link
        className="mt-3 block"
        to={`/product/${product.id}/${variant.id}`}
      >
        <h3 className="truncate text-base font-medium text-black sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
          {variant.selections
            .map(({ value }) => localize(value.label, language))
            .join(", ")}
        </p>
        <p className="mt-1 text-sm font-semibold leading-8 text-gray-950 sm:text-base">
          {isAvailable
            ? formatMoney(unitAmount, currency)
            : t("product.unavailable")}
        </p>
      </Link>
    </article>
  );
}
