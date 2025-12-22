import { Button } from "@library";
import { ColorSelector } from "./components/ColorSelector";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { SizeSelector } from "./components/SizeSelector";

export default function Product({ params }) {
  const productImages = [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
      className:
        "col-span-2 row-span-2 aspect-1/1 size-full rounded-lg max-h-full lg:max-h-[700px] object-cover",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
      className:
        "col-start-3 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
      className:
        "col-start-3 row-start-1 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    },
  ];

  const colorOptions = [
    {
      value: "white",
      label: "White",
      bgClass: "bg-white",
      outlineClass: "checked:outline-gray-400",
      checked: true,
    },
    {
      value: "gray",
      label: "Gray",
      bgClass: "bg-gray-200",
      outlineClass: "checked:outline-gray-400",
    },
    {
      value: "black",
      label: "Black",
      bgClass: "bg-gray-900",
      outlineClass: "checked:outline-gray-900",
    },
  ];

  const sizeOptions = [
    { value: "xxs", label: "XXS", disabled: true },
    { value: "xs", label: "XS" },
    { value: "s", label: "S", checked: true },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "2xl", label: "2XL" },
    { value: "3xl", label: "3XL" },
  ];

  const productHighlights = [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ];

  return (
    <div className="md:pt-6">
      <ProductImageGallery images={productImages} />

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Basic Tee 6-Pack
          </h1>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <ProductInfo title="Basic Tee 6-Pack" price="$192" />
          <form className="mt-10">
            <ColorSelector colors={colorOptions} />
            <SizeSelector sizes={sizeOptions} />

            <Button
              type="submit"
              className="mt-10 flex w-full h-12 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3  text-primary-foreground  focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-hiblack uppercase"
            >
              Add to bag
            </Button>
          </form>
        </div>

        <ProductDetails
          description="The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered."
          highlights={productHighlights}
          details="The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release."
        />
      </div>
    </div>
  );
}
