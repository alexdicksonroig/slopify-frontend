import { getCartUseCase } from "./get-cart.use-case";

export class GetProductQuantityInCartUseCase {
  async execute(productId: number): Promise<number> {
    const cart = await getCartUseCase.execute();

    return (
      cart?.items.find((item) => item.productId === productId)?.quantity ?? 0
    );
  }
}

export const getProductQuantityInCartUseCase =
  new GetProductQuantityInCartUseCase();
