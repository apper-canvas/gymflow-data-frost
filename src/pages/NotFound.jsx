import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-20 h-20 mb-6 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center"
      >
        <AlertTriangleIcon className="w-10 h-10 text-orange-500" />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-surface-800 dark:text-surface-100 mb-4 text-center">
        404 - Page Not Found
      </h1>
      
      <p className="text-surface-600 dark:text-surface-400 text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-soft"
      >
        Return to Dashboard
      </Link>
    </motion.div>
  );
};

export default NotFound;