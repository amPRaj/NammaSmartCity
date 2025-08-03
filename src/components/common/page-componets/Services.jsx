import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BiBuildingHouse,
  BiSearch,
  BiDollar,
  BiHomeAlt,
  BiKey,
  BiTrendingUp
} from "react-icons/bi";
import {
  FiHome,
  FiCheck,
  FiFileText
} from "react-icons/fi";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Property Buying",
      icon: <BiSearch />,
      description: "Expert assistance in finding and purchasing your dream property with comprehensive market analysis.",
      features: ["Market Research", "Property Inspection", "Legal Verification", "Price Negotiation"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Property Selling",
      icon: <BiDollar />,
      description: "Maximize your property value with our strategic selling approach and extensive buyer network.",
      features: ["Property Valuation", "Marketing Strategy", "Buyer Screening", "Quick Sale Process"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Property Rental",
      icon: <BiKey />,
      description: "Hassle-free rental services for both landlords and tenants with complete documentation support.",
      features: ["Tenant Verification", "Rent Collection", "Maintenance Support", "Legal Documentation"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Investment Advisory",
      icon: <BiTrendingUp />,
      description: "Strategic real estate investment guidance to build wealth through smart property investments.",
      features: ["ROI Analysis", "Market Trends", "Portfolio Planning", "Risk Assessment"],
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Property Management",
      icon: <FiHome />,
      description: "Complete property management solutions including maintenance, tenant relations, and financial reporting.",
      features: ["Maintenance Services", "Tenant Management", "Financial Reporting", "Property Upgrades"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      name: "Legal Services",
      icon: <FiFileText />,
      description: "Comprehensive legal support for all property transactions with expert documentation and compliance.",
      features: ["Document Verification", "Title Search", "Registration Support", "Legal Compliance"],
      color: "from-teal-500 to-blue-500"
    },
    {
      id: 7,
      name: "Property Valuation",
      icon: <BiHomeAlt />,
      description: "Accurate property valuation services using advanced analytics and market data for informed decisions.",
      features: ["Market Analysis", "Comparative Study", "Professional Report", "Expert Opinion"],
      color: "from-rose-500 to-pink-500"
    },
    {
      id: 8,
      name: "Home Loans",
      icon: <BiBuildingHouse />,
      description: "Simplified home loan process with competitive rates and quick approvals from trusted lenders.",
      features: ["Loan Consultation", "Documentation Help", "Rate Comparison", "Quick Approval"],
      color: "from-amber-500 to-orange-500"
    }
  ];

  const handleLearnMore = () => {
    navigate('/contact');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
      <div className="w-full py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Marketing Services Section - MOVED TO TOP */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
            >
              <span>360° MARKETING AGENCY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Revolutionary Property
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Marketing</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              We combine cutting-edge technology with creative marketing strategies to showcase your properties like never before.
            </motion.p>
          </div>

          {/* Marketing Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/30 dark:border-gray-700/50">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Properties Marketed</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/30 dark:border-gray-700/50">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Client Satisfaction</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/30 dark:border-gray-700/50">
                <div className="text-3xl lg:text-4xl font-bold text-pink-600 mb-2">3x</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Faster Sales</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/30 dark:border-gray-700/50">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Smart Support</div>
              </div>
            </div>
          </motion.div>

          {/* Marketing Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                name: "360° Virtual Tours",
                description: "Immersive virtual reality tours that let buyers explore properties from anywhere in the world",
                features: ["4K Quality", "VR Compatible", "Interactive Hotspots", "Mobile Optimized"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Cinematic Property Videos",
                description: "Professional drone footage and cinematic videos that showcase properties in stunning detail",
                features: ["Drone Footage", "4K Resolution", "Professional Editing", "Social Media Ready"],
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "Digital Marketing",
                description: "Comprehensive digital marketing strategies to maximize property visibility and reach",
                features: ["SEO Optimization", "Social Media", "Google Ads", "Content Marketing"],
                color: "from-green-500 to-emerald-500"
              },
              {
                name: "Targeted Advertising",
                description: "AI-powered targeted advertising to reach the right buyers at the right time",
                features: ["AI Targeting", "Multi-Platform", "Real-time Analytics", "ROI Tracking"],
                color: "from-orange-500 to-red-500"
              },
              {
                name: "Global Reach",
                description: "International marketing campaigns to attract global investors and buyers",
                features: ["Multi-language", "Global Platforms", "Currency Support", "Local Expertise"],
                color: "from-indigo-500 to-purple-500"
              },
              {
                name: "Mobile-First Design",
                description: "Mobile-optimized listings and marketing materials for today's mobile-first world",
                features: ["Responsive Design", "App Integration", "Fast Loading", "Touch Optimized"],
                color: "from-teal-500 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full border border-white/20 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-xl">
                      📱
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <FiCheck className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      +{service.features.length - 2} more features
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleLearnMore}
                    className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105`}
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real Estate Services Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <span>SERVICES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Comprehensive Real Estate
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Your trusted partner for all real estate needs with expert guidance and personalized solutions.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full border border-white/20 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white text-xl">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {service.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <FiCheck className="w-2 h-2 text-white" />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    +{service.features.length - 2} more features
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleLearnMore}
                  className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105`}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-12 lg:p-16 shadow-2xl mx-auto border border-white/30 dark:border-gray-700/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Namma Smart City Properties?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Trusted by thousands of satisfied clients across India
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">2000+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Customer Support</div>
            </div>
          </div>
        </motion.div>



        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 mb-0"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mx-auto shadow-2xl border border-white/20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Property Business?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join hundreds of satisfied clients who have revolutionized their property sales with our comprehensive real estate and marketing solutions.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleLearnMore}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;