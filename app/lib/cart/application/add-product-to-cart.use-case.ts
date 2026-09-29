import { Cart, type CartProduct } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class AddProductToCartUseCase {
  async execute(product: CartProduct, quantity = 1): Promise<Cart> {
    const cart = (await cartRepository.get()) ?? new Cart();

    cart.addItem(product.variantId, quantity, product);
    await cartRepository.save(cart);
    return cart;
  }
}

export const addProductToCartUseCase = new AddProductToCartUseCase();
