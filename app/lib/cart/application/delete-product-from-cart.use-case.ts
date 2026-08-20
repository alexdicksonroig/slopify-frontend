import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class DeleteProductFromCartUseCase {
  async execute(productVariantId: number): Promise<Cart | null> {
    const cart = await cartRepository.get();
    if (!cart) return null;

    cart.deleteProduct(productVariantId);
    await cartRepository.save(cart);
    return cart;
  }
}

export const deleteProductFromCartUseCase = new DeleteProductFromCartUseCase();
