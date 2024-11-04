export interface PuntosFidelidadDto {
  id: number;
  idUsuario: string;
  puntosAcumulados: number;
  puntosRedimidos: number;
  puntosDisponibles: number;
  fechaUltimaActualizacion?: Date; // La fecha es opcional
}

export interface ReglasPuntosDto {
  id?: number;
  valorMXNPunto?: number | null;
  montoMinimo: number;
  porcentajeConversion: number;
  fechaModificacion: string;
}
