import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { UserDetailDto, UserMayoristaDetailDto } from "@/dtos/user";
import { PuntosFidelidadDto } from "@/dtos/puntosFidelidad";
import { TransaccionPuntosDto } from "@/dtos/transaccionPuntos";

const END_POINT = "/perfil";

const initialState = {
  session: null,
  userDetails: null as UserDetailDto | null,
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

  return {
    cargando,
    session: state.session,
    userDetails: state.userDetails,
    userMayoristaDetails: state.userMayoristaDetails,
    getUserDetails,
    getUserMayoristaDetails,
  };
}
