import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { ReporteVentas, ResumenVentas, Venta } from "@/models/venta";

const END_POINT = "/Ventas";

const initialState = {
  ventas: null as Venta[] | null,
  selectedVenta: null as Venta | null,
  reporteVentas: null as ReporteVentas | null,
  resumenVentas: null as ResumenVentas | null,
  response: null as any | null,
};

const VentasReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_VENTAS":
      console.log("llamado al reducer ventas");
      return {
        ...state,
        ventas: payload,
      };
    case "GET_VENTA":
      console.log("llamado al reducer venta");
      return {
        ...state,
        selectedVenta: payload,
      };
    case "GET_REPORTE_VENTAS":
      console.log("llamado al reducer reporte de ventas");
      return {
        ...state,
        reporteVentas: payload,
      };
    case "GET_RESUMEN_VENTAS":
      console.log("llamado al reducer resumen de ventas");
      return {
        ...state,
        resumenVentas: payload,
      };
    case "RETROCEDER_STATUS":
      return {
        ...state,
        reponse: payload,
      };
    case "AVANZAR_STATUS":
      return {
        ...state,
        reponse: payload,
      };
    default:
      return state;
  }
};

export default function useVentas() {
  const [state, dispatch] = useReducer(VentasReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getVentas = async () => {
    setCargando(true);

    try {
      console.log("llamado a ventas");
      const result = await axios.get(`${END_POINT}`);
      console.log("resultado de ventas", result.data);

      dispatch({
        type: "GET_VENTAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getVenta = async (idVenta: number) => {
    setCargando(true);

    try {
      console.log("llamado a venta");
      const result = await axios.get(`${END_POINT}/pedidos/${idVenta}`);
      console.log("resultado de venta", result.data);

      dispatch({
        type: "GET_VENTA",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener la venta:", error);
    } finally {
      setCargando(false);
    }
  };

  const getReporteVentas = async (param: string) => {
    setCargando(true);

    try {
      const result = await axios.get(
        `${END_POINT}/total-ventas/${param}`
      );

      dispatch({
        type: "GET_REPORTE_VENTAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener reporte de ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getResumenVentas = async () => {
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/resumen-ventas`);

      dispatch({
        type: "GET_RESUMEN_VENTAS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener resumen de ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const retrocederStatus = async (idVenta: number) => {
    try {
      console.log("llamado a retroceder");
      const result = await axios.get(
        `${END_POINT}/anterior-estatus/${idVenta}`
      );
      console.log("resultado de retroceder", result);
      dispatch({
        type: "RETROCEDER_STATUS",
        payload: result.status,
      });

      await getVentas();
    } catch (error) {
      console.error("Error al retroceder el estatus de la venta:", error);
    }
  };

  const empaquetar = async (idVenta: number) => {
    try {
      const result = await axios.get(
        `${END_POINT}/siguiente-estatus-landing/${idVenta}`
      );

      dispatch({
        type: "AVANZAR_STATUS",
        payload: result.status,
      });

      await getVentas();
    } catch (error) {
      console.error("Error al avanzar el estatus de la venta:", error);
    }
  };

  return {
    cargando,
    ventas: state.ventas,
    selectedVenta: state.selectedVenta,
    resumenVentas: state.resumenVentas,
    reporteVentas: state.reporteVentas,
    response: state.response,
    getVentas,
    getVenta,
    getReporteVentas,
    getResumenVentas,
    retrocederStatus,
    empaquetar,
  };
}
