// src/store/notifications/notificationReducer.js
import {
    GET_NOTIFICACIONES_REQUEST,
    GET_NOTIFICACIONES_SUCCESS,
    GET_NOTIFICACIONES_FAILURE,
    ELIMINAR_NOTIFICACION,
  } from './notificationTypes';
  
  const initialState = {
    notificaciones: [],
    loading: false,
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_NOTIFICACIONES_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_NOTIFICACIONES_SUCCESS:
        return { ...state, loading: false, notificaciones: action.payload };
      case GET_NOTIFICACIONES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ELIMINAR_NOTIFICACION:
        return {
          ...state,
          notificaciones: state.notificaciones.filter(noti => noti.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  