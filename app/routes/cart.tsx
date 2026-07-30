import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { Button, Icon, Select } from "@library";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

type CartItem = {
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

function CartItemComponent({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const t = useTranslate();

  return (
    <li className="flex border-b border-gray-200 py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={item.imageAlt}
          src={item.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col relative">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={t("cart.remove", { item: item.name })}
          className="absolute -top-1 right-0 font-medium text-gray-400 hover:text-gray-500"
        >
          <Icon icon="x" size="lg" />
        </button>

        <div className="space-y-3">
          <h3 className="text-base font-medium text-gray-900 pr-6">
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
        <div className="flex flex-1 items-end text-sm mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Select
              value={item.quantity.toString()}
              onChange={(value) => onQuantityChange(item.id, Number(value))}
              options={[1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
                label: num.toString(),
                value: num.toString(),
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
  );
}

function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}) {
  const t = useTranslate();

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-6">
      <h2 className="text-lg font-medium text-gray-900">
        {t("cart.order-summary")}
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{t("cart.subtotal")}</p>
          <p className="text-sm font-medium text-gray-900">
            {priceFormatter.format(subtotal)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>{t("cart.shipping-estimate")}</span>
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <Icon icon="info" size="xxs" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {priceFormatter.format(shipping)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <span>{t("cart.tax-estimate")}</span>
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <Icon icon="info" size="xxs" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {priceFormatter.format(tax)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-base font-medium text-gray-900">
            {t("cart.order-total")}
          </p>
          <p className="text-base font-medium text-gray-900">
            {priceFormatter.format(total)}
          </p>
        </div>
      </div>

      <Button onClick={onCheckout} className="mt-6 h-12 w-full">
        {t("cart.checkout")}
      </Button>
    </div>
  );
}

export default function Cart() {
  const t = useTranslate();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    get("cart").then((data) => {
      if (data) setCartItems(data as CartItem[]);
    });
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.0;
  const tax = subtotal * 0.0832;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {t("cart.shopping-cart")}
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
          </div>

          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
