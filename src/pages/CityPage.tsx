import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { cities, CityData } from '../data/cityData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { StarIcon } from '@heroicons/react/20/solid';
import { WrenchIcon, SparklesIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const CityPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const normalizedCitySlug = citySlug?.toLowerCase() || '';
  const cityData = cities[normalizedCitySlug];
  const navigate = useNavigate();

  if (!cityData) {
    return <div>City not found</div>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleBookService = () => {
    const message = encodeURIComponent(`Hi, I'd like to book a Car Service in ${cityData.name} through GaadiMech.`);
    window.open(`https://wa.me/917300042410?text=${message}`, '_blank');
  };

  const handleContact = () => {
    window.location.href = `tel:+918448285289`;
  };

  const handleServiceClick = (serviceType: string) => {
    navigate(`/services/${serviceType.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <>
      <Helmet>
        <title>{cityData.title}</title>
        <meta name="description" content={cityData.description} />
        <meta name="keywords" content={cityData.metaKeywords.join(', ')} />
        <meta property="og:title" content={cityData.title} />
        <meta property="og:description" content={cityData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://gaadimech.com/${cityData.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": `GaadiMech Car Service in ${cityData.name}`,
            "description": cityData.description,
            "areaServed": cityData.name,
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityData.name
            },
            "geo": {
              "@type": "GeoCoordinates",
              "addressLocality": cityData.name
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "20:00"
            },
            "telephone": "+91-XXXXXXXXXX",
            "image": "https://gaadimech.com/logo.png"
          })}
        </script>
      </Helmet>

      <Breadcrumb cityName={cityData.name} />

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b-8 border-gray-100">
        {/* Decorative elements */}
        <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#FF7200] opacity-10 blur-xl"></div>
        <div className="hidden md:block absolute bottom-1/3 left-1/4 w-6 h-12 rounded-full bg-[#FF7200] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="inline-block mb-4 relative">
                <div className="absolute inset-0 bg-[#FF7200] rounded-lg blur-sm opacity-30"></div>
                <div className="relative bg-gradient-to-r from-[#FF7200] to-[#FF9500] px-4 py-1 rounded-lg shadow-md">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 text-white fill-white" />
                    <span className="text-white font-bold text-sm uppercase tracking-wider">Expert Service</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Expert Car Service in{" "}
                <div className="inline-block relative">
                  <span className="relative z-10 text-[#FF7200]">{cityData.name}</span>
                  <div className="absolute -bottom-2 left-0 h-3 w-full bg-yellow-200 opacity-40 -rotate-1"></div>
                </div>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-6">
                {cityData.heroSubtitle}
              </p>
              
              <motion.div 
                className="mb-8 space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={itemVariants} 
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <ClockIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">24/7</span> Service Available
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <MapPinIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">Free</span> Pickup & Drop
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-[#FF7200] rounded-full p-3 flex-shrink-0">
                    <ShieldCheckIcon className="text-white h-5 w-5" />
                  </div>
                  <p className="ml-3 text-lg font-medium text-gray-700">
                    <span className="text-[#FF7200] font-bold">100%</span> Satisfaction Guaranteed
                  </p>
                </motion.div>
              </motion.div>
              
              <div className="flex flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookService}
                  className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium hover:from-[#25D366] hover:to-[#128C7E]"
                >
                  <img src="https://i.ibb.co/gM65tZy7/whatsapp-icon.png" alt="WhatsApp" className="mr-2" style={{ width: '36px', height: '36px' }} />
                  Book Service
                  <ArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContact}
                  className="w-1/2 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-2 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium hover:from-[#0e5aa8] hover:to-[#1c7ed6]"
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 md:mt-0 hidden md:block"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FF7200] to-[#FF9500] text-white px-3 py-2 rounded-tr-lg rounded-bl-lg font-bold z-10 shadow-lg">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  <span>EXPRESS SERVICE</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 border-[8px] border-white rounded-lg shadow-xl"></div>
                <img
                  src="https://i.ibb.co/Kcb1YjZc/Mechanic-Image-1.png"
                  alt={`Professional car service in ${cityData.name}`}
                  className="rounded-lg shadow-xl w-full max-w-2xl mx-auto hover:opacity-90 transition-opacity"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl w-auto">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#FF7200] to-[#FF9500] rounded-full p-3">
                    <PhoneIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Emergency Service</p>
                    <a href="tel:+918448285289" className="text-lg font-bold text-gray-900 hover:text-[#FF7200] transition-colors">
                      +91 844 828 5289
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services in {cityData.name}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience premium car service with our expert mechanics. We bring the workshop to your doorstep.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cityData.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleServiceClick(service.title)}
                className="cursor-pointer"
              >
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF7200] bg-opacity-10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF7200] transition-colors duration-300">
                      <WrenchIcon className="w-6 h-6 text-[#FF7200] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-[#FF7200] hover:text-[#FF9500]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service.title);
                    }}
                  >
                    Learn More →
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cityData.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#FF7200] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trusted by thousands of car owners in {cityData.name}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cityData.reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{review.date}</span>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">{review.comment}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-gray-600">{review.location}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our car services in {cityData.name}</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: `How do I find a reliable car mechanic near me in ${cityData.name}?`,
                answer: `GaadiMech is your trusted car mechanic near you in ${cityData.name}. We offer professional automotive repair services with experienced mechanics available 24/7. Our car repair shop near you provides comprehensive vehicle maintenance and repair solutions.`
              },
              {
                question: `What car repair services do you offer in ${cityData.name}?`,
                answer: `Our auto repair shop offers complete car repair services including engine repair, transmission services, brake repair, AC service and repair, denting and painting, tire services, battery replacement, and more. We're your one-stop car service center for all automotive repair needs.`
              },
              {
                question: `How much does car service cost in ${cityData.name}?`,
                answer: `Our car service prices in ${cityData.name} are transparent and competitive. We offer affordable car repairs with no hidden charges. The exact cost depends on your vehicle model and service requirements. Contact us for a detailed quote.`
              },
              {
                question: `Do you provide emergency car repair services in ${cityData.name}?`,
                answer: `Yes, we offer 24/7 emergency car repair services in ${cityData.name}. Whether you need roadside assistance, towing service, or immediate car repair, our mobile mechanics are just a call away.`
              },
              {
                question: `What areas do you cover for car service in ${cityData.name}?`,
                answer: `We provide car repair services across ${cityData.name} including ${cityData.faqs[1].answer}`
              },
              {
                question: `What types of diagnostic services do you offer?`,
                answer: `Our auto repair experts provide comprehensive vehicle diagnostics including check engine light diagnostics, emission testing, electrical system diagnosis, and complete vehicle inspection services. We use advanced diagnostic tools to identify and fix issues accurately.`
              },
              {
                question: `Do you offer specialized car AC services?`,
                answer: `Yes, we are specialists in car AC repair and service. Our car AC mechanics near you can handle all types of AC issues including cooling problems, gas refilling, compressor repair, and complete AC system maintenance.`
              },
              {
                question: `What makes GaadiMech different from other car repair shops?`,
                answer: `GaadiMech stands out with our doorstep service, professional automotive mechanics, transparent pricing, and 100% satisfaction guarantee. We're not just a car repair shop - we're your complete auto care solution with certified mechanics and modern diagnostic equipment.`
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 mb-4 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FF7200] via-[#FF9500] to-[#FF7200] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Service Your Car?</h2>
            <p className="text-xl mb-8 text-white/90">Book your car service in {cityData.name} today and get 20% off on your first service!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookService}
                className="bg-white text-[#FF7200] px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-base font-medium hover:bg-gray-50"
              >
                <img src="https://i.ibb.co/gM65tZy7/whatsapp-icon.png" alt="WhatsApp" className="mr-2" style={{ width: '36px', height: '36px' }} />
                Book Service Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center text-base font-medium"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Contact Support
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityPage; 