export type PedidoMayoristaInsertDTO = {
  idMayorista: number;
  idSolicitudMayorista: number;
  plazoMeses: number;
  observaciones: string;
  listaCervezas: { idReceta: number; cantidad: number }[];
};
