import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { PagoDTO, MayoristaAsignadoDTO } from "@/dtos/pago";

const END_POINT = "/PedidosMayoristas";

const initialState = {
  pagos: null as PagoDTO[] | null,
  mayoristasAsignados: null as MayoristaAsignadoDTO | null,
};

// Reducer
const PagosReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_PAGOS": // Agregado para manejar las categorías
      console.log("llamado al reducer para obtener los pagos propios");
      return {
        ...state,
        pagos: payload,
      };
    case "GET_MAYORISTAS_ASIGNADOS": // Agregado para manejar las categorías
      console.log("llamado al reducer para obtener los mayoristas asignados");
      return {
        ...state,
        mayoristasAsignados: payload,
      };
    default:
      return state;
  }
};

// Solicitudes
export default function usePagos() {
  const [state, dispatch] = useReducer(PagosReducer, initialState);
  const [cargando, setCargando] = useState(false);

  const getPagosPropiosMayorista = async () => {
    setCargando(true);

    try {
      const result = await axios.get(`${END_POINT}/pagos/cliente`);

      dispatch({
        type: "GET_PAGOS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener pagos propios:", error);
    } finally {
      setCargando(false);
    }
  };

  const getMayoristasAsignados = async () => {
    setCargando(true);
    let result = null;
    try {
      result = await axios.get(`${END_POINT}/mayoristas-asignados`);

      dispatch({
        type: "GET_MAYORISTAS_ASIGNADOS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener los mayoristas asignados:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };
  const getPagosMayorista = async (idMayorista: number) => {
    setCargando(true);
    let result = null;
    try {
      result = await axios.get(`${END_POINT}/pagos/${idMayorista}`);

      dispatch({
        type: "GET_PAGOS",
        payload: result.data,
      });
    } catch (error) {
      console.error("Error al obtener los pagos del mayorista:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  const marcarPago = async (idPago: number) => {
    setCargando(true);
    let result = null;
    try {
      result = await axios.put(`${END_POINT}/pago/${idPago}`);
    } catch (error) {
      console.error("Error al marcar pago:", error);
    } finally {
      setCargando(false);
      return result;
    }
  };

  return {
    cargando,
    pagos: state.pagos,
    mayoristasAsignados: state.mayoristasAsignados,
    marcarPago,
    getPagosMayorista,
    getMayoristasAsignados,
    getPagosPropiosMayorista,
  };
}
