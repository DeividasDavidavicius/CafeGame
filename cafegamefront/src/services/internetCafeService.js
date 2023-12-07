import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getInternetCafes = async () => {
    try {
      const response = await axios.get(`${API_URL}/internetCafes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
