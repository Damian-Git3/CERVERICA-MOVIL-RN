import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { CategoriaAsistenciaDto } from "@/dtos/categoriaAsistencia";
import { AgenteVentaDTO } from "@/dtos/agenteVenta";

const END_POINT = "/SolicitudAsistencia";

const initialState = {
  solicitudesAsistencias: null as AgenteVentaDTO[] | null,
  categoriasAsistencias: null as CategoriaAsistenciaDto[] | null, // Cambié a un array para que coincida con el tipo esperado
};

const SolicitudesAsistenciasReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_SOLICITUDES_ASISTENCIAS":
      console.log("llamado al reducer solicitud asistencias");
      return {
        ...state,
        solicitudesAsistencias: payload,
      };
    case "GET_CATEGORIAS_ASISTENCIAS": // Agregado para manejar las categorías
      console.log("llamado al reducer categorias asistencias");
      return {
        ...state,
        categoriasAsistencias: payload,
      };
    default:
      return state;
  }
};

export default function useSolicitudesAsistencias() {
  const [state, dispatch] = useReducer(
    SolicitudesAsistenciasReducer,
    initialState
  );
  const [cargando, setCargando] = useState(false);

  const getSolicitudesAsistencias = async () => {
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/agente`);

      dispatch({
        type: "GET_SOLICITUDES_ASISTENCIAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes asistencias:", error);
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

  return {
    cargando,
    solicitudesAsistencias: state.solicitudesAsistencias,
    categoriasAsistencias: state.categoriasAsistencias,
    getSolicitudesAsistencias,
    getCategoriasAsistencias, // Retorno del nuevo método
  };
}
