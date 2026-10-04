import { Breadcrumb } from "@app/components/breadcrumb";
import { QuantitySelector } from "@app/components/quantity-selector";
import { useLanguage, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { localize } from "@app/lib/localized-text";
import type { Product } from "@app/lib/product";
import type { Variant, VariantListItem } from "@app/lib/variant";
import { Accordion, Button, cn } from "@library";
import { type FormEvent, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductOptions } from "./components/ProductOptions";
import { Recommendations } from "./components/Recommendations";

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

  const [product, variant, variants, variantList, products] = await Promise.all(
    [
      get<Product>(`products/${params.id}`),
      get<Variant>(`variants/${variantId}`),
      get<Variant[]>(`products/${params.id}/variants`),
      get<VariantListItem[]>("variants"),
      get<Product[]>("products"),
    ],
  );

  const productsById = new Map(products.map((item) => [item.id, item]));
  const recommendedVariants = await Promise.all(
    variantList
      .filter((item) => item.id !== variant.id)
      .slice(0, 4)
      .map((item) => get<Variant>(`variants/${item.id}`)),
  );
  const recommendations = recommendedVariants.flatMap((item) => {
    const itemProduct = productsById.get(item.productId);
    return itemProduct ? [{ product: itemProduct, variant: item }] : [];
  });

  return { product, variant, variants, recommendations };
}

export async function loader(args: ProductLoaderArgs) {
  return loadProduct(args);
}

export async function clientLoader(args: ProductLoaderArgs) {
  return loadProduct(args);
}

export default function ProductPage() {
  const t = useTranslate();
  const { language } = useLanguage();
  const { cart, setCart, openCart } = useCart();
  const { product, variant, variants, recommendations } =
    useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [variant.id]);

  const galleryImages = variant.coverUrl
    ? [{ src: variant.coverUrl, alt: product.name }]
    : [];
  const { unitAmount, currency, stock } = variant;
  const hasPrice = unitAmount !== null && currency !== null;
  const isInStock = stock > 0;
  const price = hasPrice
    ? formatMoney(unitAmount, currency)
    : t("product.unavailable");
  const totalPrice = hasPrice
    ? formatMoney(unitAmount * quantity, currency)
    : price;

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (unitAmount === null || currency === null || !isInStock) return;
    setCart(
      await addProductToCartUseCase.execute(
        {
          variantId: variant.id,
          productId: product.id,
          name: product.name,
          unitPriceInCents: unitAmount,
          currency,
          thumbnailUrl: variant.thumbnailUrl,
        },
        quantity,
      ),
    );
    openCart();
  };

  return (
    <main className="mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1440px] flex-col px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-8 lg:px-12 lg:pt-6 lg:pb-10">
      <Breadcrumb
        className="mb-3 sm:mb-4"
        items={[
          { label: t("breadcrumb.home"), to: "/" },
          { label: product.name },
        ]}
      />
      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(24rem,1fr)] lg:gap-16">
        <ProductImageGallery images={galleryImages} />

        <section className="flex flex-col gap-6 lg:gap-7 lg:pt-2">
          <header className="flex flex-col gap-2.5 lg:gap-3">
            <h1 className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-balance text-neutral-950 lg:text-6xl lg:leading-[1.02]">
              {product.name}
            </h1>
            {variant.selections.length > 0 && (
              <p className="text-sm text-neutral-500 lg:text-lg">
                {variant.selections
                  .map(({ value }) => localize(value.label, language))
                  .join(", ")}
              </p>
            )}
            <p
              className={cn(
                "inline-flex items-center gap-2 self-start bg-transparent text-sm",
                isInStock ? "text-emerald-600" : "text-neutral-500",
              )}
              aria-live="polite"
            >
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full",
                  isInStock ? "bg-emerald-500" : "bg-neutral-400",
                )}
              />
              {isInStock ? t("product.in-stock") : t("product.not-available")}
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] tabular-nums text-neutral-950 lg:mt-2 lg:text-4xl">
              {price}
            </p>
          </header>

          {product.description && (
            <ProductDetails
              description={localize(product.description, language)}
            />
          )}

          <form className="flex flex-col gap-5" onSubmit={handleAddToCart}>
            <ProductOptions
              variants={variants}
              variant={variant}
              productName={product.name}
              onChange={(variantId) =>
                navigate(`/product/${product.id}/${variantId}`)
              }
            />
            <div className="flex items-center justify-between gap-4">
              <p className="flex flex-col">
                <span className="text-xs text-neutral-500 lg:text-sm">
                  {t("cart.subtotal")}
                </span>
                <span className="text-base font-medium tabular-nums text-neutral-950 lg:text-lg">
                  {totalPrice}
                </span>
              </p>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <QuantitySelector
                    value={quantity}
                    max={stock}
                    onChange={setQuantity}
                    className="h-12"
                  />
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {t("product.stock-units", { count: stock })}
                  </span>
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  disabled={!cart || !hasPrice || !isInStock}
                  className="tracking-[0.06em]"
                >
                  {t("product.add")}
                </Button>
              </div>
            </div>
          </form>

          <Accordion>
            {[t("product.highlights"), t("product.details"), "Shipping"].map(
              (label) => (
                <Accordion.Item key={label} itemId={label} headerText={label}>
                  <p className="leading-relaxed text-neutral-600">
                    {detailsCopy(label, t("product.details-text"))}
                  </p>
                </Accordion.Item>
              ),
            )}
          </Accordion>
        </section>
      </div>

      <Recommendations
        cards={recommendations}
        className="mt-auto pt-12 lg:pt-20"
      />
    </main>
  );
}

function detailsCopy(label: string, details: string) {
  return label === "Shipping"
    ? "Shipping costs and delivery estimates are calculated at checkout."
    : details;
}
