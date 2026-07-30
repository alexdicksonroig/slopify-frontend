import {
  type CartItem,
  CartProductList,
} from "@app/components/cart-product-list";
import { OrderSummary } from "@app/components/order-summary";
import { useTranslate } from "@app/i18n";
import { get } from "@app/lib/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
            <CartProductList
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
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
