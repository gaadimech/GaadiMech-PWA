import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { addToCart, removeFromCart, doorstepCart } from '../utils-doorstep/cartFunctions';

interface DoorstepServiceCardProps {
  service: any;
}

const DoorstepServiceCard: React.FC<DoorstepServiceCardProps> = ({ service }) => {
  const [quantity, setQuantity] = useState(() => doorstepCart.getItemQuantity(service.id));

  useEffect(() => {
    const updateQuantity = () => {
      setQuantity(doorstepCart.getItemQuantity(service.id));
    };

    doorstepCart.addListener(updateQuantity);
    return () => doorstepCart.removeListener(updateQuantity);
  }, [service.id]);

  const handleAddToCart = () => {
    addToCart(service.id, 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      removeFromCart(service.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Service Name Header */}
      <div className="bg-[#FF7200] text-white p-4">
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>

      <div className="flex p-4">
        <div className="flex gap-4 w-full">
          {/* Left Column - Image */}
          <div className="w-[160px] flex-shrink-0">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={service.image || '/images/services/default-service.jpg'} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-3">Features</h4>
            <ul className="space-y-2">
              {service.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Price and Button */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between">
          {/* Price Section */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              {service.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-sm">₹{service.originalPrice}</span>
                  <span className="text-green-600 text-xs">
                    30% OFF
                  </span>
                </>
              )}
            </div>
            <div className="text-2xl font-bold">₹{service.price}</div>
          </div>

          {/* Add/Remove Button */}
          <button
            onClick={quantity === 0 ? handleAddToCart : handleRemoveFromCart}
            className="bg-[#FF7200] text-white py-2 px-6 rounded-md hover:bg-[#e66600] transition-colors font-medium"
          >
            {quantity === 0 ? 'ADD' : 'REMOVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoorstepServiceCard; 