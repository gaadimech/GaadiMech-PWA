
const services = [
  {
    imageUrl: 'https://i.ibb.co/t4HmbHZ/Group.png', 
    title: 'Periodic Service',
    description: 'Regular maintenance and servicing'
  },
  {
    imageUrl: 'https://i.ibb.co/dtZj35M/Group-3.png',
    title: 'AC Service', 
    description: 'Professional car AC repair and maintenance'
  },
  {
    imageUrl: 'https://i.ibb.co/54mCj9R/Group-1.png',
    title: 'Car Spa & Cleaning',
    description: 'Professional car cleaning services'
  },
  {
    imageUrl: 'https://i.ibb.co/RNTXGpd/Group-2.png',
    title: 'Denting & Painting',
    description: 'Expert dent removal and painting services'
  },
  {
    imageUrl: 'https://i.ibb.co/ZXCWCRC/Group-4.png',
    title: 'Battery Service',
    description: 'Battery check, repair and replacement'
  },
  {
    imageUrl: 'https://i.ibb.co/3zcSYzf/Frame.png',
    title: 'Windshield Service',
    description: 'Windshield repair and replacement'
  },
  {
    imageUrl: 'https://i.ibb.co/MpG0nBb/Layer-1.png',
    title: 'Car Detailing',
    description: 'Professional car detailing services'
  },
  {
    imageUrl: 'https://i.ibb.co/hMSWCJB/Layer-x0020-1-1.png',
    title: 'Tyre Service',
    description: 'Tyre maintenance and replacement'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-20 bg-gray-50 border-b-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Services</h2>
          <p className="text-base md:text-lg text-gray-600">Aapki Gaadi, Hamari Zimmedari</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="hidden md:block text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;