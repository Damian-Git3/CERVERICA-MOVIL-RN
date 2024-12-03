import { Mayorista } from "./Mayorista";

export enum EstatusSolicitudMayorista {
  NuevoPedido = 1,
  Confirmando = 2,
  Concretado = 3,
  Cancelado = 4,
  Rechazado = 5,
}

export const getEstatusSolicitudMayoristaNombre = (
  estatus: EstatusSolicitudMayorista
): string => {
  switch (estatus) {
    case EstatusSolicitudMayorista.NuevoPedido:
      return "Nuevo Pedido";
    case EstatusSolicitudMayorista.Confirmando:
      return "Confirmando";
    case EstatusSolicitudMayorista.Concretado:
      return "Concretado";
    case EstatusSolicitudMayorista.Cancelado:
      return "Cancelado";
    case EstatusSolicitudMayorista.Rechazado:
      return "Rechazado";
    default:
      return "Desconocido";
  }
};

export const getEstatusSolicitudMayoristaColor = (
  estatus: EstatusSolicitudMayorista
): string => {
  switch (estatus) {
    case EstatusSolicitudMayorista.NuevoPedido:
      return "bg-yellow-400";
    case EstatusSolicitudMayorista.Confirmando:
      return "bg-orange-500"; // Color naranja vibrante
    case EstatusSolicitudMayorista.Concretado:
      return "bg-green-500"; // Color verde vibrante
    case EstatusSolicitudMayorista.Cancelado:
      return "bg-red-600"; // Color rojo vibrante
    case EstatusSolicitudMayorista.Rechazado:
      return "bg-red-600"; // Color rojo vibrante
    default:
      return "bg-gray-400"; // Manejo de un estado desconocido
  }
};

export type SolicitudMayorista = {
  id: number;
  fechaInicio: string;
  fechaCierre: string | null;
  idMayorista: number;
  mayorista: Mayorista;
  idAgente: string;
  estatus: EstatusSolicitudMayorista;
  tipo: number;

  mensajeRechazo: string;
};

export type AvanzarSiguienteEstatusSolicitudMayoristaDTO = {
  idSolicitud: number;
  nuevoEstatus: number;
};

export type CancelarSolicitudMayoristaDTO = {
  idSolicitud: number;
  mensajeRechazo: string;
};
