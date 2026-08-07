import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class ClearCartUseCase {
  async execute(cartId: string): Promise<Cart | null> {
    const cart = await cartRepository.findById(cartId);
    if (!cart) return null;

    cart.clear();
    await cartRepository.save(cart);
    return cart;
  }
}

export const clearCartUseCase = new ClearCartUseCase();
