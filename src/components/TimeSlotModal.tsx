import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, timeSlot: string) => void;
  mobileNumber: string;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [timeSlots] = useState<string[]>([
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ]);

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
      className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto mt-0 p-6 w-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Service Time</h2>
            <p className="text-gray-600 mt-1">Choose a convenient date and time slot</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#FF7200]" />
                Select Date
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`py-2 px-1 rounded-md text-sm ${
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
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#FF7200]" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-1 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-3 px-4 rounded-md text-left ${
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
              className="w-full bg-[#FF7200] text-white px-4 py-3 rounded-md hover:bg-[#cc5b00] transition-colors disabled:opacity-50"
            >
              Confirm Booking
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default TimeSlotModal; 