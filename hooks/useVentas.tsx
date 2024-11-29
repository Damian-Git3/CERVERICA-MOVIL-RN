import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { ReporteVentas, ResumenVentas, Venta } from "@/models/venta";
import { CrearVentaDto } from "@/dtos/CrearVentaDTO";

const END_POINT = "/Ventas";

// Estado inicial del reducer
const initialState = {
  ventas: null as Venta[] | null,
  pedidos: null as Venta[] | null,
  pedido: null as Venta | null,
  selectedVenta: null as Venta | null,
  reporteVentas: null as ReporteVentas | null,
  resumenVentas: null as ResumenVentas | null,
  response: null as any | null,
  recetas: null as Receta[] | null,
};

// Tipos de acciones para el reducer
type Action =
  | { type: "GET_PEDIDOS_USUARIO"; payload: Venta[] }
  | { type: "GET_PEDIDO"; payload: Venta }
  | { type: "GET_VENTAS"; payload: Venta[] }
  | { type: "GET_VENTA"; payload: Venta }
  | { type: "GET_REPORTE_VENTAS"; payload: ReporteVentas }
  | { type: "GET_RESUMEN_VENTAS"; payload: ResumenVentas }
  | { type: "RETROCEDER_STATUS"; payload: any }
  | { type: "AVANZAR_STATUS"; payload: any }
  | { type: "GET_RECETAS"; payload: Receta[] };

// Reducer para manejar las acciones
const VentasReducer = (state: typeof initialState, action: Action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_PEDIDOS_USUARIO":
      return { ...state, pedidos: payload };
    case "GET_PEDIDO":
      return { ...state, pedido: payload };
    case "GET_VENTAS":
      console.log("llamado al reducer ventas");
      return { ...state, ventas: payload };
    case "GET_VENTA":
      console.log("llamado al reducer venta");
      return { ...state, selectedVenta: payload };
    case "GET_REPORTE_VENTAS":
      console.log("llamado al reducer reporte de ventas");
      return { ...state, reporteVentas: payload };
    case "GET_RESUMEN_VENTAS":
      console.log("llamado al reducer resumen de ventas");
      return { ...state, resumenVentas: payload };
    case "RETROCEDER_STATUS":
      return { ...state, response: payload };
    case "AVANZAR_STATUS":
      return { ...state, response: payload };
    case "GET_RECETAS":
      return { ...state, recetas: payload };
    default:
      return state;
  }
};

// Hook combinado
export default function useVentas() {
  const [state, dispatch] = useReducer(VentasReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getPedidosUsuario = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/pedidos-usuario`);
      dispatch({ type: "GET_PEDIDOS_USUARIO", payload: result.data });
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getVentas = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}`);
      dispatch({ type: "GET_VENTAS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getVenta = async (idVenta: number) => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/pedidos/${idVenta}`);
      dispatch({ type: "GET_VENTA", payload: result.data });
    } catch (error) {
      console.error("Error al obtener la venta:", error);
    } finally {
      setCargando(false);
    }
  };

  const getReporteVentas = async (param: string) => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/total-ventas/${param}`);
      dispatch({ type: "GET_REPORTE_VENTAS", payload: result.data });
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
      dispatch({ type: "GET_RESUMEN_VENTAS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener resumen de ventas:", error);
    } finally {
      setCargando(false);
    }
  };

  const retrocederStatus = async (idVenta: number) => {
    try {
      const result = await axios.get(
        `${END_POINT}/anterior-estatus/${idVenta}`
      );
      dispatch({ type: "RETROCEDER_STATUS", payload: result.status });
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
      dispatch({ type: "AVANZAR_STATUS", payload: result.status });
      await getVentas();
    } catch (error) {
      console.error("Error al avanzar el estatus de la venta:", error);
    }
  };

  const crearVenta = async (venta: CrearVentaDto) => {
    setCargando(true);
    try {
      const result = await axios.post(`${END_POINT}/CrearVenta`, venta);
      return result;
    } catch (error) {
      console.error("Error al crear la venta:", error);
    } finally {
      setCargando(false);
    }
  };

  const getRecetas = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/recetas`);
      dispatch({ type: "GET_RECETAS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener recetas:", error);
    } finally {
      setCargando(false);
    }
  };

  const getPedido = async (id: number) => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/pedidos/${id}`);
      dispatch({ type: "GET_PEDIDO", payload: result.data });
    } catch (error) {
      console.error("Error al obtener pedido:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    pedidos: state.pedidos,
    pedido: state.pedido,
    ventas: state.ventas,
    selectedVenta: state.selectedVenta,
    resumenVentas: state.resumenVentas,
    reporteVentas: state.reporteVentas,
    recetas: state.recetas,
    response: state.response,
    getVentas,
    getVenta,
    getReporteVentas,
    getResumenVentas,
    retrocederStatus,
    empaquetar,
    crearVenta,
    getRecetas,
    getPedidosUsuario,
    getPedido,
  };
}
