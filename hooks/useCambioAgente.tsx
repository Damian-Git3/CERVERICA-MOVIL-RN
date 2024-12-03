import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  ActualizarSolicitudCambioAgenteDTO,
  IAgentesResponseDTO,
  SolicitudCambioAgenteDTO,
} from "@/dtos/cambioAgente";
import Toast from "react-native-toast-message";
import { ISolicitudCambioAgenteResponseDTO } from "../dtos/cambioAgente";

const END_POINT = "/Agente/solicitud-cambio-agente";

const initialState = {
  session: null,
  agentesVentas: [] as IAgentesResponseDTO[],
  solicitudCambioAgente: null,

  // TODAS LAS SOLICITUDES PARA ADMIN
  solicitudesCambioAgente: [] as ISolicitudCambioAgenteResponseDTO[],

  // TODAS LAS SOLICITUDES DEL MAYORISTA
  solicitudesClienteCambioAgente: [] as ISolicitudCambioAgenteResponseDTO[],

  // ULTIMA SOLICITUD PARA VER SU ESTADO
  ultimaSolicitudClienteCambioAgente: {} as ISolicitudCambioAgenteResponseDTO,
};

const CambioAgenteReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_SOLICITUD_CAMBIO_AGENTE":
      console.log("UPDATE_SOLICITUD_CAMBIO_AGENTE payload:", payload);
      return { ...state, solicitudCambioAgente: payload };
    case "FETCH_SOLICITUDES":
      return {
        ...state,
        solicitudesCambioAgente: action.payload,
      };
    case "FETCH_SOLICITUDES_CLIENTE":
      return {
        ...state,
        solicitudesClienteCambioAgente: action.payload,
      };
    case "FETCH_ULTIMA_SOLICITUD":
      return {
        ...state,
        ultimaSolicitudClienteCambioAgente: action.payload,
      };
    case "FETCH_AGENTES":
      return {
        ...state,
        agentesVentas: action.payload,
      };

    default:
      return state;
  }
};

export default function useCambioAgente() {
  const [state, dispatch] = useReducer(CambioAgenteReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getAgentes = async () => {
    try {
      const response = await axios.get(`/Agente/agentes`);
      // Dispatch para actualizar el estado en el reducer
      dispatch({
        type: "FETCH_AGENTES",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener agentes de ventas:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar los agentes de ventas.",
      });
    }
  };

  const getUltimaSolicitud = async (mayoristaId: number) => {
    try {
      const response = await axios.get(
        `/Agente/ultima-solicitud/${mayoristaId}`
      );

      // Dispatch para actualizar el estado en el reducer
      dispatch({
        type: "FETCH_ULTIMA_SOLICITUD",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener la solicitud:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar la solicitud.",
      });
    }
  };

  const getSolicitudesCliente = async (mayoristaId: number) => {
    try {
      const response = await axios.get(
        `/Agente/solicitudes-cambio-agente/${mayoristaId}`
      );

      // Dispatch para actualizar el estado en el reducer
      dispatch({
        type: "FETCH_SOLICITUDES_CLIENTE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar las solicitudes.",
      });
    }
  };

  // OPTIENE SOLICITUDES PENDIENTES
  const getSolicitudes = async () => {
    try {
      const response = await axios.get(
        "/Agente/solicitudes-cambio-agente?estatus=Pendiente"
      );

      // Dispatch para actualizar el estado en el reducer
      dispatch({
        type: "FETCH_SOLICITUDES",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudieron cargar las solicitudes.",
      });
    }
  };

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
    solicitudesCambioAgente: state.solicitudesCambioAgente,
    solicitudesClienteCambioAgente: state.solicitudesClienteCambioAgente,
    ultimaSolicitudClienteCambioAgente:
      state.ultimaSolicitudClienteCambioAgente,
    agentesVentas: state.agentesVentas,
    solicitarCambioAgente,
    actualizarSolicitudCambioAgente,
    getSolicitudes,
    getSolicitudesCliente,
    getAgentes,
    getUltimaSolicitud,
  };
}
