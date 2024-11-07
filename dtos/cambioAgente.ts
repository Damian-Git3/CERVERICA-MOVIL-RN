// solicitudCambioAgente.ts
export interface SolicitudCambioAgenteDTO {
  idAgenteVentaActual: string; // ID del agente de ventas actual
  motivo: string; // Motivo de la solicitud
  solicitante: number | null; // Nombre del solicitante
  idMayorista: number; // ID del mayorista
  fechaSolicitud: string;
}

// solicitudCambioAgente.ts
export interface ActualizarSolicitudCambioAgenteDTO {
  id: number; // id del campo
  idMayorista: number;
  estatus: string;
  idAdministrador?: string;
  idAgenteActual: string;
  motivoRechazo?: string | null;
  idAgenteNuevo?: string | null;
  fechaRespuesta: string;
}

export interface ISolicitudCambioAgenteResponseDTO {
  id: number;
  motivo: string;
  solicitante: number;
  estatus: string;
  fechaSolicitud: Date;
  fechaRespuesta?: Date;
  motivoRechazo?: string;

  // Datos Cliente
  idMayorista: string;
  //idCliente: string;
  nombreContacto: string;
  cargoContacto: string;
  telefonoContacto: string;
  emailContacto: string;

  // Datos Agentes
  idAgenteVentaActual: string;
  agenteVentaActualNombre: string;
  idAgenteVentaNuevo?: string;
  agenteVentaNuevoNombre?: string; // Puede ser null

  // Datos admin
  idAdministrador: string;
  administradorNombre: string;
}

export interface IAgentesResponseDTO {
  fullName: string; // Nombre completo del agente
  activo: boolean; // Estado activo del agente
  fechaRegistro: string; // Fecha de registro (en formato ISO 8601)
  phoneNumber: string; // Número de teléfono
  id: string; // ID del agente (UUID)
  userName: string; // Nombre de usuario (email)
  email: string; // Correo electrónico del agente
}
