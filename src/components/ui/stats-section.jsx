import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = ({ stats, title, subtitle }) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                {stat.icon && (
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${stat.color || 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;