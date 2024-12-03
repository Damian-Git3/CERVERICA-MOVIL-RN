import { HistorialPrecioInsert } from "@/dtos/HistorialPrecios";
import axios from "axios";
import React, { useReducer, useState } from "react";
import Toast from "react-native-toast-message";

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

      Toast.show({
        type: "success",
        text1: "Recetas obtenidas! 🎉",
        text2: "Se han obtenido las recetas correctamente",
      });

      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error! 🎉",
        text2: error as string,
      });
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

      Toast.show({
        type: "success",
        text1: "Precios de receta obtenidos! 🎉",
        text2: "Se han obtenido los precios de la receta correctamente",
      });

      return response.data;
    } catch (error) {
      console.error("Error los precios de receta", error);
      Toast.show({
        type: "error",
        text1: "Error! 🎉",
        text2: error as string,
      });
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

      Toast.show({
        type: "success",
        text1: "Historial de precios obtenido! 🎉",
        text2: "Se ha obtenido el historial de precios correctamente",
      });
      return response.data;
    } catch (error) {
      console.error("Error los precios de receta", error);
      Toast.show({
        type: "error",
        text1: "Error! 🎉",
        text2: error as string,
      });
    } finally {
      console.log("Precios de receta obtenidos");
    }
  };

  const setNuevoPrecio = async (data: HistorialPrecioInsert): Promise<any> => {
    try {
      console.log("ENVIANDO PRECIOS", data);
      setCargando(true);
      const response = await axios.post(`/HistorialPrecios`, data);
      console.log(response);
      Toast.show({
        type: "success",
        text1: "Precio insertado! 🎉",
        text2: "Se ha insertado el precio correctamente",
      });
      return response;
    } catch (error) {
      console.error("Error al insertar nuevo precio", error);
      Toast.show({
        type: "error",
        text1: "Error! 🎉",
        text2: error as string,
      });
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
