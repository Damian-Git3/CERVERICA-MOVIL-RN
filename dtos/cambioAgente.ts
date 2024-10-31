// solicitudCambioAgente.ts
export interface SolicitudCambioAgenteDTO {
  idAgenteVentaActual: number; // ID del agente de ventas actual
  motivo: string; // Motivo de la solicitud
  solicitante: number | null; // Nombre del solicitante
  idMayorista: number; // ID del mayorista
}

// solicitudCambioAgente.ts
export interface ActualizarSolicitudCambioAgenteDTO {
  id: number; // id del campo
  motivo: string;
}
