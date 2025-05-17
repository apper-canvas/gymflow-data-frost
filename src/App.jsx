import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { motion, AnimatePresence } from 'framer-motion';
 import { Moon, Sun } from 'lucide-react';
 import Home from './pages/Home';
 import NotFound from './pages/NotFound';
 
// Mobile Pages
import BottomNavigation from './components/mobile/BottomNavigation';
import MobileHome from './pages/mobile/MobileHome';
import MobileLogin from './pages/mobile/MobileLogin';
import MobileProfile from './pages/mobile/MobileProfile';
import MobileClasses from './pages/mobile/MobileClasses';
import MobileQRCode from './pages/mobile/MobileQRCode';
import MobileAttendance from './pages/mobile/MobileAttendance';

 const App = () => {
  const location = useLocation();
   const [darkMode, setDarkMode] = useState(() => {
     const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return (
      savedMode === 'true' ||
      (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
   });
 
   useEffect(() => {
 
   const toggleDarkMode = () => setDarkMode(!darkMode);
 
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-surface-100">
              GymFlow
            </h1>
  // Check if current route is a mobile route
  const isMobileRoute = location.pathname.startsWith('/mobile');
  const isLoginPage = location.pathname === '/mobile/login';

  // Detect if device is likely mobile
  const isMobileDevice = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  // Redirect to mobile version if accessed from mobile device
  useEffect(() => {
    if (isMobileDevice && !location.pathname.startsWith('/mobile') && location.pathname !== '/') {
      toast.info("Redirecting to mobile version for better experience");
      // Use history to navigate programmatically, but we'll leave this commented as it's just informational
      // navigate('/mobile');
    }
  }, [isMobileDevice, location.pathname]);

  // Render mobile layout
  if (isMobileRoute) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300 pb-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/mobile/login" element={<MobileLogin />} />
            <Route path="/mobile" element={<MobileHome darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/mobile/profile" element={<MobileProfile />} />
            <Route path="/mobile/classes" element={<MobileClasses />} />
            <Route path="/mobile/qrcode" element={<MobileQRCode />} />
            <Route path="/mobile/attendance" element={<MobileAttendance />} />
            <Route path="/mobile/*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>

        {!isLoginPage && <BottomNavigation />}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          toastClassName="!bg-surface-50 !text-surface-800 dark:!bg-surface-800 dark:!text-surface-100 shadow-card"
        />
      </div>
    );
  }

  // Regular web app layout
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-surface-100">
              GymFlow
            </h1>
           </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
          <div className="flex items-center space-x-4">
            <a href="/mobile" className="text-primary font-medium hover:text-primary-dark">
              Mobile App
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="*" element={<NotFound />} />
            <Route path="/mobile/*" element={<NotFound />} />
           </Routes>
         </AnimatePresence>
      </main>
      </main>
 
       <ToastContainer
         position="top-right"