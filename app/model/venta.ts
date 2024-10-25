import { Stock } from "./stock";
export interface Venta {
  Id: number;
  FechaVenta: string;
  TotalCervezas: number;
  MetodoEnvio: string; // Asumiendo que MetodoEnvio es un string, ajusta según sea necesario
  MetodoPago: string; // Asumiendo que MetodoPago es un string, ajusta según sea necesario
  NumeroTarjeta: string; // Asumiendo que NumeroTarjeta es un string, ajusta según sea necesario
  EstatusVenta: string; // Asumiendo que EstatusVenta es un string, ajusta según sea necesario
  MontoVenta: number;
  ProductosPedido: DetalleVenta[];
}

export interface DetalleVenta {
  Id: number;
  Cantidad: number;
  Pack: string; // Asumiendo que Pack es un string, ajusta según sea necesario
  IdStock: number;
  MontoVenta: number;
  CostoUnitario: number;
  Stock: Stock;
}
