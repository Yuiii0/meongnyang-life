import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  visibleItems?: number; // 표시할 이미지 개수
  onRemoveImage?: (imgURL: string) => void;
}

function ImageCarousel({
  images,
  visibleItems = 3,
  onRemoveImage,
}: ImageCarouselProps) {
  const itemWidth = visibleItems === 1 ? "100%" : "33.3333%";

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-full"
    >
      <CarouselContent className="flex">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex-none"
            style={{ flexBasis: itemWidth }}
          >
            <div className="relative w-full h-full overflow-hidden min-h-28">
              <img
                src={image}
                alt={`image_${index + 1}`}
                className="object-cover w-full h-full"
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="absolute top-0 right-0 text-gray-400 bg-gray-200"
                >
                  <X strokeWidth={1} />
                </button>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ImageCarousel;
