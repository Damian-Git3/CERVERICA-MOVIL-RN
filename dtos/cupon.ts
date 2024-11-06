export interface ICupon {
  id: number;
  idUsuario?: string; // Opcional ya que en el modelo es nullable
  idReceta?: number; // Opcional ya que en el modelo es nullable
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
