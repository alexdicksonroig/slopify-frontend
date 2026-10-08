import { VariantCard } from "@app/components/variant-card";
import { useTranslate } from "@app/i18n";
// import { Button } from "@library";
import * as Api from "@app/lib/api";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
import { useLoaderData } from "react-router";
import { Filters, type ProductOption } from "./variants/components/Filters";

async function loadVariants(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const options = await Api.get<ProductOption[]>("product-options");
  const params = Object.fromEntries(
    options.flatMap(({ optionId }) => {
      const valueId = searchParams.get(optionId);
      return valueId === null ? [] : [[optionId, valueId]];
    }),
  );
  const query = searchParams.get("q")?.trim();
  if (query) params.q = query;
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

  return { cards, options, query };
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
    <div className="h-35 rounded sm:h-60 p-3 sm:p-4 bg-linear-to-br from-gray-50 to-gray-200 flex items-end justify-end">
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
  const { cards, options, query } = useLoaderData<typeof clientLoader>();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:gap-8 lg:py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          {query
            ? t("filters.search-results", { query })
            : t("filters.new-arrivals")}
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 sm:text-base">
          {t("filters.subtitle")}
        </p>
      </div>
      <Filters options={options} resultCount={cards.length}>
        {query && cards.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-gray-500">
            {t("filters.no-results", { query })}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3">
            {cards.map(({ product, variant }) => (
              <VariantCard
                key={variant.id}
                product={product}
                variant={variant}
              />
            ))}
          </div>
        )}
        <p className="sr-only">
          {t("filters.result-count", { count: cards.length })}
        </p>
      </Filters>
    </div>
  );
}
