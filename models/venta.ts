import { Stock } from "./stock";
export interface Venta {
  id: number;
  fechaVenta: string;
  totalCervezas: number;
  metodoEnvio: number; // Asumiendo que MetodoEnvio es un string, ajusta según sea necesario
  metodoPago: number; // Asumiendo que MetodoPago es un string, ajusta según sea necesario
  numeroTarjeta: string; // Asumiendo que NumeroTarjeta es un string, ajusta según sea necesario
  estatusVenta: number; // Asumiendo que EstatusVenta es un string, ajusta según sea necesario
  montoVenta: number;
  productosPedido: DetalleVenta[];
}

export interface DetalleVenta {
  id: number;
  cantidad: number;
  pack: string; // Asumiendo que Pack es un string, ajusta según sea necesario
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
