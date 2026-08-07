import type { Cart } from "../domain/cart.entity";
import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class GetCartUseCase {
  async execute(id: string): Promise<Cart | null> {
    return await cartRepository.findById(id);
  }
}

export const getCartUseCase = new GetCartUseCase();
