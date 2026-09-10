import { useTranslate } from "@app/i18n";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { Button, Drawer, Icon, Overlay } from "@library";
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
        onClick={onClose}
        className="z-40 bg-black/40 md:bg-black/40"
      />
      <Drawer
        open={open}
        onClose={onClose}
        fromRight
        hiddenFrom={false}
        showCloseButton={false}
        contentClassName="p-0"
        className="left-auto right-0 z-50 w-full text-gray-900 sm:max-w-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("cart.shopping-cart")}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label={t("cart.close")}
            >
              <Icon icon="x" />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
            {!cart || cart.isEmpty ? (
              <p className="py-8 text-sm text-gray-500">{t("cart.empty")}</p>
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
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt>{t("cart.subtotal")}</dt>
                  <dd>{formatMoney(cart.cartTotalInCents, cart.currency)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{t("cart.shipping-estimate")}</dt>
                  <dd>
                    {formatMoney(cart.shippingPriceInCents, cart.currency)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-lg font-semibold">
                  <dt>{t("cart.order-total")}</dt>
                  <dd>{formatMoney(cart.orderTotalInCents, cart.currency)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 flex h-12 items-center justify-center bg-indigo-600 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("cart.checkout")}
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
