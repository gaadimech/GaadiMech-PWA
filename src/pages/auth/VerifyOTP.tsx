import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const VerifyOTP: React.FC = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phone = sessionStorage.getItem('pendingPhone') || '';

  useEffect(() => {
    if (!phone) {
      navigate('/auth/login');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phone, navigate]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (newOTP.every(digit => digit !== '') && newOTP.join('').length === 4) {
      handleVerifyOTP(newOTP.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode: string) => {
    setIsVerifying(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 4-digit OTP
      if (otpCode.length === 4) {
        // Check if user exists (simulate with phone number)
        const isExistingUser = sessionStorage.getItem(`user_${phone}`);
        
        if (isExistingUser) {
          // Existing user - load their data and go to home
          const userData = JSON.parse(isExistingUser);
          login(userData);
          sessionStorage.removeItem('pendingPhone');
          navigate('/');
        } else {
          // New user - create basic profile and go to car selection
          const newUser = {
            id: Date.now().toString(),
            name: '',
            phone: phone,
            email: '',
            birthday: '',
            gender: '',
            cars: [],
            addresses: [],
            orders: []
          };
          
          // Save user to storage
          sessionStorage.setItem(`user_${phone}`, JSON.stringify(newUser));
          login(newUser);
          sessionStorage.removeItem('pendingPhone');
          navigate('/auth/car-selection');
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = () => {
    // Reset countdown and resend OTP
    setCountdown(60);
    setCanResend(false);
    setOTP(['', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // TODO: Implement actual OTP resend logic
    console.log('Resending OTP to:', phone);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const maskedPhone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white">
        <button
          onClick={() => navigate('/auth/login')}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold ml-4">Verify OTP</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Illustration */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 px-4">
            We've sent a 4-digit code to +91 {maskedPhone}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-8">
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                disabled={isVerifying}
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}
        </div>

        {/* Verification Status */}
        {isVerifying && (
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-600">Verifying...</span>
          </div>
        )}

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResendOTP}
              className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in <span className="font-medium">{formatTime(countdown)}</span>
            </p>
          )}
        </div>
      </div>

      {/* Manual Verify Button */}
      <div className="p-6 bg-white border-t">
        <button
          onClick={() => handleVerifyOTP(otp.join(''))}
          disabled={otp.some(digit => digit === '') || isVerifying}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP; 