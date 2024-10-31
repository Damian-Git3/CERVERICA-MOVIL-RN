import { createContext } from "react";
import { ReporteVentas, ResumenVentas, Venta } from "@/models/venta";

type VentaContextProps = {
  ventas?: Venta[] | null;
  ventaSeleccionada?: Venta | null;
  resumenVentas?: ResumenVentas | null;
  reporteVentas?: ReporteVentas | null;
  obteniendoVentas: boolean;
  getVentas?: () => Promise<any>;
  getResumenVentas?: () => Promise<any>;
  getReporteVentas?: (param: string) => Promise<any>;
};

const VentaContext = createContext<VentaContextProps>({} as VentaContextProps);

export default VentaContext;
