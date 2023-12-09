import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getReservations = async (internetCafeId, computerId) => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching internet cafes:', error);
    throw error;
  }
};
