import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  ActualizarSolicitudCambioAgenteDTO,
  SolicitudCambioAgenteDTO,
} from "@/dtos/cambioAgente";

const END_POINT = "/ClienteMayorista/solicitud-cambio-agente";

const initialState = {
  session: null,
  solicitudCambioAgente: null,
};

const CambioAgenteReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_SOLICITUD_CAMBIO_AGENTE":
      console.log("UPDATE_SOLICITUD_CAMBIO_AGENTE payload:", payload);
      return { ...state, solicitudCambioAgente: payload };
    default:
      return state;
  }
};

export default function useCambioAgente() {
  const [state, dispatch] = useReducer(CambioAgenteReducer, initialState);
  const [cargando, setCargando] = useState(false);

  // Método para solicitar cambio de agente
  const solicitarCambioAgente = async (
    solicitudDto: SolicitudCambioAgenteDTO
  ) => {
    setCargando(true);
    try {
      const response = await axios.post(END_POINT, solicitudDto);
      dispatch({
        type: "UPDATE_SOLICITUD_CAMBIO_AGENTE",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al solicitar cambio de agente:", error);
      return null;
    } finally {
      setCargando(false);
    }
  };

  // Método para actualizar la solicitud de cambio de agente
  const actualizarSolicitudCambioAgente = async (
    id: number,
    solicitudDto: ActualizarSolicitudCambioAgenteDTO
  ) => {
    setCargando(true);
    try {
      const response = await axios.put(`${END_POINT}/${id}`, solicitudDto);
      dispatch({
        type: "UPDATE_SOLICITUD_CAMBIO_AGENTE",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar la solicitud de cambio de agente:",
        error
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    session: state.session,
    solicitudCambioAgente: state.solicitudCambioAgente,
    solicitarCambioAgente,
    actualizarSolicitudCambioAgente,
  };
}
