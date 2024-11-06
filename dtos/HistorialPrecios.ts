export interface RecetaView {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  activo: boolean;
}

export interface PreciosRecetaView {
  id: number;
  nombre: string;
  imagen: string;
  precioLitro: number;
  precioPaquet1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
  estatus: boolean;
}

export interface HistorialPreciosView {
  fecha: Date;
  precioPaquete1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
}

export interface HistorialPrecioInsert {
  IdReceta: number;
  Paquete1: number;
  Paquete6: number;
  Paquete12: number;
  Paquete24: number;
}
