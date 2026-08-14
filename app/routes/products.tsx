import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { incrementProductQuantityInCartUseCase } from "@app/lib/cart/application/increment-product-quantity-in-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { Button, cn, Icon } from "@library";
import { useState } from "react";
import { Link, useLoaderData } from "react-router";

type ProductResponse = {
  id: number;
  name: string;
  thumbnailUrl?: string | null;
  priceInCents: number;
};

type ProductCardProps = {
  id: number;
  name: string;
  thumbnailUrl: string | null;
  thumbnailAlt: string;
  price: string;
  unitPriceInCents: number;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function ProductCard({
  id,
  name,
  thumbnailUrl,
  thumbnailAlt,
  price,
  unitPriceInCents,
}: ProductCardProps) {
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const quantityInCart =
    cart?.items.find((item) => item.productId === id)?.quantity ?? 0;

  const handleQuickAdd = async () => {
    setIsAdding(true);

    try {
      const updatedCart = await incrementProductQuantityInCartUseCase.execute({
        productId: id,
        name,
        unitPriceInCents,
        thumbnailUrl,
      });
      if (updatedCart) setCart(updatedCart);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative">
      <Link to={`/product/${id}`}>
        {thumbnailUrl ? (
          <img
            alt={thumbnailAlt}
            src={thumbnailUrl}
            className={cn(
              "aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:[view-transition-name:none]",
            )}
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-500">
            {t("product.no-thumbnail")}
          </div>
        )}
      </Link>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <Link className="min-w-0" to={`/product/${id}`}>
            <h3 className="text-sm leading-5 text-gray-700">{name}</h3>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-sm text-gray-600">{quantityInCart}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`${t("product.add-to-bag")}: ${name}`}
              disabled={isAdding || !cart}
              onClick={handleQuickAdd}
              className="shrink-0 bg-gray-200 p-0! hover:bg-gray-300 disabled:opacity-40"
              style={{ width: 20, height: 20, borderRadius: "50%" }}
            >
              <Icon icon="plus" size="sm" />
            </Button>
          </div>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
}

export async function clientLoader({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(searchParams);
  const response = await Api.get(
    "products/",
    searchParams.size > 0 ? params : undefined,
  );
  const products = (Array.isArray(response) ? response : []).map(
    (product: ProductResponse): ProductCardProps => ({
      id: product.id,
      name: product.name,
      thumbnailUrl: product.thumbnailUrl ?? null,
      thumbnailAlt: product.name,
      price: priceFormatter.format(product.priceInCents / 100),
      unitPriceInCents: product.priceInCents,
    }),
  );

  return { products };
}

export default function Products() {
  const { products } = useLoaderData<typeof clientLoader>();

  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-8 pb-32 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3
            xl:gap-x-8"
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
