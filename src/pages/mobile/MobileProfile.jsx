import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../../utils/iconUtils';
import MobileHeader from '../../components/mobile/MobileHeader';

const MobileProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  
  // Icons
  const UserIcon = getIcon('User');
  const CalendarIcon = getIcon('Calendar');
  const SettingsIcon = getIcon('Settings');
  const CreditCardIcon = getIcon('CreditCard');
  const LogOutIcon = getIcon('LogOut');
  const EditIcon = getIcon('Edit');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // Fetch user profile data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfileData({
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '555-1234',
        membershipType: 'Premium',
        memberSince: '2023-05-12',
        expirationDate: '2024-05-12',
        profileImage: null,
        attendanceHistory: [
          { date: '2023-10-15', type: 'Check-in', time: '9:30 AM' },
          { date: '2023-10-12', type: 'Yoga Class', time: '6:00 PM' },
          { date: '2023-10-10', type: 'Check-in', time: '7:45 AM' },
          { date: '2023-10-08', type: 'HIIT Class', time: '5:30 PM' },
          { date: '2023-10-05', type: 'Check-in', time: '4:15 PM' },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSignOut = () => {
    toast.info('Signing out...');
    setTimeout(() => {
      window.location.href = '/mobile/login';
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
        <MobileHeader title="Profile" showBack={true} />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <MobileHeader title="Profile" showBack={true} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-6"
      >
        {/* Profile Header */}
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm mb-6 text-center">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center mx-auto">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt={profileData.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <UserIcon size={40} className="text-surface-500 dark:text-surface-400" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
              <EditIcon size={16} />
            </button>
          </div>
          
          <h1 className="text-xl font-bold text-surface-800 dark:text-surface-100 mt-4">
            {profileData.name}
          </h1>
          <p className="text-surface-600 dark:text-surface-400 text-sm">
            {profileData.email}
          </p>
          
          <div className="mt-3 inline-block bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-primary text-sm font-medium">
            {profileData.membershipType} Member
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'info' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            Information
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'attendance' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            Attendance
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'info' ? (
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <p className="text-xs font-medium text-surface-500 dark:text-surface-500 mb-1">PERSONAL INFORMATION</p>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Full Name</p>
                  <p className="text-surface-800 dark:text-surface-100">{profileData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Email</p>
                  <p className="text-surface-800 dark:text-surface-100">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Phone</p>
                  <p className="text-surface-800 dark:text-surface-100">{profileData.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <p className="text-xs font-medium text-surface-500 dark:text-surface-500 mb-1">MEMBERSHIP DETAILS</p>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Membership Type</p>
                  <p className="text-surface-800 dark:text-surface-100">{profileData.membershipType}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Member Since</p>
                  <p className="text-surface-800 dark:text-surface-100">{new Date(profileData.memberSince).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-500">Expiration Date</p>
                  <p className="text-surface-800 dark:text-surface-100">{new Date(profileData.expirationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <button 
                onClick={handleSignOut}
                className="w-full py-3 text-red-500 flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/10 rounded-lg"
              >
                <LogOutIcon size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <p className="text-xs font-medium text-surface-500 dark:text-surface-500 mb-2">RECENT ATTENDANCE</p>
            </div>
            
            {profileData.attendanceHistory.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 flex items-center justify-between ${
                  index !== profileData.attendanceHistory.length - 1 ? 'border-b border-surface-200 dark:border-surface-700' : ''
                }`}
              >
                <div>
                  <p className="text-surface-800 dark:text-surface-100 font-medium">{item.type}</p>
                  <div className="flex items-center text-xs text-surface-500 dark:text-surface-500 mt-1">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()} at {item.time}</span>
                  </div>
                </div>
                <ChevronRightIcon size={18} className="text-surface-400" />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MobileProfile;