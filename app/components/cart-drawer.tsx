import { OrderTotals } from "@app/components/order-totals";
import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { buttonVariants, Drawer, Icon, Overlay } from "@library";
import { Link } from "react-router";
import { CartItemList } from "./cart-item-list";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslate();
  const { cart, setCart } = useCart();

  return (
    <>
      <Overlay
        active={open}
        aria-label={t("cart.close")}
        onClick={onClose}
        opacity="medium"
        className="z-40"
      />
      <Drawer
        open={open}
        onClose={onClose}
        fromRight
        hiddenFrom={false}
        title={t("cart.shopping-cart")}
        closeLabel={t("cart.close")}
        className="z-50 max-w-[94%] sm:max-w-xl"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
          {!cart || cart.isEmpty ? (
            <p className="flex h-full items-center justify-center gap-2 py-8 text-sm text-neutral-500">
              <Icon icon="wine" size="md" />
              {t("cart.empty")}
            </p>
          ) : (
            <CartItemList
              cart={cart.items}
              setCart={setCart}
              editable
              className="mt-0 border-y-0"
            />
          )}
        </div>
        {cart && !cart.isEmpty && (
          <div className="shrink-0 border-t border-neutral-200 bg-neutral-50 p-6">
            <OrderTotals
              subtotal={formatMoney(cart.cartTotalInCents, cart.currency)}
              shipping={formatMoney(cart.shippingPriceInCents, cart.currency)}
              total={formatMoney(cart.orderTotalInCents, cart.currency)}
            />
            <Link
              to="/checkout"
              prefetch="intent"
              onClick={onClose}
              className={buttonVariants({
                size: "lg",
                className: "mt-6 w-full",
              })}
            >
              {t("cart.checkout")}
            </Link>
          </div>
        )}
      </Drawer>
    </>
  );
}
