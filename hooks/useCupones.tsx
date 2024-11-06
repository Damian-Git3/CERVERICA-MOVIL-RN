import { useReducer, useState } from "react";
import axios from "axios";

import { ICupon } from "@/dtos/cupon";

const initialState = {
  cupones: null as ICupon[] | null,
  cupon: null as ICupon | null,
};

const CuponesReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "REGISTRAR_CUPON":
      return { ...state, cupon: payload };

    case "ACTUALIZAR_CUPON":
      return { ...state, cupon: payload };

    case "FETCH_CUPON":
      return { ...state, cupon: payload };

    case "FETCH_CUPONES":
      return { ...state, cupones: payload };

    default:
      return state;
  }
};

export default function useCupones() {
  const [state, dispatch] = useReducer(CuponesReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const registrarCupon = async (cupon: ICupon) => {
    setCargando(true);
    try {
      const response = await axios.post(`/Cupon/registrar-cupon`, cupon);
      dispatch({
        type: "REGISTRAR_CUPON",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar el cupon:", error);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const actualizarCupon = async (cupon: ICupon) => {
    setCargando(true);
    try {
      const response = await axios.put(`/Cupon/actualizar-cupon`, cupon);
      dispatch({
        type: "ACTUALIZAR_CUPON",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el cupon: ", error);
      return null;
    } finally {
      setCargando(false);
    }
  };

  // Método para obtener las reglas de puntos de fidelidad
  const getCupon = async (idCupon: number) => {
    try {
      const response = await axios.get<ICupon>(
        `/Cupon/obtener-cupon/${idCupon}`
      );

      dispatch({
        type: "FETCH_CUPON",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cupon:", error);
      return null;
    }
  };

  const getCupones = async () => {
    try {
      const response = await axios.get<ICupon>(
        `/Cupon/obtener-todos-los-cupones`
      );

      dispatch({
        type: "FETCH_CUPONES",
        payload: response.data,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los cupones:", error);
      return null;
    }
  };

  return {
    cargando,
    cupones: state.cupones,
    cupon: state.cupon,
    getCupon,
    registrarCupon,
    actualizarCupon,
    getCupones,
  };
}
