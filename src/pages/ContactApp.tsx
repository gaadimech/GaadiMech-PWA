import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const quickActions = [
  {
    icon: Phone,
    title: 'Call Now',
    subtitle: 'Speak to our experts',
    action: 'tel:+91-8448-285289',
    color: 'bg-green-50 text-green-600',
    bgColor: 'bg-green-500'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    subtitle: 'Chat with us instantly',
    action: 'https://wa.me/918448285289',
    color: 'bg-green-50 text-green-600',
    bgColor: 'bg-green-500'
  },
  {
    icon: Mail,
    title: 'Email Us',
    subtitle: 'Send us your queries',
    action: 'mailto:contact@gaadimech.com',
    color: 'bg-blue-50 text-blue-600',
    bgColor: 'bg-blue-500'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    subtitle: 'Find our location',
    action: 'https://maps.google.com/maps?q=21+Purani+Chungi+Ashok+Nagar+Jaipur',
    color: 'bg-red-50 text-red-600',
    bgColor: 'bg-red-500'
  }
];

const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl p-8 text-center shadow-lg max-w-sm w-full"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting back in 3 seconds...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-orange-500 text-white px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
          <p className="text-orange-100">
            We're here to help with all your car service needs
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.action}
              target={action.action.startsWith('http') ? '_blank' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${action.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{action.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="car-service">Car Service Inquiry</option>
                <option value="booking">Service Booking</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Business Hours */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Business Hours</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium text-gray-900">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium text-gray-900">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 font-medium">
                🚨 Emergency services available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="p-4 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Our Location</h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-600">
              21, Purani Chungi, Ashok Nagar<br />
              Jaipur, Rajasthan 302001<br />
              India
            </p>
            
            <a
              href="https://maps.google.com/maps?q=21+Purani+Chungi+Ashok+Nagar+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700"
            >
              <MapPin className="w-4 h-4" />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp; 