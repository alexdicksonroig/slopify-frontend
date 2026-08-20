import { useTranslate } from "@app/i18n";
import type { CartItem } from "@app/lib/cart/domain/cart.entity";
import { formatMoney } from "@app/lib/currency";
import { Icon, Select } from "@library";
import { Link } from "react-router";

export type CartProductListProps = {
  items: readonly CartItem[];
  onQuantityChange: (productVariantId: number, quantity: number) => void;
  onRemove: (productVariantId: number) => void;
};

export function CartProductList({
  items,
  onQuantityChange,
  onRemove,
}: CartProductListProps) {
  const t = useTranslate();

  return (
    <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
      {items.map((item) => (
        <li
          key={item.productVariantId}
          className="flex items-stretch gap-6 py-6"
        >
          <Link to={`/product/${item.productId}`} className="flex shrink-0">
            {item.thumbnailUrl ? (
              <img
                src={item.thumbnailUrl}
                alt={item.name}
                className="w-36 rounded-md object-cover sm:w-40"
              />
            ) : (
              <div className="flex w-36 items-center justify-center rounded-md bg-gray-50 px-2 text-center text-xs text-gray-400 sm:w-40">
                {t("product.no-thumbnail")}
              </div>
            )}
          </Link>

          <div className="relative flex flex-1 flex-col">
            <button
              type="button"
              onClick={() => onRemove(item.productVariantId)}
              aria-label={t("cart.remove", { item: item.name })}
              className="absolute -top-1 right-0 font-medium text-gray-400 hover:text-gray-500 cursor-pointer"
            >
              <Icon icon="x" size="lg" />
            </button>

            <div className="space-y-3">
              <h3 className="pr-6 text-base font-medium text-gray-900">
                <Link to={`/product/${item.productId}`}>{item.name}</Link>
              </h3>
              <p className="text-sm font-medium text-gray-900">
                {formatMoney(item.unitPriceInCents, item.currency)}
              </p>
            </div>

            <div className="mt-4 flex items-end text-sm">
              <Select
                value={item.quantity.toString()}
                onChange={(value) =>
                  onQuantityChange(item.productVariantId, Number(value))
                }
                options={[1, 2, 3, 4, 5, 6, 7, 8].map((quantity) => ({
                  label: quantity.toString(),
                  value: quantity.toString(),
                }))}
                className="w-20"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
