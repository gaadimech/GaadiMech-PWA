import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Car, Clock, MapPin, Phone, Star, CheckCircle, Shield, Wrench, Users, Award, Calendar } from 'lucide-react';

interface CityData {
  name: string;
  state: string;
  description: string;
  services: string[];
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  serviceAreas: string[];
  testimonials: Array<{
    name: string;
    rating: number;
    text: string;
    service: string;
  }>;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

const cityData: Record<string, CityData> = {
  jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    description: 'Looking for reliable car service in Jaipur? GaadiMech offers professional car repair, maintenance, and AC service in Jaipur. Our expert mechanics provide doorstep car service, car repair, and car maintenance across all areas of Jaipur including Malviya Nagar, Vaishali Nagar, C-Scheme, and more.',
    services: [
      'Car AC Service',
      'Denting & Painting',
      'Periodic Maintenance',
      'Car Spa & Cleaning',
      'Battery Service',
      'Windshield Service',
      'Car Detailing',
      'Tyre Service'
    ],
    address: '21, Purani Chungi, Jaipur, Rajasthan 302033',
    phone: '+91 844 828 5289',
    rating: 4.8,
    reviewCount: 250,
    serviceAreas: [
      'Malviya Nagar',
      'Vaishali Nagar',
      'C-Scheme',
      'Raja Park',
      'Bani Park',
      'Civil Lines',
      'Mansarovar',
      'Jawahar Nagar',
      'Sitapura',
      'Tonk Road'
    ],
    testimonials: [
      {
        name: 'Rahul Sharma',
        rating: 5,
        text: 'Best car service in Jaipur! Their AC service is excellent and reasonably priced.',
        service: 'AC Service'
      },
      {
        name: 'Priya Gupta',
        rating: 5,
        text: 'Very professional service. They came to my home in Vaishali Nagar for car repair.',
        service: 'Car Repair'
      },
      {
        name: 'Amit Patel',
        rating: 5,
        text: 'Great experience with their denting and painting service in Jaipur.',
        service: 'Denting & Painting'
      }
    ],
    features: [
      {
        icon: <Shield className="w-8 h-8 text-[#FF7200]" />,
        title: 'Genuine Parts',
        description: 'We use only genuine spare parts for all car repairs in Jaipur'
      },
      {
        icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
        title: 'Expert Mechanics',
        description: 'Our certified mechanics have years of experience in car service'
      },
      {
        icon: <Users className="w-8 h-8 text-[#FF7200]" />,
        title: 'Customer Support',
        description: '24/7 support for all your car service needs in Jaipur'
      },
      {
        icon: <Award className="w-8 h-8 text-[#FF7200]" />,
        title: 'Quality Service',
        description: 'Best car service center in Jaipur with 4.8/5 rating'
      }
    ]
  },
  delhi: {
    name: 'Delhi',
    state: 'Delhi',
    description: 'Looking for reliable car service in Delhi? GaadiMech offers professional car repair, maintenance, and AC service in Delhi. Our expert mechanics provide doorstep car service, car repair, and car maintenance across all areas of Delhi including South Delhi, North Delhi, East Delhi, and more.',
    services: [
      'Car AC Service',
      'Denting & Painting',
      'Periodic Maintenance',
      'Car Spa & Cleaning',
      'Battery Service',
      'Windshield Service',
      'Car Detailing',
      'Tyre Service'
    ],
    address: 'Shop No. 123, Sector 12, Dwarka, New Delhi 110075',
    phone: '+91 844 828 5289',
    rating: 4.8,
    reviewCount: 300,
    serviceAreas: [
      'South Delhi',
      'North Delhi',
      'East Delhi',
      'West Delhi',
      'Central Delhi',
      'Dwarka',
      'Rohini',
      'Noida',
      'Gurgaon',
      'Faridabad'
    ],
    testimonials: [
      {
        name: 'Arun Kumar',
        rating: 5,
        text: 'Best car service in Delhi! Their doorstep service in South Delhi is excellent.',
        service: 'Doorstep Service'
      },
      {
        name: 'Neha Singh',
        rating: 5,
        text: 'Very professional AC service in Delhi. They came to my home in Dwarka.',
        service: 'AC Service'
      },
      {
        name: 'Rajesh Verma',
        rating: 5,
        text: 'Great experience with their car repair service in Delhi. Highly recommended!',
        service: 'Car Repair'
      }
    ],
    features: [
      {
        icon: <Shield className="w-8 h-8 text-[#FF7200]" />,
        title: 'Genuine Parts',
        description: 'We use only genuine spare parts for all car repairs in Delhi'
      },
      {
        icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
        title: 'Expert Mechanics',
        description: 'Our certified mechanics have years of experience in Delhi car service'
      },
      {
        icon: <Users className="w-8 h-8 text-[#FF7200]" />,
        title: 'Customer Support',
        description: '24/7 support for all your car service needs in Delhi'
      },
      {
        icon: <Award className="w-8 h-8 text-[#FF7200]" />,
        title: 'Quality Service',
        description: 'Best car service center in Delhi with 4.8/5 rating'
      }
    ]
  },
  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    description: 'Looking for reliable car service in Mumbai? GaadiMech offers professional car repair, maintenance, and AC service in Mumbai. Our expert mechanics provide doorstep car service, car repair, and car maintenance across all areas of Mumbai including Andheri, Bandra, Powai, and more.',
    services: [
      'Car AC Service',
      'Denting & Painting',
      'Periodic Maintenance',
      'Car Spa & Cleaning',
      'Battery Service',
      'Windshield Service',
      'Car Detailing',
      'Tyre Service'
    ],
    address: 'Shop No. 45, Andheri West, Mumbai, Maharashtra 400053',
    phone: '+91 844 828 5289',
    rating: 4.8,
    reviewCount: 280,
    serviceAreas: [
      'Andheri',
      'Bandra',
      'Powai',
      'Juhu',
      'Malad',
      'Borivali',
      'Thane',
      'Navi Mumbai',
      'Chembur',
      'Goregaon'
    ],
    testimonials: [
      {
        name: 'Rahul Desai',
        rating: 5,
        text: 'Best car service in Mumbai! Their AC service in Andheri is excellent.',
        service: 'AC Service'
      },
      {
        name: 'Priya Shah',
        rating: 5,
        text: 'Very professional service. They came to my home in Bandra for car repair.',
        service: 'Car Repair'
      },
      {
        name: 'Amit Patel',
        rating: 5,
        text: 'Great experience with their denting and painting service in Mumbai.',
        service: 'Denting & Painting'
      }
    ],
    features: [
      {
        icon: <Shield className="w-8 h-8 text-[#FF7200]" />,
        title: 'Genuine Parts',
        description: 'We use only genuine spare parts for all car repairs in Mumbai'
      },
      {
        icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
        title: 'Expert Mechanics',
        description: 'Our certified mechanics have years of experience in Mumbai car service'
      },
      {
        icon: <Users className="w-8 h-8 text-[#FF7200]" />,
        title: 'Customer Support',
        description: '24/7 support for all your car service needs in Mumbai'
      },
      {
        icon: <Award className="w-8 h-8 text-[#FF7200]" />,
        title: 'Quality Service',
        description: 'Best car service center in Mumbai with 4.8/5 rating'
      }
    ]
  },
  bangalore: {
    name: 'Bangalore',
    state: 'Karnataka',
    description: 'Looking for reliable car service in Bangalore? GaadiMech offers professional car repair, maintenance, and AC service in Bangalore. Our expert mechanics provide doorstep car service, car repair, and car maintenance across all areas of Bangalore including Koramangala, Indiranagar, Whitefield, and more.',
    services: [
      'Car AC Service',
      'Denting & Painting',
      'Periodic Maintenance',
      'Car Spa & Cleaning',
      'Battery Service',
      'Windshield Service',
      'Car Detailing',
      'Tyre Service'
    ],
    address: 'Shop No. 78, Koramangala 5th Block, Bangalore, Karnataka 560034',
    phone: '+91 844 828 5289',
    rating: 4.8,
    reviewCount: 320,
    serviceAreas: [
      'Koramangala',
      'Indiranagar',
      'Whitefield',
      'Electronic City',
      'Marathahalli',
      'HSR Layout',
      'JP Nagar',
      'Bannerghatta',
      'Malleshwaram',
      'Rajajinagar'
    ],
    testimonials: [
      {
        name: 'Suresh Kumar',
        rating: 5,
        text: 'Best car service in Bangalore! Their AC service in Koramangala is excellent.',
        service: 'AC Service'
      },
      {
        name: 'Anita Reddy',
        rating: 5,
        text: 'Very professional service. They came to my home in Indiranagar for car repair.',
        service: 'Car Repair'
      },
      {
        name: 'Ravi Shankar',
        rating: 5,
        text: 'Great experience with their denting and painting service in Bangalore.',
        service: 'Denting & Painting'
      }
    ],
    features: [
      {
        icon: <Shield className="w-8 h-8 text-[#FF7200]" />,
        title: 'Genuine Parts',
        description: 'We use only genuine spare parts for all car repairs in Bangalore'
      },
      {
        icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
        title: 'Expert Mechanics',
        description: 'Our certified mechanics have years of experience in Bangalore car service'
      },
      {
        icon: <Users className="w-8 h-8 text-[#FF7200]" />,
        title: 'Customer Support',
        description: '24/7 support for all your car service needs in Bangalore'
      },
      {
        icon: <Award className="w-8 h-8 text-[#FF7200]" />,
        title: 'Quality Service',
        description: 'Best car service center in Bangalore with 4.8/5 rating'
      }
    ]
  },
  pune: {
    name: 'Pune',
    state: 'Maharashtra',
    description: 'Looking for reliable car service in Pune? GaadiMech offers professional car repair, maintenance, and AC service in Pune. Our expert mechanics provide doorstep car service, car repair, and car maintenance across all areas of Pune including Kothrud, Hadapsar, Hinjewadi, and more.',
    services: [
      'Car AC Service',
      'Denting & Painting',
      'Periodic Maintenance',
      'Car Spa & Cleaning',
      'Battery Service',
      'Windshield Service',
      'Car Detailing',
      'Tyre Service'
    ],
    address: 'Shop No. 34, Kothrud Main Road, Pune, Maharashtra 411038',
    phone: '+91 844 828 5289',
    rating: 4.8,
    reviewCount: 250,
    serviceAreas: [
      'Kothrud',
      'Hadapsar',
      'Hinjewadi',
      'Aundh',
      'Baner',
      'Wakad',
      'Kharadi',
      'Viman Nagar',
      'Koregaon Park',
      'Deccan'
    ],
    testimonials: [
      {
        name: 'Rajesh Deshmukh',
        rating: 5,
        text: 'Best car service in Pune! Their AC service in Kothrud is excellent.',
        service: 'AC Service'
      },
      {
        name: 'Meera Joshi',
        rating: 5,
        text: 'Very professional service. They came to my home in Hadapsar for car repair.',
        service: 'Car Repair'
      },
      {
        name: 'Amit Deshpande',
        rating: 5,
        text: 'Great experience with their denting and painting service in Pune.',
        service: 'Denting & Painting'
      }
    ],
    features: [
      {
        icon: <Shield className="w-8 h-8 text-[#FF7200]" />,
        title: 'Genuine Parts',
        description: 'We use only genuine spare parts for all car repairs in Pune'
      },
      {
        icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
        title: 'Expert Mechanics',
        description: 'Our certified mechanics have years of experience in Pune car service'
      },
      {
        icon: <Users className="w-8 h-8 text-[#FF7200]" />,
        title: 'Customer Support',
        description: '24/7 support for all your car service needs in Pune'
      },
      {
        icon: <Award className="w-8 h-8 text-[#FF7200]" />,
        title: 'Quality Service',
        description: 'Best car service center in Pune with 4.8/5 rating'
      }
    ]
  }
};

const CityPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const data = cityData[city?.toLowerCase() || ''];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">City not found</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>Car Service in {data.name} | Best Car Repair & Maintenance in {data.name}</title>
        <meta name="description" content={data.description} />
        <meta property="og:title" content={`Car Service in ${data.name} | Best Car Repair & Maintenance`} />
        <meta property="og:description" content={data.description} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`car service in ${data.name}, car repair in ${data.name}, car maintenance in ${data.name}, car ac service in ${data.name}, car mechanic in ${data.name}, car service center in ${data.name}, car repair shop in ${data.name}, car service near me in ${data.name}`} />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF7200] to-[#0e5aa8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Car Service in {data.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {data.description}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-2" />
                <span className="text-lg">{data.rating} ({data.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span className="text-lg">90-Minute Service</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span className="text-lg">Same Day Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Car Services in {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Car className="text-[#FF7200] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{service}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Professional {service.toLowerCase()} in {data.name} with expert technicians and genuine parts.
                </p>
                <button
                  onClick={() => window.open(`https://wa.me/917300042410?text=I'd like to book ${service} in ${data.name}`, '_blank')}
                  className="text-[#FF7200] hover:text-[#0e5aa8] font-medium flex items-center"
                >
                  Book Now
                  <CheckCircle className="ml-2" size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Car Service Areas in {data.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-700">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Customers in {data.name} Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="text-gray-700">{testimonial.rating}</span>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{testimonial.name}</span>
                  <span className="text-sm text-gray-500">{testimonial.service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Service Center in {data.name}</h2>
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#FF7200] mt-1" />
                <div>
                  <p className="text-gray-700">{data.address}</p>
                  <button
                    onClick={() => window.open('https://maps.app.goo.gl/JeZSriLWvsvbppm67', '_blank')}
                    className="text-[#FF7200] hover:text-[#0e5aa8] mt-2"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="flex items-start space-x-3">
                <Phone className="text-[#FF7200] mt-1" />
                <div>
                  <p className="text-gray-700">{data.phone}</p>
                  <button
                    onClick={() => window.location.href = `tel:${data.phone}`}
                    className="text-[#FF7200] hover:text-[#0e5aa8] mt-2"
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CityPage; 