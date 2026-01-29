import { useEffect, useState } from "react";
import { Button } from "@library";
import { ColorSelector } from "./components/ColorSelector";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { SizeSelector } from "./components/SizeSelector";
import { get } from "@app/lib/api";

type ProductData = {
  id: number;
  name: string;
  price: string;
  images: { src: string; alt: string; className: string }[];
  colorOptions: { value: string; label: string; bgClass: string; outlineClass: string; checked?: boolean }[];
  sizeOptions: { value: string; label: string; disabled?: boolean; checked?: boolean }[];
  highlights: string[];
};

export default function Product({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    get(`products/${params.id}`).then((data) => {
      if (data) setProduct(data as ProductData);
    });
  }, [params.id]);

  if (!product) return null;

  const { images: productImages, colorOptions, sizeOptions, highlights: productHighlights } = product;

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
              className="mt-10 h-12 w-full uppercase"
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
