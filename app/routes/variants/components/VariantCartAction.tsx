import { useLanguage, useTranslate } from "@app/i18n";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { localize } from "@app/lib/localized-text";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { Button, Icon, Popover } from "@library";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { QuantitySelector } from "../../product/components/QuantitySelector";

type VariantCartActionProps = {
  product: Product;
  variant: Variant;
};

export function VariantCartAction({
  product,
  variant,
}: VariantCartActionProps) {
  const t = useTranslate();
  const { language } = useLanguage();
  const { cart, setCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { stock } = variant;
  const [isAdding, setIsAdding] = useState(false);
  const cartQuantity =
    cart?.items.find((item) => item.variantId === variant.id)?.quantity ?? 1;
  const [quantity, setQuantity] = useState(cartQuantity);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupId = `variant-cart-popup-${variant.id}`;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const handleAddToCart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { unitAmount, currency } = variant;
    if (
      !cart ||
      unitAmount === null ||
      currency === null ||
      quantity < 1 ||
      quantity > stock
    )
      return;

    setIsAdding(true);
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
    setIsAdding(false);

    if (updatedCart) {
      setCart(updatedCart);
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  if (variant.unitAmount === null || variant.currency === null) return null;

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`${t("product.add-to-bag")}: ${product.name}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popupId}
        disabled={!cart}
        onClick={() => setIsOpen((open) => !open)}
        className="absolute right-3 bottom-3 h-10! w-10! origin-center md:h-8! md:w-8! transform-gpu bg-white p-0! shadow-none transition-transform duration-300 ease-out hover:scale-105 hover:bg-white! hover:shadow-none active:scale-110 active:shadow-none motion-reduce:transform-none disabled:opacity-40 [border-radius:0.25rem]"
      >
        <Icon icon="shopping-bag-plus" size="md" />
      </Button>

      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        id={popupId}
        role="dialog"
        aria-label={`${t("product.add-to-bag")}: ${product.name}`}
        className="inset-x-0 z-20 w-full border border-neutral-200 bg-white p-4 md:top-auto md:bottom-0 md:translate-y-0 md:p-3"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-neutral-950">
              {product.name}
            </h4>
            <p
              className={`shrink-0 text-xs ${stock > 0 ? "text-emerald-700" : "text-neutral-500"}`}
              aria-live="polite"
            >
              {stock > 0
                ? t("product.stock-count", { count: stock })
                : t("product.out-of-stock")}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="size-7 shrink-0 rounded-none p-0!"
          >
            <Icon icon="x" size="sm" />
          </Button>
        </div>
        <dl className="mt-2 space-y-1 text-xs text-neutral-500 sm:mt-1 sm:space-y-0.5">
          {variant.selections.map(({ option, value }) => (
            <div key={option.id} className="flex min-w-0 gap-1">
              <dt>{localize(option.label, language)}:</dt>
              <dd className="truncate text-neutral-800">
                {localize(value.label, language)}
              </dd>
            </div>
          ))}
        </dl>

        <form
          className="mt-4 flex flex-col gap-3 sm:mt-3 sm:flex-row sm:gap-2"
          onSubmit={handleAddToCart}
        >
          <QuantitySelector
            value={quantity}
            min={0}
            max={stock}
            onChange={setQuantity}
            className="w-full sm:w-28"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!cart || isAdding || quantity < 1 || quantity > stock}
            className="h-10 w-full min-w-0 rounded-none bg-neutral-950 px-3 text-xs uppercase hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:opacity-100 sm:flex-1"
          >
            {stock === 0 ? t("product.out-of-stock") : t("product.add-to-bag")}
          </Button>
        </form>
      </Popover>
    </>
  );
}
