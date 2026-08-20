import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { decrementProductQuantityInCartUseCase } from "@app/lib/cart/application/decrement-product-quantity-in-cart.use-case";
import { incrementProductQuantityInCartUseCase } from "@app/lib/cart/application/increment-product-quantity-in-cart.use-case";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { ProductVariant } from "@app/lib/product";
import { Button, cn, Icon, Throttle } from "@library";
import { useMemo } from "react";
import { Link, useLoaderData } from "react-router";

type ProductResponse = {
  id: number;
  name: string;
  thumbnailUrl?: string | null;
};

type ProductCardProps = {
  id: number;
  name: string;
  thumbnailUrl: string | null;
  productVariant: ProductVariant | null;
};

function ProductCard({
  id,
  name,
  thumbnailUrl,
  productVariant,
}: ProductCardProps) {
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const quantityInCart = productVariant
    ? (cart?.items.find((item) => item.productVariantId === productVariant.id)
        ?.quantity ?? 0)
    : 0;

  const updateCart = useMemo(
    () =>
      Throttle(async (operation: () => Promise<Cart | null>) => {
        const updatedCart = await operation();
        if (updatedCart) setCart(updatedCart);
      }),
    [setCart],
  );

  return (
    <div className="group relative">
      <Link to={`/product/${id}`}>
        {thumbnailUrl ? (
          <img
            alt={name}
            src={thumbnailUrl}
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
          <Link className="min-w-0" to={`/product/${id}`}>
            <h3 className="text-sm leading-5 text-gray-700">{name}</h3>
          </Link>
          {productVariant && (
            <div className="flex shrink-0 items-center gap-2">
              {quantityInCart > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={t("cart.remove", { item: name })}
                  disabled={!cart}
                  onClick={() =>
                    updateCart(() =>
                      decrementProductQuantityInCartUseCase.execute(
                        productVariant.id,
                      ),
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
                aria-label={`${t("product.add-to-bag")}: ${name}`}
                disabled={!cart}
                onClick={() =>
                  updateCart(() =>
                    incrementProductQuantityInCartUseCase.execute({
                      productVariantId: productVariant.id,
                      productId: id,
                      name,
                      unitPriceInCents: productVariant.unitAmount,
                      currency: productVariant.currency,
                      thumbnailUrl,
                    }),
                  )
                }
                className="shrink-0 bg-gray-300 p-0! hover:bg-gray-400 disabled:opacity-40"
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              >
                <Icon icon="plus" size="sm" />
              </Button>
            </div>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {productVariant
            ? formatMoney(productVariant.unitAmount, productVariant.currency)
            : t("product.unavailable")}
        </p>
      </div>
    </div>
  );
}

async function loadProducts(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(searchParams);
  const response = await Api.get<ProductResponse[]>(
    "products/",
    searchParams.size > 0 ? params : undefined,
  );

  const products = await Promise.all(
    response.map(async (product): Promise<ProductCardProps> => {
      const productVariants = await Api.get<ProductVariant[]>(
        `products/${product.id}/variants`,
      );
      return {
        id: product.id,
        name: product.name,
        thumbnailUrl: product.thumbnailUrl ?? null,
        productVariant: productVariants[0] ?? null,
      };
    }),
  );

  return { products };
}

export async function loader({ request }: { request: Request }) {
  return loadProducts(request);
}

export async function clientLoader({ request }: { request: Request }) {
  return loadProducts(request);
}

export default function Products() {
  const { products } = useLoaderData<typeof clientLoader>();

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
