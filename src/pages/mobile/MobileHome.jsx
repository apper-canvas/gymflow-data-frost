import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';
import MobileHeader from '../../components/mobile/MobileHeader';

const MobileHome = ({ darkMode, toggleDarkMode }) => {
  const [userName, setUserName] = useState('Alex');
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const BellIcon = getIcon('Bell');
  const DumbbellIcon = getIcon('Dumbbell');
  const CalendarIcon = getIcon('Calendar');
  const TrendingUpIcon = getIcon('TrendingUp');
  const CheckIcon = getIcon('Check');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // Simulate fetching user data
  useEffect(() => {
    // Mock API call to get user data and upcoming classes
    setTimeout(() => {
      setUpcomingClasses([
        {
          id: 1,
          name: 'Yoga Flow',
          instructor: 'Sarah Johnson',
          time: '10:00 AM',
          date: 'Today',
          duration: '60 min',
          room: 'Studio 1'
        },
        {
          id: 2,
          name: 'HIIT Training',
          instructor: 'Michael Torres',
          time: '5:30 PM',
          date: 'Today',
          duration: '45 min',
          room: 'Main Floor'
        },
        {
          id: 3,
          name: 'Spin Class',
          instructor: 'Jessica Miller',
          time: '9:15 AM',
          date: 'Tomorrow',
          duration: '45 min',
          room: 'Cycle Studio'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const recentActivities = [
    { id: 1, type: 'check-in', date: 'Yesterday, 8:30 AM' },
    { id: 2, type: 'class-completed', name: 'HIIT Training', date: '2 days ago' },
    { id: 3, type: 'class-booked', name: 'Yoga Flow', date: '3 days ago' }
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <MobileHeader 
        title="GymFlow" 
        showBack={false} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        rightAction={
          <Link to="/mobile/notifications" className="relative p-2">
            <BellIcon size={20} className="text-surface-700 dark:text-surface-300" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Link>
        }
      />
      
      <motion.div 
        className="px-4 py-4"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemAnimation} className="mb-6">
          <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
            Welcome back, {userName}!
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Ready for your workout today?
          </p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div variants={itemAnimation} className="grid grid-cols-3 gap-3 mb-6">
          <Link to="/mobile/classes" className="bg-white dark:bg-surface-800 rounded-xl p-3 flex flex-col items-center shadow-sm">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg mb-2">
              <CalendarIcon size={20} className="text-primary" />
            </div>
            <span className="text-xs font-medium text-surface-800 dark:text-surface-200">Book Class</span>
          </Link>
          
          <Link to="/mobile/qrcode" className="bg-white dark:bg-surface-800 rounded-xl p-3 flex flex-col items-center shadow-sm">
            <div className="bg-secondary/10 dark:bg-secondary/20 p-2 rounded-lg mb-2">
              <CheckIcon size={20} className="text-secondary" />
            </div>
            <span className="text-xs font-medium text-surface-800 dark:text-surface-200">Check-in</span>
          </Link>
          
          <Link to="/mobile/attendance" className="bg-white dark:bg-surface-800 rounded-xl p-3 flex flex-col items-center shadow-sm">
            <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-lg mb-2">
              <TrendingUpIcon size={20} className="text-accent" />
            </div>
            <span className="text-xs font-medium text-surface-800 dark:text-surface-200">History</span>
          </Link>
        </motion.div>

        {/* Upcoming Classes */}
        <motion.div variants={itemAnimation} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Upcoming Classes
            </h3>
            <Link to="/mobile/classes" className="text-primary text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm flex justify-center">
              <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-primary rounded-full"></div>
            </div>
          ) : upcomingClasses.length > 0 ? (
            <div className="space-y-3">
              {upcomingClasses.map(classItem => (
                <div key={classItem.id} className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-surface-800 dark:text-surface-100">{classItem.name}</h4>
                    <span className="bg-primary/10 dark:bg-primary/20 text-primary text-xs px-2 py-1 rounded-lg">
                      {classItem.date}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 mb-2">
                    <span className="mr-2">{classItem.time}</span>
                    <span className="mr-2">•</span>
                    <span>{classItem.duration}</span>
                    <span className="mr-2 ml-2">•</span>
                    <span>{classItem.room}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-surface-500 dark:text-surface-500">
                      Instructor: {classItem.instructor}
                    </span>
                    <button className="bg-primary/10 dark:bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">
                      Check In
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm text-center">
              <p className="text-surface-600 dark:text-surface-400">No upcoming classes</p>
              <Link to="/mobile/classes" className="btn btn-primary mt-3 inline-block text-sm">
                Browse Classes
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemAnimation}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
              Recent Activity
            </h3>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`p-4 flex items-center ${index !== recentActivities.length - 1 ? 'border-b border-surface-200 dark:border-surface-700' : ''}`}
              >
                <div className="mr-3 bg-surface-100 dark:bg-surface-700 p-2 rounded-full">
                  {activity.type === 'check-in' ? (
                    <CheckIcon size={16} className="text-green-500" />
                  ) : activity.type === 'class-completed' ? (
                    <DumbbellIcon size={16} className="text-blue-500" />
                  ) : (
                    <CalendarIcon size={16} className="text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-100">
                    {activity.type === 'check-in' ? 'Gym Check-in' : 
                     activity.type === 'class-completed' ? `Completed ${activity.name}` :
                     `Booked ${activity.name}`}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-500">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileHome;