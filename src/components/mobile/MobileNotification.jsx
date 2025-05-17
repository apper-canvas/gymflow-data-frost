import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';

const MobileNotification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Get the appropriate icon based on notification type
  const getNotificationIcon = () => {
    switch (type) {
      case 'success':
        return getIcon('CheckCircle');
      case 'error':
        return getIcon('AlertCircle');
      case 'warning':
        return getIcon('AlertTriangle');
      case 'info':
      default:
        return getIcon('Info');
    }
  };

  const IconComponent = getNotificationIcon();
  
  // Get background color based on type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-100 dark:bg-green-900/30 border-green-500';
      case 'error': return 'bg-red-100 dark:bg-red-900/30 border-red-500';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500';
      case 'info':
      default: return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Give time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-16 left-4 right-4 z-50 rounded-lg shadow-md px-4 py-3 border-l-4 ${getBackgroundColor()}`}
        >
          <div className="flex items-center space-x-3">
            <IconComponent size={20} className={`text-${type === 'info' ? 'blue' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'red'}-600`} />
            <p className="text-surface-800 dark:text-surface-100 text-sm">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNotification;