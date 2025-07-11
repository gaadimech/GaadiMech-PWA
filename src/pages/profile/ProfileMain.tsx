import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Car, Package, MapPin, HelpCircle, Building, LogOut } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const ProfileMain: React.FC = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      icon: Car,
      title: 'My Cars',
      subtitle: 'Add and manage your vehicles\' details for easier service bookings',
      path: '/profile/cars',
      color: 'text-blue-600'
    },
    {
      icon: Package,
      title: 'My Orders',
      subtitle: 'View and manage your past and upcoming service bookings',
      path: '/profile/orders',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'My Addresses',
      subtitle: 'Manage your addresses for easier service bookings',
      path: '/profile/addresses',
      color: 'text-purple-600'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get assistance and answers to your queries',
      path: '/support',
      color: 'text-orange-600'
    },
    {
      icon: Building,
      title: 'Register as Partner',
      subtitle: 'Join our network to offer services and grow your business',
      path: '/franchise',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-orange-600">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h1>
            <p className="text-gray-600">{user?.phone}</p>
            <Link to="/profile/edit" className="text-orange-600 text-sm font-medium">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">Logout</h3>
            <p className="text-sm text-gray-600">Sign out of your account securely</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileMain; 