import FlipLink from "../../ui/text-effect-flipper.tsx"

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-start pt-16 sm:pt-20 md:pt-24">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight group">
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
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
              Discover extraordinary homes with{" "}
              <span className="text-lg text-blue-600 font-semibold">
                cutting-edge technology
              </span>
              {" "}and personalized marketing solutions
            </p>

            {/* CTA Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-200 mb-8 sm:mb-12 text-sm sm:text-base">
              Explore Properties
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md mx-auto lg:mx-0">
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
          <div className=" top[20%] flex-1 relative">
            <div className="relative">
              <img src="/images/HOME-hero.png" alt="Hero Image" className="w-full h-auto" />

              {/* Minimal Feather Effects */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-gray-900 pointer-events-none"></div>
            </div>
          </div>





        </div>
      </div>

      {/* Animated Text Banner */}
      <div className="absolute bottom-0 left-0 w-full py-2 lg:py-4 overflow-hidden z-10">
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-sm lg:text-lg font-semibold text-blue-600/80 inline-block">
            PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES  •  PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES  •  PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES  •  PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES  •  LUXURY PROPERTIES  •  PREMIUM REAL ESTATE  •  SMART CITY LIVING  •  MODERN HOMES • LUXURY PROPERTIES • PREMIUM REAL ESTATE • SMART CITY LIVING • MODERN HOMES • LUXURY PROPERTIES
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;