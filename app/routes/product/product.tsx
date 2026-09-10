import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import type { Product } from "@app/lib/product";
import type { ProductOption, Variant } from "@app/lib/variant";
import { Button } from "@library";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductOptions } from "./components/ProductOptions";
import { QuantitySelector } from "./components/QuantitySelector";

type ProductLoaderArgs = {
  params: { id?: string; variantId?: string };
};

async function loadProduct({ params }: ProductLoaderArgs) {
  const variantId = params.variantId;
  if (!variantId) {
    throw new Response("A variant path parameter is required", {
      status: 400,
    });
  }

  const [product, variant] = await Promise.all([
    get<Product>(`products/${params.id}`),
    get<Variant>(`variants/${variantId}`),
  ]);

  return { product, variant };
}

export async function loader(args: ProductLoaderArgs) {
  return loadProduct(args);
}

export async function clientLoader(args: ProductLoaderArgs) {
  return loadProduct(args);
}

export default function ProductPage() {
  const t = useTranslate();
  const { cart, setCart } = useCart();
  const { product, variant } = useLoaderData<typeof clientLoader>();
  const [selections, setSelections] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      variant.selections.map(({ option, value }) => [option.id, value.id]),
    ),
  );
  const [quantity, setQuantity] = useState(1);
  const hasCartItems = (cart?.items.length ?? 0) > 0;

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

  const galleryImages = variant.coverUrl
    ? [{ src: variant.coverUrl, alt: product.name }]
    : [];
  const { unitAmount, currency } = variant;
  const hasPrice =
    selectedVariant !== null && unitAmount !== null && currency !== null;
  const price = hasPrice
    ? formatMoney(unitAmount, currency)
    : t("product.unavailable");

  const addToCart = async (quantity: number) => {
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
  };

  const handleFooterAdd = () => {
    const cartItem = cart?.items.find((item) => item.variantId === variant.id);
    return addToCart((cartItem?.quantity ?? 0) + 1);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 sm:pt-8 lg:px-12 lg:pt-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(25rem,1fr)] lg:gap-14">
        <ProductImageGallery images={galleryImages} />

        <section className="lg:pt-4">
          <div className="border-b border-neutral-200 pb-6">
            <h1 className="text-[2.5rem] leading-[0.98] font-bold tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-[3.25rem]">
              {product.name}
            </h1>
            <div className="mt-5 flex items-end justify-between gap-6">
              <p className="text-sm text-neutral-500">
                A bottle chosen for you
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
              {price}
            </p>
            {hasCartItems && (
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                className="h-14"
              />
            )}
          </div>

          <ProductDetails
            description={product.description ?? t("product.description-text")}
          />

          <form
            className="mt-7"
            onSubmit={(event) => {
              event.preventDefault();
              void addToCart(quantity);
            }}
          >
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
            {hasCartItems && (
              <div className="mt-5 flex gap-3">
                <Button
                  type="submit"
                  disabled={!cart || !hasPrice}
                  className="h-14 flex-1 justify-between rounded-none bg-neutral-950 px-5 uppercase hover:bg-neutral-800"
                >
                  <span>{t("product.add-to-bag")}</span>
                </Button>
              </div>
            )}
          </form>

          <div className="mt-7 border-t border-neutral-200">
            {[t("product.highlights"), t("product.details"), "Shipping"].map(
              (label) => (
                <details
                  key={label}
                  className="group border-b border-neutral-200"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-xs font-semibold tracking-[0.08em] uppercase [&::-webkit-details-marker]:hidden">
                    {label}
                    <span className="text-xl font-normal group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-sm leading-6 text-neutral-600">
                    {detailsCopy(label, t("product.details-text"))}
                  </p>
                </details>
              ),
            )}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6 lg:px-12">
          <p
            className="text-xl font-bold tracking-tight text-neutral-900"
            aria-live="polite"
          >
            {price}
          </p>
          <Button
            type="button"
            onClick={handleFooterAdd}
            disabled={!cart || !hasPrice}
            className="h-11 min-w-40 rounded-[10px] bg-neutral-900 px-6 text-base text-white shadow-none hover:bg-neutral-800"
          >
            {t("product.add-to-bag")}
          </Button>
        </div>
      </div>
    </main>
  );
}

function detailsCopy(label: string, details: string) {
  return label === "Shipping"
    ? "Shipping costs and delivery estimates are calculated at checkout."
    : details;
}
