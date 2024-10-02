// src/services/notificationService.js
import axios from 'axios';
import { API_URL } from '@env';

const BASE_URL = API_URL;

export const fetchNotificaciones = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Notificacion`, {
      headers: {
        //Authorization: `Bearer ${getToken()}`, // Implementa getToken según tu lógica
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1AbS5tIiwibmFtZSI6IknDsWlnbyBNb250b3lhIiwibmFtZWlkIjoiOTc1ZjA5NGItYTMzMy00NzQyLWIyMzUtMTk2MDg5NzhmY2Y5IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwicm9sZSI6IkNsaWVudGUiLCJuYmYiOjE3Mjc4OTg4MjYsImV4cCI6MTcyNzkwOTYyNiwiaWF0IjoxNzI3ODk4ODI2fQ.OZr8jUh00iQUMtvfAOa_WReXaJu4TE777MBqQrtE8oI`
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
