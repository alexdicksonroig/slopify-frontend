import { Breadcrumb } from "@app/components/breadcrumb";
import { QuantitySelector } from "@app/components/quantity-selector";
import { useLanguage, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { localize } from "@app/lib/localized-text";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { Accordion, Button, cn, Separator } from "@library";
import { type FormEvent, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductOptions } from "./components/ProductOptions";

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

  const [product, variant, variants] = await Promise.all([
    get<Product>(`products/${params.id}`),
    get<Variant>(`variants/${variantId}`),
    get<Variant[]>(`products/${params.id}/variants`),
  ]);

  return { product, variant, variants };
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
  const { cart, setCart } = useCart();
  const { product, variant, variants } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cartItem = cart?.items.find((item) => item.variantId === variant.id);
    setQuantity(cartItem?.quantity ?? 1);
  }, [cart, variant.id]);

  const galleryImages = variant.coverUrl
    ? [{ src: variant.coverUrl, alt: product.name }]
    : [];
  const { unitAmount, currency, stock } = variant;
  const hasPrice = unitAmount !== null && currency !== null;
  const price = hasPrice
    ? formatMoney(unitAmount, currency)
    : t("product.unavailable");
  const totalPrice = hasPrice
    ? formatMoney(unitAmount * quantity, currency)
    : price;

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (unitAmount === null || currency === null) return;
    const updatedCart = await addProductToCartUseCase.execute(
      {
        variantId: variant.id,
        productId: product.id,
        name: product.name,
        unitPriceInCents: unitAmount,
        currency,
        thumbnailUrl: variant.thumbnailUrl,
      },
      quantity,
    );
    if (updatedCart) setCart(updatedCart);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-8 lg:px-12 lg:pt-6 lg:pb-10">
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
            <p
              className={cn(
                "inline-flex items-center gap-2 self-start rounded-full px-2.5 py-1 text-xs font-medium lg:text-sm",
                stock > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-neutral-100 text-neutral-600",
              )}
              aria-live="polite"
            >
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full",
                  stock > 0 ? "bg-emerald-600" : "bg-neutral-400",
                )}
              />
              {stock > 0
                ? t("product.stock-count", { count: stock })
                : t("product.out-of-stock")}
            </p>
            <h1 className="text-4xl leading-[1.05] font-bold tracking-[-0.04em] text-balance text-neutral-950 lg:text-6xl lg:leading-[1.02]">
              {product.name}
            </h1>
            <p className="text-sm text-neutral-500 lg:text-lg">
              A bottle chosen for you
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] tabular-nums text-neutral-950 lg:mt-2 lg:text-4xl">
              {price}
            </p>
          </header>

          <ProductDetails
            description={
              product.description
                ? localize(product.description, language)
                : t("product.description-text")
            }
          />

          <Separator />

          <form className="flex flex-col gap-5" onSubmit={handleAddToCart}>
            <ProductOptions
              variants={variants}
              variant={variant}
              productName={product.name}
              onChange={(variantId) =>
                navigate(`/product/${product.id}/${variantId}`)
              }
            />
            <div className="flex max-w-full gap-2.5 sm:gap-3">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                className="h-12"
              />
              <Button
                type="submit"
                variant="cta"
                size="xl"
                disabled={!cart || !hasPrice}
                className="flex-1 justify-between tracking-[0.06em]"
              >
                <span>{t("product.add")}</span>
                <span className="tabular-nums">{totalPrice}</span>
              </Button>
            </div>
          </form>

          <Accordion className="border-t">
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
    </main>
  );
}

function detailsCopy(label: string, details: string) {
  return label === "Shipping"
    ? "Shipping costs and delivery estimates are calculated at checkout."
    : details;
}
