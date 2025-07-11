import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const MyOrders: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'ongoing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'ongoing':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold">My Orders</h1>
      </div>

      <div className="p-4">
        {/* Orders List */}
        <div className="space-y-3">
          {user?.orders && user.orders.length > 0 ? (
            user.orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-1">Services</h4>
                  <ul className="text-sm text-gray-600">
                    {order.services.map((service, index) => (
                      <li key={index}>• {service}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Vehicle:</span> {order.carDetails}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6 px-4">
                You haven't placed any service orders yet. Book your first service to see it here.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Browse Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders; 