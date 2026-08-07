import { Cart, type CartItem } from "../../domain/cart.entity";

type StoredCart = {
  id: string;
  items: CartItem[];
  shippingPriceInCents: number;
};

export class CartRepository {
  constructor(
    private readonly providedStorage?: Storage,
    private readonly keyPrefix = "slopify:cart:",
  ) {}

  async findById(id: string): Promise<Cart | null> {
    const value = this.storage.getItem(this.key(id));
    if (value === null) return null;

    try {
      const storedCart: unknown = JSON.parse(value);
      assertStoredCart(storedCart);

      return new Cart(
        storedCart.id,
        storedCart.items,
        storedCart.shippingPriceInCents,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      throw new InvalidStoredCartError(
        `Stored cart ${id} is invalid: ${message}`,
      );
    }
  }

  async save(cart: Cart): Promise<void> {
    const storedCart: StoredCart = {
      id: cart.id,
      items: [...cart.items],
      shippingPriceInCents: cart.shippingPriceInCents,
    };

    this.storage.setItem(this.key(cart.id), JSON.stringify(storedCart));
  }

  async delete(id: string): Promise<boolean> {
    const key = this.key(id);
    const exists = this.storage.getItem(key) !== null;
    this.storage.removeItem(key);
    return exists;
  }

  private key(id: string): string {
    return `${this.keyPrefix}${encodeURIComponent(id)}`;
  }

  private get storage(): Storage {
    if (this.providedStorage) return this.providedStorage;
    if (typeof globalThis.localStorage === "undefined") {
      throw new Error("Local storage is only available in the browser");
    }
    return globalThis.localStorage;
  }
}

class InvalidStoredCartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidStoredCartError";
  }
}

function assertStoredCart(value: unknown): asserts value is StoredCart {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    !Array.isArray(value.items) ||
    typeof value.shippingPriceInCents !== "number" ||
    !value.items.every(isCartItem)
  ) {
    throw new InvalidStoredCartError("Unexpected local-storage data");
  }
}

function isCartItem(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.productId === "number" &&
    typeof value.name === "string" &&
    typeof value.unitPriceInCents === "number" &&
    typeof value.quantity === "number"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export const cartRepository = new CartRepository();
