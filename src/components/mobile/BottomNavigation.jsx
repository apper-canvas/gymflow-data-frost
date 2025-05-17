import { useLocation, Link } from 'react-router-dom';
import { getIcon } from '../../utils/iconUtils';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      name: 'Home',
      icon: 'Home',
      path: '/mobile',
    },
    {
      name: 'Classes',
      icon: 'Calendar',
      path: '/mobile/classes',
    },
    {
      name: 'QR Scan',
      icon: 'QrCode',
      path: '/mobile/qrcode',
    },
    {
      name: 'Profile',
      icon: 'User',
      path: '/mobile/profile',
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 shadow-lg z-50">
      <div className="grid grid-cols-4 h-16">
        {navigationItems.map((item) => {
          const Icon = getIcon(item.icon);
          const isActive = currentPath === item.path;

          return (
            <Link 
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center relative"
            >
              {isActive && (
                <motion.div 
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20"
                  layoutId="navHighlight"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className={`flex flex-col items-center justify-center space-y-1 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-surface-500 dark:text-surface-400'
              }`}>
                <Icon size={20} />
                <span className="text-xs font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;