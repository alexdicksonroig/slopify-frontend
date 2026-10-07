import { storeConfig } from "@app/config/store";

export function formatMoney(
  unitAmount: number,
  currency: string,
  locale = storeConfig.locale,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(unitAmount / 100);
}
