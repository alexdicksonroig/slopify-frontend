import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { incrementProductQuantityInCartUseCase } from "@app/lib/cart/application/increment-product-quantity-in-cart.use-case";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
import { Button, Icon } from "@library";
import { useRef } from "react";
import { Link, useLoaderData } from "react-router";

type VariantCardProps = {
  product: Product;
  variant: Variant;
};

function VariantCard({ product, variant }: VariantCardProps) {
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const { unitAmount, currency } = variant;
  const isAvailable = unitAmount !== null && currency !== null;
  const cartUpdateQueue = useRef(Promise.resolve());
  const updateCart = (operation: () => Promise<Cart | null>) => {
    cartUpdateQueue.current = cartUpdateQueue.current
      .then(operation)
      .then((updatedCart) => {
        if (updatedCart) setCart(updatedCart);
      });
  };

  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link to={`/product/${product.id}/${variant.id}`}>
          {variant.thumbnailUrl ? (
            <img
              alt={product.name}
              src={variant.thumbnailUrl}
              className="aspect-[4/5] w-full bg-gray-50 object-contain group-hover:opacity-75 rounded-xs"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 text-sm text-gray-500 [border-radius:0.625rem]">
              {t("product.no-thumbnail")}
            </div>
          )}
        </Link>
        {isAvailable && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`${t("product.add-to-bag")}: ${product.name}`}
            disabled={!cart}
            onClick={() =>
              updateCart(() =>
                incrementProductQuantityInCartUseCase.execute({
                  variantId: variant.id,
                  productId: product.id,
                  name: product.name,
                  unitPriceInCents: unitAmount,
                  currency,
                  thumbnailUrl: variant.thumbnailUrl,
                }),
              )
            }
            className="absolute right-3 bottom-3 h-8! w-8! origin-center transform-gpu bg-white p-0! shadow-none transition-transform duration-300 ease-out hover:scale-105 hover:bg-white! hover:shadow-none active:scale-110 active:shadow-none motion-reduce:transform-none disabled:opacity-40 [border-radius:0.25rem]"
          >
            <Icon icon="shopping-bag" size="sm" />
          </Button>
        )}
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
