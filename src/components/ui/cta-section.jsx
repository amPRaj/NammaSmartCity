import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

const CTASection = ({ 
  title, 
  description, 
  buttonText = "Get Started", 
  onButtonClick,
  backgroundGradient = "from-blue-600 to-purple-600",
  variant = 'default' 
}) => {
  const variants = {
    default: "rounded-3xl p-12",
    compact: "rounded-2xl p-8",
    full: "rounded-none p-16"
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className={`bg-gradient-to-r ${backgroundGradient} ${variants[variant]} text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={onButtonClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;