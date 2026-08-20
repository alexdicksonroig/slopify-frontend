import type { Cart, CartProduct } from "../domain/cart.entity";
import { addProductToCartUseCase } from "./add-product-to-cart.use-case";
import { getCartUseCase } from "./get-cart.use-case";

export class IncrementProductQuantityInCartUseCase {
  async execute(product: CartProduct): Promise<Cart | null> {
    const cart = await getCartUseCase.execute();
    if (!cart) return null;

    const currentQuantity =
      cart.items.find(
        (item) => item.productVariantId === product.productVariantId,
      )?.quantity ?? 0;

    return await addProductToCartUseCase.execute(product, currentQuantity + 1);
  }
}

export const incrementProductQuantityInCartUseCase =
  new IncrementProductQuantityInCartUseCase();
