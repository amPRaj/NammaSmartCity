import { ContactInfo, Form } from "../components/contact";
import { motion } from "framer-motion";
import { FiHome, FiTrendingUp, FiAward, FiUsers } from "react-icons/fi";

const Contact = () => {
  const achievements = [
    {
      icon: FiHome,
      number: "250+",
      label: "Properties Sold",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiUsers,
      number: "500+",
      label: "Happy Families",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FiTrendingUp,
      number: "98%",
      label: "Client Satisfaction",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: FiAward,
      number: "15+",
      label: "Years Experience",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Achievements */}
        <div className="py-16">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Connect With 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Davanagere's Premier
              </span>
              Real Estate Experts
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Your trusted partner for smart city properties in Davanagere. 
              We turn your property dreams into reality with expert guidance and personalized service.
            </motion.p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-gradient-to-br ${achievement.color} p-6 rounded-2xl text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <achievement.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{achievement.number}</div>
                <div className="text-sm sm:text-base text-white/90">{achievement.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Davanagere Trusts Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHome className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Local Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">Deep knowledge of Davanagere's real estate market and growth areas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Investments</h3>
                <p className="text-gray-600 dark:text-gray-300">Focus on high-growth potential properties with modern amenities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trusted Service</h3>
                <p className="text-gray-600 dark:text-gray-300">15+ years of reliable service with complete transparency</p>
              </div>
            </div>
          </motion.div>
        </div>

        <ContactInfo />
        <Form />
      </div>
    </div>
  );
};

export default Contact;
