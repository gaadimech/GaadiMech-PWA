import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowRight, GraduationCap, Users, Clock, Wrench, Mail } from 'lucide-react';


interface JobPosition {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  department: string;
}

interface Founder {
  name: string;
  title: string;
  image: string;
  description: string;
}

const founders: Founder[] = [
  {
    name: "Surakshit Soni",
    title: "Co-Founder",
    image: "https://placehold.co/400x400/orange/white?text=SS",
    description: "Visionary leader driving GaadiMech's mission to revolutionize the automotive service industry through technology and innovation. Passionate about creating seamless customer experiences and building a sustainable future for car care."
  },
  {
    name: "Sarvesh Kabra",
    title: "Co-Founder",
    image: "https://placehold.co/400x400/orange/white?text=SK",
    description: "Tech-driven entrepreneur focused on scaling GaadiMech's operations and implementing cutting-edge solutions. Committed to transforming the automotive service landscape through the innovative 90-minute service model."
  }
];

const jobPositions: JobPosition[] = [
  {
    title: "Senior Automotive Technician",
    location: "Jaipur",
    type: "Full-time",
    description: "Lead our express service team in delivering high-quality car servicing within our innovative 90-minute model.",
    requirements: [
      "5+ years of experience in automotive repair",
      "Strong diagnostic skills",
      "Experience with modern vehicle systems",
      "Team leadership capabilities"
    ],
    department: "Technical"
  },
  {
    title: "Operations Manager",
    location: "Jaipur",
    type: "Full-time",
    description: "Oversee daily operations and ensure smooth execution of our 90-minute service model across multiple service centers.",
    requirements: [
      "3+ years of operations management experience",
      "Strong organizational skills",
      "Experience in automotive industry preferred",
      "Excellence in team management"
    ],
    department: "Operations"
  },
  {
    title: "Digital Marketing Specialist",
    location: "Jaipur",
    type: "Full-time",
    description: "Drive GaadiMech's digital presence and lead generation through innovative marketing strategies.",
    requirements: [
      "3+ years of digital marketing experience",
      "Proven track record in lead generation",
      "Experience with automotive marketing preferred",
      "Strong analytical skills"
    ],
    department: "Marketing"
  }
];

const benefits = [
  {
    icon: <GraduationCap className="w-8 h-8 text-[#FF7200]" />,
    title: "Continuous Learning",
    description: "Regular training programs and skill development opportunities"
  },
  {
    icon: <Users className="w-8 h-8 text-[#FF7200]" />,
    title: "Great Culture",
    description: "Work with passionate individuals in a collaborative environment"
  },
  {
    icon: <Clock className="w-8 h-8 text-[#FF7200]" />,
    title: "Work-Life Balance",
    description: "Flexible schedules and paid time off"
  },
  {
    icon: <Wrench className="w-8 h-8 text-[#FF7200]" />,
    title: "Latest Technology",
    description: "Work with cutting-edge tools and equipment"
  }
];

const Careers = () => {
  const [currentFounder, setCurrentFounder] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFounder((prev) => (prev + 1) % founders.length);
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Accelerate Your Career with{" "}
              <span className="text-[#FF7200]">GaadiMech</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join the team that's revolutionizing car care with our innovative 90-minute service model. 
              Be part of something extraordinary.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF7200] text-white px-8 py-3 rounded-md hover:bg-[#0e5aa8] transition-colors inline-flex items-center"
            >
              View Open Positions
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose GaadiMech?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Vision & Leadership
          </h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFounder}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                <div className="w-full md:w-1/3">
                  <img
                    src={founders[currentFounder].image}
                    alt={founders[currentFounder].name}
                    className="rounded-lg shadow-xl w-full aspect-square object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {founders[currentFounder].name}
                  </h3>
                  <p className="text-[#FF7200] font-semibold mb-4">
                    {founders[currentFounder].title}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {founders[currentFounder].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-8 gap-2">
              {founders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFounder(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentFounder === index ? 'bg-[#FF7200]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Open Positions
          </h2>
          <div className="grid gap-6">
            {jobPositions.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">
                    {job.location} · {job.type} · {job.department}
                  </p>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Send your resume to us and become part of the GaadiMech family.
          </p>
          <motion.a
            href="mailto:contact@gaadimech.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-[#FF7200] text-white px-8 py-3 rounded-md hover:bg-[#0e5aa8] transition-colors"
          >
            <Mail className="mr-2" size={20} />
            contact@gaadimech.com
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Careers;