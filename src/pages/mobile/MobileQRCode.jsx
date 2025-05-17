import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import { getIcon } from '../../utils/iconUtils';
import MobileHeader from '../../components/mobile/MobileHeader';

const MobileQRCode = () => {
  const [mode, setMode] = useState('show'); // 'show' or 'scan'
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [scanActive, setScanActive] = useState(false);
  
  // Icons
  const QrCodeIcon = getIcon('QrCode');
  const ScanLineIcon = getIcon('Scan');
  const CheckCircleIcon = getIcon('CheckCircle');
  const AlertCircleIcon = getIcon('AlertCircle');
  const RefreshCwIcon = getIcon('RefreshCw');
  
  // Fetch member data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMemberData({
        id: 1,
        name: 'Alex Johnson',
        qrCodeData: '123456789',
        membershipStatus: 'active',
        lastCheckIn: '2023-10-15T09:30:00'
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  // Simulate QR code scanning
  const startScan = () => {
    setScanActive(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanActive(false);
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;
      
      if (success) {
        setScanResult({
          success: true,
          data: {
            className: 'Yoga Flow',
            time: '10:00 AM',
            date: new Date().toLocaleDateString()
          }
        });
        toast.success('Check-in successful!');
      } else {
        setScanResult({
          success: false,
          error: 'Invalid QR code or class not found'
        });
        toast.error('Check-in failed. Please try again.');
      }
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <MobileHeader title="QR Code" showBack={true} />
      
      <div className="px-4 py-6">
        {/* Mode Switcher */}
        <div className="bg-surface-100 dark:bg-surface-800 p-1 rounded-lg flex mb-6">
          <button
            onClick={() => setMode('show')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              mode === 'show'
                ? 'bg-white dark:bg-surface-700 shadow-sm'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            My QR Code
          </button>
          <button
            onClick={() => setMode('scan')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              mode === 'scan'
                ? 'bg-white dark:bg-surface-700 shadow-sm'
                : 'text-surface-600 dark:text-surface-400'
            }`}
          >
            Scan QR Code
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {mode === 'show' ? (
            <motion.div
              key="show-qr"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-10 shadow-sm flex flex-col items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mb-4"></div>
                  <p className="text-surface-600 dark:text-surface-400">Loading your QR code...</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
                      Your Member QR Code
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      Scan this code at the gym for check-in
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl flex justify-center shadow-sm mb-4 max-w-xs mx-auto">
                    <QRCodeSVG 
                      value={memberData.qrCodeData}
                      size={200}
                      level="H"
                      includeMargin={true}
                      imageSettings={{
                        src: "/favicon.ico",
                        excavate: true,
                        height: 24,
                        width: 24,
                      }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-surface-500 dark:text-surface-500">
                      Member ID: #{memberData.id}
                    </p>
                    <p className="text-surface-800 dark:text-surface-100 font-medium mt-1">
                      {memberData.name}
                    </p>
                    <p className={`text-sm mt-2 ${
                      memberData.membershipStatus === 'active' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {memberData.membershipStatus === 'active' ? 'Active Membership' : 'Inactive Membership'}
                    </p>
                    
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 mt-4">
                      <p className="text-sm text-primary">
                        Last Check-In: {new Date(memberData.lastCheckIn).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mt-4">
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  <strong>Tip:</strong> Show this QR code to the staff at the reception or use the self-check-in kiosks at the entrance.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scan-qr"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
                    Scan QR Code
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Scan class QR codes for attendance verification
                  </p>
                </div>
                
                {scanResult ? (
                  <div className={`p-4 rounded-xl ${
                    scanResult.success 
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-900/50' 
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50'
                  }`}>
                    <div className="flex items-center justify-center mb-3">
                      {scanResult.success ? (
                        <CheckCircleIcon size={40} className="text-green-500" />
                      ) : (
                        <AlertCircleIcon size={40} className="text-red-500" />
                      )}
                    </div>
                    
                    {scanResult.success ? (
                      <div className="text-center">
                        <p className="font-semibold text-green-800 dark:text-green-300">Check-in Successful!</p>
                        <div className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
                          <p>Class: {scanResult.data.className}</p>
                          <p>Time: {scanResult.data.time}</p>
                          <p>Date: {scanResult.data.date}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="font-semibold text-red-800 dark:text-red-300">Check-in Failed</p>
                        <p className="mt-1 text-sm text-red-700 dark:text-red-400">{scanResult.error}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setScanResult(null)}
                      className="w-full mt-4 py-2 px-4 bg-surface-100 dark:bg-surface-700 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      <RefreshCwIcon size={16} className="mr-2" />
                      Scan Again
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className={`aspect-square bg-black/10 dark:bg-black/30 rounded-lg flex flex-col items-center justify-center mb-4 overflow-hidden ${
                      scanActive ? 'animate-pulse' : ''
                    }`}>
                      {scanActive ? (
                        <>
                          <div className="absolute top-0 left-0 right-0 h-px bg-primary animate-[scan_1.5s_ease-in-out_infinite]"></div>
                          <div className="text-surface-500 dark:text-surface-400">
                            <ScanLineIcon size={80} className="opacity-50" />
                          </div>
                          <p className="text-sm text-surface-600 dark:text-surface-400 mt-4">
                            Scanning...
                          </p>
                        </>
                      ) : (
                        <>
                          <QrCodeIcon size={64} className="text-surface-400" />
                          <p className="text-sm text-surface-600 dark:text-surface-400 mt-4">
                            Place the QR code in the camera view
                          </p>
                        </>
                      )}
                    </div>
                    
                    <button
                      onClick={startScan}
                      disabled={scanActive}
                      className={`w-full py-3 rounded-lg font-medium ${
                        scanActive 
                          ? 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {scanActive ? 'Scanning...' : 'Start Scanning'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm mt-4">
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  <strong>Note:</strong> QR codes can be found at each class location or provided by the instructor.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileQRCode;