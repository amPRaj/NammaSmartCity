import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const GlobalActionButtons = ({ onServiceEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const actions = [
    {
      icon: FiPhone,
      label: 'Call Us',
      bgColor: 'bg-emerald-500',
      shadowColor: 'shadow-emerald-500/25',
      action: () => {
        window.open('tel:+918951569757');
        setIsOpen(false);
      }
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      bgColor: 'bg-green-500',
      shadowColor: 'shadow-green-500/25',
      action: () => {
        window.open('https://wa.me/918951569757?text=Hi! I would like to know more about your real estate services.');
        setIsOpen(false);
      }
    },
    {
      icon: FiMail,
      label: 'Get Quote',
      bgColor: 'bg-blue-500',
      shadowColor: 'shadow-blue-500/25',
      action: () => {
        setIsOpen(false);
        setTimeout(() => {
          if (onServiceEnquiry) {
            onServiceEnquiry({ title: 'General Inquiry', description: 'Get a quote for our services' });
          }
        }, 200);
      }
    }
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex flex-col items-end space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 100, 
                  scale: 0.8,
                  transition: { 
                    delay: (actions.length - 1 - index) * 0.05,
                    duration: 0.2
                  }
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`
                  group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16
                  ${action.bgColor} text-white rounded-full
                  shadow-lg ${action.shadowColor} hover:shadow-xl
                  transition-all duration-200 ease-out
                  border-2 border-white/20 backdrop-blur-sm
                  relative overflow-hidden
                `}
              >
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                
                {/* Icon */}
                <action.icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                
                {/* Label tooltip */}
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {action.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
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
          relative w-16 h-16 sm:w-18 sm:h-18 
          bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
          text-white rounded-full shadow-xl hover:shadow-2xl
          transition-all duration-300 ease-out
          flex items-center justify-center
          border-2 border-white/30 backdrop-blur-sm
          group overflow-hidden
        `}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
        
        {/* Icon container */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          {isOpen ? (
            <FiX className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                <div className="w-6 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-6 bg-white rounded-full absolute" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] -z-10 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalActionButtons;