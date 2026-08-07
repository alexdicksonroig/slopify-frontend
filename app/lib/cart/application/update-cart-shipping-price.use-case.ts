import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class UpdateCartShippingPriceUseCase {
  async execute(
    cartId: string,
    shippingPriceInCents: number,
  ): Promise<Cart | null> {
    const cart = await cartRepository.findById(cartId);
    if (!cart) return null;

    cart.updateShippingPrice(shippingPriceInCents);
    await cartRepository.save(cart);
    return cart;
  }
}

export const updateCartShippingPriceUseCase =
  new UpdateCartShippingPriceUseCase();
