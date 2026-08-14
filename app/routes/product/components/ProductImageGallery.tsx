interface ProductImage {
  src: string;
  alt: string;
  className?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  thumbnailTransitionName: string;
}

export function ProductImageGallery({
  images,
  thumbnailTransitionName,
}: ProductImageGalleryProps) {
  return (
    <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          style={
            index === 0
              ? { viewTransitionName: thumbnailTransitionName }
              : undefined
          }
          className={`${image.className ?? ""} lg:[view-transition-name:none]`}
        />
      ))}
    </div>
  );
}
