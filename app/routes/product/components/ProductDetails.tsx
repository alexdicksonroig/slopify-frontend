interface ProductDetailsProps {
  description: string;
  highlights: string[];
  details: string;
}

export function ProductDetails({
  description,
  highlights,
  details,
}: ProductDetailsProps) {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
      <div>
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <p className="text-base text-gray-900">{description}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
        <div className="mt-4">
          <ul className="list-disc space-y-2 pl-4 text-sm">
            {highlights.map((highlight, index) => (
              <li key={index} className="text-gray-400">
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Details</h2>
        <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{details}</p>
        </div>
      </div>
    </div>
  );
}
