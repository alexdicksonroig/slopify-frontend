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
    <section className="relative mx-auto flex aspect-[4/3] min-h-80 w-full max-w-2xl items-center justify-center overflow-hidden bg-white lg:sticky lg:top-6 lg:aspect-square lg:min-h-0">
      {images.length > 0 ? (
        images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`h-full w-full object-contain p-5 sm:p-10 lg:p-16 ${image.className ?? ""}`}
          />
        ))
      ) : (
        <p className="text-sm text-neutral-500">Image unavailable</p>
      )}
      <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex justify-between text-[10px] font-semibold tracking-[0.12em] uppercase sm:right-6 sm:bottom-5 sm:left-6">
        <span>Cellar selection</span>
        <span>01 / {String(Math.max(images.length, 1)).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
