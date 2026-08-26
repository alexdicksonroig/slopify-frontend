// NOT REVISED ENTIRE FILE
import { useTranslate } from "@app/i18n";
import { addProductToCartUseCase } from "@app/lib/cart/application/add-product-to-cart.use-case";
import { deleteProductFromCartUseCase } from "@app/lib/cart/application/delete-product-from-cart.use-case";
import type { Cart, CartItem } from "@app/lib/cart/domain/cart.entity";
import { formatMoney } from "@app/lib/currency";
import { cn } from "@library";
import { Link } from "react-router";

export type CartItemListProps = {
  cart: readonly CartItem[];
  setCart: (cart: Cart) => void;
  editable?: boolean;
  className?: string;
};

export function CartItemList({
  cart,
  setCart,
  className,
  editable = false,
}: CartItemListProps) {
  const t = useTranslate();

  const changeQuantity = async (item: CartItem, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = await addProductToCartUseCase.execute(item, quantity);
    if (updatedCart) setCart(updatedCart);
  };

  const removeItem = async (variantId: number) => {
    const updatedCart = await deleteProductFromCartUseCase.execute(variantId);
    if (updatedCart) setCart(updatedCart);
  };

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
          <li
            key={item.variantId}
            className="grid grid-cols-[7rem_minmax(0,1fr)] gap-x-4 py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-5"
          >
            <Link
              to={productUrl}
              className="row-span-2 h-36 overflow-hidden bg-gray-100 sm:h-44"
            >
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="size-full object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center px-3 text-center text-xs text-gray-400">
                  {t("product.no-thumbnail")}
                </span>
              )}
            </Link>

            <div className="relative min-w-0 pr-12">
              <h2 className="text-sm font-medium leading-snug text-gray-950 sm:text-base">
                <Link to={productUrl}>{item.name}</Link>
              </h2>
              <p className="mt-3 text-lg font-medium text-gray-950">
                {formatMoney(item.unitPriceInCents, item.currency)}
              </p>

              {editable && (
                <button
                  type="button"
                  aria-label={t("cart.save", { item: item.name })}
                  className="absolute -right-1 top-0 flex size-8 cursor-pointer items-center justify-center text-gray-950 hover:text-indigo-700"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {editable && (
              <div className="col-start-2 mt-4">
                <div className="flex h-11 w-32 items-center justify-between bg-gray-100 px-3 [border-radius:9999px]">
                  <button
                    type="button"
                    onClick={() => changeQuantity(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    aria-label={t("cart.decrease", { item: item.name })}
                    className="flex size-7 cursor-pointer items-center justify-center text-base font-normal leading-none disabled:cursor-default disabled:text-gray-300"
                  >
                    −
                  </button>
                  <span className="text-base tabular-nums">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                    aria-label={t("cart.increase", { item: item.name })}
                    className="flex size-7 cursor-pointer items-center justify-center text-xl font-normal leading-none"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="mt-4 cursor-pointer text-sm font-medium text-indigo-700 hover:text-indigo-500"
                >
                  {t("cart.remove-action")}
                </button>

                <p className="mt-4 text-sm text-gray-950">
                  {t("cart.subtotal")}:{" "}
                  <strong>
                    {formatMoney(
                      item.unitPriceInCents * item.quantity,
                      item.currency,
                    )}
                  </strong>
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
