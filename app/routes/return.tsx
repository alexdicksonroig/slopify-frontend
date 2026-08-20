import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { createCartUseCase } from "@app/lib/cart/application/create-cart.use-case";
import { deleteCartUseCase } from "@app/lib/cart/application/delete-cart.use-case";
import { useCart } from "@app/lib/context/cart.context";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type SessionStatus = {
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
};

export default function Return() {
  const t = useTranslate();
  const { setCart } = useCart();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"checking" | "success" | "error">(
    "checking",
  );
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

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
  }, [sessionId, setCart]);

  return (
    <div className="mx-5 mt-5">
      {status === "checking" && <p>{t("return.checking")}</p>}
      {status === "success" && <p>{t("return.success")}</p>}
      {status === "error" && <p>{t("return.error")}</p>}
    </div>
  );
}
