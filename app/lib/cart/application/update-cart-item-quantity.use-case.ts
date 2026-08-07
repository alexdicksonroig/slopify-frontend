import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class UpdateCartItemQuantityUseCase {
  async execute(
    cartId: string,
    productId: number,
    quantity: number,
  ): Promise<Cart | null> {
    const cart = await cartRepository.findById(cartId);
    if (!cart) return null;

    cart.updateQuantity(productId, quantity);
    await cartRepository.save(cart);
    return cart;
  }
}

export const updateCartItemQuantityUseCase =
  new UpdateCartItemQuantityUseCase();
