import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Car } from 'lucide-react';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../data-doorstep/doorstepServicesData';
import DoorstepServiceCard from '../components-doorstep/DoorstepServiceCard';
import StickyCartBanner from '../components-doorstep/StickyCartBanner';
import VehicleSelectionModal from '../components/VehicleSelectionModal';
import CompactCarSelector from '../components/CompactCarSelector';
import { getVehicleFromSession } from '../utils/pricing-utils';
import { Vehicle } from '../types/services';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Get vehicle from session storage
    const savedVehicle = getVehicleFromSession();
    if (savedVehicle) {
      setSelectedVehicle(savedVehicle);
    }
  }, []);

  if (!categoryId) {
    navigate('/doorstep-services');
    return null;
  }

  const category = SERVICE_CATEGORIES[categoryId];
  const services = getServicesByCategory(categoryId);

  if (!category) {
    navigate('/doorstep-services');
    return null;
  }

  const handleBack = () => {
    navigate('/doorstep-services');
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Header Design */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-2">
            <button
              onClick={handleBack}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <h1 className="text-lg font-semibold text-center flex-1">
              {category.name}
            </h1>

            <CompactCarSelector
              selectedVehicle={selectedVehicle}
              onSelectCar={() => setShowVehicleModal(true)}
              className="w-16"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <DoorstepServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vehicle Selection Modal */}
      <VehicleSelectionModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onVehicleSelect={handleVehicleSelect}
      />

      {/* Sticky Cart Banner */}
      <StickyCartBanner />
    </div>
  );
};

export default CategoryPage; 