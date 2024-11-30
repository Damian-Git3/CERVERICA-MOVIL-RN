export interface ICupon {
  id: number;
  codigo: string;
  fechaCreacion: string;
  fechaExpiracion: string;
  tipo: number;
  paquete: number;
  cantidad: number;
  valor: number;
  usos: number;
  montoMaximo?: number;
  montoMinimo?: number;
  categoriaComprador: number;
  activo: boolean;
}