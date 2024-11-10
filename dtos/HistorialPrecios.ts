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
  idReceta: number;
  paquete1: number;
  paquete6: number;
  paquete12: number;
  paquete24: number;
}
