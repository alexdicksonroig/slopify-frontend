import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { Button, Input, Label } from "@library";
import {
  type CheckoutContextValue,
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";

const validateEmail = async (email: string, checkout: CheckoutContextValue) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== "error";

  return { isValid, message: !isValid ? updateResult.error.message : null };
};

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
};

const EmailInput = ({ email, setEmail, error, setError }: EmailInputProps) => {
  const checkout = useCheckout();
  const t = useTranslate();

  const handleBlur = async () => {
    if (!email) {
      return;
    }

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setError(message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(event.target.value);
  };

  return (
    <>
      <Label className="mb-2">
        {t("checkout.email")}
        <Input
          type="text"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={error ? "error" : ""}
        />
      </Label>
      {error && <div>{error}</div>}
    </>
  );
};

const CheckoutForm = () => {
  const checkout = useCheckout();
  const t = useTranslate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setEmailError(message);
      setMessage(message);
      setIsLoading(false);
      return;
    }

    const confirmResult = await checkout.confirm();

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (confirmResult.type === "error") {
      setMessage(confirmResult.error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
      />
      <Label>{t("checkout.payment")}</Label>
      <PaymentElement />
      <Button disabled={isLoading} className="mt-2">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          t("checkout.pay-now", { amount: checkout.total.total.amount })
        )}
      </Button>
      {/* Show any error or success messages */}
      {message && <div>{message}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51RxoPKBewlYHY4Wou29sXv0IuWRPFeZmdYqW9087Uf48B4znnG21vJF8mWMaLGUo6YQQs8HG6K7ZIq6ysvyoQps800xC6Q8nXc",
);

export default function Payment() {
  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => Api.post("/create-checkout-session"),
      }}
    >
      <div className="mx-5 mt-5">
        <CheckoutForm />
      </div>
    </CheckoutProvider>
  );
}
