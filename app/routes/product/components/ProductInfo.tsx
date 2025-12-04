interface ProductInfoProps {
  title: string;
  price: string;
}

export function ProductInfo({ title, price }: ProductInfoProps) {
  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl tracking-tight text-gray-900">{price}</p>
    </div>
  );
}
