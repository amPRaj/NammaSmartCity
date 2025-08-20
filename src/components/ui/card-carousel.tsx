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
  className?: string
}

interface CarouselProps {
  images: TeamMember[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2000,
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
  
  .swiper-slide img.sofia-image {
    object-position: center;
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
                    className={`w-full h-full object-cover ${member.className || ''}`}
                    alt={member.alt}
                    onError={(e) => {
                      console.log('Image failed to load:', member.src);
                      e.currentTarget.src = '/images/property-placeholder.jpg';
                    }}
                  />
                </div>
                
                {/* Premium Professional Name and Designation */}
                <div className="mt-6 text-center px-4">
                  {/* Executive Name with Premium Typography */}
                  <h3 className="text-xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-1 tracking-tight uppercase" 
                      style={{
                        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        letterSpacing: '0.05em'
                      }}>
                    {member.name || 'Team Member'}
                  </h3>
                  
                  {/* Executive Designation with Luxury Styling */}
                  {member.designation && (
                    <div className="relative">
                      <p className="text-sm font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-widest leading-tight"
                         style={{
                           fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                           textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                           letterSpacing: '0.1em',
                           fontWeight: '700'
                         }}>
                        {member.designation}
                      </p>
                      
                      {/* Subtle underline accent */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full opacity-60"></div>
                    </div>
                  )}
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
                    className={`w-full h-full object-cover ${member.className || ''}`}
                    alt={member.alt}
                    onError={(e) => {
                      console.log('Image failed to load:', member.src);
                      e.currentTarget.src = '/images/property-placeholder.jpg';
                    }}
                  />
                </div>
                
                {/* Premium Professional Name and Designation */}
                <div className="mt-4 text-center px-2">
                  {/* Executive Name with Premium Typography */}
                  <h3 className="text-xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-1 tracking-tight uppercase" 
                      style={{
                        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        letterSpacing: '0.05em'
                      }}>
                    {member.name || 'Team Member'}
                  </h3>
                  
                  {/* Executive Designation with Luxury Styling */}
                  {member.designation && (
                    <div className="relative">
                      <p className="text-xs font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-widest leading-tight"
                         style={{
                           fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                           textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                           letterSpacing: '0.05em',
                           fontWeight: '700'
                         }}>
                        {member.designation}
                      </p>
                      
                      {/* Subtle underline accent */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full opacity-60"></div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}