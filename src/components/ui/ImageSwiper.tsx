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
      lazyPreloadPrevNext={1}
      className="relative z-10 w-full h-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`image_${index + 1}`}
            className="object-cover w-full h-full overflow-hidden rounded-md"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="swiper-lazy-preloader-black"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSwiper;
