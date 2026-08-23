import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { decrementProductQuantityInCartUseCase } from "@app/lib/cart/application/decrement-product-quantity-in-cart.use-case";
import { incrementProductQuantityInCartUseCase } from "@app/lib/cart/application/increment-product-quantity-in-cart.use-case";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { VariantListItem } from "@app/lib/variant";
import { Button, cn, Icon } from "@library";
import { useRef } from "react";
import { Link, useLoaderData } from "react-router";

type VariantCardProps = {
  product: Product;
  variant: VariantListItem;
};

function VariantCard({ product, variant }: VariantCardProps) {
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const { unitAmount, currency } = variant;
  const isAvailable = unitAmount !== null && currency !== null;
  const quantityInCart =
    cart?.items.find((item) => item.variantId === variant.id)?.quantity ?? 0;

  const cartUpdateQueue = useRef(Promise.resolve());
  const updateCart = (operation: () => Promise<Cart | null>) => {
    cartUpdateQueue.current = cartUpdateQueue.current
      .then(operation)
      .then((updatedCart) => {
        if (updatedCart) setCart(updatedCart);
      });
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}?variant=${variant.id}`}>
        {variant.thumbnailUrl ? (
          <img
            alt={product.name}
            src={variant.thumbnailUrl}
            className={cn(
              "aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75",
            )}
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-500">
            {t("product.no-thumbnail")}
          </div>
        )}
      </Link>
      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            className="min-w-0"
            to={`/product/${product.id}?variant=${variant.id}`}
          >
            <h3 className="text-sm leading-5 text-gray-700">{product.name}</h3>
          </Link>
          {isAvailable && (
            <div className="flex shrink-0 items-center gap-2">
              {quantityInCart > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={t("cart.remove", { item: product.name })}
                  disabled={!cart}
                  onClick={() =>
                    updateCart(() =>
                      decrementProductQuantityInCartUseCase.execute(variant.id),
                    )
                  }
                  className="shrink-0 bg-gray-300 p-0! hover:bg-gray-400 disabled:opacity-40"
                  style={{ width: 20, height: 20, borderRadius: "50%" }}
                >
                  <Icon icon="minus" size="sm" />
                </Button>
              )}
              {quantityInCart > 0 && (
                <span className="text-sm text-gray-600">{quantityInCart}</span>
              )}
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
                className="shrink-0 bg-gray-300 p-0! hover:bg-gray-400 disabled:opacity-40"
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              >
                <Icon icon="plus" size="sm" className="brightness-0" />
              </Button>
            </div>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {isAvailable
            ? formatMoney(unitAmount, currency)
            : t("product.unavailable")}
        </p>
      </div>
    </div>
  );
}

async function loadVariants(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(
    [...searchParams].filter(([key]) => /^\d+$/.test(key)),
  );
  const [variants, products] = await Promise.all([
    Api.get<VariantListItem[]>(
      "variants",
      Object.keys(params).length > 0 ? params : undefined,
    ),
    Api.get<Product[]>("products"),
  ]);

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
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
        {cards.map(({ product, variant }) => (
          <VariantCard key={variant.id} product={product} variant={variant} />
        ))}
      </div>
      <p className="mt-3 pb-8 text-sm text-gray-500">
        {t("filters.result-count", { count: cards.length })}
      </p>
    </>
  );
}
