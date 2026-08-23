// Not revised file
import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import { Button, Input, Label, LoadingCircle, Skeleton } from "@library";
import {
  CheckoutElementsProvider,
  PaymentElement,
  ShippingAddressElement,
  type StripeCheckoutElementsValue,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useId,
  useMemo,
  useState,
} from "react";

const validateEmail = async (
  email: string,
  checkout: StripeCheckoutElementsValue,
) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== "error";

  return { isValid, message: !isValid ? updateResult.error.message : null };
};

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  checkout: StripeCheckoutElementsValue;
};

const EmailInput = ({
  email,
  setEmail,
  error,
  setError,
  checkout,
}: EmailInputProps) => {
  const t = useTranslate();
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleBlur = async () => {
    if (!email) return;

    const result = await validateEmail(email, checkout);
    if (!result.isValid) setError(result.message);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(event.target.value);
  };

  return (
    <div>
      <Label htmlFor={inputId} className="block text-sm text-gray-700">
        {t("checkout.email")}
      </Label>
      <Input
        id={inputId}
        type="email"
        autoComplete="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 h-12 border-gray-300 bg-white px-4 text-base shadow-none [border-radius:0.5rem] focus-visible:border-gray-900 focus-visible:ring-gray-900 ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

const PaymentDetails = ({
  checkout,
}: {
  checkout: StripeCheckoutElementsValue;
}) => {
  const t = useTranslate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await validateEmail(email, checkout);
      if (!result.isValid) {
        setEmailError(result.message);
        setMessage(result.message);
        return;
      }

      const confirmResult = await checkout.confirm({
        email,
        redirect: "always",
      });
      if (confirmResult.type === "error") {
        setMessage(confirmResult.error.message);
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : t("error.unexpected"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="pb-10">
        <h2 className="mb-7 text-2xl font-semibold tracking-tight text-gray-900">
          {t("checkout.contact")}
        </h2>
        <EmailInput
          email={email}
          setEmail={setEmail}
          error={emailError}
          setError={setEmailError}
          checkout={checkout}
        />
      </section>

      <section className="border-t border-gray-200 py-10">
        <h2 className="mb-7 text-2xl font-semibold tracking-tight text-gray-900">
          {t("checkout.shipping-address")}
        </h2>
        <ShippingAddressElement />
      </section>

      <section className="border-t border-gray-200 py-10">
        <h2 className="mb-7 text-2xl font-semibold tracking-tight text-gray-900">
          {t("checkout.payment")}
        </h2>
        <PaymentElement />
      </section>

      <div className="border-t border-gray-200 pt-8">
        {message && (
          <p
            role="alert"
            className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {message}
          </p>
        )}
        <Button disabled={isLoading} className="h-14 w-full text-base">
          {isLoading ? (
            <LoadingCircle size="sm" label={t("app.loading")} />
          ) : (
            t("checkout.pay-now", { amount: checkout.total.total.amount })
          )}
        </Button>
      </div>
    </form>
  );
};

const CheckoutContents = () => {
  const result = useCheckoutElements();
  const t = useTranslate();

  if (result.type === "loading") {
    return (
      <output aria-label={t("app.loading")} className="block">
        <section className="pb-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-7 h-4 w-16" />
          <Skeleton className="mt-2 h-12 w-full [border-radius:0.5rem]" />
        </section>

        <section className="border-t border-gray-200 py-10">
          <Skeleton className="h-8 w-56" />
          <div className="mt-7 grid grid-cols-2 gap-4">
            <Skeleton className="col-span-2 h-12 [border-radius:0.5rem]" />
            <Skeleton className="h-12 [border-radius:0.5rem]" />
            <Skeleton className="h-12 [border-radius:0.5rem]" />
            <Skeleton className="col-span-2 h-12 [border-radius:0.5rem]" />
          </div>
        </section>

        <section className="border-t border-gray-200 py-10">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-7 h-12 w-full [border-radius:0.5rem]" />
          <Skeleton className="mt-4 h-12 w-full [border-radius:0.5rem]" />
        </section>

        <div className="border-t border-gray-200 pt-8">
          <Skeleton className="h-14 w-full" />
        </div>
      </output>
    );
  }
  if (result.type === "error") {
    return <p role="alert">{result.error.message}</p>;
  }

  return <PaymentDetails checkout={result.checkout} />;
};

const stripePublishableKey = (
  import.meta as unknown as {
    env: { VITE_STRIPE_PUBLISHABLE_KEY?: string };
  }
).env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

export function CheckoutPayment({ cart }: { cart: Cart }) {
  const t = useTranslate();
  const items = cart.items;

  const checkoutKey = useMemo(
    () =>
      items
        .map(({ variantId, quantity }) => `${variantId}:${quantity}`)
        .join(","),
    [items],
  );
  const clientSecret = useMemo(
    () => Api.post<string>("create-checkout-session", { items }),
    [items],
  );

  if (!stripePromise) {
    return <p>{t("checkout.unavailable")}</p>;
  }

  return (
    <CheckoutElementsProvider
      key={checkoutKey}
      stripe={stripePromise}
      options={{
        clientSecret,
        elementsOptions: {
          appearance: {
            theme: "stripe",
            variables: {
              borderRadius: "8px",
              colorPrimary: "#111827",
              colorText: "#111827",
              colorDanger: "#dc2626",
              fontFamily:
                "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji",
              spacingUnit: "4px",
            },
          },
        },
      }}
    >
      <CheckoutContents />
    </CheckoutElementsProvider>
  );
}
