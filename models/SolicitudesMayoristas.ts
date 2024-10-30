import { Mayorista } from "./Mayorista";

export enum EstatusSolicitudMayorista {
  Prospecto = 1,
  NuevoPedido = 2,
  Contactado = 3,
  Cerrado = 4,
  Cancelado = 5,
}

export const getEstatusSolicitudMayoristaNombre = (
  estatus: EstatusSolicitudMayorista
): string => {
  switch (estatus) {
    case EstatusSolicitudMayorista.Prospecto:
      return "Prospecto";
    case EstatusSolicitudMayorista.NuevoPedido:
      return "Nuevo Pedido";
    case EstatusSolicitudMayorista.Contactado:
      return "Contactado";
    case EstatusSolicitudMayorista.Cerrado:
      return "Cerrado";
    case EstatusSolicitudMayorista.Cancelado:
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

export const getEstatusSolicitudMayoristaColor = (
  estatus: EstatusSolicitudMayorista
): string => {
  switch (estatus) {
    case EstatusSolicitudMayorista.Prospecto:
      return "bg-yellow-400";
    case EstatusSolicitudMayorista.NuevoPedido:
      return "bg-yellow-400";
    case EstatusSolicitudMayorista.Contactado:
      return "bg-orange-500"; // Color naranja vibrante
    case EstatusSolicitudMayorista.Cerrado:
      return "bg-green-500"; // Color verde vibrante
    case EstatusSolicitudMayorista.Cancelado:
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
};

export type AvanzarSiguienteEstatusSolicitudMayoristaDTO = {
  idSolicitud: number;
  nuevoEstatus: number;
};
