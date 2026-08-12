import { useTranslate } from "@app/i18n";
import * as Api from "@app/lib/api";
import { cn } from "@library";
import { Link, useLoaderData } from "react-router";

type ProductResponse = {
  id: number;
  name: string;
  thumbnailUrl?: string | null;
  priceInCents?: number;
  // Mock fixture compatibility
  imageSrc?: string;
  imageAlt?: string;
  price?: string;
};

type ProductCardProps = {
  id: number;
  name: string;
  thumbnailUrl: string | null;
  thumbnailAlt: string;
  price: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

function ProductCard({
  id,
  name,
  thumbnailUrl,
  thumbnailAlt,
  price,
}: ProductCardProps) {
  const t = useTranslate();

  return (
    <Link to={`/product/${id}`}>
      <div className="group relative">
        {thumbnailUrl ? (
          <img
            alt={thumbnailAlt}
            src={thumbnailUrl}
            className={cn(
              "aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:[view-transition-name:none]",
            )}
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-500">
            {t("product.no-thumbnail")}
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{name}</h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{price}</p>
        </div>
      </div>
    </Link>
  );
}

export async function clientLoader({ request }: { request: Request }) {
  const sort = new URL(request.url).searchParams.get("sort");
  const response = await Api.get("products/", sort ? { sort } : undefined);
  const products = (Array.isArray(response) ? response : []).map(
    (product: ProductResponse): ProductCardProps => ({
      id: product.id,
      name: product.name,
      thumbnailUrl: product.thumbnailUrl ?? product.imageSrc ?? null,
      thumbnailAlt: product.imageAlt ?? product.name,
      price:
        product.price ??
        priceFormatter.format((product.priceInCents ?? 0) / 100),
    }),
  );

  return { products };
}

export default function Products() {
  const { products } = useLoaderData<typeof clientLoader>();

  return (
    <div
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4
            xl:gap-x-8 pb-32"
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
