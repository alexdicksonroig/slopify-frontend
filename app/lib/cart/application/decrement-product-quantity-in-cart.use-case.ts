import type { Cart } from "../domain/cart.entity";
import { deleteProductFromCartUseCase } from "./delete-product-from-cart.use-case";
import { getCartUseCase } from "./get-cart.use-case";
import { updateCartItemQuantityUseCase } from "./update-cart-item-quantity.use-case";

export class DecrementProductQuantityInCartUseCase {
  async execute(productVariantId: number): Promise<Cart | null> {
    const cart = await getCartUseCase.execute();
    if (!cart) return null;

    const currentQuantity =
      cart.items.find((item) => item.productVariantId === productVariantId)
        ?.quantity ?? 0;

    if (currentQuantity <= 1) {
      return await deleteProductFromCartUseCase.execute(productVariantId);
    }

    return await updateCartItemQuantityUseCase.execute(
      productVariantId,
      currentQuantity - 1,
    );
  }
}

export const decrementProductQuantityInCartUseCase =
  new DecrementProductQuantityInCartUseCase();
