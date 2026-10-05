import { Cart, type CartItem } from "../../domain/cart.entity";

const CART_STORAGE_KEY = "cart";

type StoredCart = {
  items: CartItem[];
  shippingPriceInCents: number;
};

export class CartRepository {
  async get(): Promise<Cart | null> {
    const value = this.storage.getItem(CART_STORAGE_KEY);
    if (value === null) return null;
    const storedCart: StoredCart = JSON.parse(value);
    return new Cart(storedCart.items, storedCart.shippingPriceInCents);
  }

  async save(cart: Cart): Promise<void> {
    const storedCart: StoredCart = {
      items: [...cart.items],
      shippingPriceInCents: cart.shippingPriceInCents,
    };
    this.storage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
  }

  async delete(): Promise<void> {
    this.storage.removeItem(CART_STORAGE_KEY);
  }

  private get storage(): Storage {
    if (typeof globalThis.localStorage === "undefined") {
      throw new Error("Local storage is only available in the browser");
    }
    return globalThis.localStorage;
  }
}

export const cartRepository = new CartRepository();
