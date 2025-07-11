import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const ProfileEdit: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: user?.birthday || '',
    gender: user?.gender || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    navigate('/profile');
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
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                  <div className="flex items-center px-3 py-3 border-r border-gray-300">
                    <img src="/images/auth/india-flag.svg" alt="India" className="w-6 h-4 mr-2" />
                    <span className="text-gray-700">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit; 