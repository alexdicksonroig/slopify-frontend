export function formatMoney(
  unitAmount: number,
  currency: string,
  locale = "es-ES",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(unitAmount / 100);
}
