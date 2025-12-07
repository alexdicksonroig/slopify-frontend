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
    <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={image.className}
          style={
            index === 0 ? { viewTransitionName: "product-image" } : undefined
          }
        />
      ))}
    </div>
  );
}
