// CrearVentaDto.ts

import { DetalleVentaDTO } from "./DetalleVentaDTO";

export interface CrearVentaDto {
  // ATRIBUTOS DIRECCIÓN ENVIO
  nombrePersonaRecibe?: string;
  calle?: string;
  numeroCasa?: string;
  codigoPostal?: string;
  Ciudad?: string;
  Estado?: string;
  // ATRIBUTOS DIRECCIÓN ENVIO

  // ATRIBUTOS TARJETA
  NombrePersonaTarjeta?: string;
  NumeroTarjeta?: string;
  MesExpiracion?: string;
  AnioExpiracion?: string;
  CVV?: string;
  // ATRIBUTOS TARJETA

  metodoPago: number;
  metodoEnvio: number;
  detalles: DetalleVentaDTO[];
}
