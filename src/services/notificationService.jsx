// src/services/notificationService.js
import axios from 'axios';
import { API_URL } from '@env';

const BASE_URL = API_URL;

export const fetchNotificaciones = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Notificacion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Implementa getToken según tu lógica
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const marcarNotificacionVisto = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}Notificacion/${id}/visto`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getToken = () => {
  // Implementa tu lógica para obtener el token, por ejemplo desde AsyncStorage
  return 'tu_token_aquí';
};
