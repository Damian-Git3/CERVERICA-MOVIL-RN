import { GET_VENTAS, GET_VENTA, GET_REPORTE_VENTAS, GET_RESUMEN_VENTAS } from "../types";

const VentaReducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case GET_VENTAS:
      return {
        ...state,
        ventas: payload,
      };
    case GET_VENTA: 
        return {
            ...state,
            ventaSeleccionada: payload,
        };
    case GET_RESUMEN_VENTAS:
        return {
            ...state,
            resumenVentas: payload,
        };
    case GET_REPORTE_VENTAS:
        return {
            ...state,
            reporteVentas: payload,
        };
    default:
      return state;
  }
};

export default VentaReducer;
