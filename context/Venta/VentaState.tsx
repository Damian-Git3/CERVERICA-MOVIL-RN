/**
 * Este archivo representa la definición del estado, aquí estará toda la información que se va a compartir
 */

import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import VentaReducer from "./VentaReducer";
import VentaContext from "./VentaContext";
import * as SecureStore from "expo-secure-store";
import { GET_REPORTE_VENTAS, GET_RESUMEN_VENTAS, GET_VENTAS } from "../types";
import { Session } from "@/models/session";

const SESSION_KEY = "SESSION_KEY";

export default function VentaState({ children }: { children: any }) {
  const initialState = {
    ventas: null,
    ventaSeleccionada: null,
    resumenVentas: null,
    reporteVentas: null,
  };

  const [state, dispatch] = useReducer(VentaReducer, initialState);
  const [obteniendoVentas, setObteniendoVentas] = useState(true);
  const [obteniendoSession, setObteniendoSession] = useState(true);

  

  const getVentas = async () => {
    try {
      console.log("Obteniendo ventas");
      setObteniendoVentas(true);
      const result = await axios.get(`/Ventas`);
      console.log("Ventas obtenidas", result.data);

      dispatch({
        type: GET_VENTAS,
        payload: result.data,
      });

      return result;
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    } finally {
      setObteniendoVentas(false);
    }
  };

  const getReporteVentas = async (param: string) => {
    try {
      console.log("Obteniendo reporte de ventas");
      setObteniendoVentas(true);
      const result = await axios.get(`/Ventas/total-ventas/${param}`);
      console.log("Reporte de ventas obtenido", result.data);
      dispatch({
        type: GET_REPORTE_VENTAS,
        payload: result.data,
      });

      return result;
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    } finally {
      setObteniendoVentas(false);
    }
  };

  const getResumenVentas = async () => {
    try {
      console.log("Obteniendo resumen de ventas");
      setObteniendoVentas(true);
      const result = await axios.get(`/Ventas/resumen-ventas`);
      console.log("Resumen de ventas obtenido", result.data);
      dispatch({
        type: GET_RESUMEN_VENTAS,
        payload: result.data,
      });

      return result;
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          return e.response.data;
        } else if (e.request) {
          console.log("Error request:", e.request);
        } else {
          console.log("Error message:", e.message);
        }
      } else {
        console.log("Unexpected error:", e);
      }

      return null;
    } finally {
      setObteniendoVentas(false);
    }
  };

  return (
    <VentaContext.Provider
      value={{
        ventas: state.ventas,
        ventaSeleccionada: state.ventaSeleccionada,
        resumenVentas: state.resumenVentas,
        reporteVentas: state.reporteVentas,
        obteniendoVentas,
        getVentas,
        getResumenVentas,
        getReporteVentas,
      }}
    >
      {children}
    </VentaContext.Provider>
  );
}
