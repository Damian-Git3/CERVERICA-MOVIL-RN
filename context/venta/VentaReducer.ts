import { GET_VENTA, GET_VENTAS } from "../types";


export const VentaReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_VENTAS:
      return {
        ...state,

        ventas: action.payload,
      };

    case GET_VENTA:
      return {
        ...state,

        ventaSeleccionada: action.payload,
      };

    default:
      return state;
  }
};
