import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class UpdateCartItemQuantityUseCase {
  async execute(variantId: number, quantity: number): Promise<Cart | null> {
    const cart = await cartRepository.get();
    if (!cart) return null;

    cart.addItem(variantId, quantity);
    await cartRepository.save(cart);
    return cart;
  }
}

export const updateCartItemQuantityUseCase =
  new UpdateCartItemQuantityUseCase();
