import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getComputers = async (internetCafeId) => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching internet cafes:', error);
    throw error;
  }
};
