import { createCartUseCase } from "@app/lib/cart/application/create-cart.use-case";
import { getCartUseCase } from "@app/lib/cart/application/get-cart.use-case";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
};

const DEFAULT_SHIPPING_PRICE_IN_CENTS = 500;
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    void getCartUseCase
      .execute()
      .then(
        (storedCart) =>
          storedCart ??
          createCartUseCase.execute(DEFAULT_SHIPPING_PRICE_IN_CENTS),
      )
      .then(setCart);
  }, []);

  const value = useMemo(() => ({ cart, setCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
