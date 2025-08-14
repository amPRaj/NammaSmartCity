import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  backgroundGradient = "from-blue-600 via-purple-600 to-indigo-600",
  children 
}) => {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-5`}></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {title.split(' ').map((word, index) => (
              <span key={index} className={index === title.split(' ').length - 1 ? 
                `block bg-gradient-to-r ${backgroundGradient} bg-clip-text text-transparent` : 
                ''
              }>
                {word}{index < title.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
            >
              {subtitle}
            </motion.h2>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* Additional Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;