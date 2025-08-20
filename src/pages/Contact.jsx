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
    <div className="pt-4 sm:pt-28 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with Achievements */}
        <div className="py-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span>📞</span>
              <span>Contact Us</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
            >
              Connect With 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Davanagere's Premier
              </span>
              Real Estate Experts
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Your trusted partner for smart city properties in Davanagere. 
              We turn your property dreams into reality with expert guidance and personalized service.
            </motion.p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={`bg-gradient-to-br ${achievement.color} p-8 rounded-3xl text-white text-center shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-base sm:text-lg text-white/90 font-medium">{achievement.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl mb-20 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Davanagere Trusts Us
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: FiHome,
                    title: "Local Expertise",
                    description: "Deep knowledge of Davanagere's real estate market and growth areas",
                    color: "blue"
                  },
                  {
                    icon: FiTrendingUp,
                    title: "Smart Investments",
                    description: "Focus on high-growth potential properties with modern amenities",
                    color: "green"
                  },
                  {
                    icon: FiAward,
                    title: "Trusted Service",
                    description: "15+ years of reliable service with complete transparency",
                    color: "purple"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="text-center group"
                  >
                    <div className={`w-20 h-20 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className={`w-10 h-10 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
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
