import { TextScroll } from "../../ui/text-scroll.tsx";
import FlipLink from "../../ui/text-effect-flipper.tsx";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center pt-14 sm:pt-16 md:pt-20 pb-4 md:pb-0 relative overflow-hidden">



      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Content Section */}
          <div className="flex-1 lg:flex-[1.2] text-center lg:text-left w-full px-2 sm:px-0 lg:ml-8">
            {/* Logo Badge */}
            {/* <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <img
                src="/images/namma-logo.png"
                alt="Namma Logo"
                className="h-12 w-auto"
              />
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Premium Real Estate
              </span>
            </div> */}

            {/* Main Heading - Mobile Responsive */}
            <h1 className=" pt-8 text-xl sm:text-xl md:text-6xl lg:text-4xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 group" style={{ lineHeight: '0.8' }}>
              <div className="relative block -mb-2 sm:-mb-3 md:-mb-4">
                <FlipLink
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-purple-800 transition-all duration-500 relative z-10 hover:scale-105 transform block drop-shadow-2xl uppercase"
                  style={{
                    fontFamily: '"Impact", "Arial Black", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: '900',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.02em',
                    WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                  }}
                >
                  Namma Smart City
                </FlipLink>
              </div>

              <br />

              <div className="relative block">
                <FlipLink
                  className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-purple-800 transition-all duration-500 relative z-10 hover:scale-105 transform block drop-shadow-2xl uppercase"
                  style={{
                    fontFamily: '"Impact", "Arial Black", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: '900',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.02em',
                    WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                  }}
                >
                  Properties
                </FlipLink>
              </div>
            </h1>

            {/* Description - Mobile Optimized */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <span className="hidden sm:inline">Discover extraordinary homes with </span>
              <span className="text-blue-600 font-semibold">
                <span className="sm:hidden">Modern technology with </span>
                <span className="hidden sm:inline">modern technology</span>
              </span>
              <span className="hidden sm:inline"> and personalized service tailored to your needs</span>
              <span className="sm:hidden"> personalized service</span>
            </p>

            {/* Proportioned CTA Button */}
            <button
              onClick={() => {
                const propertiesSection = document.getElementById('properties');
                if (propertiesSection) {
                  propertiesSection.scrollIntoView();
                }
              }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 mb-5 sm:mb-6 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="relative z-10"> Explore Properties</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Proportioned Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-200 border border-blue-200 dark:border-gray-600">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">500+</div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">Properties</div>
              </div>
              <div className="text-center lg:text-left bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-200 border border-green-200 dark:border-gray-600">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-green-600 dark:text-green-400 mb-1">98%</div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">Satisfaction</div>
              </div>
              <div className="text-center lg:text-left bg-gradient-to-br from-purple-50 to-purple-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-200 border border-purple-200 dark:border-gray-600">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">24/7</div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Image Section - Maximum Size */}
          <div className="flex-1 lg:flex-[2.5] relative w-full mt-4 sm:mt-6 lg:mt-0 flex justify-center items-center">
            <div className="relative max-w-3xl sm:max-w-4xl lg:max-w-7xl xl:max-w-8xl 2xl:max-w-full mx-auto">
              {/* Premium Image Container */}
              <div className="relative group flex justify-center">
                <img
                  src="/images/LHOME.png"
                  alt="Modern smart city property showcase"
                  className="w-full h-auto lg:w-[120%] xl:w-[130%] 2xl:w-[140%] drop-shadow-2xl transform transition-transform duration-300 group-hover:scale-102 rounded-2xl"
                />
              </div>
            </div>
          </div>





        </div>
      </div>

      {/* Premium Animated Text Banner */}
      <div className="absolute bottom-0 left-0 w-full py-3 sm:py-4 lg:py-6 overflow-hidden z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
        <TextScroll
          text="PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES"
          default_velocity={0.8}
          className="text-xs sm:text-sm lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        />
      </div>
    </div>
  );
};

export default Hero;