interface ProductDetailsProps {
  description: string;
}

export function ProductDetails({ description }: ProductDetailsProps) {
  return (
    <div className="pt-5">
      <p className="max-w-xl text-[15px] leading-6 text-neutral-700">
        {description}
      </p>
    </div>
  );
}
