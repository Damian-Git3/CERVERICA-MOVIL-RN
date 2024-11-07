import { HistorialPrecioInsert } from "@/dtos/HistorialPrecios";
import axios from "axios";
import React, { useReducer, useState } from "react";

const initialState = {
  listaRecetas: [],
  historial: [],
};

const HistorialPreciosReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_LISTA_RECETAS":
      return {
        ...state,
        listaRecetas: payload,
      };
    case "GET_PRECIOS_RECETA":
      return {
        ...state,
        receta: payload,
      };
    case "GET_HISTORIAL_PRECIOS":
      return {
        ...state,
        historialPrecios: payload,
      };
    default:
      return state;
  }
};

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

  const getPrecioReceta = async (id: number) => {
    try {
      const response = await axios.get(`/HistorialPrecios/PreciosReceta`, {
        params: {
          Id: id,
        },
      });

      dispatch({
        type: "GET_PRECIOS_RECETA",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error los precios de receta", error);
    } finally {
      console.log("Precios de receta obtenidos");
    }
  };

  const getHistorialPrecios = async (id: number) => {
    try {
      const response = await axios.get(
        `/HistorialPrecios/ListaHistorialPrecios`,
        {
          params: {
            IdReceta: id,
          },
        }
      );

      dispatch({
        type: "GET_HISTORIAL_PRECIOS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error los precios de receta", error);
    } finally {
      console.log("Precios de receta obtenidos");
    }
  };

  const setNuevoPrecio = async (data: HistorialPrecioInsert) => {
    try {
      setCargando(true);
      const response = await axios.post(`/HistorialPrecios`, data);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error al insertar nuevo precio", error);
    } finally {
      setCargando(false);
      console.log("Precio insertado");
    }
  };

  return {
    cargando,
    listaRecetas: state.listaRecetas,
    receta: state.receta,
    historialPrecios: state.historialPrecios,
    getListaRecetas,
    getPrecioReceta,
    getHistorialPrecios,
    setNuevoPrecio,
  };
};

export default useHistorialPrecios;
