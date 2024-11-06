import { Receta } from "./Receta";

export interface Stock {
  Id: number;
  IdReceta: number;
  receta: Receta; // Asumiendo que Receta es un string, ajusta según sea necesario
}
