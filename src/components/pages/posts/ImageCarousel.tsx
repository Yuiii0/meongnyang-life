import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  console.log("images", images);
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
            <div className="w-24 h-24 overflow-hidden max-h-28 max-w-28">
              <img
                src={image}
                alt={`image_${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ImageCarousel;
