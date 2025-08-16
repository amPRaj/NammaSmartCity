import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiHome } from "react-icons/fi";
import PropertyListing from "./PropertyListing";

const PropertiesShowcase = () => {
    const navigate = useNavigate();

    return (
        <div className="py-8 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Beautiful Header */}
                <div className="text-center mb-8 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 md:mb-8"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 md:mb-6">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Discover
                            </span>
                            <br />
                            <span className="text-gray-900 dark:text-white">
                                Premium Properties
                            </span>
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="relative"
                    >
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                            Explore our handpicked collection of 
                            <span className="font-semibold text-blue-600 dark:text-blue-400"> exceptional homes </span>
                            where luxury meets comfort and dreams become reality
                        </p>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-40"></div>
                    </motion.div>
                </div>

                {/* Properties Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <PropertyListing 
                        showFilters={false}
                        showSearch={false}
                        maxProperties={6}
                        featuredOnly={false}
                        title={null}
                        showViewModeToggle={false}
                    />
                </motion.div>

                {/* Show More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-center mt-8 md:mt-16"
                >
                    <button
                        onClick={() => navigate('/properties')}
                        className="group inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm md:text-base"
                    >
                        <span className="mr-2 md:mr-3">View All Properties</span>
                        <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    
                    <p className="text-gray-500 dark:text-gray-400 mt-3 md:mt-4 text-xs md:text-sm">
                        Explore our complete collection of premium properties
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PropertiesShowcase;