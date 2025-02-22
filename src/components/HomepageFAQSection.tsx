import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomerForm from './CustomerForm';

interface FAQItem {
  question: string;
  answer: string;
  links?: {
    text: string;
    to: string;
    isFormTrigger?: boolean;
  }[];
}

const faqData: FAQItem[] = [
  {
    question: "How do I find a car service near me?",
    answer: "Looking for a car service near me? It's simple! Just head to the GaadiMech website to find a trusted car mechanic near me or use our car repair service booking. You can book everything from standard car repair services to having a mobile mechanic near me come to your home – all in a few clicks! Stop searching 'mechanic near me', GaadiMech offers convenience and quality.",
    links: [
      { text: "Book Service", to: "/services/periodic" }
    ]
  },
  {
    question: "Do you provide car repair and maintenance services?",
    answer: "Absolutely! GaadiMech provides comprehensive car repair and maintenance services for all your vehicle needs. Whether you need a quick car ac repair near me or something more in-depth like auto body repair near me, we're ready to assist. Skip searching \"auto shop near me\" and book online for car repair near me! We'll take care of everything – either at your home or at our trusted partner mechanic shop near me!",
    links: [
      { text: "View Services", to: "/services" }
    ]
  },
  {
    question: "Does GaadiMech offer an Express 90-minute service?",
    answer: "Absolutely! GaadiMech understands your time is valuable. With our Express 90-minute service, you can quickly get back on the road! Need an oil change, filter replacement, or other quick car repair? Our mechanic near me can handle it in under 90 minutes! Schedule your Express service online and get that auto repair done fast. We even offer car ac repair near me as part of our Express service. If you are looking for a toyota service center or auto shop near me, call us to see the express option availability. Find the nearest auto repair shops near me or a mobile mechanic near me for other services, or visit our auto body shop near me for collision repairs. GaadiMech is your one-stop solution for all car mechanic needs! Find a mobile mechanic and book today!",
    links: [
      { text: "Express Service", to: "/express" }
    ]
  },
  {
    question: "Can I use the GaadiMech app to schedule maintenance?",
    answer: "For sure! Using the GaadiMech app, booking your next car repair and maintenance service is as quick as scrolling through your feed. From routine check-ups to more serious fixes, it's all set with a few taps – super easy and no hassle! Forget the hassle of searching \"toyota service near me\"– schedule everything through the app!",
    links: [
      { text: "Book Now", to: "/services" }
    ]
  },
  {
    question: "What types of car maintenance services does GaadiMech offer?",
    answer: "GaadiMech offers a full range of car repair and maintenance services. From essential oil changes and brake inspections to specialized car ac repair near me and auto body shop near me, we've got all the bases covered. And if you're looking for car service at home with a mobile mechanic, just schedule it through our website or app. Whether it's toyota service center needs or any other make, we've got you covered.",
    links: [
      { text: "Explore Services", to: "/services" }
    ]
  },
  {
    question: "How do I find a premium car service centre near me?",
    answer: "If you're on the hunt for a premium car service center or a trusted mechanic shop near me, GaadiMech is just a click away! Simply search for us online or check out our website. Looking for an auto shop near me? Our website makes it easy to discover our services, read reviews from satisfied customers, and see why we're the best choice for car repair near me. We're ready to give your vehicle the premium care it deserves, right in your neighborhood!",
    links: [
      { text: "Schedule with Us", to: "#", isFormTrigger: true }
    ]
  }
];

const HomepageFAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLinkClick = (link: FAQItem['links'][0]) => {
    if (link.isFormTrigger) {
      setIsCustomerFormOpen(true);
    }
  };

  return (
    <>
      <section className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 text-gray-900">
            Common Car Service Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'lg:col-span-2' : ''
                }`}
              >
                <div 
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center flex-1 pr-4">
                    <FaQuestionCircle className="mr-3 text-[#FF7200] flex-shrink-0 w-5 h-5" />
                    <h3 className="font-semibold text-base sm:text-lg">{faq.question}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 sm:p-5 bg-gray-50 text-gray-700">
                    <p className="mb-4 text-sm sm:text-base">{faq.answer}</p>
                    {faq.links && (
                      <div className="flex flex-wrap gap-4">
                        {faq.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.to}
                            onClick={(e) => {
                              if (link.isFormTrigger) {
                                e.preventDefault();
                                handleLinkClick(link);
                              }
                            }}
                            className="text-[#FF7200] hover:underline font-semibold text-sm sm:text-base"
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomerForm
        isOpen={isCustomerFormOpen}
        onClose={() => setIsCustomerFormOpen(false)}
      />
    </>
  );
};

export default HomepageFAQSection; 