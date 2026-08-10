import { Cart, type CartItem } from "../../domain/cart.entity";

type StoredCart = {
  items: CartItem[];
  shippingPriceInCents: number;
};

export class CartRepository {
  constructor(private readonly keyPrefix = "slopify:cart:") {}

  async get(): Promise<Cart | null> {
    const value = this.storage.getItem(this.key);
    if (value === null) return null;
    const storedCart: StoredCart = JSON.parse(value);
    return new Cart(storedCart.items, storedCart.shippingPriceInCents);
  }

  async save(cart: Cart): Promise<void> {
    const storedCart: StoredCart = {
      items: [...cart.items],
      shippingPriceInCents: cart.shippingPriceInCents,
    };
    this.storage.setItem(this.key, JSON.stringify(storedCart));
  }

  async delete(): Promise<void> {
    this.storage.removeItem(this.key);
  }

  private get key(): string {
    return `${this.keyPrefix}active-cart`;
  }

  private get storage(): Storage {
    if (typeof globalThis.localStorage === "undefined") {
      throw new Error("Local storage is only available in the browser");
    }
    return globalThis.localStorage;
  }
}

export const cartRepository = new CartRepository();
