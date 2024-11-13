import { useReducer, useState } from "react";
import axios from "axios";
import { PedidoMayoristaInsertDTO } from "@/dtos/PedidosMayoristas/PedidoMayoristaInsertDTO";

// Define la URL base para el controlador de pedidos mayoristas
const END_POINT = "/PedidosMayoristas";

// Define los tipos para los estados
type PedidoMayoreo = {
  id: number;
  idMayorista: number;
  idAgenteVenta: string;
  fechaInicio: string;
  numeroPagos: number;
  fechaLimite: string;
  montoTotal: number;
  montoPorPago: number;
  observaciones: string;
  estatus: number;
};

type Pago = {
  id: number;
  idPedidoMayoreo: number;
  idMayorista: number;
  fechaVencimiento: string;
  monto: number;
  estatus: number;
};

type Produccion = {
  id: number;
  fechaProduccion: string;
  idReceta: number;
  idPedidoMayoreo: number;
  cantidadMayoristaRequerida: number;
  estatus: number;
};

type State = {
  pedidos: PedidoMayoreo[] | null;
  pagos: Pago[] | null;
  producciones: Produccion[] | null;
};

// Define las acciones
type GetPedidosAction = { type: "GET_PEDIDOS"; payload: PedidoMayoreo[] };
type GetPagosAction = { type: "GET_PAGOS"; payload: Pago[] };
type GetProduccionesAction = {
  type: "GET_PRODUCCIONES";
  payload: Produccion[];
};

type Action = GetPedidosAction | GetPagosAction | GetProduccionesAction;

// Estado inicial
const initialState: State = {
  pedidos: null,
  pagos: null,
  producciones: null,
};

// Reducer para actualizar el estado según la acción
const pedidosReducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case "GET_PEDIDOS":
      return { ...state, pedidos: payload };
    case "GET_PAGOS":
      return { ...state, pagos: payload };
    case "GET_PRODUCCIONES":
      return { ...state, producciones: payload };
    default:
      return state;
  }
};

// Hook personalizado para manejar pedidos mayoristas
export default function usePedidosMayoristas() {
  const [state, dispatch] = useReducer(pedidosReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const crearPedidoMayorista = async (
    pedidoMayorista: PedidoMayoristaInsertDTO
  ) => {
    setCargando(true);

    try {
      const result = await axios.post(
        `${END_POINT}/crear-pedido`,
        pedidoMayorista
      );

      return result;
    } catch (error) {
      console.error("Error al crear solicitud mayorista:", error);
    } finally {
      setCargando(false);
    }
  };

  const getPedidos = async () => {
    setCargando(true);
    try {
      const result = await axios.get<PedidoMayoreo[]>(`${END_POINT}`);
      dispatch({ type: "GET_PEDIDOS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener pedidos mayoristas:", error);
    } finally {
      setCargando(false);
    }
  };

  // Obtener pagos de un cliente mayorista
  const getPagos = async (idMayorista: number) => {
    setCargando(true);
    try {
      const result = await axios.get<Pago[]>(
        `${END_POINT}/pagos/${idMayorista}`
      );
      dispatch({ type: "GET_PAGOS", payload: result.data });
    } catch (error) {
      console.error("Error al obtener pagos del cliente mayorista:", error);
    } finally {
      setCargando(false);
    }
  };

  // Obtener producciones de un pedido
  const getProducciones = async (idPedido: number) => {
    setCargando(true);
    try {
      const result = await axios.get<Produccion[]>(
        `${END_POINT}/producciones/${idPedido}`
      );
      dispatch({ type: "GET_PRODUCCIONES", payload: result.data });
    } catch (error) {
      console.error("Error al obtener producciones del pedido:", error);
    } finally {
      setCargando(false);
    }
  };

  // Marcar un pago como realizado
  const marcarPagoRealizado = async (idPago: number) => {
    setCargando(true);
    try {
      await axios.put(`${END_POINT}/pago/${idPago}`);
      // Refrescar la lista de pagos después de actualizar
      getPagos(idPago);
    } catch (error) {
      console.error("Error al marcar el pago como realizado:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    cargando,
    pedidos: state.pedidos,
    pagos: state.pagos,
    producciones: state.producciones,
    crearPedidoMayorista,
    getPedidos,
    getPagos,
    getProducciones,
    marcarPagoRealizado,
  };
}
