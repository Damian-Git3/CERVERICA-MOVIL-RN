import axios from "axios";
import React, { useReducer, useState } from "react";

const initialState = {
  listaRecetas: [],
};

const HistorialPreciosReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_LISTA_RECETAS":
      return {
        ...state,
        listaRecetas: payload,
      };
    default:
      return state;
  }
};

interface RecetaView {
  id: number;
  nombre: string;
  imagen: number;
  activo: boolean;
}

interface HistorialPreciosStateProps {
  children: React.ReactNode;
}

const useHistorialPrecios = () => {
  const [state, dispatch] = useReducer(HistorialPreciosReducer, initialState);

  const [cargando, setCargando] = useState(false);

  const getListaRecetas = async () => {
    try {
      const response = await axios.get("/HistorialPrecios/ListarRecetas");

      dispatch({
        type: "UPDATE_LISTA_RECETAS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener recetas", error);
    } finally {
      console.log("Recetas obtenidas");
    }
  };

  return {
    cargando,
    listaRecetas: state.listaRecetas,
    getListaRecetas,
  };
};

export default useHistorialPrecios;
