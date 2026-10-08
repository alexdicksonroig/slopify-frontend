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
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded bg-gray-100 text-sm lg:text-lg text-gray-500">
              {t("product.no-thumbnail")}
            </div>
          )}
        </Link>
        <VariantCartAction product={product} variant={variant} />
      </div>
      <h3 className="truncate text-base lg:text-2xl font-medium text-black">
        {product.name}
      </h3>
      <p className="truncate text-xs lg:text-base text-gray-500">
        {variant.selections
          .map(({ value }) => localize(value.label, language))
          .join(", ")}
      </p>
      <p className="text-sm lg:text-lg font-semibold leading-8 text-gray-950">
        {isAvailable
          ? formatMoney(unitAmount, currency)
          : t("product.unavailable")}
      </p>
    </article>
  );
}
