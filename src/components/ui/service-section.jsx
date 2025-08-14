import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './service-card';

const ServiceSection = ({ 
  title, 
  subtitle, 
  services, 
  onServiceEnquiry, 
  variant = 'default',
  columns = { sm: 1, md: 2, lg: 3, xl: 4 }
}) => {
  const getGridClasses = () => {
    const { sm, md, lg, xl } = columns;
    return `grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} gap-8`;
  };

  return (
    <section className="mb-24">
      {/* Section Header */}
      <div className="text-center mb-16">
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

      {/* Services Grid */}
      <div className={getGridClasses()}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            onEnquiry={onServiceEnquiry}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;