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

export const getComputer = async (internetCafeId, computerId) => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching internet cafes:', error);
    throw error;
  }
};

export const postComputer = async (data, internetCafeId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.post(`${API_URL}/internetCafes/${internetCafeId}/computers`, data, {
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

export const putComputer = async (data, internetCafeId, computerId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.put(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}`, data, {
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

export const deleteComputer = async (internetCafeId, computerId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.delete(`${API_URL}/internetCafes/${internetCafeId}/computers/${computerId}`, {
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
