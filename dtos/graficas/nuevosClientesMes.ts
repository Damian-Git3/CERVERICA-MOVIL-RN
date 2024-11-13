import { Producto } from "../../models/Producto";
export interface NuevosClientesMesDTO {
  mes: number;
  año: number;
  nuevosClientes: number;
}

export interface VentasPorStatusDTO {
  estatus: string;
  cantidad: number;
}

export interface ProductosMasVendidosDTO {
  producto: string;
  cantidadVendida: number;
}

export interface PedidosMetodoPagoDTO {
  metodoPago: string;
  cantidad: number;
}
