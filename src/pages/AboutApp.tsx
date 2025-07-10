import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, Users, Car, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Car, label: 'Cars Serviced', value: '10,000+', color: 'text-blue-500' },
  { icon: Users, label: 'Happy Customers', value: '5,000+', color: 'text-green-500' },
  { icon: Wrench, label: 'Expert Technicians', value: '50+', color: 'text-purple-500' },
  { icon: Award, label: 'Years Experience', value: '15+', color: 'text-orange-500' },
];

const features = [
  {
    title: 'Doorstep Service',
    description: 'We come to your location for maximum convenience',
    icon: '🚗',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Expert Technicians',
    description: 'Certified professionals with years of experience',
    icon: '👨‍🔧',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Quality Parts',
    description: 'Only genuine and high-quality spare parts used',
    icon: '⚙️',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: '90-Day Warranty',
    description: 'Peace of mind with our comprehensive warranty',
    icon: '🛡️',
    color: 'bg-orange-50 text-orange-600'
  }
];

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    image: '/images/Logo-OLD.png',
    experience: '15+ years'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    image: '/images/Logo-OLD.png',
    experience: '10+ years'
  },
  {
    name: 'Amit Singh',
    role: 'Lead Technician',
    image: '/images/Logo-OLD.png',
    experience: '12+ years'
  }
];

const AboutApp: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-orange-500 text-white px-4 py-8">
        <div className="text-center">
          <img 
            src="/images/logo.png" 
            alt="GaadiMech" 
            className="w-20 h-20 mx-auto mb-4 bg-white rounded-full p-2"
          />
          <h1 className="text-2xl font-bold mb-2">About GaadiMech</h1>
          <p className="text-orange-100">
            Your trusted partner for professional car care since 2009
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white mx-4 -mt-6 rounded-xl shadow-lg p-4 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="p-4 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2009, GaadiMech has been revolutionizing car care in Jaipur. 
            What started as a small garage has grown into the city's most trusted 
            automotive service provider.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that quality car service should be convenient, transparent, 
            and affordable. That's why we bring our expertise directly to your doorstep.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 gap-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-primary-600">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.experience} experience</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-sm text-gray-600">21, Purani Chungi, Ashok Nagar, Jaipur, Rajasthan 302001</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <a href="tel:+91-8448-285289" className="text-sm text-primary-600">+91-8448-285289</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <a href="mailto:contact@gaadimech.com" className="text-sm text-primary-600">contact@gaadimech.com</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-gray-900">Working Hours</p>
                <p className="text-sm text-gray-600">Mon - Sat: 8:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-4 pb-8">
        <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl p-6 text-white text-center">
          <h3 className="text-lg font-bold mb-2">Ready to Experience the Best?</h3>
          <p className="text-orange-100 mb-4">Book your car service today and join thousands of satisfied customers</p>
          <a
            href="/express"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Service Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutApp; 