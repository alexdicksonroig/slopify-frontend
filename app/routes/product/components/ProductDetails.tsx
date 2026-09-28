interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <p className="max-w-prose text-base leading-relaxed text-neutral-600 lg:text-lg">
      {description}
    </p>
  );
}
