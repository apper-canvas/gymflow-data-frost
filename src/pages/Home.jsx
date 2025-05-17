import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('members');
  
  const DumbbellIcon = getIcon('Dumbbell');
  const UsersIcon = getIcon('Users');
  const CalendarIcon = getIcon('Calendar');
  const BarChartIcon = getIcon('BarChart');
  const DollarSignIcon = getIcon('DollarSign');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast.info(`Switched to ${tab.charAt(0).toUpperCase() + tab.slice(1)} view`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const cards = [
    {
      id: 'members',
      title: 'Members',
      icon: UsersIcon,
      count: 256,
      increase: '+12%',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 'classes',
      title: 'Classes',
      icon: CalendarIcon,
      count: 24,
      increase: '+3',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      icon: DollarSignIcon,
      count: '$12,845',
      increase: '+18%',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      icon: BarChartIcon,
      count: 1450,
      increase: '+24%',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">
            Welcome to GymFlow
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage your fitness facility with ease
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center h-14 w-14 bg-primary/10 dark:bg-primary/20 rounded-xl">
          <DumbbellIcon className="text-primary h-7 w-7" />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            className="card overflow-hidden transform hover:scale-[1.02] transition-transform"
            onClick={() => handleTabChange(card.id)}
          >
            <div className="flex justify-between items-center mb-3">
              <div className={`p-3 rounded-xl ${card.color} text-white`}>
                <card.icon size={20} />
              </div>
              <span className="text-surface-500 dark:text-surface-400 text-sm font-medium">
                {card.increase}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
              {card.count}
            </h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              {card.title}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div>
        <div className="flex overflow-x-auto scrollbar-hide mb-4 pb-2 gap-2">
          {['members', 'classes', 'revenue', 'attendance'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <MainFeature activeTab={activeTab} />
      </div>
    </motion.div>
  );
};

export default Home;