import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../../utils/iconUtils';

const MobileLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Icons
  const LockIcon = getIcon('Lock');
  const MailIcon = getIcon('Mail');
  const DumbbellIcon = getIcon('Dumbbell');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
      navigate('/mobile');
    }, 1500);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900 px-4 flex flex-col"
    >
      <div className="py-10 text-center">
        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
          <DumbbellIcon className="text-white h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-100">GymFlow</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Member Login</p>
      </div>
      
      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="card mt-6"
      >
        <div className="space-y-4">
          <div>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.password ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={handleChange}
                className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-surface-700 dark:text-surface-300">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary-dark">Forgot password?</a>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
            ) : null}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </motion.form>
      
      <div className="mt-8 text-center">
        <p className="text-surface-600 dark:text-surface-400 text-sm">Don't have an account? <br />Please contact gym staff.</p>
      </div>
    </motion.div>
  );
};

export default MobileLogin;