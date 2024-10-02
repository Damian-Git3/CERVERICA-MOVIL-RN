// src/store/notifications/notificationActions.js
import {
    GET_NOTIFICACIONES_REQUEST,
    GET_NOTIFICACIONES_SUCCESS,
    GET_NOTIFICACIONES_FAILURE,
    ELIMINAR_NOTIFICACION,
  } from './notificationTypes';
  import { fetchNotificaciones } from '../../services/notificationService';
  
  export const getNotificaciones = () => {
    return async (dispatch) => {
      dispatch({ type: GET_NOTIFICACIONES_REQUEST });
      try {
        const data = await fetchNotificaciones();
        dispatch({ type: GET_NOTIFICACIONES_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_NOTIFICACIONES_FAILURE, payload: error.message });
      }
    };
  };
  
  export const eliminarNotificacion = (id) => {
    return {
      type: ELIMINAR_NOTIFICACION,
      payload: id,
    };
  };
  