import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class DeleteCartUseCase {
  async execute(id: string): Promise<boolean> {
    return await cartRepository.delete(id);
  }
}

export const deleteCartUseCase = new DeleteCartUseCase();
