import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
// import { Button } from "@library";
import { Link, useLoaderData } from "react-router";
import { Filters, type ProductOption } from "./variants/components/Filters";
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
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded bg-gray-100 text-sm text-gray-500">
              {t("product.no-thumbnail")}
            </div>
          )}
        </Link>
        <VariantCartAction product={product} variant={variant} />
      </div>
      <Link
        className="mt-1 block min-w-0 px-0.5"
        to={`/product/${product.id}/${variant.id}`}
      >
        <h3 className="truncate text-sm font-medium leading-5 text-black">
          {product.name}
        </h3>
        <p className="truncate text-xs leading-none text-gray-500">
          {variant.selections.map(({ value }) => value.label).join(", ")}
        </p>
        <p className="text-xs font-semibold leading-8 text-gray-950">
          {isAvailable
            ? formatMoney(unitAmount, currency)
            : t("product.unavailable")}
        </p>
      </Link>
    </article>
  );
}

async function loadVariants(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(
    [...searchParams].filter(([key]) => /^\d+$/.test(key)),
  );
  const [variantList, products, options] = await Promise.all([
    Api.get<VariantListItem[]>(
      "variants",
      Object.keys(params).length > 0 ? params : undefined,
    ),
    Api.get<Product[]>("products"),
    Api.get<ProductOption[]>("product-options"),
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

  return { cards, options };
}

export async function loader({ request }: { request: Request }) {
  return loadVariants(request);
}

export async function clientLoader({ request }: { request: Request }) {
  return loadVariants(request);
}

const Banner = () => {
  // const t = useTranslate();

  return (
    <div className="h-35 rounded sm:h-60 p-3 sm:p-4 bg-gray-100 flex items-end justify-end">
      {/* <Button
        className="rounded-[9999px] bg-white font-normal"
        variant="secondary"
        size="sm"
      >
        {t("banner.shop-now")}
      </Button> */}
    </div>
  );
};

export default function Variants() {
  const t = useTranslate();
  const { cards, options } = useLoaderData<typeof clientLoader>();

  return (
    <div className="mx-auto w-full max-w-7xl p-3 sm:p-6 flex gap-2 flex-col">
      <Banner />
      <div>
        <h1 className="text-[1.7rem] font-bold tracking-tight text-gray-900 md:text-3xl">
          {t("filters.new-arrivals")}
        </h1>
        <p className="mt-1 text-sm text-gray-500 lg:hidden">
          {t("filters.subtitle")}
        </p>
      </div>
      <Filters options={options} resultCount={cards.length}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
          {cards.map(({ product, variant }) => (
            <VariantCard key={variant.id} product={product} variant={variant} />
          ))}
        </div>
        <p className="sr-only">
          {t("filters.result-count", { count: cards.length })}
        </p>
      </Filters>
    </div>
  );
}
