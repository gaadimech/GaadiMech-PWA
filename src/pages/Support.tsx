import React from 'react';
import { Phone, MessageCircle, ArrowLeft, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = 'tel:+917300042410';
  };

  const handleChat = () => {
    const message = encodeURIComponent('Hi! I need help with GaadiMech services.');
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@gaadimech.in';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold ml-4">Support</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Support Options */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How can we help you?</h2>
          
          {/* Call Support */}
          <button
            onClick={handleCall}
            className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Call Support</h3>
              <p className="text-gray-600 text-sm">Speak directly with support</p>
              <p className="text-green-600 text-sm font-medium">+91 73000 42410</p>
            </div>
          </button>

          {/* Chat Support */}
          <button
            onClick={handleChat}
            className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">WhatsApp Chat</h3>
              <p className="text-gray-600 text-sm">Chat with us on WhatsApp</p>
              <p className="text-green-600 text-sm font-medium">Quick response guaranteed</p>
            </div>
          </button>

          {/* Email Support */}
          <button
            onClick={handleEmail}
            className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-gray-600 text-sm">Email for detailed queries</p>
              <p className="text-blue-600 text-sm font-medium">support@gaadimech.in</p>
            </div>
          </button>
        </div>

        {/* Support Hours */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-gray-900">Support Hours</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Saturday</span>
              <span className="font-medium">9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium">10:00 AM - 6:00 PM</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            For emergency services, WhatsApp is available 24/7
          </p>
        </div>

        {/* FAQ Note */}
        <div className="mt-6 p-4 bg-orange-50 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>Quick Tip:</strong> Check our FAQ section for instant answers to common questions about our services, pricing, and booking process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support; 