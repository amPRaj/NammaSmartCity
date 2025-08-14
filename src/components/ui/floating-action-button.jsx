import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMessageCircle, FiMail, FiX } from 'react-icons/fi';

const FloatingActionButton = ({ onServiceEnquiry, customService }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: FiPhone,
      label: 'Call Us',
      color: 'from-green-500 to-emerald-500',
      action: () => window.open('tel:+918951569757')
    },
    {
      icon: FiMessageCircle,
      label: 'WhatsApp',
      color: 'from-green-600 to-green-700',
      action: () => window.open('https://wa.me/918951569757')
    },
    {
      icon: FiMail,
      label: 'Get Quote',
      color: 'from-blue-500 to-purple-500',
      action: () => {
        setIsOpen(false);
        onServiceEnquiry(customService);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`
                  flex items-center space-x-3 bg-gradient-to-r ${action.color} 
                  text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:scale-105
                  whitespace-nowrap
                `}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 
          text-white rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-300 flex items-center justify-center
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;