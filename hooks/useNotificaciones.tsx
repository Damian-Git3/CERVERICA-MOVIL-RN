import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
    Notificacion,
} from "@/models/Notificacion";

const END_POINT = "/Notificacion";



// Estado inicial
const initialState = {
  notificaciones: null as Notificacion[] | null,
};

// Reducer para manejar las acciones
const NotificacionesReducer = (state: typeof initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_NOTIFICACIONES":
      return {
        ...state,
        notificaciones: payload,
      };

    case "MARCAR_VISTO":
      return {
        ...state,
        notificaciones: state.notificaciones?.map((notificacion: Notificacion) =>
          notificacion.id === payload ? { ...notificacion, visto: true } : notificacion
        ),
      };

    case "ENVIAR_NOTIFICACION":
      return {
        ...state,
        notificaciones: [payload, ...(state.notificaciones || [])],
      };

    default:
      return state;
  }
};

// Hook principal para gestionar notificaciones
export default function useNotificaciones() {
  const [state, dispatch] = useReducer(NotificacionesReducer, initialState);
  const [cargando, setCargando] = useState(false);

  // Función para obtener todas las notificaciones
  const getNotificaciones = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}`);
      console.log(result.data);
      dispatch({ type: "GET_NOTIFICACIONES", payload: result.data });
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    } finally {
      setCargando(false);
    }
  };

  // Función para marcar una notificación como vista
  const marcarVisto = async (id: number) => {
    try {
      await axios.put(`${END_POINT}/${id}`);
      dispatch({ type: "MARCAR_VISTO", payload: id });
    } catch (error) {
      console.error("Error al marcar notificación como vista:", error);
    }
  };

  // Función para enviar una nueva notificación con tipos
  const enviarNotificacion = async (registrationToken: string, title: string, body: string) => {
    try {
      const result = await axios.post(`${END_POINT}/send-notification`, {
        registrationToken,
        title,
        body,
      });
      dispatch({ type: "ENVIAR_NOTIFICACION", payload: result.data });
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    }
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  return {
    cargando,
    notificaciones: state.notificaciones,
    getNotificaciones,
    marcarVisto,
    enviarNotificacion,
  };
}
