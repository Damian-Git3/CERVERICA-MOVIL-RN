import { Receta } from './Receta';
import { ProduccionLoteInsumo } from './ProduccionLoteInsumo';
import { Usuario } from './Usuario';

export interface Produccion {
  id: number;
  fechaProduccion: Date;
  fechaProximoPaso?: Date;
  mensaje?: string;
  estatus: number;
  numeroTandas: number;
  litrosFinales?: number;
  costoProduccion?: number;
  idReceta: number;
  receta?: Receta;
  fechaSolicitud: Date;
  idUsuarioSolicitud: string;
  usuarioSolicitud?: Usuario;
  idUsuarioProduccion: string;
  usuarioProduccion?: Usuario;
  paso: number;
  mermaLitros?: number;
  produccionLoteInsumos: ProduccionLoteInsumo[];
}

export interface ProduccionLoteInsumo {
    id: number;
    cantidad: number;
    loteInsumo: LoteInsumo
    }