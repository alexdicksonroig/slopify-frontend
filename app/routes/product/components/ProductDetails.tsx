interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <p className="text-base leading-6 text-pretty text-neutral-600 lg:leading-7">
      {description}
    </p>
  );
}
