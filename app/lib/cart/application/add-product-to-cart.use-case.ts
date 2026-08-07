import type { Cart, CartProduct } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class AddProductToCartUseCase {
  async execute(
    cartId: string,
    product: CartProduct,
    quantity = 1,
  ): Promise<Cart | null> {
    const cart = await cartRepository.findById(cartId);
    if (!cart) return null;

    cart.addProduct(product, quantity);
    await cartRepository.save(cart);
    return cart;
  }
}

export const addProductToCartUseCase = new AddProductToCartUseCase();
