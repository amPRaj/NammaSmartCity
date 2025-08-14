import React from 'react';
import { motion } from 'framer-motion';

const ResponsiveGrid = ({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 6,
  className = "",
  staggerChildren = 0.1
}) => {
  const getGridClasses = () => {
    const { sm, md, lg, xl } = columns;
    return `grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} gap-${gap}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${getGridClasses()} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveGrid;