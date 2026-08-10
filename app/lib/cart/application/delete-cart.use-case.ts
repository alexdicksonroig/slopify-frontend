import { cartRepository } from "../infrastructure/persistence/cart.repository";

export class DeleteCartUseCase {
  async execute(): Promise<void> {
    await cartRepository.delete();
  }
}

export const deleteCartUseCase = new DeleteCartUseCase();
