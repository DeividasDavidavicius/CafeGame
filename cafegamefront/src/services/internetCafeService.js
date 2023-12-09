import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getInternetCafes = async () => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes`);
    return response.data;
  } catch (error) {
    console.error('Error getting internet cafes:', error);
    throw error;
  }
};

export const getInternetCafe = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/internetCafes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting internet cafe:', error);
    throw error;
  }
};

export const postInternetCafe = async (data) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.post(`${API_URL}/internetCafes`, data, {
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

export const putInternetCafe = async (data, id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.put(`${API_URL}/internetCafes/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    console.error("Error putting internet cafe", error);
    throw error;
  }
};

export const deleteInternetCafe = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.delete(`${API_URL}/internetCafes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    console.error("Error deleting internet cafe", error);
    throw error;
  }
};
