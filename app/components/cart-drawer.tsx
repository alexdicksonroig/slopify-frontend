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
        className="z-50 sm:max-w-xl"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
          {!cart || cart.isEmpty ? (
            <p className="flex h-full items-center justify-center gap-2 py-8 text-sm lg:text-lg text-gray-500">
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
          <div className="shrink-0 border-t border-gray-200 bg-gray-50 p-6">
            <dl className="space-y-3 text-sm lg:text-lg">
              <div className="flex justify-between gap-4">
                <dt>{t("cart.subtotal")}</dt>
                <dd>{formatMoney(cart.cartTotalInCents, cart.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t("cart.shipping-estimate")}</dt>
                <dd>{formatMoney(cart.shippingPriceInCents, cart.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-lg lg:text-2xl font-semibold">
                <dt>{t("cart.order-total")}</dt>
                <dd>{formatMoney(cart.orderTotalInCents, cart.currency)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
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
