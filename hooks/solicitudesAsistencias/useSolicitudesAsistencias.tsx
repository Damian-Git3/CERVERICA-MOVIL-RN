import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { CategoriaAsistenciaDto } from "@/dtos/categoriaAsistencia";
import { SolicitudAsistenciaDto } from "@/dtos/solicitudAsistencia";

const END_POINT = "/SolicitudAsistencia";

const initialState = {
  solicitudesAsistenciasAgente: null as SolicitudAsistenciaDto[] | null,
  solicitudesAsistenciasCliente: null as SolicitudAsistenciaDto | null,
  categoriasAsistencias: null as CategoriaAsistenciaDto[] | null,
  solicitudAsistencia: null as SolicitudAsistenciaDto | null,
  cancelarSolicitud: null,
  nuevaSolicitud: null,
};

// Reducer
const SolicitudesAsistenciasReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_CATEGORIAS_ASISTENCIAS": // Agregado para manejar las categorías
      console.log("llamado al reducer categorias asistencias");
      return {
        ...state,
        categoriasAsistencias: payload,
      };
    case "GET_SOLICITUDES_ASISTENCIAS_CLIENTE":
      console.log(
        "llamado al reducer para obtener las solicitudes exclusivas de un usuario"
      );
      return {
        ...state,
        solicitudesAsistenciasCliente: payload,
      };
    case "GET_SOLICITUDES_ASISTENCIAS_AGENTE":
      console.log(
        "llamado al reducer para obtener las solicitudes exclusivas de un agente"
      );
      return {
        ...state,
        solicitudesAsistenciasAgente: payload,
      };
    case "GET_SOLICITUD_ASISTENCIA":
      console.log(
        "Llamado al reducer para obtener una solicitud de asistencia especifica"
      );
      return {
        ...state,
        solicitudAsistencia: payload,
      };
    case "PUT_SOLICITUD_ASISTENCIA":
      console.log(
        "Llamado al reducer para cancelar una solicitud de asistencia especifica"
      );
      return {
        ...state,
        cancelarSolicitud: payload,
      };
    case "POST_NUEVA_SOLICITUD_ASISTENCIA":
      console.log(
        "Llamado al reducer para crear una nueva solicitud de asistencia especifica"
      );
      return {
        ...state,
        nuevaSolicitud: payload,
      };
    default:
      return state;
  }
};

