import axios from "axios";
import { API_URL } from "../utils/constants";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRGVpdmlkYXMiLCJqdGkiOiI2MzQyOWM3ZS1kMGFmLTQzN2EtODg1My04ZmIwNGVhYzIxMmEiLCJzdWIiOiJhMzY3ZjI5YS1jMjFmLTRkN2QtYWFiYi03Njc4ZjJiOTViNmEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZWdpc3RlcmVkVXNlciIsImV4cCI6MTcwMjAyODgzMCwiaXNzIjoiRGVpdmlkYXNEIiwiYXVkIjoiVHJ1c3RlZENsaWVudCJ9.hpyZg3lcfb0-s8DY3DXmtAnkZEnPe_xSDG2FOXpGwGg"

export const login = async(data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response;
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  };

  export const register = async(data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response;
    } catch (error) {
      console.error("Failed to register", error);
      throw error;
    }
  };

  export const logout = async(accessToken) => {
      try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        })
        return response;
      } catch (error) {
        console.error("Error logging out", error);
        throw error;
      }
  }


  export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const data = { refreshToken }
        const response = await axios.post(`${API_URL}/accessToken`, data, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 400) {
            return { success: false, reason: 'Failed to refresh token' };
        }

        return { success: true, response };
    } catch (error) {
        return { success: false, reason: 'An error occured while refreshing token' };
    }
};

export function decodeJWT(token) {
  try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload;
  } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
  }
}

export function checkTokenValidity(token) {
  console.log("checking token validity");
  const payload = decodeJWT(token);
  if (!payload) return false;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  return payload.exp > currentTimestamp;
}

