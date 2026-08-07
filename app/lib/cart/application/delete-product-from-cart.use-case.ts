import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class DeleteProductFromCartUseCase {
  async execute(cartId: string, productId: number): Promise<Cart | null> {
    const cart = await cartRepository.findById(cartId);
    if (!cart) return null;

    cart.deleteProduct(productId);
    await cartRepository.save(cart);
    return cart;
  }
}

export const deleteProductFromCartUseCase = new DeleteProductFromCartUseCase();
