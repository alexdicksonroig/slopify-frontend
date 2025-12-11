import clsx from "clsx";
import { Link, useViewTransitionState } from "react-router";

export const products = [
  {
    id: 1,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in white.",
    price: "$35",
    color: "Aspen White",
  },
  {
    id: 3,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: "$35",
    color: "Charcoal",
  },
  {
    id: 4,
    name: "Artwork Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: "$35",
    color: "Iso Dots",
  },
  {
    id: 5,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 6,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in white.",
    price: "$35",
    color: "Aspen White",
  },
  {
    id: 7,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: "$35",
    color: "Charcoal",
  },
  {
    id: 8,
    name: "Artwork Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: "$35",
    color: "Iso Dots",
  },
  {
    id: 9,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 10,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in white.",
    price: "$35",
    color: "Aspen White",
  },
  {
    id: 11,
    name: "Basic Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: "$35",
    color: "Charcoal",
  },
  {
    id: 12,
    name: "Artwork Tee",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: "$35",
    color: "Iso Dots",
  },
];

type Product = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
};

type ProductCard = Pick<
  Product,
  "id" | "name" | "imageSrc" | "imageAlt" | "price"
>;

function ProductCard({ id, name, imageSrc, imageAlt, price }: ProductCard) {
  const href = `/product/${id}`;
  const isTransitioning = useViewTransitionState(href);

  return (
    <Link to={`/product/${id}`} viewTransition>
      <div key={id} className="group relative">
        <img
          alt={imageAlt}
          src={imageSrc}
          className={clsx(
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

export default function Products() {
  return (
    <div
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4
            xl:gap-x-8 pb-32"
    >
      {products.map(({ id, name, imageSrc, imageAlt, price }) => (
        <ProductCard {...{ id, name, imageSrc, imageAlt, price }} />
      ))}
    </div>
  );
}
