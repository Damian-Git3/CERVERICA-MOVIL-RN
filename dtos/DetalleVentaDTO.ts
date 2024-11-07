// DetalleVentaDto.ts

export interface DetalleVentaDTO {
  // ID de la receta
  idReceta: number;

  // Cantidad
  cantidad: number;

  // Pack
  pack: number;

  // Monto de la venta
  montoVenta?: number;

  // Tipo de envase (opcional con valor por defecto)
  tipoEnvase?: string;

  // Medida del envase (opcional con valor por defecto)
  medidaEnvase?: number;
}
