import { useTranslate } from "@app/i18n";

interface ProductInfoProps {
  price: string;
}

export function ProductInfo({ price }: ProductInfoProps) {
  const t = useTranslate();

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">{t("product.information")}</h2>
      <p className="text-3xl tracking-tight text-gray-900">{price}</p>
    </div>
  );
}
