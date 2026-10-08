import { useLanguage, useTranslate } from "@app/i18n";
import type { Cart } from "@app/lib/cart/domain/cart.entity";
import { formatMoney } from "@app/lib/currency";
import {
  createCheckoutSession,
  getCheckoutKey,
  getStripe,
} from "@app/lib/stripe";
import { Button, Input, Label, LoadingCircle, Skeleton } from "@library";
import {
  CheckoutElementsProvider,
  PaymentElement,
  ShippingAddressElement,
  type StripeCheckoutElementsValue,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useId,
  useMemo,
  useState,
} from "react";

const sectionHeadingClassName =
  "mb-6 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl";

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
      <Label htmlFor={inputId}>{t("checkout.email")}</Label>
      <Input
        id={inputId}
        type="email"
        size="lg"
        autoComplete="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="mt-2"
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-destructive">
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
        <h2 className={sectionHeadingClassName}>{t("checkout.contact")}</h2>
        <EmailInput
          email={email}
          setEmail={setEmail}
          error={emailError}
          setError={setEmailError}
          checkout={checkout}
        />
      </section>

      <section className="border-t border-gray-200 py-10">
        <h2 className={sectionHeadingClassName}>
          {t("checkout.shipping-address")}
        </h2>
        <ShippingAddressElement className="min-h-60" />
      </section>

      <section className="border-t border-gray-200 py-10">
        <h2 className={sectionHeadingClassName}>{t("checkout.payment")}</h2>
        <PaymentElement className="min-h-72" />
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
        <Button disabled={isLoading} size="xl" className="w-full">
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

const CheckoutSkeleton = () => {
  const t = useTranslate();

  return (
    <output aria-label={t("app.loading")} className="block">
      <section className="pb-10">
        <Skeleton className="h-7 w-48 sm:h-8" />
        <Skeleton className="mt-6 h-4 w-16" />
        <Skeleton className="mt-2 h-12 w-full" />
      </section>

      <section className="border-t border-gray-200 py-10">
        <Skeleton className="h-7 w-56 sm:h-8" />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Skeleton className="col-span-2 h-12" />
          <Skeleton className="col-span-2 h-12" />
          <Skeleton className="col-span-2 h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </section>

      <section className="border-t border-gray-200 py-10">
        <Skeleton className="h-7 w-32 sm:h-8" />
        <Skeleton className="mt-6 h-12 w-full" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </section>

      <div className="border-t border-gray-200 pt-8">
        <Skeleton className="h-14 w-full" />
      </div>
    </output>
  );
};

const CheckoutForm = () => {
  const result = useCheckoutElements();

  if (result.type === "error") {
    return (
      <p role="alert" className="text-sm text-red-600">
        {result.error.message}
      </p>
    );
  }

  if (result.type === "loading") return <CheckoutSkeleton />;

  return <PaymentDetails checkout={result.checkout} />;
};

const OrderSummary = ({ cart }: { cart: Cart }) => {
  const t = useTranslate();
  const result = useCheckoutElements();
  // Prefer Stripe's totals once loaded so they match the pay button.
  const checkout = result.type === "success" ? result.checkout : null;
  const money = (stripeAmount: number | undefined, cartAmount: number) =>
    checkout && stripeAmount !== undefined
      ? formatMoney(stripeAmount, checkout.currency)
      : formatMoney(cartAmount, cart.currency);

  return (
    <section className="border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        {t("cart.order-summary")}
      </h2>
      <ul className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
        {cart.items.map((item) => (
          <li
            key={item.variantId}
            className="flex justify-between gap-4 py-4 text-sm"
          >
            <span className="min-w-0 text-gray-900">
              {item.name}
              <span className="ml-2 text-gray-500">× {item.quantity}</span>
            </span>
            <span className="shrink-0 font-medium text-gray-900">
              {formatMoney(
                item.unitPriceInCents * item.quantity,
                item.currency,
              )}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-gray-600">{t("cart.subtotal")}</dt>
          <dd className="text-gray-900">
            {money(
              checkout?.total.subtotal.minorUnitsAmount,
              cart.cartTotalInCents,
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-gray-600">{t("cart.shipping-estimate")}</dt>
          <dd className="text-gray-900">
            {money(
              checkout?.total.shippingRate.minorUnitsAmount,
              cart.shippingPriceInCents,
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
          <dt>{t("cart.order-total")}</dt>
          <dd>
            {money(
              checkout?.total.total.minorUnitsAmount,
              cart.orderTotalInCents,
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export function CheckoutPayment({ cart }: { cart: Cart }) {
  const t = useTranslate();
  const { language } = useLanguage();
  const checkoutKey = getCheckoutKey(cart.items);
  const stripe = useMemo(() => getStripe(language), [language]);
  const clientSecret = useMemo(
    () => createCheckoutSession(cart.items),
    [cart.items],
  );

  if (!stripe) {
    return <p className="text-sm text-gray-500">{t("checkout.unavailable")}</p>;
  }

  return (
    <CheckoutElementsProvider
      key={`${language}|${checkoutKey}`}
      stripe={stripe}
      options={{
        clientSecret,
        elementsOptions: {
          appearance: {
            theme: "stripe",
            disableAnimations: true,
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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:order-last lg:self-start">
          <OrderSummary cart={cart} />
        </div>
        <CheckoutForm />
      </div>
    </CheckoutElementsProvider>
  );
}
