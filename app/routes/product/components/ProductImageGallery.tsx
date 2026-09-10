interface ProductImage {
  src: string;
  alt: string;
  className?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  return (
    <section className="relative mx-auto flex aspect-[4/3] min-h-80 w-full items-center justify-center overflow-hidden bg-white lg:sticky lg:top-6 lg:aspect-square lg:min-h-0">
      {images.length > 0 ? (
        images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            fetchPriority="high"
            className={`h-full w-full object-contain p-0 sm:p-2 lg:p-4 ${image.className ?? ""}`}
          />
        ))
      ) : (
        <p className="text-sm text-neutral-500">Image unavailable</p>
      )}
    </section>
  );
}
