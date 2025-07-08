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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Service Name Header */}
      <div className="bg-[#FF7200] text-white p-4">
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>

      <div className="flex p-6">
        {/* Left Column - Image and Price */}
        <div className="w-1/2 pr-6">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={service.image || '/images/services/default-service.jpg'} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            {service.originalPrice && (
              <>
                <span className="text-gray-400 line-through">₹{service.originalPrice}</span>
                <span className="text-green-600 text-sm">
                  30% OFF
                </span>
              </>
            )}
          </div>
          <div className="text-2xl font-bold">₹{service.price}</div>
        </div>

        {/* Right Column - Features and Button */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-4">Features</h4>
            <ul className="space-y-3">
              {service.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={quantity === 0 ? handleAddToCart : handleRemoveFromCart}
            className="bg-white border-2 border-[#FF7200] text-[#FF7200] py-2 px-8 rounded-md hover:bg-[#FF7200] hover:text-white transition-colors font-medium self-end"
          >
            {quantity === 0 ? 'ADD' : 'REMOVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoorstepServiceCard; 