import { Stock } from "./stock";
export interface Venta {
  id: number;
  fechaVenta: string;
  totalCervezas: number;
  metodoEnvio: number;
  metodoPago: number; 
  numeroTarjeta: string; 
  estatusVenta: number; 
  montoVenta: number;
  productosPedido: DetalleVenta[];
}

export interface DetalleVenta {
  id: number;
  cantidad: number;
  pack: string;
  idStock: number;
  montoVenta: number;
  costoUnitario: number;
  stock: Stock;
}

export interface ReporteVentas {
  fecha: string;
  data: [{
    date: string;
    monto: number;
  }];
  total: number;
}

export interface ResumenVentas {
  semana: number;
  mes: number;
  anio: number;

}
