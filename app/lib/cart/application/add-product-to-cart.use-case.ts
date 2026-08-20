import type { Cart, CartProduct } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class AddProductToCartUseCase {
  async execute(product: CartProduct, quantity = 1): Promise<Cart | null> {
    const cart = await cartRepository.get();
    if (!cart) return null;

    cart.addItem(product.productVariantId, quantity, product);
    await cartRepository.save(cart);
    return cart;
  }
}

export const addProductToCartUseCase = new AddProductToCartUseCase();
