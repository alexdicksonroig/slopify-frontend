import { useState } from "react";
import { useNavigate } from "react-router";
import { Select } from "@library";
import { Check } from "lucide-react";

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

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Basic Tee",
    color: "Sienna",
    size: "Large",
    price: 32.0,
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Basic Tee in Sienna",
    inStock: true,
  },
  {
    id: 2,
    name: "Basic Tee",
    color: "Black",
    size: "Large",
    price: 32.0,
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Basic Tee in Black",
    inStock: false,
    shippingTime: "Ships in 3-4 weeks",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    color: "White",
    price: 35.0,
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Nomad Tumbler in White",
    inStock: true,
  },
];

function CartItemComponent({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <li className="flex border-b border-gray-200 py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={item.imageAlt}
          src={item.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${item.price.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.color}
            {item.size && (
              <>
                <span className="mx-2">·</span>
                {item.size}
              </>
            )}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center gap-4">
            <Select
              onChange={(e) =>
                onQuantityChange(item.id, Number(e.target.value))
              }
              options={[1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
                label: num.toString(),
                value: num.toString(),
              }))}
              className="w-1"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>

            {item.inStock ? (
              <p className="flex items-center gap-1 whitespace-nowrap">
                <Check className="text-green-400" />
                In stock
              </p>
            ) : (
              <p className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                <svg
                  className="mr-1.5 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="8" opacity="0.3" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.shippingTime}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="font-medium text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-6">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="text-sm font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${shipping.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <span>Tax estimate</span>
            <button
              type="button"
              className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-base font-medium text-gray-900">Order total</p>
          <p className="text-base font-medium text-gray-900">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Checkout
      </button>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
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
