import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { submitContactForm } from '../services/contact';
import BlogCarousel from './BlogCarousel';

interface ContactProps {
  isHomePage?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact: React.FC<ContactProps> = ({ isHomePage = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation - Indian phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitAttempted(true);
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    try {
      await submitContactForm(formData);
      setStatus('success');
      
      // Track mobile number with Zepic
      if (window.zepic) {
        window.zepic.identify('mobile_number', formData.phone);
      }
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTouchedFields({});
      setIsSubmitAttempted(false);
    } catch (error) {
      setStatus('error');
      const message = (error as any)?.response?.data?.error?.message || 'Something went wrong. Please try again.';
      setErrorMessage(message);
      console.error('Contact form submission error:', message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setTouchedFields(prev => ({ ...prev, [id]: true }));
    
    // Only validate this field if it's been touched or form submission was attempted
    if (touchedFields[id] || isSubmitAttempted) {
      const newErrors = validateForm();
      setErrors(prev => ({
        ...prev,
        [id]: newErrors[id as keyof FormErrors]
      }));
    }
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

  const shouldShowError = (fieldName: keyof FormErrors) => {
    return (touchedFields[fieldName] || isSubmitAttempted) && errors[fieldName];
  };

  // Contact information items
  const contactInfoItems = [
    {
      icon: <MapPin className="text-white" size={24} />,
      title: "Location",
      content: "GaadiMech HQ, 21, Purani Chungi, Jaipur, Rajasthan",
      onClick: handleLocationClick
    },
    {
      icon: <Phone className="text-white" size={24} />,
      title: "Phone",
      content: "+91 844 828 5289",
      onClick: handlePhoneClick
    },
    {
      icon: <Mail className="text-white" size={24} />,
      title: "Email",
      content: "contact@gaadimech.com",
      onClick: handleEmailClick
    }
  ];

  // Render contact information item
  const renderContactItem = (item: any, index: number) => (
    <div 
      key={index}
      className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
      onClick={item.onClick}
    >
      <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
        {item.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-gray-600 hover:text-[#FF7200]">{item.content}</p>
      </div>
    </div>
  );

  // Home page layout with just the contact info in horizontal format
  if (isHomePage) {
    return (
      <section id="contact" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Contact Us</h2>
            <p className="text-base md:text-lg text-gray-600">Get in touch with our expert team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfoItems.map((item, index) => renderContactItem(item, index))}
          </div>
          
          {/* Recent Blog Posts Carousel */}
          <div className="mt-16">
            <BlogCarousel maxPosts={5} />
          </div>
        </div>
      </section>
    );
  }

  // Contact page layout with form and contact info
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
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      shouldShowError('name') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {shouldShowError('name') && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      shouldShowError('email') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {shouldShowError('email') && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      shouldShowError('phone') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {shouldShowError('phone') && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full rounded-md shadow-sm focus:border-[#FF7200] focus:ring-[#FF7200] ${
                      shouldShowError('message') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  ></textarea>
                  {shouldShowError('message') && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
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
            {contactInfoItems.map((item, index) => renderContactItem(item, index))}
          </div>
        </div>
        
        {/* Recent Blog Posts Carousel */}
        <div className="mt-16">
          <BlogCarousel maxPosts={5} />
        </div>
      </div>
    </section>
  );
};

export default Contact;