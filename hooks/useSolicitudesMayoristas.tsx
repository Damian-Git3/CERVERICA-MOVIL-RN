import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { SolicitudMayorista } from "@/models/SolicitudesMayoristas";

const END_POINT = "/SolicitudesMayoristas";

const initialState = {
  solicitudesMayoristas: null as SolicitudMayorista[] | null,
};

const SolicitudesMayoristasReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_SOLICITUDES_MAYORISTAS":
      return {
        ...state,
        solicitudesMayoristas: payload,
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

  const getSolicitudesMayoristas = async () => {
    setCargando(true);

    try {
      const result = await axios.get(
        `${END_POINT}/obtener-solicitudes-mayoristas`
      );

      dispatch({
        type: "GET_SOLICITUDES_MAYORISTAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    solicitudesMayoristas: state.solicitudesMayoristas,
    getSolicitudesMayoristas,
  };
}
