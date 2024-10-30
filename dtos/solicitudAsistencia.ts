import { CategoriaAsistenciaDto } from "./categoriaAsistencia";

export interface SolicitudAsistenciaDto {
  id: number;
  idCliente: string;
  idAgenteVenta: string;
  idCategoriaAsistencia: number;
  mayoreo: boolean;
  descripcion: string;
  fechaSolicitud: Date;
  fechaCierre?: string | null;
  estatus: number;
  valoracion?: any | null;
  mensajeValoracion?: any | null;
  tipo: number;
  seguimientosSolicitudAsistencia?: any | null;
  categoriasAsistencia?: CategoriaAsistenciaDto | null;
}
