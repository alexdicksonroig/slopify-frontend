import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { get, post } from "@site/lib/api";
import Checkout from "./checkout";

const stripePromise = loadStripe(
  "pk_test_51RxoPKBewlYHY4Wou29sXv0IuWRPFeZmdYqW9087Uf48B4znnG21vJF8mWMaLGUo6YQQs8HG6K7ZIq6ysvyoQps800xC6Q8nXc",
);

export async function clientLoader({ params }) {
  const products = await get("products/");
  return { products };
}

export default function Payment({ loaderData }) {
  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => post("/create-checkout-session"),
      }}
    >
      <div className="mx-5 mt-5">
        <Checkout />
      </div>
    </CheckoutProvider>
  );
}
