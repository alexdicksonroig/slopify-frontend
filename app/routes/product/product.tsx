import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { Button } from "@library";
import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import {
  type ProductOption,
  ProductOptions,
} from "./components/ProductOptions";
import { QuantitySelector } from "./components/QuantitySelector";

type ProductData = {
  id: number;
  name: string;
  description?: string;
  price: string;
  images: { src: string; alt: string; className?: string }[];
  highlights: string[];
};

type ProductResponse = Partial<ProductData> & {
  id: number;
  name: string;
  priceInCents?: number;
  thumbnailUrl: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Product({ params }: { params: { id: string } }) {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    get(`products/${params.id}`).then(setProduct);
    get("product-options").then(setProductOptions);
  }, [params.id]);

  useEffect(() => {
    const cartItem = cart?.items.find(
      (item) => item.productId === Number(params.id),
    );
    setQuantity(cartItem?.quantity ?? 1);
  }, [cart, params.id]);

  if (!product) return null;

  const {
    name,
    description,
    price: productPrice,
    priceInCents,
    images: productImages = [],
    highlights: productHighlights = [],
  } = product;
  const galleryImages = [
    { src: product.thumbnailUrl, alt: name },
    ...productImages,
  ];
  const resolvedPriceInCents =
    priceInCents ?? parsePriceInCents(productPrice ?? "0");
  const price =
    productPrice ?? priceFormatter.format(resolvedPriceInCents / 100);
  const totalPrice = priceFormatter.format(
    (resolvedPriceInCents * quantity) / 100,
  );

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCart = await addProductToCartUseCase.execute(
      {
        productId: product.id,
        name: product.name,
        unitPriceInCents: resolvedPriceInCents,
        thumbnailUrl: product.thumbnailUrl ?? productImages[0]?.src ?? null,
      },
      quantity,
    );
    if (updatedCart) setCart(updatedCart);
    navigate("/cart");
  };

  return (
    <div className="md:pt-6">
      <ProductImageGallery
        images={galleryImages}
        thumbnailTransitionName={`product-${product.id}-thumbnail`}
      />

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {name}
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <ProductInfo price={price} />
          <form className="mt-10" onSubmit={handleAddToCart}>
            <ProductOptions options={productOptions} />
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button
              type="submit"
              disabled={!cart}
              className="mt-4 h-12 w-full uppercase"
            >
              <span>{t("product.add-to-bag")}</span>
              <span aria-hidden="true">·</span>
              <span>{totalPrice}</span>
            </Button>
          </form>
        </div>
        <ProductDetails
          description={description ?? t("product.description-text")}
          highlights={productHighlights}
          details={t("product.details-text")}
        />
      </div>
    </div>
  );
}

function parsePriceInCents(price: string): number {
  const amount = Number(price.replace(/[^0-9.,-]/g, "").replace(",", "."));
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}
