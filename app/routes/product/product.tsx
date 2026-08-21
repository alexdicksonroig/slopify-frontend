import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { ProductOption, Variant } from "@app/lib/variant";
import { Button } from "@library";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductOptions } from "./components/ProductOptions";
import { QuantitySelector } from "./components/QuantitySelector";

export async function clientLoader({
  params,
  request,
}: {
  params: { id?: string };
  request: Request;
}) {
  const variantId = new URL(request.url).searchParams.get("variant");
  if (!variantId) {
    throw new Response("A variant query parameter is required", {
      status: 400,
    });
  }

  const [product, variant] = await Promise.all([
    get<Product>(`products/${params.id}`),
    get<Variant>(`variants/${variantId}`),
  ]);

  return { product, variant };
}

export default function ProductPage() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { product, variant } = useLoaderData<typeof clientLoader>();
  const [selections, setSelections] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      variant.selections.map(({ option, value }) => [option.id, value.id]),
    ),
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelections(
      Object.fromEntries(
        variant.selections.map(({ option, value }) => [option.id, value.id]),
      ),
    );
  }, [variant]);

  const options = useMemo<ProductOption[]>(
    () =>
      variant.selections.map(({ option, value }) => ({
        ...option,
        possibleValues: [value],
      })),
    [variant],
  );

  const selectedVariant = variant.selections.every(
    ({ option, value }) => selections[option.id] === value.id,
  )
    ? variant
    : null;

  useEffect(() => {
    const cartItem = selectedVariant
      ? cart?.items.find((item) => item.variantId === selectedVariant.id)
      : null;
    setQuantity(cartItem?.quantity ?? 1);
  }, [cart, selectedVariant]);

  const galleryImages = variant.thumbnailUrl
    ? [{ src: variant.thumbnailUrl, alt: product.name }]
    : [];
  const { unitAmount, currency } = variant;
  const hasPrice =
    selectedVariant !== null && unitAmount !== null && currency !== null;
  const price = hasPrice
    ? formatMoney(unitAmount, currency)
    : t("product.unavailable");
  const totalPrice = hasPrice
    ? formatMoney(unitAmount * quantity, currency)
    : price;

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVariant || unitAmount === null || currency === null) return;

    const updatedCart = await addProductToCartUseCase.execute(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        name: product.name,
        unitPriceInCents: unitAmount,
        currency,
        thumbnailUrl: selectedVariant.thumbnailUrl,
      },
      quantity,
    );
    if (updatedCart) setCart(updatedCart);
    navigate("/cart");
  };

  return (
    <div className="md:pt-6">
      <ProductImageGallery images={galleryImages} />

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <ProductInfo price={price} />
          <form className="mt-10" onSubmit={handleAddToCart}>
            <ProductOptions
              options={options}
              selections={selections}
              onChange={(optionId, valueId) =>
                setSelections((current) => ({
                  ...current,
                  [optionId]: valueId,
                }))
              }
            />
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button
              type="submit"
              disabled={!cart || !hasPrice}
              className="mt-4 h-12 w-full uppercase"
            >
              <span>{t("product.add-to-bag")}</span>
              <span aria-hidden="true">·</span>
              <span>{totalPrice}</span>
            </Button>
          </form>
        </div>
        <ProductDetails
          description={product.description ?? t("product.description-text")}
          highlights={[]}
          details={t("product.details-text")}
        />
      </div>
    </div>
  );
}
