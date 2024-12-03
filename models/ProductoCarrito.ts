export type ProductoCarrito = {
  id: number;
  idReceta: number;
  idCarrito: number;
  cantidadPaquete: number;
  cantidad: number;
  receta: {
    id: number;
    nombre: string;
    descripcion: string;
    precioPaquete1: number;
    precioPaquete6: number;
    precioPaquete12: number;
    precioPaquete24: number;
    precioUnitarioBaseMayoreo: number;
    imagen: string;
  };
};
