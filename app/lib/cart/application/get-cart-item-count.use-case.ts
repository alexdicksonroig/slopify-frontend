import type { Cart } from "../domain/cart.entity";

class GetCartItemCountUseCase {
  execute(cart: Cart | null): number {
    return cart?.itemCount ?? 0;
  }
}

export const getCartItemCountUseCase = new GetCartItemCountUseCase();
