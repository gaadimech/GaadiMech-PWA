import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, HelpCircle, User, AlertTriangle, Home as HomeIcon, Car } from 'lucide-react';
import { useLocation as useUserLocation } from '../hooks/useLocation';
import { getVehicleFromSession } from '../utils/pricing-utils';

interface ServiceCard {
  title: string;
  image: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    title: 'Periodic Services',
    image: '/images/Periodic%20Car%20Service.png',
    link: '/services/periodic'
  },
  {
    title: 'Denting & Painting',
    image: '/images/Dent%20Paint.png',
    link: '/services/denting'
  },
  {
    title: 'AC Service',
    image: '/images/AC%20Service.png',
    link: '/services/ac'
  },
  {
    title: 'Car Wash',
    image: '/images/car_wash.png',
    link: '/services/car-spa'
  },
  {
    title: 'Car Detailing',
    image: '/images/Car%20Detailing.png',
    link: '/services/detailing'
  },
  {
    title: 'Tyres & Wheelcare',
    image: '/images/Tyres.png',
    link: '/services/tyre'
  },
  {
    title: 'Batteries',
    image: '/images/Battery.png',
    link: '/services/battery'
  },
  {
    title: 'Windshield',
    image: '/images/windshield.png',
    link: '/services/windshield'
  },
  {
    title: 'Insurance Claim',
    image: '/images/insurance%20claim.png',
    link: '/services/windshield'
  }
];

const exclusives: ServiceCard[] = [
  {
    title: 'GaadiMech Membership',
    image: '/images/logo1.png',
    link: '/services'
  },
  {
    title: 'SOS',
    image: '/images/Sos.png',
    link: 'tel:+918448285289'
  }
];

const HomepageAppV0: React.FC = () => {
  const { locationDisplay } = useUserLocation(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = search
    ? services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()))
    : [];
  const [vehicleName, setVehicleName] = useState<string>('');

  useEffect(() => {
    const selectedVehicle = getVehicleFromSession();
    if (selectedVehicle) {
      setVehicleName(`${selectedVehicle.model?.toUpperCase() || ''}`);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Top Bar */}
      <div className="pt-20 px-4 pb-4 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 overflow-hidden">
            <MapPin className="text-[#FF7200] flex-shrink-0" />
            <div className="text-sm leading-tight truncate">
              <p className="font-semibold truncate max-w-[180px]">{locationDisplay}</p>
              <p className="text-gray-500 text-xs truncate">Your current location</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-7 h-7 text-[#FF7200]" />
            {vehicleName && (
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{vehicleName}</span>
            )}
          </div>
        </div>
        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && filtered.length) {
                navigate(filtered[0].link);
                setSearch('');
              }
            }}
            placeholder="Search Services"
            className="w-full rounded-md bg-gray-100 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7200]"
          />
          {filtered.length > 0 && (
            <div className="absolute left-0 right-0 top-full bg-white border shadow-md rounded-b-md z-10 max-h-60 overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s.title}
                  onClick={() => {
                    navigate(s.link);
                    setSearch('');
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-4">
        <div className="relative w-full overflow-x-auto flex snap-x snap-mandatory gap-4 px-4">
          {['/images/Carousal%201.jpg', '/images/Carousal%202.jpg', '/images/Carousal%203.jpg', '/images/Carousal%204.jpg'].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className="snap-start flex-shrink-0 w-[88%] h-32 rounded-lg object-cover"
            />
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#FF7200]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Schedule Services */}
      <section className="mt-6 px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Schedule Services</h2>
        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <Link
              to={service.link}
              key={service.title}
              className="bg-white rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md"
            >
              <img src={service.image} alt={service.title} className="w-10 h-10 object-contain mb-2" />
              <span className="text-xs font-medium text-gray-700 leading-tight">
                {service.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* GaadiMech Exclusives */}
      <section className="mt-8 px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">GaadiMech Exclusives</h2>
        <div className="grid grid-cols-2 gap-4">
          {exclusives.map(item => (
            <a
              key={item.title}
              href={item.link}
              className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md"
            >
              <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
              <span className="font-medium text-gray-800 text-sm">{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-4 py-2 flex justify-between text-xs text-gray-700 z-20">
        <Link to="/homepage-app-v0" className="flex flex-col items-center gap-1 text-[#FF7200]">
          <HomeIcon size={20} />
          Home
        </Link>
        <button className="flex flex-col items-center gap-1">
          <Bell size={20} />
          Notifications
        </button>
        <a href="tel:+918448285289" className="flex flex-col items-center gap-1">
          <AlertTriangle size={20} />
          SOS
        </a>
        <button className="flex flex-col items-center gap-1">
          <HelpCircle size={20} />
          Help
        </button>
        <button className="flex flex-col items-center gap-1">
          <User size={20} />
          Account
        </button>
      </nav>
    </div>
  );
};

export default HomepageAppV0; 