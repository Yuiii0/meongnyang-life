import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

function IntroSwiper() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: Swiper | null = null;
    if (swiperRef.current) {
      swiperInstance = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        direction: "vertical", // 수직 슬라이드 설정
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, []);

  const texts = [
    "반려생활 기록 ❤️",
    "커뮤니티 🗣",
    "반려동물 사진 공유 📸",
    "친구 찾기 🐶",
  ];

  return (
    <div className="relative z-0 w-full h-20 overflow-hidden" ref={swiperRef}>
      <div className="swiper-wrapper">
        {texts.map((text, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-64 text-3xl font-semibold swiper-slide"
          >
            {`# ${text}`}
          </div>
        ))}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
}

export default IntroSwiper;
