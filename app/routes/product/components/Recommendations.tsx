import { VariantCard } from "@app/components/variant-card";
import { useTranslate } from "@app/i18n";
import type { Product } from "@app/lib/product";
import type { Variant } from "@app/lib/variant";
import { cn } from "@library";

type RecommendationsProps = {
  cards: Array<{ product: Product; variant: Variant }>;
  className?: string;
};

// 2 cards on mobile, 3 on tablet, 4 on desktop.
const visibility = ["", "", "hidden md:block", "hidden lg:block"];

export function Recommendations({ cards, className }: RecommendationsProps) {
  const t = useTranslate();

  if (cards.length === 0) return null;

  return (
    <section className={cn("flex flex-col gap-3 lg:gap-4", className)}>
      <h2 className="text-xl font-medium text-neutral-950 lg:text-3xl">
        {t("product.recommendations")}
      </h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {cards.slice(0, 4).map(({ product, variant }, index) => (
          <VariantCard
            key={variant.id}
            product={product}
            variant={variant}
            className={cn(visibility[index])}
          />
        ))}
      </div>
    </section>
  );
}
