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
  precioPaquete1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
  precioUnitarioBaseMayoreo: number;
  estatus: boolean;
}

export interface HistorialPreciosView {
  fecha: Date;
  precioPaquete1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
  precioUnitarioBaseMayoreo: number;
}

export interface HistorialPrecioInsert {
  idReceta: number;
  precioPaquete1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
  precioBaseMayoreo: number;
}
