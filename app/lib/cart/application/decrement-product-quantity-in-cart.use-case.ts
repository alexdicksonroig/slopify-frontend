import type { Cart } from "../domain/cart.entity";
import { deleteProductFromCartUseCase } from "./delete-product-from-cart.use-case";
import { getCartUseCase } from "./get-cart.use-case";
import { updateCartItemQuantityUseCase } from "./update-cart-item-quantity.use-case";

export class DecrementProductQuantityInCartUseCase {
  async execute(productId: number): Promise<Cart | null> {
    const cart = await getCartUseCase.execute();
    if (!cart) return null;

    const currentQuantity =
      cart.items.find((item) => item.productId === productId)?.quantity ?? 0;

    if (currentQuantity <= 1) {
      return await deleteProductFromCartUseCase.execute(productId);
    }

    return await updateCartItemQuantityUseCase.execute(
      productId,
      currentQuantity - 1,
    );
  }
}

export const decrementProductQuantityInCartUseCase =
  new DecrementProductQuantityInCartUseCase();
