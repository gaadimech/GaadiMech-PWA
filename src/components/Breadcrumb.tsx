import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface BreadcrumbProps {
  cityName?: string;
  serviceName?: string;
}

/**
 * Breadcrumb Component
 * 
 * Displays the current page location in a breadcrumb navigation format.
 * Supports both city pages and service pages.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ cityName, serviceName }) => {
  return (
    <nav className="bg-white border-b border-gray-200 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          
          {serviceName && (
            <>
              <li className="flex items-center">
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                <Link to="/services" className="text-blue-600 hover:text-blue-800">
                  Services
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                <span className="text-gray-500">{serviceName}</span>
              </li>
            </>
          )}
          
          {cityName && (
            <li className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              <span className="text-gray-500">{cityName} Car Service</span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 