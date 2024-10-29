export interface PuntosFidelidadDto {
  id: number;
  idUsuario: string;
  puntosAcumulados: number;
  puntosRedimidos: number;
  puntosDisponibles: number;
  fechaUltimaActualizacion?: Date; // La fecha es opcional
}
