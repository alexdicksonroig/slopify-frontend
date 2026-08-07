import { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class CreateCartUseCase {
  async execute(id: string, shippingPriceInCents = 0): Promise<Cart> {
    const cart = new Cart(id, [], shippingPriceInCents);
    await cartRepository.save(cart);
    return cart;
  }
}

export const createCartUseCase = new CreateCartUseCase();
