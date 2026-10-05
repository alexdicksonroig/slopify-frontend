interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <p className="max-w-prose text-sm leading-6 text-pretty text-neutral-600 lg:text-[17px] lg:leading-7">
      {description}
    </p>
  );
}
