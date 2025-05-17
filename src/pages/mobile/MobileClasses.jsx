import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../../utils/iconUtils';
import MobileHeader from '../../components/mobile/MobileHeader';

const MobileClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Icons
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const UsersIcon = getIcon('Users');
  const FilterIcon = getIcon('Filter');
  const SearchIcon = getIcon('Search');
  
  // Generate dates for the date selector
  const nextSevenDays = Array(7).fill().map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });
  
  // Format date to display day name
  const formatDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Format date to display day number
  const formatDayNumber = (date) => {
    return date.getDate();
  };
  
  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  // Check if date is selected
  const isSelected = (date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Handle booking a class
  const handleBookClass = (classId) => {
    toast.success('Class booked successfully!');
    // Update local state to reflect booking
    setClasses(classes.map(c => 
      c.id === classId ? { ...c, isBooked: true } : c
    ));
  };
  
  // Handle canceling a booking
  const handleCancelBooking = (classId) => {
    toast.info('Booking canceled');
    // Update local state to reflect cancellation
    setClasses(classes.map(c => 
      c.id === classId ? { ...c, isBooked: false } : c
    ));
  };
  
  // Fetch classes for the selected date
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockClasses = [
        {
          id: 1,
          name: 'Yoga Flow',
          time: '10:00 AM',
          duration: '60 min',
          instructor: 'Sarah Johnson',
          room: 'Studio 1',
          category: 'yoga',
          spots: 5,
          totalSpots: 20,
          isBooked: false
        },
        {
          id: 2,
          name: 'HIIT Training',
          time: '5:30 PM',
          duration: '45 min',
          instructor: 'Michael Torres',
          room: 'Main Floor',
          category: 'hiit',
          spots: 8,
          totalSpots: 15,
          isBooked: true
        },
        {
          id: 3,
          name: 'Spin Class',
          time: '9:15 AM',
          duration: '45 min',
          instructor: 'Jessica Miller',
          room: 'Cycle Studio',
          category: 'cardio',
          spots: 0,
          totalSpots: 12,
          isBooked: false
        },
        {
          id: 4,
          name: 'Core Strength',
          time: '7:00 PM',
          duration: '30 min',
          instructor: 'David Williams',
          room: 'Studio 2',
          category: 'strength',
          spots: 3,
          totalSpots: 15,
          isBooked: false
        }
      ];
      
      setClasses(mockClasses);
      setLoading(false);
    }, 1000);
  }, [selectedDate]);
  
  // Filter classes based on category
  const filteredClasses = categoryFilter === 'all' 
    ? classes 
    : classes.filter(c => c.category === categoryFilter);
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <MobileHeader 
        title="Classes" 
        showBack={true}
        rightAction={
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full text-surface-700 dark:text-surface-300"
          >
            <FilterIcon size={20} />
          </button>
        }
      />
      
      <div className="px-4 py-4">
        {/* Search Box */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search classes..."
            className="input-field pl-10"
          />
        </div>
        
        {/* Date Selector */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {nextSevenDays.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-2 rounded-lg ${
                  isSelected(date)
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-200'
                }`}
              >
                <span className="text-xs font-medium">
                  {formatDayName(date)}
                </span>
                <span className={`text-lg font-bold ${isToday(date) && !isSelected(date) ? 'text-primary' : ''}`}>
                  {formatDayNumber(date)}
                </span>
                {isToday(date) && (
                  <span className="text-xs mt-1">Today</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Category Filters */}
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-white dark:bg-surface-800 rounded-lg p-3 shadow-sm">
              <p className="text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">Filter by category</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'yoga', 'hiit', 'cardio', 'strength'].map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      categoryFilter === category
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Classes List */}
        <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">
          Available Classes
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-primary rounded-full"></div>
          </div>
        ) : filteredClasses.length > 0 ? (
          <div className="space-y-4">
            {filteredClasses.map(classItem => (
              <div 
                key={classItem.id} 
                className="bg-white dark:bg-surface-800 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-surface-800 dark:text-surface-100">
                      {classItem.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      classItem.category === 'yoga' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                      classItem.category === 'hiit' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      classItem.category === 'cardio' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {classItem.category.charAt(0).toUpperCase() + classItem.category.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-surface-600 dark:text-surface-400 mb-3">
                    <div className="flex items-center">
                      <ClockIcon size={14} className="mr-1" />
                      <span>{classItem.time} ({classItem.duration})</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon size={14} className="mr-1" />
                      <span>{classItem.room}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon size={14} className="mr-1" />
                      <span>{classItem.spots} spots left</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>{selectedDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-surface-100 dark:border-surface-700 pt-3 flex justify-between items-center">
                    <span className="text-xs text-surface-500 dark:text-surface-500">
                      Instructor: {classItem.instructor}
                    </span>
                    
                    {classItem.spots === 0 && !classItem.isBooked ? (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                        Full
                      </span>
                    ) : classItem.isBooked ? (
                      <button
                        onClick={() => handleCancelBooking(classItem.id)}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookClass(classItem.id)}
                        className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium"
                      >
                        Book
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-800 rounded-lg p-6 text-center shadow-sm">
            <p className="text-surface-600 dark:text-surface-400">
              {categoryFilter !== 'all' ? 
                `No ${categoryFilter} classes available on this date.` : 
                'No classes available on this date.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileClasses;