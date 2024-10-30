import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { UserDetailDto, UserMayoristaDetailDto } from "@/dtos/user";
import { PuntosFidelidadDto } from "@/dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";

const END_POINT = "/perfil";

const initialState = {
  session: null,
  userDetails: null as UserDetailDto | null,
  puntosFidelidad: null as PuntosFidelidadDto | null,
  transacciones: [] as TransaccionPuntosDto[],
};

const PerfilReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_SESSION":
      return {
        ...state,
        session: payload,
      };
    case "UPDATE_USER_DETAILS":
      console.log("UPDATE_USER_DETAILS payload:", payload);
      return { ...state, userDetails: action.payload };
    case "UPDATE_USER_MAYORISTA_DETAILS":
      console.log("UPDATE_USER_MAYORISTA_DETAILS payload:", payload);
      return { ...state, userMayoristaDetails: action.payload };
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

export default function usePerfil() {
  const [state, dispatch] = useReducer(PerfilReducer, initialState);
  const [cargando, setCargando] = useState(false);

  // Método para obtener detalles del usuario mayorista.
  const getUserMayoristaDetails = async () => {
    console.log("OBTENIENDO MAYORISTA");
    try {
      const response = await axios.get<UserMayoristaDetailDto>(
        `/Account/detail-mayorista`
      );

      dispatch({
        type: "UPDATE_USER_MAYORISTA_DETAILS",
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      return null;
    }
  };

  // Método para obtener detalles del usuario.
  const getUserDetails = async () => {
    try {
      const response = await axios.get<UserDetailDto>(`/Account/detail`);

      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      return null;
    }
  };

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
    session: state.session,
    userDetails: state.userDetails,
    userMayoristaDetails: state.userMayoristaDetails,
    getUserDetails,
    getUserMayoristaDetails,
    puntosFidelidad: state.puntosFidelidad,
    transacciones: state.transacciones,
    getTransacciones,
    getPuntosFidelidad,
  };
}
