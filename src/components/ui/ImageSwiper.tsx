import { PostImage } from "@/lib/post/type";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface ImageSwiperProps {
  images: PostImage[];
}

function ImageSwiper({ images }: ImageSwiperProps) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: Swiper | null = null;
    if (swiperRef.current) {
      swiperInstance = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative z-0 w-full h-full swiper" ref={swiperRef}>
      <div className="swiper-wrapper">
        {images.map((image: PostImage, index) => (
          <div className="swiper-slide" key={index}>
            <img
              src={image.original}
              srcSet={`${image.small} 480w, ${image.large} 1080w`}
              sizes="(max-width: 768px) 480px, 1080px"
              alt={`image_${index + 1}`}
              className="object-cover w-full h-full overflow-hidden rounded-md"
              loading="lazy"
            />
            <div className="swiper-lazy-preloader"></div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
}

export default ImageSwiper;
