import { motion } from "framer-motion";
import {
    FiCamera,
    FiVideo,
    FiTrendingUp,
    FiTarget,
    FiGlobe,
    FiSmartphone,
    FiMonitor,
    FiUsers,
    FiBarChart2,
    FiZap
} from "react-icons/fi";

const MarketingAgency = () => {
    const services = [
        {
            icon: FiCamera,
            title: "360° Virtual Tours",
            description: "Immersive virtual reality tours that let buyers explore properties from anywhere in the world",
            features: ["4K Quality", "VR Compatible", "Interactive Hotspots", "Mobile Optimized"],
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: FiVideo,
            title: "Cinematic Property Videos",
            description: "Professional drone footage and cinematic videos that showcase properties in stunning detail",
            features: ["Drone Footage", "4K Resolution", "Professional Editing", "Social Media Ready"],
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: FiTrendingUp,
            title: "Digital Marketing",
            description: "Comprehensive digital marketing strategies to maximize property visibility and reach",
            features: ["SEO Optimization", "Social Media", "Google Ads", "Content Marketing"],
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: FiTarget,
            title: "Targeted Advertising",
            description: "AI-powered targeted advertising to reach the right buyers at the right time",
            features: ["AI Targeting", "Multi-Platform", "Real-time Analytics", "ROI Tracking"],
            color: "from-orange-500 to-red-500"
        },
        {
            icon: FiGlobe,
            title: "Global Reach",
            description: "International marketing campaigns to attract global investors and buyers",
            features: ["Multi-language", "Global Platforms", "Currency Support", "Local Expertise"],
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: FiSmartphone,
            title: "Mobile-First Design",
            description: "Mobile-optimized listings and marketing materials for today's mobile-first world",
            features: ["Responsive Design", "App Integration", "Fast Loading", "Touch Optimized"],
            color: "from-teal-500 to-blue-500"
        }
    ];

    const stats = [
        { icon: FiMonitor, value: "500+", label: "Properties Marketed", color: "text-blue-600" },
        { icon: FiUsers, value: "98%", label: "Client Satisfaction", color: "text-green-600" },
        { icon: FiBarChart2, value: "3x", label: "Faster Sales", color: "text-purple-600" },
        { icon: FiZap, value: "24/7", label: "Smart Support", color: "text-orange-600" }
    ];

    return (
        <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4"
                    >
                        <FiZap className="w-4 h-4" />
                        <span>360° Marketing Agency</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Revolutionary Property
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Marketing</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                    >
                        We combine cutting-edge technology with creative marketing strategies to showcase your properties
                        like never before. From virtual tours to AI-powered advertising, we deliver results that matter.
                    </motion.p>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105`}>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">
                            Ready to Transform Your Property Marketing?
                        </h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join hundreds of satisfied clients who have revolutionized their property sales with our 360° marketing solutions.
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors">
                                Get Free Consultation
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MarketingAgency;