import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getReservations = async (internetCafeId, computerId) => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations`);
    return response.data;
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw error;
  }
};

export const getReservation = async (internetCafeId, computerId, reservationId) => {
    try {
      const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting reservation', error);
      throw error;
    }
  };

  export const getUserReservations = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.get(`${API_URL}/user/reservations`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.error("Error posting reservation", error);
      throw error;
    }
  };

  export const postReservation = async (data, internetCafeId, computerId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.error("Error posting reservation", error);
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
      console.error("Error patching reservation", error);
      throw error;
    }
  };

  export const deleteReservation = async (internetCafeId, computerId, reservationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}/reservations/${reservationId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.error("Error deleting reservation", error);
      throw error;
    }
  };
