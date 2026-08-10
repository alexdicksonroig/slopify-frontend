import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class GetCartUseCase {
  async execute(): Promise<Cart | null> {
    return await cartRepository.get();
  }
}

export const getCartUseCase = new GetCartUseCase();
