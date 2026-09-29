import { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class ClearCartUseCase {
  async execute(): Promise<Cart> {
    const cart = (await cartRepository.get()) ?? new Cart();

    cart.clear();
    await cartRepository.save(cart);
    return cart;
  }
}

export const clearCartUseCase = new ClearCartUseCase();
