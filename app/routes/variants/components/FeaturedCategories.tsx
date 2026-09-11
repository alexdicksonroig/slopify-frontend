const FEATURED_CATEGORIES = [
  "Red Wine",
  "White Wine",
  "Sparkling Wine",
  "Rosé Wine",
];

export function FeaturedCategories() {
  return (
    <section aria-label="Featured categories" className="pt-5 sm:pt-6">
      <ul className="flex items-start gap-4">
        {FEATURED_CATEGORIES.map((category) => (
          <li
            key={category}
            className="flex w-[4.5rem] shrink-0 flex-col items-center text-center sm:w-24 lg:w-28"
          >
            <div
              aria-hidden="true"
              className="size-[4.5rem] animate-pulse rounded-xs bg-gray-100 sm:size-24 lg:size-28"
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
