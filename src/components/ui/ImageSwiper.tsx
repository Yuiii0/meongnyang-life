import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageSwiperProps {
  images: string[];
}

function ImageSwiper({ images }: ImageSwiperProps) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="w-full h-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`image_${index + 1}`}
            className="object-cover w-full h-full"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSwiper;
