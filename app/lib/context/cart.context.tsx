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
  setCart: (cart: Cart) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    void getCartUseCase.execute().then(setCart);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }),
    [cart, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
