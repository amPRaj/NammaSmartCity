import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiGrid, FiSettings, FiMail, FiTrendingUp } from 'react-icons/fi';

const SPANavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'properties', label: 'Properties', icon: FiGrid },
    { id: 'services', label: 'Services', icon: FiSettings },
    { id: 'marketing', label: 'Marketing', icon: FiTrendingUp },
    { id: 'contact', label: 'Contact', icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling 100px
      setIsVisible(window.scrollY > 100);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-3">
            <div className="space-y-3">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center
                    transition-all duration-300 group overflow-hidden
                    ${activeSection === section.id
                      ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}
                >
                  {/* Active background glow */}
                  {activeSection === section.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 animate-pulse" />
                  )}
                  
                  <section.icon className="w-5 h-5 relative z-10" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-gray-700 dark:border-gray-600">
                    {section.label}
                    <div className="absolute right-full top-1/2 transform translate-x-1 -translate-y-1/2 w-3 h-3 bg-gray-900 dark:bg-gray-800 rotate-45 border-l border-b border-gray-700 dark:border-gray-600" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SPANavigation;