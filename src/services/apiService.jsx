import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { API_URL } from '@env';

const apiClient = axios.create({
  baseURL: `${API_URL}`,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
