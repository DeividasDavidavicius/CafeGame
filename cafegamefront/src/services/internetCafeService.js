import axios from 'axios';
import { API_URL } from '../utils/constants';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJqdGkiOiJhMzJkMDFlOC1hZGQ3LTQwNGItOGEyMC1lYWY3NDEyMzY4OGQiLCJzdWIiOiI5Y2QwZjNjNC02OGNiLTQ2ODYtYjljNi03YjQzZjZhYTIzODMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUmVnaXN0ZXJlZFVzZXIiLCJBZG1pbiJdLCJleHAiOjE3MDE5NjU3OTcsImlzcyI6IkRlaXZpZGFzRCIsImF1ZCI6IlRydXN0ZWRDbGllbnQifQ.mmcPcZdcSfhP2tmMC1TYClMugjEa8eBMNzLsBYy5oEQ"

export const getInternetCafes = async () => {
    try {
      const response = await axios.get(`${API_URL}/internetCafes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching internet cafes:', error);
      throw error;
    }
  };

  export const postInternetCafe = async(data) => {
    try {
      const response = await axios.post(`${API_URL}/internetCafes`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        }
      })
    } catch (error) {
      console.error("Error posting internet cafe", error);
      throw error;
    }
    //alert("Internet cafe successfully saved."); TODO
  };
