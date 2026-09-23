interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <div className="pt-5">
      <p className="max-w-full text-md lg:text-xl leading-6 text-neutral-700">
        {description}
      </p>
    </div>
  );
}
