export type CartProduct = {
  productId: number;
  name: string;
  unitPriceInCents: number;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export class Cart {
  private cartItems: CartItem[];
  private shippingPrice: number;

  constructor(
    readonly id: string,
    items: CartItem[] = [],
    shippingPriceInCents = 0,
  ) {
    this.cartItems = items.map((item) => ({ ...item }));
    this.shippingPrice = shippingPriceInCents;
  }

  get items(): readonly CartItem[] {
    return this.cartItems.map((item) => ({ ...item }));
  }

  get invoicePriceInCents(): number {
    return this.cartItems.reduce(
      (price, item) => price + item.unitPriceInCents * item.quantity,
      0,
    );
  }

  get shippingPriceInCents(): number {
    return this.shippingPrice;
  }

  get totalPriceInCents(): number {
    return this.invoicePriceInCents + this.shippingPriceInCents;
  }

  get itemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  addProduct(product: CartProduct, quantity = 1): void {
    const existingItem = this.cartItems.find(
      (item) => item.productId === product.productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.productId === productId);
    if (item) item.quantity = quantity;
  }

  incrementProduct(productId: number, quantity = 1): void {
    const item = this.cartItems.find((item) => item.productId === productId);
    if (item) item.quantity += quantity;
  }

  decrementProduct(productId: number, quantity = 1): void {
    const item = this.cartItems.find((item) => item.productId === productId);
    if (!item) return;

    if (item.quantity <= quantity) {
      this.deleteProduct(productId);
      return;
    }

    item.quantity -= quantity;
  }

  deleteProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId,
    );
  }

  clear(): void {
    this.cartItems = [];
  }

  updateShippingPrice(shippingPriceInCents: number): void {
    this.shippingPrice = shippingPriceInCents;
  }
}
