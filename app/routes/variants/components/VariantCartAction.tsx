import { useTranslate } from "@app/i18n";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { Button, Icon } from "@library";
import { useState } from "react";

type VariantCartActionProps = {
  product: Product;
  variant: Variant;
};

export function VariantCartAction({
  product,
  variant,
}: VariantCartActionProps) {
  const t = useTranslate();
  const { cart, setCart, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { unitAmount, currency, stock } = variant;

  if (unitAmount === null || currency === null) return null;

  const handleAddToCart = async () => {
    if (!cart || stock < 1) return;

    setIsAdding(true);
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
        1,
      ),
    );
    setIsAdding(false);
    openCart();
  };

  return (
    <Button
      type="button"
      variant="surface"
      size="icon-sm"
      aria-label={`${t("product.add-to-bag")}: ${product.name}`}
      disabled={!cart || isAdding || stock < 1}
      onClick={handleAddToCart}
      className="absolute right-3 bottom-3 size-6 rounded-full bg-neutral-200 text-neutral-950 hover:bg-neutral-300 after:absolute after:-inset-2.5"
    >
      <Icon icon="plus" size="sm" />
    </Button>
  );
}
