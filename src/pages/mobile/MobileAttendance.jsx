import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';
import MobileHeader from '../../components/mobile/MobileHeader';

const MobileAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  
  // Icons
  const CalendarIcon = getIcon('Calendar');
  const CheckIcon = getIcon('Check');
  const DumbbellIcon = getIcon('Dumbbell');
  const FilterIcon = getIcon('Filter');
  const ClockIcon = getIcon('Clock');
  
  // Fetch attendance data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAttendance = [
        {
          id: 1,
          type: 'check-in',
          date: '2023-10-15',
          time: '09:30:00',
          location: 'Main Entrance'
        },
        {
          id: 2,
          type: 'class',
          className: 'Yoga Flow',
          instructor: 'Sarah Johnson',
          date: '2023-10-12',
          time: '18:00:00',
          location: 'Studio 1'
        },
        {
          id: 3,
          type: 'check-in',
          date: '2023-10-10',
          time: '07:45:00',
          location: 'Main Entrance'
        },
        {
          id: 4,
          type: 'class',
          className: 'HIIT Training',
          instructor: 'Michael Torres',
          date: '2023-10-08',
          time: '17:30:00',
          location: 'Main Floor'
        },
        {
          id: 5,
          type: 'check-in',
          date: '2023-10-05',
          time: '16:15:00',
          location: 'Main Entrance'
        },
        {
          id: 6,
          type: 'class',
          className: 'Spin Class',
          instructor: 'Jessica Miller',
          date: '2023-10-01',
          time: '09:15:00',
          location: 'Cycle Studio'
        },
        {
          id: 7,
          type: 'check-in',
          date: '2023-09-28',
          time: '07:30:00',
          location: 'Main Entrance'
        },
      ];
      
      setAttendance(mockAttendance);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Format date and time
  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  // Filter attendance data
  const filteredAttendance = attendance.filter(item => {
    // Filter by type
    const matchesType = filter === 'all' || item.type === filter;
    
    // Filter by month
    const matchesMonth = monthFilter === 'all' || 
      new Date(item.date).getMonth() === parseInt(monthFilter);
    
    return matchesType && matchesMonth;
  });
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <MobileHeader title="Attendance History" showBack={true} />
      
      <div className="px-4 py-6">
        {/* Filters */}
        <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <FilterIcon size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
            <h3 className="text-sm font-medium text-surface-800 dark:text-surface-100">Filters</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-surface-500 dark:text-surface-500 mb-1 block">Type</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full text-sm bg-surface-50 dark:bg-surface-700 rounded-lg py-2 px-3 border-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="check-in">Check-ins</option>
                <option value="class">Classes</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-surface-500 dark:text-surface-500 mb-1 block">Month</label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full text-sm bg-surface-50 dark:bg-surface-700 rounded-lg py-2 px-3 border-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Time</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Attendance List */}
        <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">
          Attendance History
        </h3>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-primary rounded-full"></div>
          </div>
        ) : filteredAttendance.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-sm overflow-hidden"
          >
            {filteredAttendance.map((item, index) => (
              <div 
                key={item.id}
                className={`p-4 ${
                  index !== filteredAttendance.length - 1 ? 'border-b border-surface-200 dark:border-surface-700' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {item.type === 'check-in' ? (
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckIcon size={16} className="text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <DumbbellIcon size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-surface-800 dark:text-surface-100">
                      {item.type === 'check-in' ? 'Gym Check-in' : item.className}
                    </h4>
                    
                    <div className="mt-1 flex items-center text-sm text-surface-500 dark:text-surface-500">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>{formatDateTime(item.date, item.time)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-surface-600 dark:text-surface-400">
                        {item.location}
                        {item.type === 'class' && ` • ${item.instructor}`}
                      </span>
                      
                      <div className="flex items-center text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded-full">
                        <ClockIcon size={12} className="mr-1 text-surface-500 dark:text-surface-400" />
                        <span>
                          {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white dark:bg-surface-800 rounded-lg p-6 shadow-sm text-center">
            <p className="text-surface-600 dark:text-surface-400">
              No attendance records found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAttendance;