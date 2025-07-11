import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Car, Star, Edit, Trash2 } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const MyCars: React.FC = () => {
  const { user, cars, addCar, editCar, deleteCar, setPrimaryCar } = useUser();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<string | null>(null);

  const [newCar, setNewCar] = useState({
    registrationNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      editCar(editingCar, newCar);
      setEditingCar(null);
    } else {
      addCar(newCar);
    }
    setNewCar({
      registrationNumber: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      fuelType: ''
    });
    setShowAddForm(false);
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

  const handleDelete = (carId: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      deleteCar(carId);
    }
  };

  const handleSetPrimary = (carId: string) => {
    setPrimaryCar(carId);
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
        {/* Add Car Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 mb-4"
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
                  Registration Number
                </label>
                <input
                  type="text"
                  value={newCar.registrationNumber}
                  onChange={(e) => setNewCar({...newCar, registrationNumber: e.target.value})}
                  placeholder="e.g., KA-03-HA-1985"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
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
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  {editingCar ? 'Update Car' : 'Add Car'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCar(null);
                    setNewCar({
                      registrationNumber: '',
                      make: '',
                      model: '',
                      year: new Date().getFullYear(),
                      fuelType: ''
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
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
                    <p className="text-sm text-gray-600">{car.registrationNumber}</p>
                    <p className="text-xs text-gray-500">{car.year} • {car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {!car.isPrimary && (
                <button
                  onClick={() => handleSetPrimary(car.id)}
                  className="mt-3 w-full py-2 text-sm text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Set as Primary
                </button>
              )}
            </div>
          ))}
        </div>

        {cars.length === 0 && !showAddForm && (
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