import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import CarSelectionModal from '../../components/CarSelectionModal';

const CarSelection: React.FC = () => {
  const { user, addCar, isLoading } = useUser();
  const navigate = useNavigate();
  const [isCarSelectionModalOpen, setIsCarSelectionModalOpen] = useState(true);

  console.log('🔍 CarSelection: Component state', {
    user: !!user,
    isLoading,
    userPhone: user?.phone
  });

  // Don't redirect while user data is loading
  useEffect(() => {
    if (!isLoading && !user) {
      console.log('⚠️ CarSelection: No user found after loading, redirecting to login');
      navigate('/auth/login');
    }
  }, [user, isLoading, navigate]);

  // Show loading while user data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user (will be redirected)
  if (!user) {
    return null;
  }

  const handleCarSelectionSubmit = async (brand: string, model: string, fuelType: string, price: number) => {
    try {
      console.log('🚗 CarSelection: Adding car', { brand, model, fuelType });
      
      // Add the car to user's profile in Strapi
      await addCar({
        registrationNumber: `${brand}-${model}-${Date.now()}`, // Generate a temporary registration number
        make: brand,
        model: model,
        year: new Date().getFullYear(), // Default to current year
        fuelType: fuelType,
        isPrimary: true // First car is always primary
      });
      
      console.log('✅ CarSelection: Car added successfully, navigating to home');
      setIsCarSelectionModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('❌ CarSelection: Error adding car:', error);
      // Still navigate even if car addition fails
      setIsCarSelectionModalOpen(false);
      navigate('/');
    }
  };

  const handleSkip = () => {
    console.log('⏭️ CarSelection: Skipping car selection, navigating to home');
    setIsCarSelectionModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Add Your Car</h1>
        <p className="text-gray-600">
          Help us serve you better by adding your car details
        </p>
      </div>

      {/* Skip Button */}
      <div className="flex-1 flex items-center justify-center p-6">
        <button
          onClick={handleSkip}
          className="text-gray-600 font-medium hover:text-gray-800 transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Car Selection Modal */}
      <CarSelectionModal
        isOpen={isCarSelectionModalOpen}
        onClose={handleSkip}
        onSubmit={handleCarSelectionSubmit}
        mobileNumber={user.phone}
      />
    </div>
  );
};

export default CarSelection; 