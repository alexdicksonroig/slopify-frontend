import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
import { Link, useLoaderData } from "react-router";
import { VariantCartAction } from "./variants/components/VariantCartAction";

type VariantCardProps = {
  product: Product;
  variant: Variant;
};

function VariantCard({ product, variant }: VariantCardProps) {
  const t = useTranslate();
  const { unitAmount, currency } = variant;
  const isAvailable = unitAmount !== null && currency !== null;

  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link
          className="block overflow-hidden rounded-xs"
          to={`/product/${product.id}/${variant.id}`}
        >
          {variant.thumbnailUrl ? (
            <img
              alt={product.name}
              src={variant.thumbnailUrl}
              className="aspect-[4/5] w-full bg-gray-50 object-contain transition-transform duration-500 ease-out lg:hover:scale-105 motion-reduce:transition-none"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 text-sm text-gray-500 [border-radius:0.625rem]">
              {t("product.no-thumbnail")}
            </div>
          )}
        </Link>
        <VariantCartAction product={product} variant={variant} />
      </div>
      <Link
        className="mt-3 block min-w-0 px-0.5"
        to={`/product/${product.id}/${variant.id}`}
      >
        <h3 className="truncate text-sm font-medium leading-5 text-black">
          {product.name}
        </h3>
        <p className="truncate text-xs leading-5 text-gray-500">
          {variant.selections.map(({ value }) => value.label).join(", ")}
        </p>
      </Link>
      <p className="px-0.5 text-sm font-normal leading-5 text-gray-950">
        {isAvailable
          ? formatMoney(unitAmount, currency)
          : t("product.unavailable")}
      </p>
    </article>
  );
}

async function loadVariants(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(
    [...searchParams].filter(([key]) => /^\d+$/.test(key)),
  );
  const [variantList, products] = await Promise.all([
    Api.get<VariantListItem[]>(
      "variants",
      Object.keys(params).length > 0 ? params : undefined,
    ),
    Api.get<Product[]>("products"),
  ]);
  const variants = await Promise.all(
    variantList.map((variant) => Api.get<Variant>(`variants/${variant.id}`)),
  );

  const sort = searchParams.get("sort") ?? "newest";
  variants.sort((left, right) => {
    if (sort === "price-asc") {
      return (left.unitAmount ?? Infinity) - (right.unitAmount ?? Infinity);
    }
    if (sort === "price-desc") {
      return (right.unitAmount ?? -Infinity) - (left.unitAmount ?? -Infinity);
    }
    return right.id - left.id;
  });

  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );
  const cards = variants.flatMap((variant) => {
    const product = productsById.get(variant.productId);
    return product ? [{ product, variant }] : [];
  });

  return { cards };
}

export async function loader({ request }: { request: Request }) {
  return loadVariants(request);
}

export async function clientLoader({ request }: { request: Request }) {
  return loadVariants(request);
}

export default function Variants() {
  const t = useTranslate();
  const { cards } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:mt-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {cards.map(({ product, variant }) => (
          <VariantCard key={variant.id} product={product} variant={variant} />
        ))}
      </div>
      <p className="sr-only">
        {t("filters.result-count", { count: cards.length })}
      </p>
    </>
  );
}
