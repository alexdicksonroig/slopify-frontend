import { OrderTotals } from "@app/components/order-totals";
import { PageTitle } from "@app/components/page-title";
import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { clearCartUseCase } from "@app/lib/cart/application/clear-cart.use-case";
import type { CartItem } from "@app/lib/cart/domain/cart.entity";
import { useCart } from "@app/lib/context/cart.context";
import { formatMoney } from "@app/lib/currency";
import { Button, Icon, LoadingCircle } from "@library";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

type SessionStatus = {
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
};

type OrderSnapshot = {
  items: readonly CartItem[];
  subtotalInCents: number;
  shippingInCents: number;
  totalInCents: number;
  currency: string;
};

export default function Return() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"checking" | "success" | "error">(
    "checking",
  );
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    if (status !== "checking" || cart === null) return;

    let cancelled = false;
    let retry: ReturnType<typeof setTimeout> | undefined;

    const checkStatus = async (): Promise<void> => {
      try {
        const session = await Api.get<SessionStatus>("session-status", {
          session_id: sessionId,
        });
        if (cancelled) return;

        if (
          session.payment_status === "paid" ||
          session.payment_status === "no_payment_required"
        ) {
          setOrder({
            items: cart.items,
            subtotalInCents: cart.cartTotalInCents,
            shippingInCents: cart.shippingPriceInCents,
            totalInCents: cart.orderTotalInCents,
            currency: cart.currency,
          });
          const emptyCart = await clearCartUseCase.execute();
          if (!cancelled) {
            setCart(emptyCart);
            setStatus("success");
          }
          return;
        }
        if (session.status === "expired") {
          setStatus("error");
          return;
        }

        retry = setTimeout(checkStatus, 2000);
      } catch (error) {
        console.error("Error fetching session status:", error);
        if (!cancelled) setStatus("error");
      }
    };

    void checkStatus();
    return () => {
      cancelled = true;
      if (retry) clearTimeout(retry);
    };
  }, [cart, sessionId, setCart, status]);

  if (status === "checking") {
    return (
      <div className="flex flex-1 items-center justify-center p-page-gap">
        <div className="text-center">
          <LoadingCircle
            size="lg"
            label={t("return.checking")}
            className="mx-auto text-neutral-950"
          />
          <p className="mt-5 text-base text-neutral-600">
            {t("return.checking")}
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 items-center justify-center p-page-gap">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Icon icon="x" size="xl" />
          </div>
          <PageTitle className="mt-6">{t("return.error-title")}</PageTitle>
          <p className="mt-3 text-base text-neutral-600">{t("return.error")}</p>
          <Button
            onClick={() => navigate("/checkout")}
            size="xl"
            className="mt-8"
          >
            {t("return.back-checkout")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-page-gap pt-page-top pb-page-bottom">
      <header className="max-w-3xl">
        <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-950">
          <Icon icon="check" size="xl" />
        </div>
        <p className="mt-6 text-base font-semibold text-neutral-950">
          {t("return.thank-you")}
        </p>
        <PageTitle className="mt-2">{t("return.title")}</PageTitle>
        <p className="mt-5 text-lg leading-8 text-neutral-600">
          {t("return.success")}
        </p>
        {sessionId ? (
          <p className="mt-8 text-sm text-neutral-500">
            {t("return.reference")}: #{sessionId.slice(-12).toUpperCase()}
          </p>
        ) : null}
      </header>

      {order && order.items.length > 0 ? (
        <section className="mt-14 border-t border-neutral-200 pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
            {t("cart.order-summary")}
          </h2>

          <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {order.items.map((item) => (
              <li key={item.variantId} className="flex gap-5 py-6 sm:gap-8">
                <div className="size-24 shrink-0 overflow-hidden rounded-md bg-neutral-50 sm:size-32">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.name}
                      className="size-full object-contain p-2"
                    />
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-5 py-1">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-950">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500">
                      {t("product.quantity")} {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-base font-medium text-neutral-950">
                    {formatMoney(
                      item.unitPriceInCents * item.quantity,
                      item.currency,
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <OrderTotals
            className="ml-auto mt-8 max-w-md"
            subtotal={formatMoney(order.subtotalInCents, order.currency)}
            shipping={formatMoney(order.shippingInCents, order.currency)}
            total={formatMoney(order.totalInCents, order.currency)}
          />
        </section>
      ) : null}

      <div className="mt-12 border-t border-neutral-200 pt-8">
        <Button onClick={() => navigate("/")} size="xl">
          {t("return.continue")}
        </Button>
      </div>
    </div>
  );
}
