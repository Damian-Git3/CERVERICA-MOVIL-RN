import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { UserDetailDto, UserMayoristaDetailDto } from "@/dtos/user";
import { PuntosFidelidadDto } from "@/dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";

const END_POINT = "/perfil";

const initialState = {
  puntosFidelidad: null as PuntosFidelidadDto | null,
  transacciones: [] as TransaccionPuntosDto[],
};

const PuntosFidelidadReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_PUNTOS_FIDELIDAD":
      console.log("UPDATE_PUNTOS_FIDELIDAD payload:", payload);
      return { ...state, puntosFidelidad: payload };

    case "UPDATE_TRANSACCIONES":
      console.log("UPDATE_TRANSACCIONES payload:", payload);
      return { ...state, transacciones: payload };
    default:
      return state;
  }
};

export default function usePuntosFidelidad() {
  const [state, dispatch] = useReducer(PuntosFidelidadReducer, initialState);
  const [cargando, setCargando] = useState(false);

  // Método para obtener puntos de fidelidad
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
    getTransacciones,
    getPuntosFidelidad,
  };
}
