import { useTranslate } from "@app/i18n";
import { Icon, Select } from "@library";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export type CartItem = {
  id: number;
  name: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  imageSrc: string;
  imageAlt: string;
  inStock: boolean;
  shippingTime?: string;
};

export type CartProductListProps = {
  items: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
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
        <li key={item.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              alt={item.imageAlt}
              src={item.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="relative ml-4 flex flex-1 flex-col">
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={t("cart.remove", { item: item.name })}
              className="absolute -top-1 right-0 font-medium text-gray-400 hover:text-gray-500"
            >
              <Icon icon="x" size="lg" />
            </button>

            <div className="space-y-3">
              <h3 className="pr-6 text-base font-medium text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.color}
                {item.size && (
                  <>
                    <span className="mx-2">·</span>
                    {item.size}
                  </>
                )}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {priceFormatter.format(item.price)}
              </p>
            </div>

            <div className="mt-4 flex flex-1 items-end text-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Select
                  value={item.quantity.toString()}
                  onChange={(value) => onQuantityChange(item.id, Number(value))}
                  options={[1, 2, 3, 4, 5, 6, 7, 8].map((quantity) => ({
                    label: quantity.toString(),
                    value: quantity.toString(),
                  }))}
                  className="w-20"
                />

                {item.inStock ? (
                  <p className="flex items-center gap-1 text-sm text-gray-600">
                    <Icon icon="check" size="sm" />
                    {t("cart.in-stock")}
                  </p>
                ) : (
                  <p className="flex items-center text-sm text-gray-500">
                    <Icon icon="info" size="sm" className="mr-1.5" />
                    {item.shippingTime}
                  </p>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
