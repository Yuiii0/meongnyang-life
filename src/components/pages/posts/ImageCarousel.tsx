import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  onRemoveImage?: (imgURL: string) => void;
}

function ImageCarousel({ images, onRemoveImage }: ImageCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="relative w-24 h-24 overflow-hidden max-h-28 max-w-28">
              <img
                src={image}
                alt={`image_${index + 1}`}
                className="object-cover w-full h-full"
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="absolute top-0 right-0 text-gray-400 bg-gray-200 "
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
