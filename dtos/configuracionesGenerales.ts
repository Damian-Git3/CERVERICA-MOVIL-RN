export interface IConfiguracionesGenerales {
  id: number;
  minimoCompraEnvioGratis: number;
  promocionesAutomaticas: boolean;
  notificacionPromocionesWhatsApp: boolean;
  notificacionPromocionesEmail: boolean;
  tiempoRecordatorioCarritoAbandonado: number;
  tiempoRecordatorioRecomendacionUltimaCompra: number;
  fechaModificacion: Date;
  frecuenciaReclasificacionClientes: number;
  frecuenciaMinimaMensualClienteFrecuente: number;
  tiempoSinComprasClienteInactivo: number;
}
