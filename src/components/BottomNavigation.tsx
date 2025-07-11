import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  HomeIcon as HomeIconSolid,
  WrenchScrewdriverIcon as WrenchScrewdriverIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      name: 'Home',
      path: '/',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: 'Services',
      path: '/services',
      icon: WrenchScrewdriverIcon,
      activeIcon: WrenchScrewdriverIconSolid,
    },
    {
      name: 'Book',
      path: '/express-app',
      icon: CalendarDaysIcon,
      activeIcon: CalendarDaysIconSolid,
    },
    {
      name: 'Support',
      path: '/support',
      icon: QuestionMarkCircleIcon,
      activeIcon: QuestionMarkCircleIconSolid,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: UserIcon,
      activeIcon: UserIconSolid,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          const IconComponent = active ? item.activeIcon : item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center space-y-1 p-1 text-xs font-medium transition-colors duration-150 active:bg-gray-100"
            >
              <IconComponent 
                className={`w-6 h-6 ${
                  active ? 'text-orange-500' : 'text-gray-600'
                }`} 
              />
              <span 
                className={`${
                  active ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 