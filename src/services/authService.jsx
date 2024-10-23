// src/services/notificationService.js
import axios from 'axios';
import { API_URL } from '@env';

const BASE_URL = API_URL;

const loginRequest = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Account/login`);
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

export default loginRequest;