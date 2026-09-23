import { useLanguage, useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { localize } from "@app/lib/localized-text";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { Button } from "@library";
import { type FormEvent, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
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
    <main className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 sm:py-8 lg:px-12 lg:py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(25rem,1fr)] lg:gap-14">
        <ProductImageGallery images={galleryImages} />

        <section className="lg:pt-4">
          <div className="border-b border-neutral-200 pb-6">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-[-0.055em] text-neutral-950">
                {product.name}
              </h1>
              <p
                className={`shrink-0 text-sm lg:text-lg ${stock > 0 ? "text-emerald-700" : "text-neutral-500"}`}
                aria-live="polite"
              >
                {stock > 0
                  ? t("product.stock-count", { count: stock })
                  : t("product.out-of-stock")}
              </p>
            </div>
            <div className="mt-2 flex items-end justify-between gap-6">
              <p className="text-sm lg:text-lg text-neutral-500">
                A bottle chosen for you
              </p>
              <p className="shrink-0 text-3xl lg:text-4xl font-semibold tracking-[-0.04em] text-neutral-950">
                {price}
              </p>
            </div>
          </div>

          <ProductDetails
            description={
              product.description
                ? localize(product.description, language)
                : t("product.description-text")
            }
          />

          <form className="mt-7" onSubmit={handleAddToCart}>
            <ProductOptions
              variants={variants}
              variant={variant}
              productName={product.name}
              onChange={(variantId) =>
                navigate(`/product/${product.id}/${variantId}`)
              }
            />
            <div className="mt-5 flex gap-3">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                className="h-12"
              />
              <Button
                type="submit"
                disabled={!cart || !hasPrice}
                className="h-12 flex-1 justify-between rounded-none bg-neutral-950 px-3 uppercase hover:bg-neutral-800 sm:px-5"
              >
                <span>{t("product.add-to-bag")}</span>
                <span>{totalPrice}</span>
              </Button>
            </div>
          </form>

          <div className="mt-7">
            {[t("product.highlights"), t("product.details"), "Shipping"].map(
              (label) => (
                <details
                  key={label}
                  className="group border-b border-neutral-200"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-xs lg:text-base font-semibold tracking-[0.08em] uppercase [&::-webkit-details-marker]:hidden">
                    {label}
                    <span className="text-xl lg:text-3xl font-normal group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-sm lg:text-lg leading-6 text-neutral-600">
                    {detailsCopy(label, t("product.details-text"))}
                  </p>
                </details>
              ),
            )}
          </div>
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
