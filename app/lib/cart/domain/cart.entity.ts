export type CartProduct = {
  productId: number;
  name: string;
  unitPriceInCents: number;
  thumbnailUrl: string | null;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export class Cart {
  private cartItems: CartItem[];
  private readonly shippingPrice: number;

  constructor(items: CartItem[] = [], shippingPriceInCents = 0) {
    this.cartItems = items.map((item) => ({ ...item }));
    this.shippingPrice = shippingPriceInCents;
  }

  get items(): readonly CartItem[] {
    return this.cartItems.map((item) => ({ ...item }));
  }

  get cartTotalInCents(): number {
    return this.cartItems.reduce(
      (price, item) => price + item.unitPriceInCents * item.quantity,
      0,
    );
  }

  get shippingPriceInCents(): number {
    return this.shippingPrice;
  }

  get orderTotalInCents(): number {
    return this.cartTotalInCents + this.shippingPriceInCents;
  }

  get itemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  addItem(productId: number, quantity: number, product?: CartProduct): void {
    const item = this.cartItems.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    } else if (product) {
      this.cartItems.push({ ...product, quantity });
    }
  }

  deleteProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId,
    );
  }
}
