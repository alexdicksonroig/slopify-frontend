import { VariantCard } from "@app/components/variant-card";
import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
// import { Button } from "@library";
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
  const { cards, options } = useLoaderData<typeof clientLoader>();

  return (
    <div className="mx-auto w-full max-w-7xl p-3 sm:p-6 flex gap-4 flex-col">
      <Banner />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
          {t("filters.new-arrivals")}
        </h1>
        <p className="mt-1 text-sm lg:text-lg text-gray-500 lg:hidden">
          {t("filters.subtitle")}
        </p>
      </div>
      <Filters options={options} resultCount={cards.length}>
        <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-3">
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
