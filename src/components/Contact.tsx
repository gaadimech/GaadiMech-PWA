import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement form submission to Strapi
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/JeZSriLWvsvbppm67', '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+918448285289';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@gaadimech.com';
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Contact Us</h2>
          <p className="text-base md:text-lg text-gray-600">Get in touch with our expert team</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            {status === 'success' ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-md text-center">
                <p className="text-lg font-semibold">Thank you for contacting us!</p>
                <p>We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md">
                    {status}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200]"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#FF7200] text-white px-6 py-3 rounded-md hover:bg-[#0e5aa8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-6 md:space-y-8">
            <div 
              className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
              onClick={handleLocationClick}
            >
              <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600 hover:text-[#FF7200]">GaadiMech HQ, 21, Purani Chungi, Jaipur, Rajasthan</p>
              </div>
            </div>
            <div 
              className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
              onClick={handlePhoneClick}
            >
              <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600 hover:text-[#FF7200]">+91 844 828 5289</p>
              </div>
            </div>
            <div 
              className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
              onClick={handleEmailClick}
            >
              <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 hover:text-[#FF7200]">contact@gaadimech.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;