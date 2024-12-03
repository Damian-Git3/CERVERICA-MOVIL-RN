import { Receta } from "./Receta";
import { Usuario } from "./Usuario";

export interface Cupon {
    id: number;
    idUsuario?: string;
    usuario?: Usuario;
    idReceta?: number;
    receta?: Receta;
    fechaCreacion: Date;
    fechaExpiracion: Date;
    codigo: string;
    tipo: TipoCupon;
    paquete: number;
    cantidad: number;
    valor: number;
    usos: number;
    montoMaximo: number;
    categoriaComprador: CategoriaComprador;
    activo: boolean;
}

export enum TipoCupon {
    Porcentaje = 1,
    Fijo = 2,
}

export enum CategoriaComprador {
  Todos = 1,
  Frecuente = 2,
  Minorista = 3,
  Mayorista = 4,
  Inactivo = 5,
}