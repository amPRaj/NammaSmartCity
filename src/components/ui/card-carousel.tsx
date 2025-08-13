import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

interface TeamMember {
  src: string
  alt: string
  name?: string
  designation?: string
}

interface CarouselProps {
  images: TeamMember[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1000,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 500px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 450px;
    object-fit: cover;
    aspect-ratio: 4/6;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="w-full">
        <Swiper
          spaceBetween={50}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={showPagination}
          navigation={
            showNavigation
              ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
              : undefined
          }
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex flex-col">
                {/* Image Container - 4:6 Ratio */}
                <div className="w-full h-[450px] rounded-3xl overflow-hidden">
                  <img
                    src={member.src}
                    className="w-full h-full object-cover"
                    alt={member.alt}
                    onError={(e) => {
                      console.log('Image failed to load:', member.src);
                      e.currentTarget.src = '/images/property-placeholder.jpg';
                    }}
                  />
                </div>
                
                {/* Name Below Image */}
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-bold text-black">
                    {member.name || 'Team Member'}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {images.map((member, index) => (
            <SwiperSlide key={`duplicate-${index}`}>
              <div className="w-full h-full flex flex-col">
                {/* Image Container - 4:6 Ratio */}
                <div className="w-full h-[450px] rounded-3xl overflow-hidden">
                  <img
                    src={member.src}
                    className="w-full h-full object-cover"
                    alt={member.alt}
                    onError={(e) => {
                      console.log('Image failed to load:', member.src);
                      e.currentTarget.src = '/images/property-placeholder.jpg';
                    }}
                  />
                </div>
                
                {/* Name Below Image */}
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-bold text-black">
                    {member.name || 'Team Member'}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}