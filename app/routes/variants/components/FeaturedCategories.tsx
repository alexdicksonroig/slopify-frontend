const FEATURED_CATEGORIES = [
  "Red Wine",
  "White Wine",
  "Sparkling Wine",
  "Rosé Wine",
];

export function FeaturedCategories() {
  return (
    <section aria-label="Featured categories" className="pt-5 sm:pt-6 lg:pb-5">
      <ul className="grid grid-cols-4 gap-2 sm:flex sm:items-start sm:gap-4">
        {FEATURED_CATEGORIES.map((category) => (
          <li
            key={category}
            className="flex min-w-0 flex-col items-center text-center sm:w-24 lg:w-32"
          >
            <div
              aria-hidden="true"
              className="aspect-square w-full max-w-[4.5rem] animate-pulse rounded-xs bg-gray-100 sm:h-24 sm:w-24 sm:max-w-none lg:h-32 lg:w-32"
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
