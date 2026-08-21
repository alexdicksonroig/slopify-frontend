import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { createCartUseCase } from "@app/lib/cart/application/create-cart.use-case";
import { deleteCartUseCase } from "@app/lib/cart/application/delete-cart.use-case";
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
          await deleteCartUseCase.execute();
          const emptyCart = await createCartUseCase.execute();
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
      <main className="flex min-h-[calc(100svh-5.5rem)] items-center justify-center px-6 py-16">
        <div className="text-center">
          <LoadingCircle
            size="lg"
            label={t("return.checking")}
            className="mx-auto text-indigo-600"
          />
          <p className="mt-5 text-base text-gray-600">{t("return.checking")}</p>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-[calc(100svh-5.5rem)] items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex size-14 items-center justify-center bg-red-50 text-red-600 [border-radius:9999px]">
            <Icon icon="x" size="xl" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {t("return.error-title")}
          </h1>
          <p className="mt-3 text-base text-gray-600">{t("return.error")}</p>
          <Button onClick={() => navigate("/cart")} className="mt-8 h-12 px-8">
            {t("return.back-cart")}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-5.5rem)] bg-white px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <div className="flex size-12 items-center justify-center bg-indigo-50 text-indigo-600 [border-radius:9999px]">
            <Icon icon="check" size="xl" />
          </div>
          <p className="mt-6 text-lg font-semibold text-indigo-600">
            {t("return.thank-you")}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
            {t("return.title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            {t("return.success")}
          </p>
          {sessionId ? (
            <p className="mt-8 text-sm text-gray-500">
              {t("return.reference")}: #{sessionId.slice(-12).toUpperCase()}
            </p>
          ) : null}
        </header>

        {order && order.items.length > 0 ? (
          <section className="mt-14 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              {t("cart.order-summary")}
            </h2>

            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {order.items.map((item) => (
                <li key={item.variantId} className="flex gap-5 py-6 sm:gap-8">
                  <div className="size-24 shrink-0 overflow-hidden bg-gray-50 [border-radius:0.5rem] sm:size-32">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.name}
                        className="size-full object-contain"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 items-start justify-between gap-5 py-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {t("product.quantity")} {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium text-gray-900">
                      {formatMoney(
                        item.unitPriceInCents * item.quantity,
                        item.currency,
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="ml-auto mt-8 max-w-md space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>{t("cart.subtotal")}</dt>
                <dd className="font-medium text-gray-900">
                  {formatMoney(order.subtotalInCents, order.currency)}
                </dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>{t("cart.shipping-estimate")}</dt>
                <dd className="font-medium text-gray-900">
                  {formatMoney(order.shippingInCents, order.currency)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                <dt>{t("cart.order-total")}</dt>
                <dd>{formatMoney(order.totalInCents, order.currency)}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Button onClick={() => navigate("/")} className="h-12 px-8">
            {t("return.continue")}
          </Button>
        </div>
      </div>
    </main>
  );
}
