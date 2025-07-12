import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOtp } = useUser();

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);

    try {
      // Send OTP using Strapi backend
      const response = await sendOtp(phone);
      
      if (response.success) {
        // Store session ID and phone for OTP verification
        sessionStorage.setItem('otp_session_id', response.sessionId);
        sessionStorage.setItem('pendingPhone', phone);
        
        // Navigate to OTP verification
        navigate('/auth/verify-otp');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    // TODO: Implement social login
    console.log(`Login with ${platform}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full shadow-sm flex items-center justify-center">
          <img src="/images/logo.png" alt="GaadiMech" className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to GaadiMech</h1>
        <p className="text-gray-600 px-8">
          Your trusted car service partner in Jaipur
        </p>
      </div>

      {/* Car Service Illustration */}
      <div className="flex-1 flex items-center justify-center px-8">
        <img 
          src="/images/auth/car-service-illustration.svg" 
          alt="Car Service" 
          className="w-64 h-48 object-contain"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-t-3xl px-6 py-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent">
              <div className="flex items-center px-3 py-3 border-r border-gray-300">
                <img src="/images/auth/india-flag.svg" alt="India" className="w-6 h-4 mr-2" />
                <span className="text-gray-700">+91</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 px-4 py-3 focus:outline-none"
                maxLength={10}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending OTP...' : 'Continue'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('WhatsApp')}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6" />
            <span className="font-medium text-gray-700">Continue with WhatsApp</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-6 px-4">
          By continuing, you agree to our{' '}
          <a href="/legal/terms" className="text-orange-600 underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/legal/privacy-policy" className="text-orange-600 underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 