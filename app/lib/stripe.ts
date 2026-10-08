import type { Language } from "@app/i18n";
import * as Api from "@app/lib/api";
import type { CartItem } from "@app/lib/cart/domain/cart.entity";
import { loadStripe, type StripeElementLocale } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const getStripe = (language: Language) =>
  publishableKey
    ? loadStripe(publishableKey, { locale: language as StripeElementLocale })
    : null;

export const getCheckoutKey = (items: readonly CartItem[]) =>
  items.map(({ variantId, quantity }) => `${variantId}:${quantity}`).join(",");

export const createCheckoutSession = (items: readonly CartItem[]) =>
  Api.post<string>("create-checkout-session", { items });
