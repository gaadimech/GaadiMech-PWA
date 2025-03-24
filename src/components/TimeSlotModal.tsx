import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Gift, CheckCircle, Award } from 'lucide-react';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, timeSlot: string) => void;
  mobileNumber: string;
  servicePrice?: number;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber, servicePrice = 0 }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  const allTimeSlots = [
    { start: '09:00', end: '11:00', display: '9:00 AM - 11:00 AM' },
    { start: '11:00', end: '13:00', display: '11:00 AM - 1:00 PM' },
    { start: '13:00', end: '15:00', display: '1:00 PM - 3:00 PM' },
    { start: '15:00', end: '17:00', display: '3:00 PM - 5:00 PM' },
    { start: '17:00', end: '19:00', display: '5:00 PM - 7:00 PM' }
  ];

  useEffect(() => {
    // Generate available dates (today + next 7 days)
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    setAvailableDates(dates);
    setSelectedDate(dates[0]); // Default to today
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const today = new Date();
    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === today.toDateString();

    if (isToday) {
      const currentTime = today.getHours() * 60 + today.getMinutes();
      
      // Filter out time slots that have already started
      const availableSlots = allTimeSlots.filter(slot => {
        const slotStartTime = parseInt(slot.start.split(':')[0]) * 60 + parseInt(slot.start.split(':')[1]);
        // Only show slots that haven't started yet
        return slotStartTime > currentTime;
      });

      setAvailableTimeSlots(availableSlots.map(slot => slot.display));
    } else {
      // For future dates, show all slots
      setAvailableTimeSlots(allTimeSlots.map(slot => slot.display));
    }

    // Reset selected time slot if it's no longer available
    if (selectedTimeSlot && !availableTimeSlots.includes(selectedTimeSlot)) {
      setSelectedTimeSlot('');
    }
  }, [selectedDate]);

  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    
    if (!selectedTimeSlot) {
      alert('Please select a time slot');
      return;
    }
    
    try {
      onSubmit(selectedDate, selectedTimeSlot);
    } catch (error) {
      console.error('Error submitting time slot:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto mt-0 p-4 sm:p-6 w-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflow: 'auto'
        }
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative"
        >
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 shadow-md"
          >
            <X size={18} />
          </button>
          
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Your Service Time</h2>
            <p className="text-sm text-gray-600 mt-1">Choose a convenient date and time slot</p>
          </div>

          {servicePrice > 0 && (
            <div className="mb-4 sm:mb-6 bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-700 font-medium">Original Price</div>
                <div className="text-sm text-gray-500 line-through">₹{servicePrice}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="text-base sm:text-xl font-bold text-green-800">Your Price</div>
                  <div className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                    <Gift className="w-3 h-3 mr-1" />
                    ₹500 OFF
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-green-700">₹{servicePrice - 500}</div>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-green-700 flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Discount applied successfully for mobile number {mobileNumber}
              </div>
              
              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-start sm:items-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-1 sm:mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-amber-800">
                    Congratulations! You've secured one of our limited discount spots.
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Complete your booking now to lock in your ₹500 discount.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#FF7200]" />
                Select Date
              </label>
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`py-1.5 sm:py-2 px-1 rounded-md text-xs sm:text-sm ${
                      selectedDate === date
                        ? 'bg-[#FF7200] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatDateDisplay(date)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#FF7200]" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md text-left text-xs sm:text-sm ${
                      selectedTimeSlot === slot
                        ? 'bg-[#FF7200] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTimeSlot}
              className="w-full bg-[#FF7200] text-white px-4 py-2.5 sm:py-3 rounded-md hover:bg-[#cc5b00] transition-colors disabled:opacity-50 text-sm sm:text-base font-semibold"
            >
              Complete Booking
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default TimeSlotModal; 