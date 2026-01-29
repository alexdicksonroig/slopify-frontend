import * as Api from "@app/lib/api";
import { cn } from "@library";
import { Link, useLoaderData } from "react-router";

type Product = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color?: string;
};

type ProductCard = Pick<
  Product,
  "id" | "name" | "imageSrc" | "imageAlt" | "price"
>;

function ProductCard({ id, name, imageSrc, imageAlt, price }: ProductCard) {
  const href = `/product/${id}`;
  const isTransitioning = false;
  //const isTransitioning = useViewTransitionState(href);
  if (isTransitioning) console.log("isTransitioning", isTransitioning, href);

  return (
    <Link to={`/product/${id}`}>
      <div key={id} className="group relative">
        <img
          alt={imageAlt}
          src={imageSrc}
          className={cn(
            "aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:[view-transition-name:none]",
            { "[view-transition-name:product-image]": isTransitioning },
          )}
        />
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

export async function clientLoader() {
  const products = await Api.get("products/");
  return { products };
}

export default function Products() {
  const { products } = useLoaderData<typeof clientLoader>();

  return (
    <div
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4
            xl:gap-x-8 pb-32"
    >
      {products.map(({ id, name, imageSrc, imageAlt, price }: Product) => (
        <ProductCard key={id} {...{ id, name, imageSrc, imageAlt, price }} />
      ))}
    </div>
  );
}
