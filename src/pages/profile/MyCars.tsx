import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Car, Star, Edit, Trash2, Calendar } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const MyCars: React.FC = () => {
  const { user, cars, addCar, editCar, deleteCar, setPrimaryCar, refreshUserData, isLoading: userLoading } = useUser();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refresh user data when component mounts to ensure latest car data
  useEffect(() => {
    if (user && !userLoading) {
      console.log('🔄 MyCars: Refreshing user data on mount');
      refreshUserData().catch(error => {
        console.error('❌ Error refreshing user data:', error);
      });
    }
  }, [user?.id, userLoading, refreshUserData]);

  const [newCar, setNewCar] = useState({
    registrationNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (editingCar) {
        await editCar(editingCar, newCar);
        setEditingCar(null);
      } else {
        await addCar(newCar);
      }
      
      setNewCar({
        registrationNumber: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        fuelType: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving car:', error);
      setError('Failed to save car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      setNewCar({
        registrationNumber: car.registrationNumber,
        make: car.make,
        model: car.model,
        year: car.year,
        fuelType: car.fuelType
      });
      setEditingCar(carId);
      setShowAddForm(true);
    }
  };

  const handleDelete = async (carId: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteCar(carId);
      } catch (error) {
        console.error('Error deleting car:', error);
        setError('Failed to delete car. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetPrimary = async (carId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await setPrimaryCar(carId);
    } catch (error) {
      console.error('Error setting primary car:', error);
      setError('Failed to set primary car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const primaryCar = cars.find(car => car.isPrimary);

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
        <h1 className="text-xl font-semibold">My Cars</h1>
      </div>

      <div className="p-4">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        {/* Add Car Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            disabled={isLoading}
            className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 mb-4 disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-gray-700 font-medium">Add New Car</span>
          </button>
        )}

        {/* Add/Edit Car Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number <span className="text-gray-400 text-sm">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={newCar.registrationNumber}
                  onChange={(e) => setNewCar({...newCar, registrationNumber: e.target.value})}
                  placeholder="e.g., KA-03-HA-1985"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Make
                  </label>
                  <input
                    type="text"
                    value={newCar.make}
                    onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                    placeholder="e.g., Maruti"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    value={newCar.model}
                    onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                    placeholder="e.g., Swift"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                    min="1980"
                    max={new Date().getFullYear()}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={newCar.fuelType}
                    onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : editingCar ? 'Update Car' : 'Add Car'}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCar(null);
                    setError(null);
                    setNewCar({
                      registrationNumber: '',
                      make: '',
                      model: '',
                      year: new Date().getFullYear(),
                      fuelType: ''
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
        {userLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">Loading your cars...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {cars.map(car => (
            <div key={car.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      {car.isPrimary && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {car.registrationNumber && !car.registrationNumber.startsWith('TEMP_') 
                        ? car.registrationNumber 
                        : 'Registration Number Not Added'
                      }
                    </p>
                    <p className="text-xs text-gray-500">{car.year} • {car.fuelType}</p>
                    {(car as any).createdAt && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Added {new Date((car as any).createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(car.id)}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {!car.isPrimary && (
                <button
                  onClick={() => handleSetPrimary(car.id)}
                  disabled={isLoading}
                  className="mt-3 w-full py-2 text-sm text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50"
                >
                  Set as Primary
                </button>
              )}
            </div>
          ))}
          </div>
        )}

        {!userLoading && cars.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Cars Added</h3>
            <p className="text-gray-600 mb-6">Add your first car to get personalized service recommendations</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Add Your First Car
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars; 