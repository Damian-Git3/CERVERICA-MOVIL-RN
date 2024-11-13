import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { NuevosClientesMesDTO, VentasPorStatusDTO, PedidosMetodoPagoDTO, ProductosMasVendidosDTO } from "@/dtos/graficas/nuevosClientesMes";

const END_POINT = "/Graficas";

// Estado inicial del reducer
const initialState = {
  nuevosClientesMes: null as NuevosClientesMesDTO[] | null,
  ventasStatus: null as VentasPorStatusDTO[] | null,
  pedidosMetodoPago: null as PedidosMetodoPagoDTO[] | null,
  productosMasVendidos: null as ProductosMasVendidosDTO[] | null,
};

// Tipos de acciones para el reducer
type Action =
  | { type: "GET_NUEVOS_CLIENTES_MES"; payload: NuevosClientesMesDTO[] }
  | { type: "GET_VENTAS_STATUS"; payload: VentasPorStatusDTO[] }
  | { type: "GET_PEDIDOS_METODO_PAGO"; payload: PedidosMetodoPagoDTO[] }
  | { type: "GET_PRODUCTOS_MAS_VENDIDOS"; payload: ProductosMasVendidosDTO[] }

// Reducer para manejar las acciones
const GraficasReducer = (state: typeof initialState, action: Action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_NUEVOS_CLIENTES_MES":
      console.log("llamado al reducer nuevos clientes mes");
      return { ...state, nuevosClientesMes: payload };
    case "GET_VENTAS_STATUS":
      console.log("llamado al reducer ventas status");
      return { ...state, ventasStatus: payload };
    case "GET_PEDIDOS_METODO_PAGO":
      console.log("llamado al reducer pedidos metodo pago");
      return { ...state, pedidosMetodoPago: payload };
    case "GET_PRODUCTOS_MAS_VENDIDOS":
      console.log("llamado al reducer productos mas vendidos");
      return { ...state, productosMasVendidos: payload };
    default:
      return state;
  }
};

// Hook combinado
export default function useGraficas() {
  const [state, dispatch] = useReducer(GraficasReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getNuevosClientesMes = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/nuevos-clientes-por-mes`);
      console.log("Nuevos clientes por mes", result.data);
      dispatch({ type: "GET_NUEVOS_CLIENTES_MES", payload: result.data });
    } catch (error) {
      console.error("Error al obtener nuevos clientes por mes:", error);
    } finally {
      setCargando(false);
    }
  };

  const getVentasStatus = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/ventas-por-estatus`);
      console.log("Ventas por status", result.data);
      dispatch({ type: "GET_VENTAS_STATUS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener ventas por status:", error);
    } finally {
      setCargando(false);
    }
  };

  const getPedidosMetodoPago = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/pedidos-por-metodo-pago`);
      console.log("Pedidos por metodo de pago", result.data);
      dispatch({ type: "GET_PEDIDOS_METODO_PAGO", payload: result.data });
    } catch (error) {
      console.error("Error al obtener pedidos por metodo de pago:", error);
    } finally {
      setCargando(false);
    }
  };

  const getProductosMasVendidos = async () => {
    setCargando(true);
    try {
      const result = await axios.get(`${END_POINT}/productos-mas-vendidos`);
      console.log("Productos mas vendidos", result.data);
      dispatch({ type: "GET_PRODUCTOS_MAS_VENDIDOS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener productos mas vendidos:", error);
    } finally {
      setCargando(false);
    }
  };


  return {
    cargando,
    nuevosClientesMes: state.nuevosClientesMes,
    ventasStatus: state.ventasStatus,
    pedidosMetodoPago: state.pedidosMetodoPago,
    productosMasVendidos: state.productosMasVendidos,
    getNuevosClientesMes,
    getVentasStatus,
    getPedidosMetodoPago,
    getProductosMasVendidos
  };
}
