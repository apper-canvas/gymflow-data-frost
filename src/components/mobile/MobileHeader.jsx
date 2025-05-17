import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';

const MobileHeader = ({ 
  title, 
  showBack = true, 
  rightAction,
  darkMode,
  toggleDarkMode
}) => {
  const navigate = useNavigate();
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-surface-800 shadow-sm px-4 h-14 flex items-center justify-between sticky top-0 z-10"
    >
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-2 p-2 -ml-2 rounded-full text-surface-700 dark:text-surface-300"
            aria-label="Go back"
          >
            <ChevronLeftIcon size={20} />
          </button>
        )}
        <h1 className="font-semibold text-lg text-surface-800 dark:text-surface-100">{title}</h1>
      </div>
      <div>
        {rightAction || (
          toggleDarkMode && 
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-surface-700 dark:text-surface-300">
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default MobileHeader;