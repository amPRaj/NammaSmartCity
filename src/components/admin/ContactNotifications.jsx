import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { subscribeToContacts, unsubscribeFromContacts } from '../../supabase/contactService';

const ContactNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subscribe to real-time contact updates
    const subscription = subscribeToContacts((newContact) => {
      const notification = {
        id: newContact.id,
        ...newContact,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep only 5 notifications
      setIsVisible(true);
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 10000);
    });

    return () => {
      unsubscribeFromContacts(subscription);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <FiBell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    New Contact Inquiry
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FiUser className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {notification.first_name} {notification.last_name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiMail className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 truncate">
                  {notification.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiPhone className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {notification.phone}
                </span>
              </div>
              {notification.property_type && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Interested in: {notification.property_type}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactNotifications;