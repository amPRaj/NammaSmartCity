import { TextScroll } from "../../ui/text-scroll.tsx";
import FlipLink from "../../ui/text-effect-flipper.tsx";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center pt-20 sm:pt-24 relative overflow-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 lg:flex-[1.2] text-center lg:text-left w-full">
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

            {/* Main Heading */}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight group">
              <div className="relative inline-block mb-2">
                <FlipLink
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 hover:text-purple-600 transition-colors duration-500 relative z-10 hover:scale-105 transform inline-block"
                >
                  Namma Smart City
                </FlipLink>
              </div>

              <br />

              <div className="relative inline-block">
                <FlipLink
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 hover:text-purple-600 transition-colors duration-500 relative z-10 hover:scale-105 transform inline-block"
                >
                  Properties
                </FlipLink>
              </div>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover extraordinary homes with{" "}
              <span className="text-blue-600 font-semibold">
                cutting-edge technology
              </span>
              {" "}and personalized marketing solutions
            </p>

            {/* CTA Button */}
            <button 
              onClick={() => {
                const propertiesSection = document.getElementById('properties');
                if (propertiesSection) {
                  propertiesSection.scrollIntoView();
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 mb-8 sm:mb-10 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Properties
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-md sm:max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left bg-blue-50 dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Properties</div>
              </div>
              <div className="text-center lg:text-left bg-green-50 dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Satisfaction</div>
              </div>
              <div className="text-center lg:text-left bg-purple-50 dark:bg-gray-800 p-3 sm:p-4 rounded-xl">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 lg:flex-[1.4] relative w-full mt-8 lg:mt-0">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Premium Image Container */}
              <div className="relative group">
                <img 
                  src="/images/LHOME.png" 
                  alt="Modern smart city property showcase" 
                  className="w-full h-auto drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105" 
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