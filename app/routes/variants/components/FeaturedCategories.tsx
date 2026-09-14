const FEATURED_CATEGORIES = [
  "Red Wine",
  "White Wine",
  "Sparkling Wine",
  "Rosé Wine",
];

export function FeaturedCategories() {
  return (
    <section aria-label="Featured categories" className="pt-5 sm:pt-6 lg:pb-5">
      <ul className="grid grid-cols-4 gap-3 lg:flex lg:items-start lg:gap-4">
        {FEATURED_CATEGORIES.map((category) => (
          <li
            key={category}
            className="flex min-w-0 flex-col items-center text-center"
          >
            <div
              aria-hidden="true"
              className="aspect-square w-full animate-pulse rounded-xs bg-gray-100 lg:h-32 lg:w-32"
            />
            <span className="mt-2 text-sm font-normal leading-5 text-gray-600">
              {category}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
