import { getCartUseCase } from "./get-cart.use-case";

export class GetProductQuantityInCartUseCase {
  async execute(variantId: number): Promise<number> {
    const cart = await getCartUseCase.execute();

    return (
      cart?.items.find((item) => item.variantId === variantId)?.quantity ?? 0
    );
  }
}

export const getProductQuantityInCartUseCase =
  new GetProductQuantityInCartUseCase();
