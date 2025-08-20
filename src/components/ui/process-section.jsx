import { motion } from 'framer-motion';

const ProcessSection = ({ steps, title, subtitle }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>⚡</span>
              <span>Process</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="relative">
          {/* Elegant Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <div className="flex items-center justify-between px-20">
              {steps.map((_, index) => (
                index < steps.length - 1 && (
                  <div key={index} className="flex-1 mx-8">
                    <div className="h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-30 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-60 blur-sm"></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative text-center group"
              >
                {/* Card Background */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                  {/* Card Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color || 'from-blue-500 to-purple-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                  {/* Step Number with Enhanced Design */}
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${step.color || 'from-blue-500 to-purple-500'} rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="relative z-10">{index + 1}</span>
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color || 'from-blue-500 to-purple-500'} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    </div>
                  </div>

                  {/* Icon with Animation */}
                  {step.icon && (
                    <div className="mb-8">
                      <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-300">
                        <step.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300" />
                      </div>
                    </div>
                  )}

                  {/* Content with Better Typography */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-purple-500 opacity-60"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;