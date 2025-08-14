import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = '1600px',
  padding = 'px-4 sm:px-6 lg:px-8',
  ...props 
}) => {
  return (
    <div 
      className={`w-full mx-auto ${padding} ${className}`}
      style={{ maxWidth }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;