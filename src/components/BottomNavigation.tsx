import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  HomeIcon as HomeIconSolid,
  WrenchScrewdriverIcon as WrenchScrewdriverIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  PhoneIcon as PhoneIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
} from '@heroicons/react/24/outline';
import WatiChatInterface from './WatiChatInterface';

interface NavigationItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
  action?: () => void;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCallClick = () => {
    window.location.href = 'tel:+91-8448-285289';
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

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
      name: 'Call',
      path: '/call',
      icon: PhoneIcon,
      activeIcon: PhoneIconSolid,
      action: handleCallClick,
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: ChatBubbleLeftIcon,
      activeIcon: ChatBubbleLeftIconSolid,
      action: handleChatClick,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = active ? item.activeIcon : item.icon;
            
            if (item.action) {
              return (
                <button
                  key={item.name}
                  onClick={item.action}
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
                </button>
              );
            }

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

      {/* Chat Interface */}
      <WatiChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default BottomNavigation; 