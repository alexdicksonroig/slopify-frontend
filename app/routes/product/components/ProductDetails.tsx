interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <div className="pt-5">
      <p className="max-w-xl text-lg lg:text-xl leading-6 text-neutral-700">
        {description}
      </p>
    </div>
  );
}
