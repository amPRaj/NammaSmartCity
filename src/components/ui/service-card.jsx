import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Badge } from './badge';

const ServiceCard = ({ service, index, onEnquiry, variant = 'default' }) => {
  const cardVariants = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600",
    featured: "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-300 dark:border-blue-700",
    compact: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
  };

  const iconVariants = {
    default: "w-14 h-14 mb-4",
    featured: "w-20 h-20 mb-8",
    compact: "w-12 h-12 mb-4"
  };

  const titleVariants = {
    default: "text-xl font-bold mb-3",
    featured: "text-3xl font-bold mb-6",
    compact: "text-lg font-semibold mb-2"
  };

  const descriptionVariants = {
    default: "text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed",
    featured: "text-gray-700 dark:text-gray-300 mb-8 line-clamp-5 text-lg leading-relaxed",
    compact: "text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <div className={`
        ${cardVariants[variant]}
        rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
        p-6 h-full flex flex-col relative overflow-hidden
        transform hover:-translate-y-1
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
          <div className={`w-40 h-40 bg-gradient-to-r ${service.color} rounded-full blur-3xl -top-20 -right-20 absolute`}></div>
          <div className={`w-24 h-24 bg-gradient-to-r ${service.color} rounded-full blur-2xl -bottom-12 -left-12 absolute opacity-60`}></div>
        </div>

        {/* Icon */}
        <div className="relative z-10">
          <div className={`
            ${iconVariants[variant]}
            bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center
            group-hover:scale-105 transition-transform duration-300 shadow-lg
          `}>
            <service.icon className={`${variant === 'default' ? 'w-7 h-7' : variant === 'featured' ? 'w-10 h-10' : 'w-6 h-6'} text-white`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className={`${titleVariants[variant]} text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300`}>
            {service.title}
          </h3>

          <p className={`${descriptionVariants[variant]} flex-1`}>
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {service.features.slice(0, variant === 'compact' ? 2 : 3).map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
            {service.features.length > (variant === 'compact' ? 2 : 3) && (
              <Badge variant="secondary" className="text-xs mt-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                +{service.features.length - (variant === 'compact' ? 2 : 3)} more
              </Badge>
            )}
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => onEnquiry(service)}
            className={`
              w-full bg-gradient-to-r ${service.color} hover:shadow-lg
              text-white border-0 group-hover:scale-105 transition-all duration-300
              ${variant === 'featured' ? 'py-3 text-base font-semibold' : 'py-2.5 text-sm font-semibold'}
              rounded-lg shadow-md relative overflow-hidden
            `}
          >
            <span className="relative z-10">
              Get Quote
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;