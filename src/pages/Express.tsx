import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Car, PenTool as Tool, Phone, CheckCircle, ArrowRight, Share2, Gift, Wrench, Sparkles, Timer, Calendar, Image, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { expressService } from '../services/expressService';
import CustomerForm from '../components/CustomerForm';

const serviceComparison = [
  {
    name: "Express Service",
    time: "90 Minutes",
    highlight: true,
    features: [
      "Quick turnaround time",
      "Multiple technicians working simultaneously",
      "Real-time service updates",
      "Oil and filter change",
      "Basic inspection",
      "Fluid level check",
      "Tire pressure check",
      "Battery check",
      "AC performance check"
    ]
  },
  {
    name: "Basic Periodic Service",
    time: "4 Hours",
    features: [
      "Comprehensive inspection",
      "Oil and filter change",
      "Brake inspection",
      "Fluid level top-up",
      "Battery health check",
      "Tire rotation",
      "Air filter check",
      "Basic diagnostics"
    ]
  }
];

const steps = [
  {
    icon: <Clock className="w-12 h-12 text-[#FF7200]" />,
    title: "Book Online",
    description: "Schedule your express service in seconds"
  },
  {
    icon: <Car className="w-12 h-12 text-[#FF7200]" />,
    title: "Express Pickup",
    description: "Optional doorstep pickup service"
  },
  {
    icon: <Tool className="w-12 h-12 text-[#FF7200]" />,
    title: "90-Minute Service",
    description: "Expert mechanics work simultaneously"
  },
  {
    icon: <Phone className="w-12 h-12 text-[#FF7200]" />,
    title: "Real-Time Updates",
    description: "Track progress with photos & videos"
  }
];

const processSteps = [
  {
    title: "Initial Inspection",
    description: "Quick but thorough inspection to identify service requirements",
    icon: <Car className="w-8 h-8 text-[#FF7200]" />,
    time: "5 mins"
  },
  {
    title: "Service Planning",
    description: "Efficient allocation of tasks to specialized technicians",
    icon: <Clock className="w-8 h-8 text-[#FF7200]" />,
    time: "5 mins"
  },
  {
    title: "Parallel Processing",
    description: "Multiple services performed simultaneously by expert teams",
    icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
    time: "70 mins"
  },
  {
    title: "Quality Check",
    description: "Comprehensive inspection of all serviced components",
    icon: <CheckCircle className="w-8 h-8 text-[#FF7200]" />,
    time: "10 mins"
  }
];

const qualityFeatures = [
  {
    title: "Certified Technicians",
    description: "Every service performed by OEM-trained professionals",
    icon: <Tool />
  },
  {
    title: "Quality Parts",
    description: "Only genuine or OEM-approved parts used",
    icon: <Sparkles />
  },
  {
    title: "Digital Documentation",
    description: "Complete service history with photos and videos",
    icon: <Phone />
  }
];

const carouselImages = [
  "https://images.unsplash.com/photo-1632823471565-1ecdf5c6d7f9",
  "https://images.unsplash.com/photo-1632823471641-c1a24b1a8cec",
  "https://images.unsplash.com/photo-1632823471674-5c3c777f1d19"
];

const ExpressService = () => {
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await expressService.submitLead({
        mobileNumber: mobile,
        serviceType: 'express'
      });

      setSuccess(true);
      setMobile('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Helmet>
        <title>GaadiMech Express: 90-Minute Car Service | Fast & Professional Car Repair</title>
        <meta name="description" content="Experience the future of car servicing with GaadiMech Express. Get your car serviced in just 90 minutes with our expert mechanics and state-of-the-art technology." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Car Servicing Done in
              <span className="text-[#FF7200]"> 90 Minutes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Skip the all-day wait. Get your car serviced by expert mechanics using
              state-of-the-art technology – all while you enjoy a coffee.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              {success ? (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg">
                  <p className="font-semibold">Thanks! We'll call you right back.</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7200] focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF7200] text-white px-6 py-3 rounded-lg hover:bg-[#0e5aa8] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Instant Callback'}
                  </button>
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our 90-Minute Service Process
            </h2>
            <p className="text-xl text-gray-600">
              Speed meets precision with our innovative parallel processing system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-[#FF7200] font-medium">
                      {step.time}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Experience the Express Service
          </h2>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <motion.img
              key={currentImage}
              src={carouselImages[currentImage]}
              alt={`Service Image ${currentImage + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${currentImage === index ? 'bg-[#FF7200]' : 'bg-white'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Service Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceComparison.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl ${service.highlight
                    ? 'border-2 border-[#FF7200] shadow-xl relative'
                    : 'border border-gray-200 shadow-lg'
                  }`}
              >
                {service.highlight && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#FF7200] text-white px-4 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      Recommended
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className={`w-6 h-6 ${service.highlight ? 'text-[#FF7200]' : 'text-gray-600'}`} />
                    <p className={`text-xl font-semibold ${service.highlight ? 'text-[#FF7200]' : 'text-gray-600'}`}>
                      {service.time}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {service.price}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 ${service.highlight ? 'text-[#FF7200]' : 'text-gray-600'
                        }`} />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.name === "Basic Periodic Service" ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedServiceType(1);
                      setIsCustomerFormOpen(true);
                    }}
                    className="w-full py-3 rounded-md transition-colors flex items-center justify-center gap-2 border-2 border-[#FF7200] text-[#FF7200] hover:bg-[#FF7200] hover:text-white"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Service
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedServiceType(7);
                      setIsCustomerFormOpen(true);
                    }}
                    className="w-full py-3 rounded-md transition-colors flex items-center justify-center gap-2 bg-[#FF7200] text-white hover:bg-[#0e5aa8]"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Service
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          <CustomerForm 
            isOpen={isCustomerFormOpen}
            onClose={() => {
              setIsCustomerFormOpen(false);
              setSelectedServiceType(undefined);
            }}
            defaultServiceType={selectedServiceType}
          />
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quality Assurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-full mb-4">
                  {React.cloneElement(feature.icon, {
                    className: "w-6 h-6 text-[#FF7200]"
                  })}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready for the Fastest Car Service in Town?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your 90-minute express service now and experience the future of car care.
          </p>
          <motion.a
            href="https://api.whatsapp.com/send/?phone=917300042410&text=Hi%2C%20I%27d%20like%20to%20book%20an%20Express%20Service."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF7200] hover:bg-[#25D366] text-white px-8 py-3 rounded-md transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Connect on WhatsApp
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default ExpressService;