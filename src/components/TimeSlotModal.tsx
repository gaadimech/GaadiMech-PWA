import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Gift, CheckCircle, Award, Users } from 'lucide-react';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, timeSlot: string) => void;
  mobileNumber: string;
  servicePrice?: number;
}

// Define interface for time slot
interface TimeSlot {
  start: string;
  end: string;
  display: string;
  isHighPriority: boolean;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ isOpen, onClose, onSubmit, mobileNumber, servicePrice = 0 }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<Record<string, string[]>>({});
  
  const allTimeSlots: TimeSlot[] = [
    { start: '09:00', end: '11:00', display: '9:00 AM - 11:00 AM', isHighPriority: true },
    { start: '11:00', end: '13:00', display: '11:00 AM - 1:00 PM', isHighPriority: false },
    { start: '13:00', end: '15:00', display: '1:00 PM - 3:00 PM', isHighPriority: false },
    { start: '15:00', end: '17:00', display: '3:00 PM - 5:00 PM', isHighPriority: false },
    { start: '17:00', end: '19:00', display: '5:00 PM - 7:00 PM', isHighPriority: true }
  ];

  // Function to generate random booked slots for each date
  const generateRandomBookedSlots = () => {
    const bookedSlots: Record<string, string[]> = {};
    
    availableDates.forEach(date => {
      // Decide how many slots to book (1 or 2)
      const numSlotsToBook = Math.random() < 0.6 ? 1 : 2;
      
      // Create a copy of allTimeSlots that we can modify
      const slotsForDate = [...allTimeSlots];
      
      // Shuffle array using Fisher-Yates algorithm but weighted based on priority
      for (let i = slotsForDate.length - 1; i > 0; i--) {
        // Determine if we should give high priority slots more weight
        const highPriorityFactor = slotsForDate[i].isHighPriority ? 0.6 : 0.4;
        
        // Use the random number with the priority factor to decide if we swap
        if (Math.random() < highPriorityFactor) {
          // Pick a random index to swap with the current index
          const j = Math.floor(Math.random() * (i + 1));
          [slotsForDate[i], slotsForDate[j]] = [slotsForDate[j], slotsForDate[i]];
        }
      }
      
      // Take the first numSlotsToBook slots after shuffling
      bookedSlots[date] = slotsForDate.slice(0, numSlotsToBook).map(slot => slot.display);
    });
    
    return bookedSlots;
  };

  // Helper function to get current time in IST
  const getCurrentTimeIST = () => {
    // Get current time in UTC
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    return istTime;
  };

  useEffect(() => {
    // Get current IST date and time
    const todayIST = getCurrentTimeIST();
    const currentHourIST = todayIST.getHours();
    const currentMinutesIST = todayIST.getMinutes();
    
    // Create a new date object for start date
    const startDate = new Date(todayIST);
    
    // Generate dates starting from the appropriate day
    const dates: string[] = [];
    
    for (let i = 0; i < 8; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      // Format date in YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dates.push(formattedDate);
    }
    
    setAvailableDates(dates);
    
    // If it's past the last slot time (5 PM), select tomorrow's date by default
    const isAfterLastSlot = currentHourIST >= 17;
    setSelectedDate(isAfterLastSlot ? dates[1] : dates[0]);
  }, []);

  useEffect(() => {
    if (availableDates.length > 0 && Object.keys(bookedSlotsByDate).length === 0) {
      // Generate random booked slots when dates are first loaded
      setBookedSlotsByDate(generateRandomBookedSlots());
    }
  }, [availableDates]);

  useEffect(() => {
    if (!selectedDate) return;

    const todayIST = getCurrentTimeIST();
    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === todayIST.toDateString();

    let filteredSlots: string[] = [];

    if (isToday) {
      const currentTimeIST = todayIST.getHours() * 60 + todayIST.getMinutes();
      
      // Filter out time slots that have already started
      filteredSlots = allTimeSlots
        .filter(slot => {
          const slotStartTime = parseInt(slot.start.split(':')[0]) * 60 + parseInt(slot.start.split(':')[1]);
          // Only show slots that haven't started yet
          return slotStartTime > currentTimeIST;
        })
        .map(slot => slot.display);
    } else {
      // For future dates, show all slots
      filteredSlots = allTimeSlots.map(slot => slot.display);
    }

    // Filter out booked slots for the selected date
    const bookedSlotsForDate = bookedSlotsByDate[selectedDate] || [];
    const availableSlots = filteredSlots.filter(slot => !bookedSlotsForDate.includes(slot));
    
    setAvailableTimeSlots(availableSlots);

    // Reset selected time slot if it's no longer available
    if (selectedTimeSlot && !availableSlots.includes(selectedTimeSlot)) {
      setSelectedTimeSlot('');
    }
  }, [selectedDate, bookedSlotsByDate]);

  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const todayIST = getCurrentTimeIST();
    const today = new Date(todayIST);
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const inputDate = new Date(dateStr + 'T00:00:00');
    
    // Compare dates without time
    const compareDate = (date1: Date, date2: Date) => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
    
    if (compareDate(inputDate, today)) return 'Today';
    if (compareDate(inputDate, tomorrow)) return 'Tomorrow';
    
    return inputDate.toLocaleDateString('en-US', { 
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

  // Get all slots for display and marking as booked
  const allTimeSlotDisplays = allTimeSlots.map(slot => slot.display);
  const bookedSlotsForSelectedDate = bookedSlotsByDate[selectedDate] || [];

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
              
              <div className="mb-2 flex justify-between items-center">
                <p className="text-xs text-gray-500 flex items-center">
                  <Users className="w-3 h-3 mr-1 text-gray-400" />
                  {bookedSlotsForSelectedDate.length} slot{bookedSlotsForSelectedDate.length !== 1 ? 's' : ''} already booked today
                </p>
                <p className="text-xs text-gray-500">
                  {availableTimeSlots.length} slot{availableTimeSlots.length !== 1 ? 's' : ''} available
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                {/* Display all slots in chronological order */}
                {allTimeSlots.map((slot) => {
                  const isBooked = bookedSlotsForSelectedDate.includes(slot.display);
                  const isPastSlot = selectedDate === availableDates[0] && new Date().getHours() > parseInt(slot.start.split(':')[0]);
                  
                  // Don't show past slots for today
                  if (isPastSlot) return null;
                  
                  if (isBooked) {
                    return (
                      <div 
                        key={`slot-${slot.display}`}
                        className="py-2 sm:py-3 px-3 sm:px-4 rounded-md text-left text-xs sm:text-sm bg-gray-200 text-gray-500 opacity-80 cursor-not-allowed flex justify-between items-center border border-gray-300"
                      >
                        <span>{slot.display}</span>
                        <span className="text-xs bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full flex items-center font-medium border border-gray-400">
                          <Users className="w-3 h-3 mr-1" />
                          Booked
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <button
                        key={`slot-${slot.display}`}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.display)}
                        className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md text-left text-xs sm:text-sm border ${
                          selectedTimeSlot === slot.display
                            ? 'bg-[#FF7200] text-white border-[#FF7200]'
                            : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        {slot.display}
                      </button>
                    );
                  }
                })}
                
                {availableTimeSlots.length === 0 && bookedSlotsForSelectedDate.length === 0 && (
                  <div className="py-4 text-center text-sm text-gray-500">
                    No time slots available for this date.
                  </div>
                )}
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