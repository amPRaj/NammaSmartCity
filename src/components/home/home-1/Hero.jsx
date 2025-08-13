import { TextScroll } from "../../ui/text-scroll.tsx";
import FlipLink from "../../ui/text-effect-flipper.tsx";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-start pt-14">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Content Section */}
          <div className="flex-1 lg:flex-[1.2] text-center lg:text-left">
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4 leading-tight group">
              <div className="relative inline-block mb-2">
                <FlipLink

                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-600 hover:text-purple-600 transition-colors duration-500 relative z-10 hover:scale-105 transform inline-block"
                >
                  Namma Smart City
                </FlipLink>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>

              <br />

              <div className="relative inline-block">
                <FlipLink

                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-600 hover:text-purple-600 transition-colors duration-500 relative z-10 hover:scale-105 transform inline-block"
                >
                  Properties
                </FlipLink>
              </div>
              {/* <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto lg:mx-0 shadow-lg shadow-blue-500/25"></div> */}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 max-w-xl mx-auto lg:mx-0 px-4 sm:px-0">
              Discover extraordinary homes with{" "}
              <span className="text-xl text-blue-600 font-semibold">
                cutting-edge technology
              </span>
              {" "}and personalized marketing solutions
            </p>

            {/* CTA Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-medium transition-colors duration-200 mb-4 sm:mb-6 text-base sm:text-lg">
              Explore Properties
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Properties</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 lg:flex-[1.4] relative">
            <div className="relative">
              <img src="/images/LHOME.png" alt="Modern smart city property showcase" className="w-full h-auto" />

              {/* Minimal Feather Effects */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
            </div>
          </div>





        </div>
      </div>

      {/* Animated Text Banner */}
      <div className="absolute bottom-0 left-0 w-full py-1 lg:py-2 overflow-hidden z-10">
        <TextScroll
          text="PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES"
          default_velocity={1}
          className="text-sm lg:text-2xl font-bold text-black-600/80"
        />
      </div>
    </div>
  );
};

export default Hero;