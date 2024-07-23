import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  visibleItems?: number;
  onRemoveImage?: (imgURL: string) => void;
}

function ImageCarousel({
  images,
  visibleItems = 2,
  onRemoveImage,
}: ImageCarouselProps) {
  const itemWidth = `${100 / (visibleItems || 3)}%`;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full h-full"
    >
      <CarouselContent className="flex max-w-[400px] max-h-[250px]">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex-none"
            style={{ flexBasis: itemWidth }}
          >
            <div className="w-full h-full overflow-hidden rounded-sm aspect-w-1 aspect-h-1">
              <img
                src={image}
                alt={`image_${index + 1}`}
                className="object-cover w-full h-full "
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="absolute top-0 w-5 h-5 ml-auto bg-gray-600 rounded-sm opacity-80"
                >
                  <X
                    strokeWidth={1}
                    size={16}
                    color="white"
                    className="mx-auto"
                  />
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
