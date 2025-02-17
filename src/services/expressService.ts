import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Use the API URL from the .env file

export const expressService = {
  submitLead: async (data: { mobileNumber: string; serviceType: string }) => {
    const response = await axios.post(`${API_URL}/api/express-services`, {
      data,
    });
    return response.data;
  },
}; 