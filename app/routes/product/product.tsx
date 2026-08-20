import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { ProductOption, ProductVariant } from "@app/lib/product";
import { Button } from "@library";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductOptions } from "./components/ProductOptions";
import { QuantitySelector } from "./components/QuantitySelector";

type ProductResponse = {
  id: number;
  name: string;
  description?: string | null;
  thumbnailUrl: string | null;
  images?: { src: string; alt: string; className?: string }[];
  highlights?: string[];
};

export async function loader({ params }: { params: { id?: string } }) {
  const [product, productVariants] = await Promise.all([
    get<ProductResponse>(`products/${params.id}`),
    get<ProductVariant[]>(`products/${params.id}/variants`),
  ]);

  return { product, productVariants };
}

export default function Product() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { product, productVariants } = useLoaderData<typeof loader>();
  const initialProductVariant = productVariants[0] ?? null;
  const [selections, setSelections] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      (initialProductVariant?.selections ?? []).map(({ option, value }) => [
        option.id,
        value.id,
      ]),
    ),
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelections(
      Object.fromEntries(
        (productVariants[0]?.selections ?? []).map(({ option, value }) => [
          option.id,
          value.id,
        ]),
      ),
    );
  }, [productVariants]);

  const options = useMemo(() => {
    const byId = new Map<number, ProductOption>();
    for (const productVariant of productVariants) {
      for (const { option, value } of productVariant.selections) {
        const current = byId.get(option.id);
        if (!current) {
          byId.set(option.id, { ...option, possibleValues: [value] });
        } else if (!current.possibleValues.some(({ id }) => id === value.id)) {
          current.possibleValues.push(value);
        }
      }
    }
    return [...byId.values()];
  }, [productVariants]);

  const selectedProductVariant =
    productVariants.find(
      (productVariant) =>
        productVariant.selections.length === options.length &&
        productVariant.selections.every(
          ({ option, value }) => selections[option.id] === value.id,
        ),
    ) ?? (options.length === 0 ? initialProductVariant : null);

  useEffect(() => {
    const cartItem = selectedProductVariant
      ? cart?.items.find(
          (item) => item.productVariantId === selectedProductVariant.id,
        )
      : null;
    setQuantity(cartItem?.quantity ?? 1);
  }, [cart, selectedProductVariant]);

  const productImages = product.images ?? [];
  const galleryImages = [
    ...(product.thumbnailUrl
      ? [{ src: product.thumbnailUrl, alt: product.name }]
      : []),
    ...productImages,
  ];
  const price = selectedProductVariant
    ? formatMoney(
        selectedProductVariant.unitAmount,
        selectedProductVariant.currency,
      )
    : t("product.unavailable");
  const totalPrice = selectedProductVariant
    ? formatMoney(
        selectedProductVariant.unitAmount * quantity,
        selectedProductVariant.currency,
      )
    : price;

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProductVariant) return;

    const updatedCart = await addProductToCartUseCase.execute(
      {
        productVariantId: selectedProductVariant.id,
        productId: product.id,
        name: product.name,
        unitPriceInCents: selectedProductVariant.unitAmount,
        currency: selectedProductVariant.currency,
        thumbnailUrl: product.thumbnailUrl ?? productImages[0]?.src ?? null,
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
              disabled={!cart || !selectedProductVariant}
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
          highlights={product.highlights ?? []}
          details={t("product.details-text")}
        />
      </div>
    </div>
  );
}
