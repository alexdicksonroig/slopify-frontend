import { getCartUseCase } from "./get-cart.use-case";

export class GetProductQuantityInCartUseCase {
  async execute(productVariantId: number): Promise<number> {
    const cart = await getCartUseCase.execute();

    return (
      cart?.items.find((item) => item.productVariantId === productVariantId)
        ?.quantity ?? 0
    );
  }
}

export const getProductQuantityInCartUseCase =
  new GetProductQuantityInCartUseCase();
