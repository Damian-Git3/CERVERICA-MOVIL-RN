import { useReducer, useState } from "react";
import axios from "axios";
import { ReglasPuntosDto } from "@/dtos/puntosFidelidad";
import { IConfiguracionesGenerales } from "@/dtos/configuracionesGenerales";

const initialState = {
  configuracionesGenerales: null as IConfiguracionesGenerales | null,
};

const ConfiguracionesGeneralesReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "REGISTRAR_CONFIGURACION":
      return { ...state, configuracionesGenerales: payload };

    case "ACTUALIZAR_CONFIGURACION":
      return { ...state, configuracionesGenerales: payload };

    case "FETCH_CONFIGURACION":
      return { ...state, configuracionesGenerales: payload };

    default:
      return state;
  }
};

export default function useConfiguracionesGenerales() {
  const [state, dispatch] = useReducer(
    ConfiguracionesGeneralesReducer,
    initialState
  );
  const [cargando, setCargando] = useState(false);

  const registrarConfiguracionesGenerales = async (
    configuracionesGenerales: IConfiguracionesGenerales
  ) => {
    setCargando(true);
    try {
      const response = await axios.post(
        `/ConfiguracionesGenerales/registrar-configuracion-general`,
        configuracionesGenerales
      );
      dispatch({
        type: "REGISTRAR_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar la configuración:", error);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const actualizarConfiguracionesGenerales = async (
    configuracionesGenerales: IConfiguracionesGenerales
  ) => {
    setCargando(true);
    try {
      const response = await axios.put(
        `/ConfiguracionesGenerales/actualizar-configuracion-general`,
        configuracionesGenerales
      );
      dispatch({
        type: "ACTUALIZAR_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la configuración: ", error);
      return null;
    } finally {
      setCargando(false);
    }
  };

  // Método para obtener las reglas de puntos de fidelidad
  const getConfiguracionesGenerales = async () => {
    try {
      const response = await axios.get<ReglasPuntosDto>(
        `/ConfiguracionesGenerales/obtener-configuracion-general`
      );

      dispatch({
        type: "FETCH_CONFIGURACION",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener las configuraciones:", error);
      return null;
    }
  };

  return {
    cargando,
    configuracionesGenerales: state.configuracionesGenerales,
    getConfiguracionesGenerales,
    registrarConfiguracionesGenerales,
    actualizarConfiguracionesGenerales,
  };
}
