export interface PagoDTO {
  id: number;
  idMayorista: number;
  mayorista: null;
  idPedidoMayoreo: 11;
  comprobante: string;
  fechaVencimiento: Date;
  fechaPago: Date;
  monto: number;
  estatus: number;
}

export interface MayoristaAsignadoDTO {
  id: number;
  rfcEmpresa: string;
  nombreEmpresa: string;
  direccionEmpresa: string;
  telefonoEmpresa: string;
  emailEmpresa: string;
  nombreContacto: string;
  cargoContacto: string;
  telefonoContacto: string;
  emailContacto: string;
  idUsuario: string;
  idAgenteVenta: string;
}
