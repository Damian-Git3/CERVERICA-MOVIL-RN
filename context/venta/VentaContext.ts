/**
 * Este archivo genera el contexto de la venta, mediante la funcion createContext de react.
 */

import { createContext } from "react";




export const VentaContext = createContext({
  ventas: [],
  ventaSeleccionada: {},
  getVentas : () => {},
  getVenta : (id: number) => {},
});