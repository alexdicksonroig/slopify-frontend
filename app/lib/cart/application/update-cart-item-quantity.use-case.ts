import { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class UpdateCartItemQuantityUseCase {
  async execute(variantId: number, quantity: number): Promise<Cart> {
    const cart = (await cartRepository.get()) ?? new Cart();

    cart.setItemQuantity(variantId, quantity);
    await cartRepository.save(cart);
    return cart;
  }
}

export const updateCartItemQuantityUseCase =
  new UpdateCartItemQuantityUseCase();
