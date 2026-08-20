import { CartProductList } from "@app/components/cart-product-list";
import { OrderSummary } from "@app/components/order-summary";
import { useTranslate } from "@app/i18n";
import { deleteProductFromCartUseCase } from "@app/lib/cart/application/delete-product-from-cart.use-case";
import { updateCartItemQuantityUseCase } from "@app/lib/cart/application/update-cart-item-quantity.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { useNavigate } from "react-router";

export default function Cart() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const handleQuantityChange = async (
    productVariantId: number,
    quantity: number,
  ) => {
    const updatedCart = await updateCartItemQuantityUseCase.execute(
      productVariantId,
      quantity,
    );
    if (updatedCart) setCart(updatedCart);
  };

  const handleRemove = async (productVariantId: number) => {
    const updatedCart =
      await deleteProductFromCartUseCase.execute(productVariantId);
    if (updatedCart) setCart(updatedCart);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {t("cart.shopping-cart")}
        </h1>

        {cart?.isEmpty ? (
          <p className="mt-8 text-sm text-gray-500">{t("cart.empty")}</p>
        ) : null}

        {cart && !cart.isEmpty ? (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7">
              <CartProductList
                items={cart.items}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            </div>

            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <OrderSummary
                subtotalInCents={cart.cartTotalInCents}
                shippingInCents={cart.shippingPriceInCents}
                taxInCents={0}
                totalInCents={cart.orderTotalInCents}
                currency={cart.currency}
                onCheckout={() => navigate("/checkout")}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
