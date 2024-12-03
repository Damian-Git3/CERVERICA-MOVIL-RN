import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { CancelarSolicitudMayoristaDTO } from "../models/SolicitudesMayoristas";
import {
  AvanzarSiguienteEstatusSolicitudMayoristaDTO,
  SolicitudMayorista,
} from "@/models/SolicitudesMayoristas";
import { ProductoCarrito } from "@/models/ProductoCarrito";

const END_POINT = "/SolicitudesMayoristas";

const initialState = {
  solicitudesMayoristas: null as SolicitudMayorista[] | null,
  carritoSolicitud: null as ProductoCarrito[] | null,
};

const SolicitudesMayoristasReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_SOLICITUDES_MAYORISTA":
      return {
        ...state,
        solicitudesMayoristas: payload,
      };

    case "GET_SOLICITUDES_AGENTE":
      return {
        ...state,
        solicitudesMayoristas: payload,
      };

    case "GET_CARRITO_SOLICITUD":
      return {
        ...state,
        carritoSolicitud: payload,
      };

    case "CREAR_SOLICITUD_MAYORISTA":
      // Si es necesario, actualiza el estado después de crear una solicitud mayorista
      return {
        ...state,
        solicitudesMayoristas: state.solicitudesMayoristas
          ? [...state.solicitudesMayoristas, payload]
          : [payload],
      };

    default:
      return state;
  }
};

export default function useSolicitudesMayoristas() {
  const [state, dispatch] = useReducer(
    SolicitudesMayoristasReducer,
    initialState
  );
  const [cargando, setCargando] = useState(false);

  const getSolicitudesMayorista = async () => {
    setCargando(true);

    try {
      const result = await axios.get(
        `${END_POINT}/obtener-solicitudes-mayorista`
      );

      dispatch({
        type: "GET_SOLICITUDES_MAYORISTA",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getSolicitudesAgente = async () => {
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/obtener-solicitudes-agente`);

      dispatch({
        type: "GET_SOLICITUDES_AGENTE",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  const avanzarSiguienteEstatus = async (
    avanzarSiguienteEstatus: AvanzarSiguienteEstatusSolicitudMayoristaDTO
  ) => {
    setCargando(true);

    try {
      const result = await axios.post(
        `${END_POINT}/avanzar-siguiente-estatus`,
        avanzarSiguienteEstatus
      );

      console.log("Avanzo siguiente estatus");
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarSolicitudMayorista = async (
    cancelarSolicitudMayoristaDTO: CancelarSolicitudMayoristaDTO
  ) => {
    setCargando(true);

    try {
      return await axios.post(
        `${END_POINT}/cancelar-solicitud`,
        cancelarSolicitudMayoristaDTO
      );
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  const crearSolicitudMayorista = async () => {
    setCargando(true);

    try {
      const result = await axios.post(`${END_POINT}`);

      return result;
    } catch (error) {
      console.error("Error al crear solicitud mayorista:", error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerCarritoSolicitud = async (idSolicitud: number) => {
    setCargando(true);
    try {
      const result = await axios.get<ProductoCarrito[]>(
        `${END_POINT}/obtener-carrito-solicitud/${idSolicitud}`
      );

      dispatch({
        type: "GET_CARRITO_SOLICITUD",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener productos del carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    solicitudesMayoristas: state.solicitudesMayoristas,
    carritoSolicitud: state.carritoSolicitud,
    getSolicitudesMayorista,
    getSolicitudesAgente,
    avanzarSiguienteEstatus,
    cancelarSolicitudMayorista,
    crearSolicitudMayorista,
    obtenerCarritoSolicitud,
  };
}
