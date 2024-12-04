import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { UserDetailDto, UserMayoristaDetailDto } from "@/dtos/user";
import { PuntosFidelidadDto, ReglasPuntosDto } from "@/dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";

const END_POINT = "/perfil";

const initialState = {
  puntosFidelidad: null as PuntosFidelidadDto | null,
  transacciones: [] as TransaccionPuntosDto[],
  reglasPuntos: null as ReglasPuntosDto | null,
};

const PuntosFidelidadReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "REGISTRAR_REGLAS_PUNTOS":
      return { ...state, reglasPuntos: payload };

    case "ACTUALIZAR_REGLAS_PUNTOS":
      return { ...state, reglasPuntos: payload };

    case "FETCH_REGLAS_PUNTOS":
      return { ...state, reglasPuntos: payload };

    case "UPDATE_PUNTOS_FIDELIDAD":
      return { ...state, puntosFidelidad: payload };

    case "UPDATE_TRANSACCIONES":
      return { ...state, transacciones: payload };
    default:
      return state;
  }
};

export default function usePuntosFidelidad() {
  const [state, dispatch] = useReducer(PuntosFidelidadReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const registrarReglasPuntos = async (reglasPuntos: ReglasPuntosDto) => {
    setCargando(true);
    try {
      const response = await axios.post(
        `/PuntosFidelidad/registrar-regla-puntos`,
        reglasPuntos
      );
      dispatch({
        type: "REGISTRAR_REGLAS_PUNTOS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar las reglas de puntos de fidelidad:",
        error
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  const actualizarReglasPuntos = async (reglasPuntos: ReglasPuntosDto) => {
    setCargando(true);
    try {
      const response = await axios.put(
        `/PuntosFidelidad/actualizar-regla-puntos`,
        reglasPuntos
      );
      dispatch({
        type: "ACTUALIZAR_REGLAS_PUNTOS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar las reglas de puntos de fidelidad:",
        error
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  // Método para obtener las reglas de puntos de fidelidad
  const getReglasPuntos = async () => {
    try {
      const response = await axios.get<ReglasPuntosDto>(
        `/PuntosFidelidad/obtener-regla-puntos`
      );

      dispatch({
        type: "FETCH_REGLAS_PUNTOS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener puntos de fidelidad:", error);
      return null;
    }
  };

  // Método para obtener puntos de fidelidad del usuario auntenticado
  const getPuntosFidelidad = async () => {
    try {
      const response = await axios.get<PuntosFidelidadDto>(
        `/PuntosFidelidad/obtener-puntos-fidelidad`
      );

      dispatch({
        type: "UPDATE_PUNTOS_FIDELIDAD",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener puntos de fidelidad:", error);
      return null;
    }
  };

  // Método para obtener transacciones
  const getTransacciones = async () => {
    try {
      const response = await axios.get<TransaccionPuntosDto[]>(
        `/PuntosFidelidad/obtener-transacciones`
      );

      dispatch({
        type: "UPDATE_TRANSACCIONES",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      return [];
    }
  };

  return {
    cargando,
    puntosFidelidad: state.puntosFidelidad,
    transacciones: state.transacciones,
    reglasPuntos: state.reglasPuntos,
    getTransacciones,
    getPuntosFidelidad,
    getReglasPuntos,
    registrarReglasPuntos,
    actualizarReglasPuntos,
  };
}
