import { useTranslate } from "@app/i18n";
import { deleteProductFromCartUseCase } from "@app/lib/cart/application/delete-product-from-cart.use-case";
import type { Cart, CartItem } from "@app/lib/cart/domain/cart.entity";
import { formatMoney } from "@app/lib/currency";
import { Button, cn } from "@library";
import { Link } from "react-router";

export type CartItemListProps = {
  cart: readonly CartItem[];
  setCart: (cart: Cart) => void;
  editable?: boolean;
  className?: string;
};

const ItemCTA = ({
  render,
  productUrl,
  item,
  setCart,
}: {
  render: boolean;
  productUrl: string;
  item: CartItem;
  setCart: (cart: Cart) => void;
}) => {
  const t = useTranslate();
  if (!render) {
    return null;
  }

  const onRemove = async (variantId: number) => {
    const updatedCart = await deleteProductFromCartUseCase.execute(variantId);
    if (updatedCart) setCart(updatedCart);
  };

  return (
    <>
      <div className="mt-auto flex items-center gap-4 pt-5 text-base font-medium text-indigo-700">
        <Link to={productUrl} className="hover:text-indigo-500">
          {t("cart.edit-action")}
        </Link>
        <span aria-hidden="true" className="h-6 border-l border-gray-300" />
        <Button
          type="button"
          variant="link"
          onClick={() => onRemove(item.variantId)}
          className="text-base text-indigo-700 hover:text-indigo-500"
        >
          {t("cart.remove-action")}
        </Button>
      </div>
    </>
  );
};

export function CartItemList({
  cart,
  setCart,
  className,
  editable = false,
}: CartItemListProps) {
  const t = useTranslate();
  return (
    <ul
      className={cn(
        "mt-8 divide-y divide-gray-200 border-y border-gray-200",
        className,
      )}
    >
      {cart.map((item) => {
        const productUrl = `/product/${item.productId}?variant=${item.variantId}`;

        return (
          <li key={item.variantId} className="flex gap-5 py-8 sm:gap-8">
            <Link
              to={productUrl}
              className="size-32 shrink-0 overflow-hidden bg-white [border-radius:0.5rem] sm:size-44"
            >
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="size-full object-contain"
                />
              ) : (
                <span className="flex size-full items-center justify-center px-3 text-center text-xs text-gray-400">
                  {t("product.no-thumbnail")}
                </span>
              )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div>
                <h2 className="flex items-baseline gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                  <Link to={productUrl}>{item.name}</Link>
                  <span className="shrink-0 text-sm font-normal text-gray-500">
                    × {item.quantity}
                  </span>
                </h2>
                <p className="mt-1 text-base font-medium text-gray-900">
                  {formatMoney(item.unitPriceInCents, item.currency)}
                </p>
              </div>
            </div>
            <ItemCTA
              render={editable}
              productUrl={productUrl}
              item={item}
              setCart={setCart}
            />
          </li>
        );
      })}
    </ul>
  );
}
