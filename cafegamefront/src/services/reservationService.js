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

export const getReservation = async (internetCafeId, computerId, reservationId) => {
    try {
      const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching internet cafes:', error);
      throw error;
    }
  };

  export const patchReservation = async (data, internetCafeId, computerId, reservationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.patch(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations/${reservationId}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.error("Error posting internet cafe", error);
      throw error;
    }
  };