// Solicitudes
export default function useSolicitudesAsistencias() {
  const [state, dispatch] = useReducer(
    SolicitudesAsistenciasReducer,
    initialState
  );
  const [cargando, setCargando] = useState(false);

  const getSolicitudesAsistenciasCliente = async (activo: boolean) => {
    setCargando(true);

    try {
      const rutaActiva = activo ? "historial" : "historialCerrado";
      const result = await axios.get(`${END_POINT}/cliente/${rutaActiva}`);

      dispatch({
        type: "GET_SOLICITUDES_ASISTENCIAS_CLIENTE",
        payload: result.data,
      });
    } catch (error) {
      console.error(
        "Error al obtener historial de solicitudes asistencias:",
        error
      );
    } finally {
      setCargando(false);
    }
  };

  const getSolicitudesAsistenciasAgente = async (activo: boolean) => {
    setCargando(true);
    let result = null;
    try {
      const rutaActiva = activo ? "historial" : "historialCerrado";
      result = await axios.get(`${END_POINT}/agente/${rutaActiva}`);

      dispatch({
        type: "GET_SOLICITUDES_ASISTENCIAS_AGENTE",
        payload: result.data,
      });
    } catch (error) {
      console.error(
        "Error al obtener historial de solicitudes asistencias:",
        error
      );
    } finally {
      setCargando(false);
      console.log(result);
    }
  };

  const getSolicitudAsistencia = async (id: number) => {
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/solicitud/${id}`);

      dispatch({
        type: "GET_SOLICITUD_ASISTENCIA",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitud de asistencia:", error);
    } finally {
      setCargando(false);
    }
  };

  const getCategoriasAsistencias = async () => {
    // Método para obtener categorías de asistencia
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/categorias`);

      dispatch({
        type: "GET_CATEGORIAS_ASISTENCIAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener categorías de asistencias:", error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarSolicitudAsistencia = async (
    id: number,
    descripcion: string
  ) => {
    setCargando(true);

    try {
      const reqBody = {
        idSolicitudAsistencia: id,
        descripcion: descripcion,
      };

      const result = await axios.put(
        `${END_POINT}/solicitud/eliminar`,
        reqBody
      );

      dispatch({
        type: "PUT_SOLICITUD_ASISTENCIA",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al cancelar solicitud de asistencia:", error);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSolicitudAsistencia = async (id: number, descripcion: string) => {
    setCargando(true);
    let result = null;
    try {
      const reqBody = {
        idSolicitudAsistencia: id,
        descripcion: descripcion,
      };

      result = await axios.put(`${END_POINT}/solicitud/cerrar`, reqBody);
    } catch (error) {
      console.error("Error al cerrar solicitud de asistencia:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  const crearSolicitudAsistencia = async ({
    idCategoriaAsistencia,
    mayoreo,
    descripcion,
    tipo,
  }: {
    idCategoriaAsistencia: number;
    mayoreo: boolean;
    descripcion: string;
    tipo: number;
  }) => {
    setCargando(true);
    let result = null;
    try {
      const reqBody = {
        idCategoriaAsistencia,
        mayoreo,
        descripcion,
        tipo,
      };

      result = await axios.post(`${END_POINT}/solicitud`, reqBody);

      dispatch({
        type: "POST_NUEVA_SOLICITUD_ASISTENCIA",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al crear solicitud de asistencia:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  const valorarSolicitudAsistencia = async ({
    IdSolicitudAsistencia,
    Mensaje,
    Valoracion,
  }: {
    IdSolicitudAsistencia: number;
    Mensaje: string;
    Valoracion: number;
  }) => {
    setCargando(true);
    let result = null;
    try {
      const reqBody = {
        IdSolicitudAsistencia,
        Mensaje,
        Valoracion,
      };

      result = await axios.put(`${END_POINT}/solicitud/valorar`, reqBody);
    } catch (error) {
      console.error("Error al valorar solicitud de asistencia:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  const crearSeguimientoAsistencia = async ({
    IdSolicitudAsistencia,
    Mensaje,
    Descripcion,
  }: {
    IdSolicitudAsistencia: number;
    Mensaje: string;
    Descripcion: string;
  }) => {
    setCargando(true);
    let result = null;
    try {
      const reqBody = {
        IdSolicitudAsistencia,
        Mensaje,
        Descripcion,
      };

      result = await axios.post(`${END_POINT}/solicitud/seguimiento`, reqBody);
    } catch (error) {
      console.error("Error al dar seguimiento de asistencia:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  const cambiarAgente = async ({
    IdSolicitudAsistencia,
    Mensaje,
    Valoracion,
  }: {
    IdSolicitudAsistencia: number;
    Mensaje: string;
    Valoracion: number;
  }) => {
    setCargando(true);
    let result = null;
    try {
      const reqBody = {
        IdSolicitudAsistencia,
        Mensaje,
        Valoracion,
      };

      result = await axios.put(`${END_POINT}/solicitud/cambiarAgente`, reqBody);
    } catch (error) {
      console.error("Error al cambiar de agente:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  return {
    cargando,
    categoriasAsistencias: state.categoriasAsistencias,
    solicitudesAsistenciasCliente: state.solicitudesAsistenciasCliente,
    solicitudesAsistenciasAgente: state.solicitudesAsistenciasAgente,
    solicitudAsistencia: state.solicitudAsistencia,
    cancelarSolicitud: state.cancelarSolicitud,
    nuevaSolicitud: state.nuevaSolicitud,
    crearSolicitudAsistencia,
    cancelarSolicitudAsistencia,
    getSolicitudAsistencia,
    getSolicitudesAsistenciasCliente,
    getSolicitudesAsistenciasAgente,
    cerrarSolicitudAsistencia,
    crearSeguimientoAsistencia,
    getCategoriasAsistencias, // Retorno del nuevo método
    valorarSolicitudAsistencia,
    cambiarAgente,
  };
}
