import React from 'react';
import { X, MessageCircle } from 'lucide-react';

interface WatiChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatiChatInterface: React.FC<WatiChatInterfaceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
            Chat Support
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 font-medium">Chat Feature Temporarily Unavailable</p>
            <p className="text-yellow-700 text-sm mt-2">
              We're currently upgrading our backend. Please contact us directly for support.
            </p>
          </div>
          
          <div className="space-y-3">
            <a
              href="tel:+919876543210"
              className="block bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              📞 Call Us: +91 98765 43210
            </a>
            
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatiChatInterface;

/* 
TODO: Reconnect with new Strapi V5 backend
Original component had advanced chat functionality with:
- Multi-step booking flow
- Vehicle selection
- Service type selection  
- Date/time picker
- Strapi integration for saving bookings
- WhatsApp redirect functionality

To restore full functionality:
1. Set up new Strapi V5 backend
2. Create chatbot-bookings collection type
3. Implement API client for new backend
4. Restore chat flow logic
5. Test booking flow end-to-end
*/ 